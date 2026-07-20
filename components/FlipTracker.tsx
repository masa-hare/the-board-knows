'use client';

import { useEffect, useRef, useState } from 'react';

const MESSAGES: Record<number, string> = {
  1:  'はじめての問い 🌱',
  5:  '5つめ！考えてる？',
  10: '10問！深まってきた',
  20: '20問！全部見る気だ',
};

export default function FlipTracker({ totalNotes }: { totalNotes: number }) {
  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);
  const openedNoteIds = useRef(new Set<string>());
  const messageTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function handler(event: Event) {
      const noteId = (event as CustomEvent<string>).detail;
      if (!noteId || openedNoteIds.current.has(noteId)) return;

      openedNoteIds.current.add(noteId);
      setCount((c) => {
        const next = c + 1;
        const nextMessage = next === totalNotes ? '全部開いた！！ 🎉' : MESSAGES[next];

        if (nextMessage) {
          setMsg(nextMessage);
          setVisible(true);
          if (messageTimer.current) clearTimeout(messageTimer.current);
          messageTimer.current = setTimeout(() => setVisible(false), 2800);
        }
        return next;
      });
    }

    window.addEventListener('note-questioned', handler);
    return () => {
      window.removeEventListener('note-questioned', handler);
      if (messageTimer.current) clearTimeout(messageTimer.current);
    };
  }, [totalNotes]);

  if (count === 0) return null;

  return (
    <div className="flip-tracker" aria-live="polite">
      <span className="flip-tracker-count">{count}/{totalNotes}</span>
      <span className="flip-tracker-label" style={{ fontFamily: 'var(--font-jp)' }}>問を開いた</span>
      {visible && (
        <span className="flip-tracker-msg" style={{ fontFamily: 'var(--font-jp)' }}>
          {msg}
        </span>
      )}
    </div>
  );
}
