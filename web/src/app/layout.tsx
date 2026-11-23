import type { Metadata } from "next";
import { SITE } from "@/data/site";
import "./globals.css";

const TITLE = "rd0 — review debt, to zero";
const DESCRIPTION =
  "Three small, free checks for pull requests from coding agents: Jinx (duplicates), Trellis (repo rules) and Fence (out-of-scope changes). CPU only, no LLM, no API key.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["coding agents", "code review", "review debt", "pull requests", "GitHub Action"],
  openGraph: { title: TITLE, description: DESCRIPTION, url: SITE, siteName: "rd0", type: "website" },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // The inline script sets class="dark" before paint, so <html> differs from
  // the server markup on that one attribute by design.
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- App Router root layout */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
