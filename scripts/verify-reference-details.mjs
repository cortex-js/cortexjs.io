// Runs every `epsil` code fence of `reference-details/*.md` with the epsil CLI
// of the sibling compute-engine checkout, and checks each `// ➔` line against
// what the CLI prints. These files are written by hand, so a result that the
// engine no longer produces would otherwise go on being published.
//
// A fence is split into programs at its `// ➔` lines: the lines before a
// `// ➔` line are one program, run on its own, and the text after `➔` is the
// expected output (stdout, or the first line of stderr for an error, which is
// written `// ➔ error: …`). Lines after the last `// ➔` line are run and must
// not fail: use this for random results, which cannot be printed.
//
// The CLI runs in-process from the compute-engine sources, so this script
// needs that repo's tsx:
//
//     npm run verify:details
//
// Set REFERENCE_DETAILS=warn to report without failing.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DETAILS_DIR = path.join(ROOT, "reference-details");
const CLI_MAIN = path.join(ROOT, "..", "compute-engine", "src", "cli", "main.ts");

/** The programs of every `epsil` fence of a detail file. */
export function extractPrograms(text, file) {
  const programs = [];
  const lines = text.split("\n");
  let inFence = false;
  let pending = [];
  let start = 0;
  for (const [i, line] of lines.entries()) {
    if (!inFence) {
      if (/^```epsil\s*$/.test(line)) {
        inFence = true;
        pending = [];
        start = i + 2;
      }
      continue;
    }
    if (/^```\s*$/.test(line)) {
      if (pending.some((l) => l.trim() !== ""))
        programs.push({ file, line: start, code: pending.join("\n"), expected: undefined });
      inFence = false;
      continue;
    }
    const result = /^\/\/ ➔ ?(.*)$/.exec(line);
    if (result) {
      programs.push({ file, line: start, code: pending.join("\n"), expected: result[1].trim() });
      pending = [];
      start = i + 2;
    } else pending.push(line);
  }
  return programs;
}

function makeIo() {
  let out = "";
  let err = "";
  const io = {
    stdin: { isTTY: false, setEncoding() {}, async *[Symbol.asyncIterator]() {} },
    stdout: { isTTY: false, write: (s) => ((out += s), true) },
    stderr: { isTTY: false, write: (s) => ((err += s), true) },
    env: {},
  };
  return { io, stdout: () => out, stderr: () => err };
}

async function main() {
  const strict = process.env.REFERENCE_DETAILS !== "warn";
  const { main: cli } = await import(pathToFileURL(CLI_MAIN).href);
  const files = (await fs.readdir(DETAILS_DIR)).filter((f) => f.endsWith(".md")).sort();
  const failures = [];
  let count = 0;
  for (const file of files) {
    const text = await fs.readFile(path.join(DETAILS_DIR, file), "utf8");
    for (const program of extractPrograms(text, file)) {
      count++;
      const { io, stdout, stderr } = makeIo();
      const code = await cli(["-e", program.code], io);
      const out = stdout().trim();
      const firstError = stderr().trim().split("\n")[0] ?? "";
      const actual = out !== "" ? out : firstError;
      const failed =
        program.expected === undefined ? code !== 0 : actual !== program.expected;
      if (failed) failures.push({ ...program, actual });
    }
  }
  for (const f of failures) {
    console.log(`  FAIL  ${f.file}:${f.line}  ${f.code.replace(/\n/g, " ⏎ ")}`);
    if (f.expected !== undefined) console.log(`        expected ${f.expected}`);
    console.log(`        actual   ${f.actual}`);
  }
  console.log(
    `[verify-reference-details] ${count - failures.length}/${count} programs ` +
      `of ${files.length} detail files give their printed result`
  );
  if (failures.length > 0 && strict) process.exitCode = 1;
}

const invokedDirectly =
  process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url;
if (invokedDirectly) await main();
