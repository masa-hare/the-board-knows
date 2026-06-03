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
    // 各付箋にインデックスを渡してstagger計算
    el.querySelectorAll('.note').forEach((note, i) => {
      (note as HTMLElement).style.setProperty('--note-i', String(i));
    });
  }, [active]);

  return (
    <div ref={ref} className={`wb-anim${active ? ' wb-anim--on' : ''}`}>
      {children}
    </div>
  );
}
