import { Sidebar } from "@/_components/common/Sidebar/Sidebar"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-1 w-full overflow-hidden">
            <Sidebar role="admin" />
            <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-10 overflow-y-auto">
                {children}
            </div>
        </div>
    )
}
