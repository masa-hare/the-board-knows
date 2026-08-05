import type { CSSProperties } from 'react';
import { W1, W2, W3, W4, W5, W6, W7, W8, W9, W10, W11, type Note } from '@/lib/data';
import BounceTitle from './BounceTitle';
import FlipNote from './FlipNote';
import FlipTracker from './FlipTracker';
import WrittenBoard from './WrittenBoard';

const ROTS = ['rot-a', 'rot-b', 'rot-c', 'rot-d', 'rot-e', 'rot-f', 'rot-g', 'rot-h', 'rot-i', 'rot-j'];
const SCATTER = ['ny', 'no', 'np', 'nb', 'ng'];

type Week = {
  number: number;
  questionJa: string;
  questionEn: string;
  notes: Note[];
  barColor: string;
  scatter?: boolean;
  spectrum?: boolean;
};

const WEEKS: Week[] = [
  {
    number: 11,
    questionJa: 'みんなに伝えたい、この大学の良いところ・改善してほしいところは？',
    questionEn: 'What good points and areas for improvement about this university do you want everyone to know?',
    notes: W11,
    barColor: 'var(--bl)',
  },
  {
    number: 10,
    questionJa: 'あなたの願いは？for 七夕',
    questionEn: 'What is your wish for Tanabata Festival?',
    notes: W10,
    barColor: 'var(--og)',
  },
  {
    number: 9,
    questionJa: '最近、周りの人の思いやりに触れた瞬間は？',
    questionEn: "What's a recent moment when you experienced the kindness of the people around you?",
    notes: W9,
    barColor: 'var(--gn)',
  },
  {
    number: 8,
    questionJa: 'なぜ、人は満たされないの？',
    questionEn: 'Why are people never satisfied?',
    notes: W8,
    barColor: 'var(--pk)',
  },
  {
    number: 7,
    questionJa: '夏クォーターで達成したい目標は？',
    questionEn: 'What goals do you want to achieve in the Summer Quarter?',
    notes: W7,
    barColor: 'var(--y)',
  },
  {
    number: 6,
    questionJa: '今の年になって気づいたお父さん/おじいちゃんのやさしさは？',
    questionEn: 'What are some acts of kindness from your father/grandfather that you only came to appreciate as you got older?',
    notes: W6,
    barColor: 'var(--bl)',
  },
  {
    number: 5,
    questionJa: '卒プロ・就活・人生についてアドバイス',
    questionEn: 'Any advice regarding Degree Project / Job Hunting / Life to your juniors?',
    notes: W5,
    barColor: 'var(--og)',
  },
  {
    number: 4,
    questionJa: '最近、気がついてしまったことは？',
    questionEn: "What's a moment recently where you just had to pause & take notice of something?",
    notes: W4,
    barColor: 'var(--gn)',
  },
  {
    number: 3,
    questionJa: '人を好きになる瞬間は？',
    questionEn: 'When do you fall in love with someone?',
    notes: W3,
    barColor: 'var(--pk)',
  },
  {
    number: 2,
    questionJa: '嘘って悪いこと？なぜ？',
    questionEn: 'Is lying a bad thing? Why?',
    notes: W2,
    barColor: 'var(--y)',
    scatter: true,
    spectrum: true,
  },
  {
    number: 1,
    questionJa: '何故、人は人を評価する？',
    questionEn: 'Why do people judge others?',
    notes: W1,
    barColor: 'var(--bl)',
    scatter: true,
  },
];

const TOTAL_NOTES = WEEKS.reduce((total, week) => total + week.notes.length, 0);

function scatterColor(colorClass: string, index: number): string {
  const color = SCATTER[(index * 2) % SCATTER.length];
  return colorClass.includes('en') ? `${color} en` : color;
}

