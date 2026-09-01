"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "./Mode"

const navItems = 
[
  {
    linkName: "Home",
    linkHref: "/"
  }
  ,
  {
    linkName: "Search",
    linkHref: "/search"
  }
  ,
  {
    linkName: "Categories",
    linkHref: "/categories"
  }
 ]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[oklch(0.82_0.16_82)]  shadow-[0_10px_30px_rgba(0,0,0,0.28)] backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl flex-col gap-3 px-4 h-[70px] sm:h-[80px] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="inline-flex items-center transition-transform duration-200 hover:scale-[1.02]">
            <div className="relative h-20 w-20 sm:h-24 sm:w-24">
              <Image src="/log2.png" alt="Logo" fill className="object-contain" />
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:hidden">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 border-[oklch(0.82_0.16_82)]/70 bg-background/80 text-foreground shadow-[0_0_0_1px_rgba(255,210,82,0.25)] transition-all duration-200 hover:scale-105 hover:bg-accent/80 dark:bg-background/70"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <Menu className="h-4 w-4" />
            </Button>
            <ModeToggle />
          </div>
        </div>

        <ul className="hidden items-center justify-center gap-6 text-sm font-medium text-gray-700 dark:text-white/80 sm:flex lg:gap-8 lg:text-base">
          {navItems.map((item , index) => (
            <li key={index} className="transition-all duration-200 hover:-translate-y-0.5 hover:text-black dark:hover:text-white">
              <Link href={item.linkHref} className="relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-[oklch(0.82_0.16_82)] after:transition-all after:duration-200 hover:after:w-full">
                {item.linkName}
              </Link>
            </li>
          ))}
        </ul>

        {isMenuOpen && (
          <ul className="flex animate-[fadeIn_0.2s_ease-out] flex-col gap-2 rounded-xl border border-[oklch(0.82_0.16_82)]/60 bg-card/95 p-3 text-sm font-medium text-foreground shadow-[0_12px_24px_rgba(0,0,0,0.25)] sm:hidden">
            {navItems.map((item , index) => (
              <li
                key={index}
                className="rounded-md px-2 py-2 transition-all duration-200 hover:bg-accent hover:text-foreground"
              >
                <Link href={item.linkHref} onClick={() => setIsMenuOpen(false)}>
                  {item.linkName}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="hidden sm:flex sm:items-center sm:justify-end">
          <ModeToggle />
        </div>
      </nav>
    </header>
  )
}