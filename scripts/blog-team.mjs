// Local development only. No password or employee data is committed to Git.
import { mkdir, readFile, writeFile, rename } from "node:fs/promises";
import { randomBytes, scryptSync } from "node:crypto";
import { createInterface } from "node:readline/promises";
import path from "node:path";
import { Writable } from "node:stream";
const directory = path.join(process.cwd(), ".blog-data");
const file = path.join(directory, "team.json");
const [command, rawEmail, ...nameParts] = process.argv.slice(2);
const email = rawEmail?.trim().toLowerCase();
if (!["add", "remove", "list"].includes(command) || (command !== "list" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || ""))) {
  console.log('Usage: node scripts/blog-team.mjs add employee@company.com "Employee Name"\n       node scripts/blog-team.mjs remove employee@company.com\n       node scripts/blog-team.mjs list');
  process.exit(1);
}
await mkdir(directory, { recursive: true, mode: 0o700 });
let team;
try { team = JSON.parse(await readFile(file, "utf8")); } catch (error) { if (error.code !== "ENOENT") throw error; team = { secret: randomBytes(48).toString("hex"), members: [] }; }
if (command === "list") { console.log(team.members.map(m => `${m.name} <${m.email}>`).join("\n") || "No team members yet."); process.exit(0); }
team.members = team.members.filter(m => m.email !== email);
if (command === "add") {
  // Prefer the terminal prompt. The env override supports local automated QA only.
  let password = process.env.BLOG_TEAM_PASSWORD;
  if (!password) {
    const mutedOutput = new Writable({ write(_chunk, _encoding, done) { done(); } });
    const prompt = createInterface({ input: process.stdin, output: mutedOutput, terminal: !!process.stdin.isTTY });
    console.log("Use at least 12 characters. Do not reuse a company password.");
    process.stdout.write("Local password (hidden): ");
    password = await prompt.question("");
    prompt.close();
    process.stdout.write("\n");
  }
  if (password.length < 12 || password.length > 256) throw new Error("Use a password between 12 and 256 characters.");
  const salt = randomBytes(24).toString("hex");
  team.members.push({ email, name: nameParts.join(" ").trim() || email.split("@")[0], salt, hash: scryptSync(password, salt, 64).toString("hex") });
}
await writeFile(`${file}.tmp`, JSON.stringify(team, null, 2), { mode: 0o600 });
await rename(`${file}.tmp`, file);
console.log(command === "add" ? `Local publishing access saved for ${email}. Open /team/login. Previous sessions for this account are revoked.` : `Access removed for ${email}. Existing sessions are revoked.`);
