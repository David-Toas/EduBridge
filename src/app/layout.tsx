import type { Metadata } from "next";
import "./globals.css";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";

export const metadata: Metadata = {
  title: "EduBridge",
  description:
    "EduBridge offers high-quality courses and resources to help learners enhance their skills and knowledge across various subjects.",
  icons: {
    icon: "/logo.ico",
    apple: "/logo.png",
    shortcut: "/logo.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body className="bg-[#111827]">
        {children}
        <PWAInstallPrompt />
      </body>
    </html>
  );
}
