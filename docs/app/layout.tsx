import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "RSI Atlas Docs",
  description: "A calm and complete guide to recursive self improvement with papers, code review, safety, and runnable loops."
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
