import { ThemeProvider } from "./../components/theme-provider"
import type { Metadata } from "next";
import { ModeToggle } from "./../components/mode-toggle";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./providers";
import { Header } from "./header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Codemate",
  description: "Pair Programming application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <Provider>
          <Header/>
          {children}
        </Provider>
      </body>
    </html>
  );
}
