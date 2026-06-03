'use client';

import { useState } from 'react';

interface FlipNoteProps {
  original: string;
  translation: string;
  question: string;
  colorClass: string;
  rotClass: string;
}

export default function FlipNote({ original, translation, question, colorClass, rotClass }: FlipNoteProps) {
  const [isQuestion, setIsQuestion] = useState(false);
  const [fading, setFading] = useState(false);

  function handleClick() {
    if (fading) return;
    setFading(true);
    setTimeout(() => {
      const next = !isQuestion;
      setIsQuestion(next);
      setFading(false);
      if (next) window.dispatchEvent(new CustomEvent('note-questioned'));
    }, 130);
  }

  return (
    <span
      className={`note ${colorClass} ${rotClass} note-interactive${isQuestion ? ' note-is-question' : ''}${fading ? ' note-fading' : ''}`}
      onClick={handleClick}
    >
      <span className="note-main">
        {isQuestion ? question : original}
      </span>
      {!isQuestion && (
        <span className="note-trans">{translation}</span>
      )}
    </span>
  );
}
