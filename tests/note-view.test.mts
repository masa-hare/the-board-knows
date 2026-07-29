import assert from 'node:assert/strict';
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