function Notes({ notes, weekNumber, scatter = false }: { notes: Note[]; weekNumber: number; scatter?: boolean }) {
  return (
    <div className="notes-scatter">
      {notes.map((note, index) => (
        <FlipNote
          key={`${weekNumber}-${index}`}
          noteId={`week-${weekNumber}-note-${index}`}
          original={note.t}
          translation={note.tr}
          question={note.q}
          questionTranslation={note.qt}
          colorClass={scatter ? scatterColor(note.c, index) : note.c}
          rotClass={ROTS[index % ROTS.length]}
          describedBy={weekNumber === WEEKS[0].number && index === 0 ? 'note-help' : undefined}
          style={{ '--note-delay': `${Math.min(index, 24) * 18}ms` } as CSSProperties}
        />
      ))}
    </div>
  );
}

function Spectrum() {
  return (
    <div className="spectrum" aria-label="YESからNOまでの回答スペクトラム">
      <span className="s-yes" style={{ fontFamily: 'var(--font-en)' }}>YES</span>
      <div className="s-bar" aria-hidden="true">
        <div className="s-tick" style={{ left: '25%' }} />
        <div className="s-tick" style={{ left: '50%' }} />
        <div className="s-tick" style={{ left: '75%' }} />
      </div>
      <span className="s-no" style={{ fontFamily: 'var(--font-en)' }}>NO</span>
    </div>
  );
}

const CONTACT_URL =
  'https://forms.office.com/Pages/ResponsePage.aspx?id=vZCqJ23idkalH3Ijfa846GQ1pPuciSNIp8bmvoYP9x9UM0dKOExSTVdHMDlNQlRZQTFIMEFQQVFSQS4u';

const VERCEL_PRIVACY_URL = 'https://vercel.com/legal/privacy-notice';

