import type { Metadata } from 'next';
import { Klee_One, DM_Sans } from 'next/font/google';
import './globals.css';

const kleeOne = Klee_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-jp',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-en',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'the board knows',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${kleeOne.variable} ${dmSans.variable}`}>
      <body style={{ fontFamily: 'var(--font-en), sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
