import Link from "next/link";
import FlowDiagram from "../components/FlowDiagram";
import MetricRow from "../components/MetricRow";
import { docs } from "../lib/docs";

export default function HomePage() {
  const start = docs.find(function (item) {
    return item.slug === "start";
  });
  const loop = docs.find(function (item) {
    return item.slug === "loop";
  });
  const papers = docs.find(function (item) {
    return item.slug === "research-papers";
  });

  return (
    <div>
      <section className="hero">
        <span className="eyebrow">Grounded recursion with gates and memory</span>
        <h1>Recursive self improvement that stays calm, testable, and human led</h1>
        <p>
          This atlas turns a fast moving field into a steady reading path. It maps anchor papers, reviews public code with a strict spam filter, and pairs the story with a runnable loop. Each cycle tries one small change, tests it in full, and keeps only what proves value.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-dark" href="/docs/start">Begin with simple words</Link>
          <Link className="btn btn-light" href="/docs/build">Run the loop locally</Link>
          <Link className="btn btn-light" href="/docs/research-papers">Browse the research map</Link>
        </div>
        <MetricRow />
      </section>

      <div className="grid-two">
        <div className="card card-soft-emerald">
          <h3>{start === undefined ? "Simple start" : start.title}</h3>
          <p>{start === undefined ? "Plain words first." : start.summary}</p>
          <div className="meta-row">
            <span className="meta-chip">Short sentences</span>
            <span className="meta-chip">Plain pictures</span>
            <span className="meta-chip">No prior math needed</span>
          </div>
          <div className="hero-actions">
            <Link className="btn btn-light" href="/docs/start">Open the gentle intro</Link>
          </div>
        </div>
        <div className="card card-soft-teal">
          <h3>{loop === undefined ? "Core loop" : loop.title}</h3>
          <p>{loop === undefined ? "Task to kept win." : loop.summary}</p>
          <div className="meta-row">
            <span className="meta-chip">Six roles</span>
            <span className="meta-chip">One verdict</span>
            <span className="meta-chip">Separate judge</span>
          </div>
          <div className="hero-actions">
            <Link className="btn btn-light" href="/docs/loop">Study the cycle</Link>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 18 }}>
        <h3>The loop in six steady beats</h3>
        <p>Read from top to bottom as one breath. Each beat has one owner and one output. The gate between try and keep is the heart of the design.</p>
        <FlowDiagram />
      </div>

      <div className="grid-two">
        <div className="card card-soft-amber">
          <h3>{papers === undefined ? "Research" : papers.title}</h3>
          <p>{papers === undefined ? "Papers in order." : papers.summary}</p>
          <div className="hero-actions">
            <Link className="btn btn-light" href="/docs/research-papers">Open the map</Link>
          </div>
        </div>
        <div className="card card-soft-cyan">
          <h3>Verified code, not keyword noise</h3>
          <p>Public repos are sorted into trusted references, useful studies, and spam patterns with clear signals for each verdict.</p>
          <div className="hero-actions">
            <Link className="btn btn-light" href="/docs/code-review">Open code review</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
