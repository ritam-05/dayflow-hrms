import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dayflow | Human Resource Management",
  description: "Every workday, perfectly aligned. A premium HRMS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // We force dark mode by default for that premium SaaS feel
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-foreground min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}