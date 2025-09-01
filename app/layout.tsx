import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter} from "next/font/google";
import "./globals.css";
import {Theme} from "@radix-ui/themes";
import Navbar from "@/app/Navbar";
import {ReactNode} from "react";

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Issue Tacker",
  description: "An issue tracker is a centralized system for logging, managing, and tracking issues, bugs, and tasks throughout their lifecycle. It provides a single source of truth for teams to collaborate, prioritize work, and monitor progress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.variable}>
      <Theme accentColor="violet" appearance="light">
          <Navbar />
          <main className='p-5'>{children}</main>
      </Theme>


      </body>
    </html>
  );
}
