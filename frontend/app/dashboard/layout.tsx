import Link from "next/link";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen w-full bg-black text-white">
            {/* Sidebar */}
            <aside className="w-64 border-r border-zinc-800 bg-zinc-950 p-6 hidden md:block">
                <div className="mb-8 flex items-center gap-2 px-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500"></div>
                    <span className="text-xl font-bold tracking-tight">E-VİZÖR</span>
                </div>

                <nav className="space-y-2">
                    <NavItem href="/dashboard" icon="📊" label="Genel Bakış" active />
                    <NavItem href="/dashboard/documents" icon="📄" label="Evraklar" />
                    <NavItem href="/dashboard/tax" icon="💰" label="Vergiler" />
                    <NavItem href="/dashboard/settings" icon="⚙️" label="Ayarlar" />
                </nav>

                <div className="mt-auto absolute bottom-6 w-52">
                    <div className="rounded-xl bg-gradient-to-br from-purple-900/50 to-zinc-900 border border-purple-500/20 p-4">
                        <p className="text-xs text-purple-200 mb-2">Pro Plan</p>
                        <p className="text-xs text-zinc-400">Tüm özellikler aktif.</p>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-black">
                <header className="flex h-16 items-center justify-between border-b border-zinc-800 px-6 backdrop-blur">
                    <h2 className="font-semibold text-zinc-200">Dashboard</h2>
                    <div className="h-8 w-8 rounded-full bg-zinc-800 border border-zinc-700"></div>
                </header>
                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}

function NavItem({ href, icon, label, active = false }: { href: string; icon: string; label: string; active?: boolean }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${active
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`}
        >
            <span>{icon}</span>
            {label}
        </Link>
    );
}
