'use client';

import { useState, useEffect } from 'react';

const MESSAGES: Record<number, string> = {
  1:  'はじめての問い 🌱',
  5:  '5つめ！考えてる？',
  10: '10問！深まってきた',
  20: '20問！全部見る気だ',
  81: '全部開いた！！ 🎉',
};

export default function FlipTracker() {
  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handler() {
      setCount((c) => {
        const next = c + 1;
        if (MESSAGES[next]) {
          setMsg(MESSAGES[next]);
          setVisible(true);
          setTimeout(() => setVisible(false), 2800);
        }
        return next;
      });
    }
    window.addEventListener('note-questioned', handler);
    return () => window.removeEventListener('note-questioned', handler);
  }, []);

  if (count === 0) return null;

  return (
    <div className="flip-tracker" aria-live="polite">
      <span className="flip-tracker-count">{count}</span>
      <span className="flip-tracker-label" style={{ fontFamily: 'var(--font-jp)' }}>問開いた</span>
      {visible && (
        <span className="flip-tracker-msg" style={{ fontFamily: 'var(--font-jp)' }}>
          {msg}
        </span>
      )}
    </div>
  );
}
