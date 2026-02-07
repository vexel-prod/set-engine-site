
import React from "react";
import Providers from "../components/Providers";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommandPalette from "../components/CommandPalette";
import LayoutShell from "../components/LayoutShell";
import "./globals.css";

// Making children optional to fix TS errors in some environments when passing components
export default function RootLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <Providers>
      <LayoutShell>
        <Header />
        <main className="container relative z-10 mx-auto flex-grow px-4 py-12">
          {children}
        </main>
        <Footer />
        <CommandPalette />
      </LayoutShell>
    </Providers>
  );
}
