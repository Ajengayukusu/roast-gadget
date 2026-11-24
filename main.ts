// SPDX-License-Identifier: MIT
// One-Line Roast: The Gadget You Use Every Day — one original line, at
// most 200 characters, roasting a gadget used every day. The joke is
// the misplaced praise: the watch celebrates the easy part and says
// nothing about the hard one.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "My smartwatch buzzes to congratulate me for standing up, as if sitting down was the hard part.";

const MAX_CHARS = 200;

function entryLine(): string {
  const line = LINE.trim();
  if (line.length === 0) {
    throw new Error("entry line must not be empty");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(`entry line is ${line.length} characters, over the ${MAX_CHARS} limit`);
  }
  if (/\r|\n/.test(line)) {
    throw new Error("entry must be a single line");
  }
  // No control characters and no accidental double spaces: either would
  // break the one-line rendering the judge sees.
  if (/[\u0000-\u001F\u007F]/.test(line)) {
    throw new Error("entry must not contain control characters");
  }
  if (/  /.test(line)) {
    throw new Error("entry must not contain double spaces");
  }
  return line;
}

function main(): void {
  const line = entryLine();
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", line, "utf8");
  console.log(`wrote ${line.length} characters to /output/entry.txt`);
}

main();
