import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { getNextNoteView, type NoteView } from '../lib/noteView.ts';

test('touch input cycles through translation and question views without an empty state', () => {
  const views: NoteView[] = ['answer'];

  for (let index = 0; index < 4; index += 1) {
    views.push(getNextNoteView(views.at(-1)!, 'touch'));
  }

  assert.deepEqual(views, [
    'answer',
    'translation',
    'question',
    'questionTranslation',
    'answer',
  ]);
});

test('pointer input toggles directly between answer and question', () => {
  assert.equal(getNextNoteView('answer', 'pointer'), 'question');
  assert.equal(getNextNoteView('question', 'pointer'), 'answer');
  assert.equal(getNextNoteView('translation', 'pointer'), 'question');
  assert.equal(getNextNoteView('questionTranslation', 'pointer'), 'answer');
});

test('question state never disables the entrance animation that keeps notes visible', async () => {
  const css = await readFile(new URL('../app/globals.css', import.meta.url), 'utf8');
  const questionRule = css.match(/\.note-is-question\s*\{([^}]*)\}/u);

  assert.equal(questionRule, null, 'Do not add a .note-is-question rule that overrides note animation');
  assert.doesNotMatch(css, /\.note-main\s*\{[^}]*transition:\s*opacity/su);
});

test('pointer hover exposes the question translation', async () => {
  const [css, component] = await Promise.all([
    readFile(new URL('../app/globals.css', import.meta.url), 'utf8'),
    readFile(new URL('../components/FlipNote.tsx', import.meta.url), 'utf8'),
  ]);

  assert.match(component, /view === 'question'[\s\S]*note-qtrans/u);
  assert.match(css, /\[data-note-view='question'\]:hover \.note-qtrans\s*\{[^}]*opacity:\s*0\.9/su);
});
