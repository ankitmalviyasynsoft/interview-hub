"use client"

import Link from "next/link"
import { Globe, Github, Twitter, Linkedin } from "lucide-react"

export function Footer() {
    return (
        <footer className="w-full border-t bg-card py-12">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    <div className="md:col-span-1 space-y-4">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary">
                            <span>InterviewHub</span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Your one-stop platform for interview preparation. Practice with real-world questions from top companies.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                            <Github className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                            <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="hover:text-primary cursor-pointer transition-colors text-zinc-600">Questions</li>
                            <li className="hover:text-primary cursor-pointer transition-colors text-zinc-600">Companies</li>
                            <li className="hover:text-primary cursor-pointer transition-colors text-zinc-600">Categories</li>
                            <li className="hover:text-primary cursor-pointer transition-colors text-zinc-600">Blogs</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="hover:text-primary cursor-pointer transition-colors text-zinc-600">About Us</li>
                            <li className="hover:text-primary cursor-pointer transition-colors text-zinc-600">Contact</li>
                            <li className="hover:text-primary cursor-pointer transition-colors text-zinc-600">Privacy Policy</li>
                            <li className="hover:text-primary cursor-pointer transition-colors text-zinc-600">Terms of Service</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Newsletter</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                            Subscribe to stay updated with latest questions and tips.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="bg-background border rounded-md px-3 py-1.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                            <button className="bg-primary text-primary-foreground text-sm font-medium px-4 py-1.5 rounded-md hover:opacity-90 transition-opacity">
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} InterviewHub. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Globe className="h-3 w-3" />
                        <span>English (US)</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
