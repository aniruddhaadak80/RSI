import Link from "next/link";
import { notFound } from "next/navigation";
import { docs, getDoc, getPrevNext } from "../../../lib/docs";

export function generateStaticParams() {
  return docs.map(function (item) {
    return { slug: item.slug };
  });
}

export default function DocSlugPage({ params }: { params: { slug: string } }) {
  const doc = getDoc(params.slug);
  if (doc === undefined) {
    notFound();
  }

  const nav = getPrevNext(params.slug);

  return (
    <article className="doc-article">
      <span className="eyebrow">{doc.group}</span>
      <h1>{doc.title}</h1>
      <p className="doc-summary">{doc.summary}</p>
      <div className="meta-row">
        <span className="meta-chip">{doc.readingTime}</span>
        <span className="meta-chip">{doc.difficulty}</span>
        <span className="meta-chip">Updated {doc.updated}</span>
      </div>

      {doc.sections.map(function (section) {
        return (
          <div key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map(function (para, index) {
              return <p key={String(index)}>{para}</p>;
            })}
          </div>
        );
      })}

      {doc.tables.map(function (table) {
        return (
          <div key={table.title}>
            <h2>{table.title}</h2>
            <div className="table-wrap">
              <table className="doc-table">
                <thead>
                  <tr>
                    {table.headers.map(function (head) {
                      return <th key={head}>{head}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map(function (row, rowIndex) {
                    return (
                      <tr key={String(rowIndex)}>
                        {row.map(function (cell, cellIndex) {
                          return <td key={String(cellIndex)}>{cell}</td>;
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      {doc.codeSamples.map(function (sample) {
        return (
          <div key={sample.title}>
            <h2>{sample.title}</h2>
            <div className="code-block">
              <div className="code-head">{sample.language}</div>
              <pre className="code-body">{sample.code}</pre>
            </div>
          </div>
        );
      })}

      {doc.links.length > 0 ? (
        <div>
          <h2>Continue reading</h2>
          <div className="inline-links">
            {doc.links.map(function (link) {
              return (
                <Link className="inline-link" key={link.target} href={link.target}>
                  <div className="inline-link-label">{link.label}</div>
                  <div className="inline-link-target">{link.target}</div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="pager">
        <div>
          {nav.prev === undefined ? null : (
            <Link className="pager-card" href={"/docs/".concat(nav.prev.slug)}>
              <div className="pager-kicker">Previous</div>
              <div className="pager-title">{nav.prev.title}</div>
            </Link>
          )}
        </div>
        <div>
          {nav.next === undefined ? null : (
            <Link className="pager-card" href={"/docs/".concat(nav.next.slug)}>
              <div className="pager-kicker">Next</div>
              <div className="pager-title">{nav.next.title}</div>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
