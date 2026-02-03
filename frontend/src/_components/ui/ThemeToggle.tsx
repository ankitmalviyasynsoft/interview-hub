"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
    const { setTheme, theme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
        console.log("ThemeToggle mounted, current theme:", theme)
    }, [theme])

    const toggleTheme = (newTheme: string) => {
        console.log("Setting theme to:", newTheme)
        setTheme(newTheme)
    }

    if (!mounted) {
        return (
            <div className="flex items-center gap-1 p-1 border border-border rounded-full bg-secondary/50 w-fit">
                <div className="p-2 rounded-full text-muted-foreground"><Sun className="h-4 w-4" /></div>
                <div className="p-2 rounded-full text-muted-foreground"><Moon className="h-4 w-4" /></div>
                <div className="p-2 rounded-full text-muted-foreground"><Monitor className="h-4 w-4" /></div>
            </div>
        )
    }

    return (
        <div className="flex items-center gap-1 p-1 border border-border rounded-full bg-secondary/50 w-fit">
            <button
                onClick={() => toggleTheme("light")}
                className={`p-2 rounded-full transition-all duration-200 ${theme === 'light' ? 'bg-background text-foreground shadow-sm ring-1 ring-border' : 'text-muted-foreground hover:text-foreground'}`}
                aria-label="Light Mode"
            >
                <Sun className="h-4 w-4" />
            </button>
            <button
                onClick={() => toggleTheme("dark")}
                className={`p-2 rounded-full transition-all duration-200 ${theme === 'dark' ? 'bg-background text-foreground shadow-sm ring-1 ring-border' : 'text-muted-foreground hover:text-foreground'}`}
                aria-label="Dark Mode"
            >
                <Moon className="h-4 w-4" />
            </button>
            <button
                onClick={() => toggleTheme("system")}
                className={`p-2 rounded-full transition-all duration-200 ${theme === 'system' ? 'bg-background text-foreground shadow-sm ring-1 ring-border' : 'text-muted-foreground hover:text-foreground'}`}
                aria-label="System Mode"
            >
                <Monitor className="h-4 w-4" />
            </button>
        </div>
    )
}
