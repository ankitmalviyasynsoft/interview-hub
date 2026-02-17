'use client'

import Link from 'next/link'
import paths from '@/navigate/paths'
import { Button } from '@/_components/ui/button'
import { ThemeToggle } from '@/_components/ui/ThemeToggle'
import { LogIn, UserPlus, Sparkles, LayoutDashboard, Menu, X, Home, Map, ArrowRight } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/_components/ui/sheet'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'
import { UserNav } from './UserNav'
import { useReduxSelector } from '@/hooks/redux.hook'
import { selectIsAuthenticated } from '@/redux/slices/authSlice'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const isAuthenticated = useReduxSelector(selectIsAuthenticated)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Home', href: paths.home(), icon: Home },
    { label: 'Site Map', href: paths.siteMap(), icon: Map },
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  ]

  return (
    <header className={cn('sticky top-0 z-50 w-full transition-all duration-300', scrolled ? 'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-orange-500/10 shadow-sm py-2' : 'bg-transparent py-4')}>
      <div className="container flex h-16 items-center justify-between mx-auto px-4 md:px-8">
        {/* Logo Section */}
        <div className="flex items-center gap-8">
          <Link href={paths.home()} className="flex items-center gap-3 group px-2 py-1 rounded-2xl hover:bg-orange-500/5 transition-all">
            <div className="bg-primary text-primary-foreground p-2 rounded-xl shadow-xl shadow-orange-500/30 group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
              <Sparkles className="h-5 w-5 fill-current animate-pulse" />
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="font-black text-2xl tracking-tighter bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent uppercase">Interview</span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/80 pl-1">Academy</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href}>
                <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest hover:text-primary hover:bg-orange-500/5 rounded-xl gap-2">
                  {link.label === 'Dashboard' && <link.icon className="h-3.5 w-3.5" />}
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 border-l border-border/40 pl-3 sm:pl-6">
            {isAuthenticated ? (
              <UserNav />
            ) : (
              <>
                <Link href={paths.signIn()}>
                  <Button variant="ghost" className="hidden sm:flex h-11 px-6 text-xs font-black uppercase tracking-widest gap-2 hover:bg-orange-500/5 hover:text-primary transition-all rounded-xl">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
                <Link href={paths.signUp()}>
                  <Button className="h-11 px-6 text-xs font-black uppercase tracking-widest gap-2 shadow-xl shadow-orange-500/30 rounded-xl hover:-translate-y-0.5 active:scale-95 transition-all">
                    <UserPlus className="h-4 w-4" />
                    <span className="hidden sm:inline">Join For Free</span>
                    <span className="sm:hidden">Join</span>
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile Menu Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden rounded-xl h-11 w-11 hover:bg-orange-500/5">
                  <Menu className="h-6 w-6 text-foreground" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background border-none rounded-l-[2rem] p-0">
                <SheetHeader className="p-8 pb-4 text-left border-b border-border/40">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary text-primary-foreground p-2 rounded-xl shadow-lg shadow-orange-500/30">
                      <Sparkles className="h-5 w-5 fill-current" />
                    </div>
                    <SheetTitle className="text-2xl font-black uppercase tracking-tighter">Menu</SheetTitle>
                  </div>
                </SheetHeader>
                <div className="p-8 space-y-8">
                  <nav className="space-y-4">
                    {navLinks.map((link) => (
                      <SheetClose asChild key={link.label}>
                        <Link href={link.href} className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 hover:bg-orange-500/5 transition-all group">
                          <div className="flex items-center gap-4">
                            <div className="p-2.5 rounded-xl bg-background border border-border group-hover:border-primary/50 transition-colors">
                              <link.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                            </div>
                            <span className="font-black uppercase tracking-widest text-sm">{link.label}</span>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>

                  <div className="pt-8 border-t border-border/40 space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-orange-500/5">
                      <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Appearance</span>
                      <ThemeToggle />
                    </div>
                    {isAuthenticated ? (
                      <div className="flex justify-center w-full">
                        <UserNav />
                      </div>
                    ) : (
                      <SheetClose asChild>
                        <Link href={paths.signIn()}>
                          <Button variant="outline" className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-xs gap-3 border-2">
                            <LogIn className="h-5 w-5 text-primary" />
                            Sign In Account
                          </Button>
                        </Link>
                      </SheetClose>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
