import Link from "next/link";
import { docGroups, getDocsByGroup } from "../../lib/docs";

export default function DocsIndexPage() {
  return (
    <article className="doc-article">
      <span className="eyebrow">Docs index</span>
      <h1>All pages in calm reading order</h1>
      <p className="doc-summary">
        Move from Start through Core Loop, Evaluation, Research, Code Review, Safety, Build, and Roadmap. Each page keeps paragraphs short, tables clear, and code exact.
      </p>
      {docGroups.map(function (group) {
        const pages = getDocsByGroup(group);
        return (
          <div key={group}>
            <h2>{group}</h2>
            {pages.map(function (page) {
              return (
                <div key={page.slug} style={{ marginBottom: 14 }}>
                  <Link className="inline-link" href={"/docs/".concat(page.slug)}>
                    <div className="inline-link-label">{page.title}</div>
                    <div className="inline-link-target">{page.summary}</div>
                    <div className="meta-row">
                      <span className="meta-chip">{page.readingTime}</span>
                      <span className="meta-chip">{page.difficulty}</span>
                      <span className="meta-chip">Updated {page.updated}</span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        );
      })}
    </article>
  );
}
