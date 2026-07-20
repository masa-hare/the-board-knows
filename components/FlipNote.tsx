'use client';

import { useState, type CSSProperties } from 'react';

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
  const [isQuestion, setIsQuestion] = useState(false);
  const [fading, setFading] = useState(false);
  const currentText = isQuestion ? question : original;

  function handleClick() {
    if (fading) return;
    setFading(true);
    setTimeout(() => {
      const next = !isQuestion;
      setIsQuestion(next);
      setFading(false);
      if (next) {
        window.dispatchEvent(new CustomEvent('note-questioned', { detail: noteId }));
      }
    }, 130);
  }

  return (
    <button
      type="button"
      className={`note ${colorClass} ${rotClass} note-interactive${isQuestion ? ' note-is-question' : ''}${fading ? ' note-fading' : ''}`}
      onClick={handleClick}
      aria-pressed={isQuestion}
      aria-describedby={describedBy}
      style={style}
    >
      <span className="note-main">
        {currentText}
      </span>
      {isQuestion
        ? <span className="note-qtrans"><span className="sr-only">翻訳: </span>{questionTranslation}</span>
        : <span className="note-trans"><span className="sr-only">翻訳: </span>{translation}</span>
      }
    </button>
  );
}
