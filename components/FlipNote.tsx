'use client';

import { useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import { getNextNoteView, type NoteView } from '../lib/noteView';

interface FlipNoteProps {
  noteId: string;
  original: string;
  translation: string;
  question: string;
  questionTranslation: string;
  colorClass: string;
  rotClass: string;
  describedBy?: string;
  style?: CSSProperties;
}

export default function FlipNote({
  noteId,
  original,
  translation,
  question,
  questionTranslation,
  colorClass,
  rotClass,
  describedBy,
  style,
}: FlipNoteProps) {
  const [view, setView] = useState<NoteView>('answer');
  const viewRef = useRef<NoteView>('answer');
  const lastPointerType = useRef('');
  const isQuestion = view === 'question' || view === 'questionTranslation';
  const isTranslation = view === 'translation' || view === 'questionTranslation';
  const currentText = {
    answer: original,
    translation,
    question,
    questionTranslation,
  }[view];
  const modeLabel = {
    answer: '',
    translation: '英訳',
    question: '問い',
    questionTranslation: '問いの英訳',
  }[view];

  function handlePointerDown(event: PointerEvent<HTMLButtonElement>) {
    lastPointerType.current = event.pointerType;
  }

  function handlePointerCancel() {
    lastPointerType.current = '';
  }

  function handleClick() {
    const isTouchInput = lastPointerType.current === 'touch' || lastPointerType.current === 'pen';
    lastPointerType.current = '';

    const nextView = getNextNoteView(
      viewRef.current,
      isTouchInput ? 'touch' : 'pointer',
    );

    viewRef.current = nextView;
    setView(nextView);
    if (nextView === 'question') {
      window.dispatchEvent(new CustomEvent('note-questioned', { detail: noteId }));
    }
  }

  return (
    <button
      type="button"
      className={`note ${colorClass} ${rotClass} note-interactive${isQuestion ? ' note-is-question' : ''}${isTranslation ? ' note-is-translation' : ''}`}
      data-note-view={view}
      onPointerDown={handlePointerDown}
      onPointerCancel={handlePointerCancel}
      onClick={handleClick}
      aria-pressed={isQuestion}
      aria-describedby={describedBy}
      style={style}
    >
      <span className="note-main">
        {currentText}
      </span>
      {view === 'answer' ? (
        <span className="note-trans"><span className="sr-only">翻訳: </span>{translation}</span>
      ) : null}
      {modeLabel ? <span className="note-mode" aria-hidden="true">{modeLabel}</span> : null}
    </button>
  );
}
