import { ThemeToggle } from "@/_components/ui/ThemeToggle";
import { Header } from "@/_components/common/Header/Header";
import { Footer } from "@/_components/common/Footer/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow flex flex-col">
                {children}
            </main>
            <Footer />
        </div>
    )
}
