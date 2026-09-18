import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://aniruddhaadak-rsi.vercel.app"),
  title: {
    default: "RSI Atlas Docs",
    template: "%s in RSI Atlas Docs"
  },
  description: "A calm and complete guide to recursive self improvement with papers, code review, safety, and runnable loops.",
  openGraph: {
    title: "RSI Atlas Docs",
    description: "Grounded recursive self improvement with gates, memory, papers, and runnable loops.",
    url: "https://aniruddhaadak-rsi.vercel.app",
    siteName: "RSI Atlas",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "RSI Atlas Docs",
    description: "Grounded recursive self improvement with gates, memory, papers, and runnable loops."
  },
  alternates: {
    canonical: "https://aniruddhaadak-rsi.vercel.app"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <Header />
          <div className="layout">
            <Sidebar />
            <main className="content">{children}</main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
