"use client"

import { useEffect, useState, useMemo } from "react"
import { cn } from "@/lib/utils"

export function TableOfContents({ content }: { content: string }) {
  // const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([])
  const headings = useMemo(() => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, "text/html")
    const elements = Array.from(doc.querySelectorAll("h2, h3"))

    return elements.map((el, index) => {
      const text = el.textContent || ""
      const id = text.toLowerCase().replace(/\s+/g, "-") + `-${index}`
      return {
        id,
        text,
        level: parseInt(el.tagName.replace("H", "")),
      }
    })
  }, [content])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0% 0% -80% 0%" }
    )

    const contentHeadings = document.querySelectorAll("article h2, article h3")
    contentHeadings.forEach((h) => observer.observe(h))

    return () => observer.disconnect()
  }, [content])

  if (headings.length === 0) return null

  return (
    <nav className="space-y-4">
      <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">On this page</h4>
      <ul className="space-y-2 border-l border-border/50">
        {headings.map((heading) => (
          <li key={heading.id} className="relative">
            <a 
              href={`#${heading.id}`}
              className={cn(
                "block text-sm transition-all pl-4 py-1",
                activeId === heading.id 
                  ? "text-primary font-medium border-l-2 border-primary -ml-[1px]" 
                  : "text-muted-foreground hover:text-foreground"
              )}
              style={{ paddingLeft: `${(heading.level - 1) * 1}rem` }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}