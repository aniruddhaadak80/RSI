"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { docGroups, docs, searchDocs } from "../lib/docs";

export default function Sidebar() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  const results = useMemo(function () {
    return searchDocs(query);
  }, [query]);

  return (
    <aside className="sidebar" aria-label="Docs navigation">
      <div className="sidebar-head">
        <div className="sidebar-title">Atlas Contents</div>
        <input
          className="search-input"
          value={query}
          onChange={function (event) {
            setQuery(event.target.value);
          }}
          placeholder="Filter pages by title"
          aria-label="Filter docs pages"
        />
      </div>
      <div className="sidebar-groups">
        {docGroups.map(function (group) {
          const pages = results.filter(function (item) {
            return item.group === group;
          });
          if (pages.length === 0) {
            return null;
          }
          return (
            <div key={group}>
              <div className="sidebar-group-label">{group}</div>
              {pages.map(function (page) {
                const href = "/docs/".concat(page.slug);
                const active = pathname === href;
                return (
                  <Link
                    key={page.slug}
                    href={href}
                    className={active ? "sidebar-link sidebar-link-active" : "sidebar-link"}
                  >
                    <div className="sidebar-link-title">{page.title}</div>
                    <div className="sidebar-link-summary">{page.readingTime} · {page.difficulty}</div>
                  </Link>
                );
              })}
            </div>
          );
        })}
        <div className="sidebar-group-label">Index</div>
        <Link href="/docs" className={pathname === "/docs" ? "sidebar-link sidebar-link-active" : "sidebar-link"}>
          <div className="sidebar-link-title">All pages in order</div>
          <div className="sidebar-link-summary">A calm index with summaries</div>
        </Link>
        <Link href="/" className={pathname === "/" ? "sidebar-link sidebar-link-active" : "sidebar-link"}>
          <div className="sidebar-link-title">Atlas home</div>
          <div className="sidebar-link-summary">Hero plus previews</div>
        </Link>
        <div className="sidebar-group-label">Project</div>
        <a
          className="sidebar-link sidebar-gh"
          href="https://github.com/aniruddhaadak80/RSI"
          target="_blank"
          rel="noreferrer"
        >
          <div className="sidebar-link-title">GitHub repo</div>
          <div className="sidebar-link-summary">Source, engine, and docs in one place</div>
        </a>
        <a
          className="sidebar-link"
          href="https://aniruddhaadak-rsi.vercel.app/docs"
          target="_blank"
          rel="noreferrer"
        >
          <div className="sidebar-link-title">Live deployment</div>
          <div className="sidebar-link-summary">Production docs on Vercel</div>
        </a>
        <div style={{ height: 12 }} />
      </div>
    </aside>
  );
}
