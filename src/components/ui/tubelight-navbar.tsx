import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export function NavBar({ items, className, activeTab: externalActiveTab, onTabChange }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(externalActiveTab || items[0].name)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (externalActiveTab) {
      setActiveTab(externalActiveTab)
    }
  }, [externalActiveTab])

  const handleClick = (item: NavItem, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setActiveTab(item.name)
    if (onTabChange) {
      onTabChange(item.name)
    }
    
    // Scroll to section
    if (item.url.startsWith('#')) {
      const element = document.querySelector(item.url)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      window.location.href = item.url
    }
  }

  return (
    <div
      className={cn(
        "relative z-[60]",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 bg-card/95 border border-border backdrop-blur-lg py-0.5 px-0.5 rounded-full shadow-md dark:bg-background/5 dark:shadow-lg">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={(e) => handleClick(item, e)}
              className={cn(
                "relative cursor-pointer text-xs font-semibold px-3 py-1.5 rounded-full transition-colors",
                "text-muted-foreground hover:text-primary hover:bg-accent",
                isActive && "bg-primary/10 text-primary dark:bg-muted dark:text-primary",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={16} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-t-full">
                    <div className="absolute w-8 h-4 bg-primary/20 rounded-full blur-md -top-1.5 -left-1.5" />
                    <div className="absolute w-6 h-4 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-3 h-3 bg-primary/20 rounded-full blur-sm top-0 left-1.5" />
                  </div>
                </motion.div>
              )}
            </a>
          )
        })}
      </div>
    </div>
  )
}

