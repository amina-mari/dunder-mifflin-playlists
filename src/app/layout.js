"use client"

import "./globals.css";
import NavigationDots from "./components/navigationDots/navigationDots";
import { useEffect, useState } from "react";
import { Inter } from 'next/font/google';
import { usePathname } from "next/navigation";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }) {
  const [activeDot, setActiveDot] = useState("none")
  const path = usePathname();

  useEffect(() => {
    if(path === "/login") {
      setActiveDot("login")
    } 
    else if (path === "/songs") {
      setActiveDot("songs")
    } else {
      setActiveDot("none")
    }
  }, [path])

  return (
    <html lang="pt-br" className={inter.className}>
      <body className="main">
        <div className="main-container">
          {children}
        </div>
        <NavigationDots activeDot={activeDot}/>
      </body>
    </html>
  );
}
