import { readFile } from 'node:fs/promises';

const dataUrl = new URL('../lib/data.ts', import.meta.url);
const source = await readFile(dataUrl, 'utf8');
const noteLines = source.split(/\r?\n/).filter((line) => /^\s+\{ t:/.test(line));

const bannedIdentifiers = [
  'EUH',
  'Eikei University',
  '叡啓大学',
  'かのん',
  'なおや',
  'はるにん',
  'ずっちゃん',
  'もっちりん',
  'きょうちゃん',
  'あかね',
  'まゆ',
  'さおり',
  'Grace',
  'Kyanut',
  'Chihiromi',
  'Kawahara',
  'えがさん',
];

const datePatterns = [
  /\d{1,2}月\d{1,2}日/u,
  /\d{4}[-/]\d{1,2}[-/]\d{1,2}/u,
  /\b(?:birthday|date of birth)\b/iu,
  /(?:誕生日|生年月日)/u,
];

const errors = [];

for (const identifier of bannedIdentifiers) {
  if (source.includes(identifier)) {
    errors.push(`識別につながる語が残っています: ${identifier}`);
  }
}

for (const pattern of datePatterns) {
  if (pattern.test(source)) {
    errors.push(`特定日付につながる表現が残っています: ${pattern}`);
  }
}

for (const [index, line] of noteLines.entries()) {
  for (const field of ['t:', 'c:', 'tr:', 'q:', 'qt:']) {
    if (!line.includes(field)) {
      errors.push(`付箋 ${index + 1} に ${field.slice(0, -1)} がありません`);
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Content validation passed: ${noteLines.length} anonymized notes.`);
}
