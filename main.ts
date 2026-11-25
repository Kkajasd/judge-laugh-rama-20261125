// Make the AI Judge Laugh — one-line office joke entry.
// Writes a single joke about office life (<200 chars, one line)
// to /output/entry.txt for the make.fun program/v1 harness.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "I set my status to 'in a meeting' so I can finally do the work the meeting was supposed to discuss.";

// The sealed scorer accepts 1–200 UTF-8 characters, not only whitespace,
// a single line. Fail loudly here rather than shipping an invalid entry.
if (JOKE.length < 1 || JOKE.length > 200) {
  throw new Error(`joke is ${JOKE.length} chars, must be 1-200`);
}
if (JOKE.includes("\n") || JOKE.trim() !== JOKE) {
  throw new Error("joke must be a single line with no surrounding whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, JOKE, "utf8");

// Round-trip check: what the grader reads must be byte-identical to JOKE.
if (readFileSync(outPath, "utf8") !== JOKE) {
  throw new Error("entry.txt round-trip mismatch");
}
console.log(`wrote ${JOKE.length}-char entry to ${outPath}`);
