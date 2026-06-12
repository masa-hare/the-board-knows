import { W1, W2, W3, W4, type Note } from '@/lib/data';
import FlipNote from './FlipNote';
import BounceTitle from './BounceTitle';
import WrittenBoard from './WrittenBoard';
import FlipTracker from './FlipTracker';

const ROTS = ['rot-a','rot-b','rot-c','rot-d','rot-e','rot-f','rot-g','rot-h','rot-i','rot-j'];

function Notes({ notes }: { notes: Note[] }) {
  return (
    <div className="notes-scatter">
      {notes.map((n, i) => (
        <FlipNote
          key={i}
          original={n.t}
          translation={n.tr}
          question={n.q}
          colorClass={n.c}
          rotClass={ROTS[i % ROTS.length]}
        />
      ))}
    </div>
  );
}

const CONTACT_URL =
  'https://forms.office.com/Pages/ResponsePage.aspx?id=vZCqJ23idkalH3Ijfa846GQ1pPuciSNIp8bmvoYP9x9UM0dKOExSTVdHMDlNQlRZQTFIMEFQQVFSQS4u';

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

      <main id="boards">

        {/* Week 4 */}
        <WrittenBoard>
          <div className="week-section">
            <div className="week-head">
              <div className="week-meta">
                <span className="week-num" style={{ fontFamily: 'var(--font-en)' }}>Week 4</span>
                <h2 className="week-q-jp" style={{ fontFamily: 'var(--font-jp)' }}>最近、気がついてしまったことは？</h2>
              </div>
              <div className="week-q-en" style={{ fontFamily: 'var(--font-en)' }}>What's a moment recently where you just had to pause & take notice of something?</div>
              <div className="week-bar" style={{ background: 'var(--gn)' }} />
            </div>
            <div className="wb-outer">
              <div className="whiteboard">
                <div className="board-q" style={{ fontFamily: 'var(--font-jp)' }}>最近、気がついてしまったことは？</div>
                <div className="board-q-en" style={{ fontFamily: 'var(--font-en)' }}>What's a moment recently where you just had to pause & take notice of something?</div>
                <Notes notes={W4} />
              </div>
            </div>
          </div>
        </WrittenBoard>

        {/* Week 3 */}
        <WrittenBoard>
          <div className="week-section">
            <div className="week-head">
              <div className="week-meta">
                <span className="week-num" style={{ fontFamily: 'var(--font-en)' }}>Week 3</span>
                <h2 className="week-q-jp" style={{ fontFamily: 'var(--font-jp)' }}>人を好きになる瞬間は？</h2>
              </div>
              <div className="week-q-en" style={{ fontFamily: 'var(--font-en)' }}>When do you fall in love with someone?</div>
              <div className="week-bar" style={{ background: 'var(--pk)' }} />
            </div>
            <div className="wb-outer">
              <div className="whiteboard">
                <div className="board-q" style={{ fontFamily: 'var(--font-jp)' }}>人を好きになる瞬間は？</div>
                <div className="board-q-en" style={{ fontFamily: 'var(--font-en)' }}>When do you fall in love with someone?</div>
                <Notes notes={W3} />
              </div>
            </div>
          </div>
        </WrittenBoard>

        {/* Week 2 */}
        <WrittenBoard>
          <div className="week-section">
            <div className="week-head">
              <div className="week-meta">
                <span className="week-num" style={{ fontFamily: 'var(--font-en)' }}>Week 2</span>
                <h2 className="week-q-jp" style={{ fontFamily: 'var(--font-jp)' }}>嘘って悪いこと？なぜ？</h2>
              </div>
              <div className="week-q-en" style={{ fontFamily: 'var(--font-en)' }}>Is lying a bad thing? Why?</div>
              <div className="week-bar" style={{ background: 'var(--y)' }} />
            </div>
            <div className="wb-outer">
              <div className="whiteboard">
                <div className="board-q" style={{ fontFamily: 'var(--font-jp)' }}>嘘って悪いこと？なぜ？</div>
                <div className="board-q-en" style={{ fontFamily: 'var(--font-en)' }}>Is lying a bad thing? Why?</div>
                <div className="spectrum">
                  <span className="s-yes" style={{ fontFamily: 'var(--font-en)' }}>YES</span>
                  <div className="s-bar">
                    <div className="s-tick" style={{ left: '25%' }} />
                    <div className="s-tick" style={{ left: '50%' }} />
                    <div className="s-tick" style={{ left: '75%' }} />
                  </div>
                  <span className="s-no" style={{ fontFamily: 'var(--font-en)' }}>NO</span>
                </div>
                <Notes notes={W2} />
              </div>
            </div>
          </div>
        </WrittenBoard>

        {/* Week 1 */}
        <WrittenBoard>
          <div className="week-section">
            <div className="week-head">
              <div className="week-meta">
                <span className="week-num" style={{ fontFamily: 'var(--font-en)' }}>Week 1</span>
                <h2 className="week-q-jp" style={{ fontFamily: 'var(--font-jp)' }}>何故、人は人を評価する？</h2>
              </div>
              <div className="week-q-en" style={{ fontFamily: 'var(--font-en)' }}>Why do people judge others?</div>
              <div className="week-bar" style={{ background: 'var(--bl)' }} />
            </div>
            <div className="wb-outer">
              <div className="whiteboard">
                <div className="board-q" style={{ fontFamily: 'var(--font-jp)' }}>何故、人は人を評価する？</div>
                <div className="board-q-en" style={{ fontFamily: 'var(--font-en)' }}>Why do people judge others?</div>
                <Notes notes={W1} />
              </div>
            </div>
          </div>
        </WrittenBoard>

      </main>

      {/* Terms */}
      <div className="terms-section">
        <div className="terms-title" style={{ fontFamily: 'var(--font-en)' }}>利用規約 / Terms</div>
        <div className="terms-grid">
          <div className="terms-block">
            <h3>掲載について</h3>
            <p style={{ fontFamily: 'var(--font-jp)' }}>ボードに貼られた付箋の内容は、運営者の判断により編集・省略した上で掲載しています。個人名・特定の日付など個人を識別できる情報は原則掲載しません。</p>
          </div>
          <div className="terms-block">
            <h3>プライバシー</h3>
            <p style={{ fontFamily: 'var(--font-jp)' }}>本サイトは大学名・所属・個人情報を一切掲載しません。アクセスログ・Cookieなどの情報収集は行いません。</p>
          </div>
          <div className="terms-block">
            <h3>アクセス制限</h3>
            <p style={{ fontFamily: 'var(--font-jp)' }}>本サイトのURLおよび合言葉をSNSや公開の場所に投稿することは禁止します。</p>
          </div>
          <div className="terms-block">
            <h3>免責事項</h3>
            <p style={{ fontFamily: 'var(--font-jp)' }}>掲載内容は参加者個人の意見・感覚であり、運営者の見解を代表するものではありません。不適切と判断される内容は予告なく削除することがあります。</p>
          </div>
        </div>
      </div>

      <footer>
        <div className="footer-left" style={{ fontFamily: 'var(--font-jp)' }}>
          運営：でっかいおまんじゅう &nbsp;·&nbsp;
          <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer">
            お問い合わせ / Contact
          </a>
        </div>
        <div className="footer-team" style={{ fontFamily: 'var(--font-jp)' }}>でっかいおまんじゅう</div>
      </footer>

      <FlipTracker />
    </>
  );
}
