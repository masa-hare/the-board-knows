import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'the board knows',
  description: '毎週ひとつの問いと、ホワイトボードに集まった匿名の声を記録するアーカイブ。',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body style={{ fontFamily: 'var(--font-en), sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
