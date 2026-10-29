// node --test scripts/blog-content.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createRequire } from 'node:module';
const compiled = mkdtempSync(join(tmpdir(), 'arak-content-test-'));
for (const name of ['rich-text', 'content', 'editor-content']) {
  const source = readFileSync(new URL(`../src/lib/blog/${name}.ts`, import.meta.url), 'utf8');
  writeFileSync(join(compiled, name + '.js'), ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText);
}
const require = createRequire(import.meta.url);
const { parseBlogBody, articleSections, postUsesMedia } = require(join(compiled, 'content.js'));
const { encodeRichBody, decodeRichBody, safeBlogLink, blogBodyText } = require(join(compiled, 'rich-text.js'));
const { editorDocument } = require(join(compiled, 'editor-content.js'));
process.on('exit', () => rmSync(compiled, { recursive: true, force: true }));

test('contents targets remain unique for repeated headings and support Arabic', () => {
  const blocks = parseBlogBody('## Light\n\nText\n\n## Light\n\n## تصميم الإضاءة\n\n### Detail');
  const sections = articleSections(blocks);
  assert.equal(sections.length, 3);
  assert.equal(new Set(sections.map(section => section.id)).size, 3);
  assert.equal(sections[2].text, 'تصميم الإضاءة');
});

test('well-formed tables parse; malformed rows stay plain text', () => {
  const table = parseBlogBody('| Area | Intent |\n| --- | --- |\n| Entry | Welcome |')[0];
  assert.equal(table.kind, 'table');
  assert.deepEqual(table.rows, [['Entry', 'Welcome']]);
  assert.equal(parseBlogBody('| A | B |\n| --- | --- |\n| Only one cell |')[0].kind, 'paragraph');
});

test('raw HTML and unsafe image sources remain text', () => {
  for (const body of ['<script>alert(1)</script>', '![x](javascript:alert)', '![x](//example.com/image.jpg)', '![x](/blog-media/../secret.webp)', '![x](/blog-media/%2e%2e/secret.webp)']) {
    assert.equal(parseBlogBody(body)[0].kind, 'paragraph', body);
  }
});

test('only rendered cover and inline image references expose published media', () => {
  const url = '/blog-media/12345678-1234-1234-1234-123456789012.webp';
  assert.equal(postUsesMedia({cover:url, body:''},url),true);
  assert.equal(postUsesMedia({cover:'', body:`![Lighting detail](${url})`},url),true);
  assert.equal(postUsesMedia({cover:'', body:`A mention of ${url}`},url),false);
  assert.equal(postUsesMedia({cover:'', body:`![Lighting detail](${url})`},'/blog-media/different.webp'),false);
});


test('existing articles convert to a visual document without losing supported content', () => {
  const markdown = '## A heading\n\nSome **bold** text.\n\n- One\n- Two\n\n> A quote\n\n![Facade](/projects/test.webp)\n\n| A | B |\n| --- | --- |\n| Entry | Welcome |';
  const before = parseBlogBody(markdown);
  const after = parseBlogBody(encodeRichBody(editorDocument(markdown)));
  assert.deepEqual(after.map(block => block.kind), before.map(block => block.kind));
  assert.equal(after[1].inline.some(part => part.bold && part.text === 'bold'), true);
  assert.deepEqual(after[2].items, ['One', 'Two']);
  assert.deepEqual(after[5].rows, [['Entry', 'Welcome']]);
  assert.equal(articleSections(after)[0].text, 'A heading');
});

test('rich text persists formatting and links while stripping unsafe public attributes', () => {
  const doc = {type:'doc',content:[{type:'paragraph',content:[{type:'text',text:'Bright',marks:[{type:'bold'},{type:'italic'},{type:'link',attrs:{href:'https://araklighting.com'}}]},{type:'text',text:' unsafe',marks:[{type:'link',attrs:{href:'javascript:alert(1)'}}]}]},{type:'image',attrs:{src:'https://external.example/private.webp',alt:'External'}}]};
  const body = encodeRichBody(doc);
  assert.deepEqual(decodeRichBody(body), doc);
  assert.deepEqual(decodeRichBody(body.replaceAll("\n", "\r\n")), doc);
  const blocks = parseBlogBody(body);
  assert.equal(blocks.length, 1);
  assert.equal(blocks[0].inline[0].href, 'https://araklighting.com');
  assert.equal(blocks[0].inline[0].italic, true);
  assert.equal(blocks[0].inline[1].href, undefined);
  assert.equal(blogBodyText(body), 'Bright unsafe\n');
  for (const href of ['javascript:alert(1)', '//evil.example', '/\\evil.example', 'data:text/html,test']) assert.equal(safeBlogLink(href),false);
});

test('rich draft and published images use the same exact media visibility checks', () => {
  const url = '/blog-media/12345678-1234-1234-1234-123456789012.webp';
  const body = encodeRichBody({type:'doc',content:[{type:'image',attrs:{src:url,alt:'Details'}}]});
  assert.equal(postUsesMedia({cover:'',body},url),true);
  assert.equal(postUsesMedia({cover:'',body:encodeRichBody({type:'doc',content:[{type:'paragraph',content:[{type:'text',text:url}]}]})},url),false);
  assert.equal(decodeRichBody('ARAK-DOCUMENT-1\n{"type":"doc","content":null}'),null);
});


test('multiple paragraphs in quotes and table cells retain their line breaks', () => {
  const paragraph = text => ({type:'paragraph',content:[{type:'text',text}]});
  const body = encodeRichBody({type:'doc',content:[{type:'blockquote',content:[paragraph('First'),paragraph('Second')]}]});
  assert.equal(parseBlogBody(body)[0].inline.map(part => part.text).join(''), 'First\nSecond');
});
