"use client"

import "./globals.css";
import NavigationDots from "./components/navigationDots/navigationDots";
import { useState } from "react";
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }) {
  const [activeDot, setActiveDot] = useState("none")

  return (
    <html lang="pt-br" className={inter.className}>
      <body className="main">
        <main className="main-container">
          {children}
        </main>
        <NavigationDots activeDot={activeDot}/>
      </body>
    </html>
  );
}
