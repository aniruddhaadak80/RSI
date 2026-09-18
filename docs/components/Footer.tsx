import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <h4>RSI Atlas</h4>
          <p>
            A grounded guide to loops that improve themselves. Small steps, full tests, separate judges, kept memory, and human control form the steady rhythm of the whole project.
          </p>
          <p style={{ marginTop: 12 }}>
            <a href="https://github.com/aniruddhaadak80/RSI" target="_blank" rel="noreferrer" style={{ color: "#f8fafc" }}>
              GitHub repo
            </a>
            <span style={{ margin: "0 8px" }} aria-hidden="true">·</span>
            <a href="https://aniruddhaadak-rsi.vercel.app" target="_blank" rel="noreferrer" style={{ color: "#f8fafc" }}>
              Live deployment
            </a>
          </p>
        </div>
        <div>
          <h4>Reading order</h4>
          <p>
            <Link href="/docs/start" style={{ color: "#cbd5e1" }}>Start</Link>
            <span style={{ margin: "0 8px" }} aria-hidden="true">·</span>
            <Link href="/docs/loop" style={{ color: "#cbd5e1" }}>Loop</Link>
            <span style={{ margin: "0 8px" }} aria-hidden="true">·</span>
            <Link href="/docs/research-papers" style={{ color: "#cbd5e1" }}>Research</Link>
          </p>
          <p>
            <Link href="/docs/code-review" style={{ color: "#cbd5e1" }}>Repos</Link>
            <span style={{ margin: "0 8px" }} aria-hidden="true">·</span>
            <Link href="/docs/safety" style={{ color: "#cbd5e1" }}>Safety</Link>
            <span style={{ margin: "0 8px" }} aria-hidden="true">·</span>
            <Link href="/docs/build" style={{ color: "#cbd5e1" }}>Build</Link>
          </p>
        </div>
        <div>
          <h4>Build rule</h4>
          <p>One task enters. One change is tried. One verdict is recorded. Only gated wins move the mainline forward.</p>
        </div>
      </div>
    </footer>
  );
}
