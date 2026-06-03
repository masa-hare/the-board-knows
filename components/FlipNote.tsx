'use client';

import { useState, useRef, useEffect } from 'react';

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
  const noteRef = useRef<HTMLSpanElement>(null);
  const autoResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // hopした瞬間（animationiteration）に自動で問いを表示
  useEffect(() => {
    const el = noteRef.current;
    if (!el) return;

    function onIteration(e: AnimationEvent) {
      if (e.animationName !== 'note-hop') return;

      // すでに問い表示中なら何もしない
      setIsQuestion(prev => {
        if (prev) return prev;

        window.dispatchEvent(new CustomEvent('note-questioned'));

        // 4秒後にフェードして元に戻す
        if (autoResetRef.current) clearTimeout(autoResetRef.current);
        autoResetRef.current = setTimeout(() => {
          setFading(true);
          setTimeout(() => {
            setIsQuestion(false);
            setFading(false);
          }, 130);
        }, 4000);

        return true;
      });
    }

    el.addEventListener('animationiteration', onIteration);
    return () => {
      el.removeEventListener('animationiteration', onIteration);
      if (autoResetRef.current) clearTimeout(autoResetRef.current);
    };
  }, []);

  // 手動クリック：問いのトグル
  function handleClick() {
    if (fading) return;
    if (autoResetRef.current) clearTimeout(autoResetRef.current);

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
      ref={noteRef}
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
