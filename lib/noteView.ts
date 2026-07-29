export type NoteView = 'answer' | 'translation' | 'question' | 'questionTranslation';
export type NoteInput = 'pointer' | 'touch';

const NEXT_TOUCH_VIEW: Record<NoteView, NoteView> = {
  answer: 'translation',
  translation: 'question',
  question: 'questionTranslation',
  questionTranslation: 'answer',
};

export function getNextNoteView(currentView: NoteView, input: NoteInput): NoteView {
  if (input === 'touch') {
    return NEXT_TOUCH_VIEW[currentView];
  }

  return currentView === 'question' || currentView === 'questionTranslation'
    ? 'answer'
    : 'question';
}
