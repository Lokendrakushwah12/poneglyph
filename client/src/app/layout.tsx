import { ThemeProvider } from "@/components/layouts/theme-provider";
import QueryProvider from "@/providers/query-provider";
import "@/styles/globals.css";
import { type Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Poneglyph",
  description:
    "Poneglyph is a web scraping and analytics platform specifically designed for Amazon India products.",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Lokendra Kushwah" />
      </Head>
      <body
        suppressHydrationWarning
        className={`min-h-screen bg-background font-sans antialiased ${playfair.variable} ${inter.className}`}
      >
        <QueryProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
