'use client';

import { useRef, useEffect, useState, type ReactNode } from 'react';

export default function WrittenBoard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    const el = ref.current;
    if (!el) return;

    // 入場stagger用インデックスをセット
    const notes = el.querySelectorAll('.note');
    notes.forEach((note, i) => {
      (note as HTMLElement).style.setProperty('--note-i', String(i));
    });

    // 入場アニメが終わったあと、各付箋にバラバラのホップ遅延をセットして生き生きさせる
    const maxEntrance = 2600 + notes.length * 70 + 600; // ms
    const timer = setTimeout(() => {
      notes.forEach((note) => {
        const delay = (Math.random() * 9).toFixed(2);
        (note as HTMLElement).style.setProperty('--hop-delay', `${delay}s`);
        note.classList.add('note-alive');
      });
    }, maxEntrance);

    return () => clearTimeout(timer);
  }, [active]);

  return (
    <div ref={ref} className={`wb-anim${active ? ' wb-anim--on' : ''}`}>
      {children}
    </div>
  );
}
