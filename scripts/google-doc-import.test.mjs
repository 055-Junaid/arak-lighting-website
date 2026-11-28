// node --test scripts/google-doc-import.test.mjs
// The fixture mirrors the HTML Google Docs exports: styles live in classes,
// images sit inside paragraphs and links go through a google.com redirect.
import test from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createRequire } from 'node:module';
// Compiled inside the project so the converter can resolve node-html-parser.
const compiled = join(process.cwd(), 'node_modules', '.cache', `arak-gdoc-test-${process.pid}`);
mkdirSync(compiled, { recursive: true });
for (const name of ['rich-text', 'content', 'google-doc']) {
  const source = readFileSync(new URL(`../src/lib/blog/${name}.ts`, import.meta.url), 'utf8');
  writeFileSync(join(compiled, name + '.js'), ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText);
}
process.on('exit', () => rmSync(compiled, { recursive: true, force: true }));
const require = createRequire(import.meta.url);
const { convertGoogleDocHtml, googleDocId } = require(join(compiled, 'google-doc.js'));
const { parseBlogBody } = require(join(compiled, 'content.js'));
const { encodeRichBody } = require(join(compiled, 'rich-text.js'));

const html = `<html><head><style type="text/css">.c3{font-weight:400;font-size:11pt;font-style:normal}.c4{font-weight:700;font-size:17pt}.c8{font-weight:700}.c23{font-size:10pt;font-style:italic}.c11{font-size:23pt}</style></head>
<body class="doc-content">
<h1 class="c24"><span><img alt="" src="images/image2.png" title=""></span></h1>
<h1 class="c20"><span class="c23">Kingdom Centre at night</span></h1>
<h1 class="c25"><span class="c11">What Is a Media Fa&ccedil;ade?</span></h1>
<p class="c16"><span class="c3"></span></p>
<p class="c1"><span class="c3">Walk through any city at night.</span></p>
<p class="c1"><span class="c3">Second paragraph with a </span><a href="https://www.google.com/url?q=https://arak-sa.com/contact&amp;sa=D"><span class="c3">link</span></a><span class="c3">.</span></p>
<h2 class="c12"><span class="c4">How it works</span></h2>
<p class="c1"><span><img alt="Diagram of a facade" src="images/image3.png" title=""></span></p>
<ul class="lst-kix_a-0 start"><li class="c1"><span class="c8">The light source.</span><span class="c3">&nbsp;Thousands of LEDs.</span></li></ul>
<ul class="lst-kix_a-1 start"><li class="c1"><span class="c3">Nested point</span></li></ul>
<p class="c1"><span class="c4">A Short History</span></p>
<table><tr><td><p><span class="c5">Project</span></p></td><td><p><span class="c5">City</span></p></td></tr><tr><td><p><span class="c3">Rafal Tower</span></p></td><td><p><span class="c3">Riyadh</span></p></td></tr></table>
<p class="c1"><span class="c3">(add contact button)</span></p>
<p class="c1"><span class="c3">(add map here)</span></p>
<p class="c1"><span class="c3">Ends here — for now.</span></p>
<p class="c1"><a href="javascript:alert(1)"><span class="c3">bad link</span></a></p>
</body></html>`;

test('accepts only Google Docs links', () => {
  assert.equal(googleDocId('https://docs.google.com/document/d/17m_rn9s6Nw80Q7d4vsjM8VpJAiYn4F3tA-J8a-d6eac/edit?tab=t.0#heading=h.x'), '17m_rn9s6Nw80Q7d4vsjM8VpJAiYn4F3tA-J8a-d6eac');
  for (const link of ['https://docs.google.com.evil.com/document/d/17m_rn9s6Nw80Q7d4vsjM8VpJAiYn4F3tA/edit', 'http://docs.google.com/document/d/17m_rn9s6Nw80Q7d4vsjM8VpJAiYn4F3tA', 'https://docs.google.com/spreadsheets/d/17m_rn9s6Nw80Q7d4vsjM8VpJAiYn4F3tA', 'not a link']) assert.equal(googleDocId(link), null, link);
});

test('converts a Google Docs export into the blog document', () => {
  const result = convertGoogleDocHtml(html);
  assert.equal(result.title, 'What Is a Media Façade?');
  assert.equal(result.excerpt, 'Walk through any city at night.');
  assert.deepEqual(result.cover, { name: 'images/image2.png', alt: 'Kingdom Centre at night', caption: 'Kingdom Centre at night' });
  assert.deepEqual(result.images, ['images/image2.png', 'images/image3.png']);
  const types = result.doc.content.map(node => node.type);
  assert.deepEqual(types, ['paragraph', 'heading', 'image', 'bulletList', 'heading', 'table', 'contactButton', 'paragraph', 'paragraph', 'paragraph']);
  const link = result.doc.content[0].content.find(node => node.marks?.some(mark => mark.type === 'link'));
  assert.equal(link.marks[0].attrs.href, 'https://arak-sa.com/contact');
  assert.equal(result.doc.content[2].attrs.alt, 'Diagram of a facade');
  const list = result.doc.content[3].content;
  assert.equal(list.length, 2);
  assert.deepEqual(list[0].content[0].content, [{ type: 'text', text: 'The light source.', marks: [{ type: 'bold' }] }, { type: 'text', text: ' Thousands of LEDs.' }]);
  assert.deepEqual(result.doc.content[4].content, [{ type: 'text', text: 'A Short History' }]);
  assert.equal(result.doc.content.at(-1).content[0].marks, undefined, 'unsafe links lose the link');
  for (const pattern of [/flattened/, /A Short History.*heading/, /em dash/, /\(add map here\)/, /contact button/]) assert.ok(result.notes.some(note => pattern.test(note)), String(pattern));
});

test('the imported document renders with captions, table and contact button', () => {
  const doc = convertGoogleDocHtml(html).doc;
  const placed = JSON.parse(JSON.stringify(doc).replaceAll('google-doc:images/image3.png', '/blog-media/00000000-0000-0000-0000-000000000000.webp'));
  const blocks = parseBlogBody(encodeRichBody(placed));
  assert.deepEqual(blocks.find(block => block.kind === 'image'), { kind: 'image', src: '/blog-media/00000000-0000-0000-0000-000000000000.webp', alt: 'Diagram of a facade', caption: '' });
  assert.ok(blocks.some(block => block.kind === 'contact'));
  assert.deepEqual(blocks.find(block => block.kind === 'table').rows, [['Rafal Tower', 'Riyadh']]);
});

test('a doc without a title or images explains what to add', () => {
  const result = convertGoogleDocHtml('<html><body><p><span>Just text.</span></p></body></html>');
  assert.equal(result.title, '');
  assert.ok(result.notes.some(note => /No title/.test(note)));
  assert.ok(result.notes.some(note => /no images/.test(note)));
});
