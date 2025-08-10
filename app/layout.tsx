import type { Metadata } from "next";
import "./../styles/globals.css";

export const metadata: Metadata = {
  title: "AI Construction Estimator",
  description: "Estimate costs and timelines for common residential projects."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="mx-auto max-w-5xl p-6">{children}</main>
      </body>
    </html>
  );
}