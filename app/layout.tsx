import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-en',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'the board knows',
  description: '毎週ひとつの問いと、ホワイトボードに集まった匿名の声を記録するアーカイブ。',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={dmSans.variable}>
      <body style={{ fontFamily: 'var(--font-en), sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
