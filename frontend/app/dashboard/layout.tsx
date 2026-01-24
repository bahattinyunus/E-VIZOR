"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    BarChart3,
    Files,
    Receipt,
    Settings,
    LogOut,
    Search,
    Bell,
    User,
    Zap,
    LayoutDashboard,
    ShieldCheck
} from "lucide-react";
import { CommandTerminal } from "./command-terminal";
import { useState } from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="flex h-screen w-full bg-[#050505] text-zinc-200 selection:bg-purple-500/30">
            {/* Sidebar */}
            <aside className="w-72 border-r border-white/5 bg-black p-6 flex flex-col hidden md:flex">
                <div className="mb-10 flex items-center gap-3 px-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 font-bold text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                        E
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-white">VİZÖR</span>
                </div>

                <div className="flex-1 space-y-1">
                    <p className="px-3 mb-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">ANA MENÜ</p>
                    <NavItem
                        href="/dashboard"
                        icon={<LayoutDashboard className="h-4 w-4" />}
                        label="Genel Bakış"
                        active={pathname === "/dashboard"}
                    />
                    <NavItem
                        href="/dashboard/documents"
                        icon={<Files className="h-4 w-4" />}
                        label="Evraklar"
                        active={pathname === "/dashboard/documents"}
                    />
                    <NavItem
                        href="/dashboard/tax"
                        icon={<Receipt className="h-4 w-4" />}
                        label="Vergiler"
                        active={pathname === "/dashboard/tax"}
                    />
                    <NavItem
                        href="/dashboard/analytics"
                        icon={<BarChart3 className="h-4 w-4" />}
                        label="Analizler"
                        active={pathname === "/dashboard/analytics"}
                    />
                    <NavItem
                        href="/dashboard/audit"
                        icon={<ShieldCheck className="h-4 w-4" />}
                        label="Denetim İzi"
                        active={pathname === "/dashboard/audit"}
                    />
                </div>

                <div className="space-y-1 mt-auto">
                    <NavItem
                        href="/dashboard/settings"
                        icon={<Settings className="h-4 w-4" />}
                        label="Ayarlar"
                        active={pathname === "/dashboard/settings"}
                    />
                    <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-zinc-500 transition-all hover:bg-red-500/10 hover:text-red-400">
                        <LogOut className="h-4 w-4" />
                        Oturumu Kapat
                    </button>

                    <div className="mt-8 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-white/5 p-5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-110 transition-transform">
                            <Zap className="h-10 w-10 text-purple-500" />
                        </div>
                        <p className="text-xs font-bold text-purple-400 mb-1">PRO PLAN</p>
                        <p className="text-[11px] text-zinc-500 leading-relaxed">Yapay zeka otonomisi tam kapasite çalışıyor.</p>
                        <div className="mt-3 h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full w-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-[#050505]">
                <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-white/5 bg-[#050505]/80 px-8 backdrop-blur-xl">
                    <div className="relative w-96 max-w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500">
                            <Search className="h-4 w-4" />
                        </div>
                        <input
                            type="text"
                            placeholder="Evrak, mükellef veya işlem ara... (Ctrl + K)"
                            className="w-full rounded-xl bg-white/5 border border-white/5 py-2.5 pl-10 pr-4 text-sm font-light text-zinc-300 focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative text-zinc-400 hover:text-white transition-colors">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-purple-500 border border-[#050505]"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-6 border-l border-white/5">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-white">Bahattin Y.</p>
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">MALİ MÜŞAVİR</p>
                            </div>
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400">
                                <User className="h-5 w-5" />
                            </div>
                        </div>
                    </div>
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
            <CommandTerminal />
        </div>
    );
}

function NavItem({ href, icon, label, active = false }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-300 ${active
                ? "bg-gradient-to-r from-purple-500/10 to-transparent text-white border-l-2 border-purple-500"
                : "text-zinc-500 hover:bg-white/5 hover:text-white"
                }`}
        >
            <span className={active ? "text-purple-400" : ""}>{icon}</span>
            {label}
        </Link>
    );
}
