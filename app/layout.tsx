import type { Metadata } from "next";
import { Alexandria } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const parkinsans = localFont({
  src: './fonts/Parkinsans-VariableFont_wght.ttf',
  variable: '--font-parkinsans',
  display: 'swap',
  weight: '100 900'
});

const alexandria = Alexandria({
  subsets: ['latin'],
  variable: '--font-alexandria',
  weight: ['700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Geoff Vrijmoet | Web Developer",
  description: "Custom web solutions for businesses",
  icons: {
    icon: [
      { url: "/favicon.svg" }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${alexandria.variable} ${parkinsans.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