export default function Site() {
  return (
    <>
      <section className="hero">
        <div className="hero-kicker" style={{ fontFamily: 'var(--font-jp)' }}>とある大学のホワイトボードより</div>
        <BounceTitle />
        <p className="hero-desc" style={{ fontFamily: 'var(--font-jp)' }}>毎週ひとつの問い。付箋で集まった声。</p>
        <a href="#boards" className="hero-btn" style={{ fontFamily: 'var(--font-en)' }}>
          ↓ see the boards
        </a>
        <div className="hero-stickies" aria-hidden="true">
          <div className="hero-sticky ny hero-sticky-wobbly" style={{ transform: 'rotate(-3deg)', fontFamily: 'var(--font-jp)' }}>Just feeling</div>
          <div className="hero-sticky np hero-sticky-wobbly" style={{ transform: 'rotate(2deg)', fontFamily: 'var(--font-jp)' }}>楽しいから</div>
          <div className="hero-sticky nb hero-sticky-wobbly" style={{ transform: 'rotate(-1.5deg)', fontFamily: 'var(--font-en)', fontSize: '11px' }}>To protect oneself</div>
          <div className="hero-sticky no hero-sticky-wobbly" style={{ transform: 'rotate(3deg)', fontFamily: 'var(--font-en)', fontSize: '11px' }}>White lie is OK</div>
        </div>
      </section>

      <header>
        <div className="logo" style={{ fontFamily: 'var(--font-en)' }}>the board knows</div>
        <div className="header-sub" style={{ fontFamily: 'var(--font-jp)' }}>とある大学のホワイトボードより</div>
      </header>

      <p id="note-help" className="sr-only">
        付箋ボタン。マウスではカーソルを合わせると英訳、クリックすると問いに切り替わります。タッチ操作では、タップするたびに英訳、問い、問いの英訳、回答の順に切り替わります。
      </p>

      <p className="note-help-visible" aria-hidden="true">
        <span className="note-help-desktop">カーソルで英訳・クリックで問い</span>
        <span className="note-help-touch">タップで 英訳 → 問い → 問いの英訳 → 回答</span>
      </p>

      <main id="boards">
        {WEEKS.map((week) => {
          const titleId = `week-${week.number}-title`;

          return (
            <WrittenBoard key={week.number}>
              <section className="week-section" aria-labelledby={titleId}>
                <div className="week-head">
                  <div className="week-meta">
                    <span className="week-num" style={{ fontFamily: 'var(--font-en)' }}>Week {week.number}</span>
                    <h2 id={titleId} className="week-q-jp" style={{ fontFamily: 'var(--font-jp)' }}>{week.questionJa}</h2>
                  </div>
                  <div className="week-q-en" lang="en" style={{ fontFamily: 'var(--font-en)' }}>{week.questionEn}</div>
                  <div className="week-bar" style={{ background: week.barColor }} aria-hidden="true" />
                </div>
                <div className="wb-outer">
                  <div className="whiteboard" role="group" aria-label={`Week ${week.number}: ${week.questionJa}`}>
                    <div className="board-q" style={{ fontFamily: 'var(--font-jp)' }}>{week.questionJa}</div>
                    <div className="board-q-en" lang="en" style={{ fontFamily: 'var(--font-en)' }}>{week.questionEn}</div>
                    {week.spectrum ? <Spectrum /> : null}
                    <Notes notes={week.notes} weekNumber={week.number} scatter={week.scatter} />
                  </div>
                </div>
              </section>
            </WrittenBoard>
          );
        })}
      </main>

      <section className="terms-section" aria-labelledby="terms-title">
        <h2 id="terms-title" className="terms-title" style={{ fontFamily: 'var(--font-en)' }}>利用規約 / Terms</h2>
        <div className="terms-grid">
          <div className="terms-block">
            <h3>掲載について <span className="terms-en-head">/ About Content</span></h3>
            <p style={{ fontFamily: 'var(--font-jp)' }}>付箋は、意味を損なわない範囲で編集・匿名化した上で掲載しています。個人名、所属、施設名、特定の日付など、個人や場所を識別できる情報は掲載しません。</p>
            <p className="terms-en" lang="en">Notes are edited and anonymized without changing their intent. Names, affiliations, facility names, specific dates, and other identifying details are not published.</p>
          </div>
          <div className="terms-block">
            <h3>プライバシー <span className="terms-en-head">/ Privacy</span></h3>
            <p style={{ fontFamily: 'var(--font-jp)' }}>本サイト独自のCookieやアクセス解析は使用しません。配信にはVercelを利用しており、通信に伴うIPアドレスなどの情報が同社の方針に基づき処理される場合があります。</p>
            <p className="terms-en" lang="en">This site does not use its own cookies or analytics. It is hosted on Vercel, which may process information such as IP addresses under its privacy policy.</p>
            <a className="privacy-link" href={VERCEL_PRIVACY_URL} target="_blank" rel="noopener noreferrer">
              Vercel Privacy Notice
            </a>
          </div>
          <div className="terms-block">
            <h3>URLの取り扱い <span className="terms-en-head">/ URL Sharing</span></h3>
            <p style={{ fontFamily: 'var(--font-jp)' }}>本サイトはURLを知っている方が閲覧できる公開ページです。付箋を書いた方への配慮として、URLのSNS投稿や不特定多数への拡散は控えてください。</p>
            <p className="terms-en" lang="en">Anyone with the URL can view this public page. Out of respect for contributors, please do not post the URL on social media or distribute it broadly.</p>
          </div>
          <div className="terms-block">
            <h3>免責事項 <span className="terms-en-head">/ Disclaimer</span></h3>
            <p style={{ fontFamily: 'var(--font-jp)' }}>掲載内容は参加者個人の意見・感覚であり、運営者の見解を代表するものではありません。不適切と判断される内容は予告なく削除することがあります。</p>
            <p className="terms-en" lang="en">All content reflects the personal opinions and feelings of individual participants and does not represent the views of the organizers. Content deemed inappropriate may be removed without prior notice.</p>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-left" style={{ fontFamily: 'var(--font-jp)' }}>
          運営：でっかいおまんじゅう &nbsp;·&nbsp;
          <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer">
            お問い合わせ / Contact
          </a>
        </div>
        <div className="footer-team" style={{ fontFamily: 'var(--font-jp)' }}>でっかいおまんじゅう</div>
      </footer>

      <FlipTracker totalNotes={TOTAL_NOTES} />
    </>
  );
}
