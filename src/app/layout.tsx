import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google"; // Keep fonts as they are good
import "./globals.css";
import { NotificationToast } from "@/components/NotificationToast";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Valor Deportivo | IA + Matemáticas",
  description: "Bot deportivo con inteligencia artificial y estrategia matemática.",
  icons: {
    icon: '/icon.svg',
  },
};

import Navbar from "@/components/Navbar";

// ... existing imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased font-sans bg-slate-950 text-white">
        <NotificationToast />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
