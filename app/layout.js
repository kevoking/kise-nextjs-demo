import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata = {
  title: "Kise Next.js Firebase Demo",
  description: "Next.js App Router with Firebase auth and protected dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
