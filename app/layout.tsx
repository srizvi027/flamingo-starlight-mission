import type { Metadata, Viewport } from "next";
import { Fraunces, Figtree } from "next/font/google";
import "./globals.css";
const display = Fraunces({ subsets: ["latin"], variable: "--font-display" });
const body = Figtree({ subsets: ["latin"], variable: "--font-body" });
const title = "Nico Gives Back | Turning Plumbing Into Something Bigger";
const description = "Support Nico as he uses his plumbing work to raise funds for Starlight Children's Foundation and help bring happiness to seriously ill children and their families.";
export const metadata: Metadata = {
  title, description,
  icons: { icon: "/logo.png" },
  openGraph: { title, description, type: "website", locale: "en_AU", images: ["/logo.png"] },
  twitter: { card: "summary_large_image", title, description, images: ["/logo.png"] },
};
export const viewport: Viewport = { themeColor: "#3A1167" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en-AU"><body className={`${display.variable} ${body.variable} font-sans antialiased`}>{children}</body></html>);
}
