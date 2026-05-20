import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import { Manrope } from "next/font/google";
// Import global CSS
import "./globals.css";

// Moved font loader to module scope
const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kise Next.js Firebase Demo",
  description: "Next.js App Router with Firebase auth and protected dashboard",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
