import Link from "next/link";

export default function Header() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="brand-mark" aria-hidden="true">RS</div>
        <div className="brand-text">
          <span className="brand-title">RSI Atlas</span>
          <span className="brand-sub">Recursive self improvement, mapped and runnable</span>
        </div>
        <nav className="topbar-links" aria-label="Top navigation">
          <Link className="pill-link" href="/docs/start">Start simple</Link>
          <Link className="pill-link" href="/docs/loop">Core loop</Link>
          <Link className="pill-link" href="/docs/research-papers">Research</Link>
          <Link className="pill-link pill-link-strong" href="/docs/build">Build and run</Link>
        </nav>
      </div>
    </header>
  );
}
