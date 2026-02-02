import { ThemeToggle } from "@/_components/ui/ThemeToggle";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen">
            {children}
            <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <ThemeToggle />
            </div>
        </div>
    )
}
