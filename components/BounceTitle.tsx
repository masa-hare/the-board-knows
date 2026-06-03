'use client';

export default function BounceTitle() {
  const line1 = 'the board';
  const line2 = 'knows';

  function renderChars(str: string) {
    return str.split('').map((ch, i) => (
      <span key={i} className="bounce-char">
        {ch === ' ' ? ' ' : ch}
      </span>
    ));
  }

  return (
    <h1 className="hero-title" style={{ fontFamily: 'var(--font-en)' }}>
      <span className="bounce-line">{renderChars(line1)}</span>
      <br />
      <span className="bounce-line">{renderChars(line2)}</span>
    </h1>
  );
}
