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
import { VaultProvider, useVault } from "./context/vault-context";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <VaultProvider>
            <DashboardLayoutContent>{children}</DashboardLayoutContent>
        </VaultProvider>
    );
}

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { secureMode, toggleSecureMode, metrics } = useVault();

    return (
        <div className={`flex h-screen w-full bg-[#050505] text-zinc-200 selection:bg-purple-500/30 transition-all duration-700 ${secureMode ? "brightness-125 contrast-125 saturate-150" : ""}`}>
            {/* THE VAULT Visual Overlays */}
            {secureMode && (
                <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent bg-[length:100%_4px] animate-scanline"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>
                    <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[8px] font-black text-emerald-400 uppercase tracking-widest animate-pulse">
                        <ShieldCheck className="h-3 w-3" /> Vault Secure Channel Active
                    </div>
                </div>
            )}

            {/* Sidebar */}
            <div className={`flex w-72 flex-col border-r border-white/5 bg-[#080808]/80 backdrop-blur-xl transition-all duration-500 ${secureMode ? "border-emerald-500/20" : ""}`}>
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
                    {/* THE VAULT Toggle */}
                    <div className={`mt-4 p-4 rounded-xl bg-gradient-to-r from-zinc-900 to-black border transition-all duration-500 relative overflow-hidden ${secureMode ? "border-emerald-500/40" : "border-white/5"}`}>
                        <div className="flex items-center justify-between relative z-10 font-black">
                            <div className="flex items-center gap-2">
                                <div className={`h-2 w-2 rounded-full animate-pulse ${secureMode ? "bg-emerald-500 shadow-[0_0_10px_#10b981]" : "bg-zinc-700"}`}></div>
                                <span className={`text-[10px] uppercase tracking-widest ${secureMode ? "text-emerald-400" : "text-zinc-600"}`}>The Vault</span>
                            </div>
                            <div
                                onClick={toggleSecureMode}
                                className={`h-4 w-8 rounded-full p-0.5 cursor-pointer flex items-center transition-all ${secureMode ? "bg-emerald-500/20 justify-end" : "bg-zinc-800 justify-start"}`}
                            >
                                <div className={`h-3 w-3 rounded-full transition-all ${secureMode ? "bg-emerald-500 shadow-[0_0_8px_#10b981]" : "bg-zinc-600"}`}></div>
                            </div>
                        </div>
                    </div>

                    {/* System Metrics (Phase 8 Deep Tech) */}
                    <div className="mt-6 space-y-3 px-1">
                        <SidebarMetric label="CPU LOAD" value={`${metrics.cpu_usage}%`} progress={metrics.cpu_usage} color={secureMode ? "bg-emerald-500" : "bg-purple-500"} />
                        <SidebarMetric label="MEM SECURE" value={`${metrics.memory_usage}%`} progress={metrics.memory_usage} color={secureMode ? "bg-emerald-500" : "bg-blue-500"} />
                        <div className="flex justify-between items-center text-[7px] font-black text-zinc-700 uppercase tracking-widest mt-4">
                            <span>Node Status</span>
                            <span className={secureMode ? "text-emerald-500" : "text-purple-500"}>{metrics.blockchain_node_status}</span>
                        </div>
                    </div>
                </div>
            </div>

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
function SidebarMetric({ label, value, progress, color }: any) {
    return (
        <div className="space-y-1">
            <div className="flex justify-between text-[8px] font-black text-zinc-600 uppercase tracking-widest">
                <span>{label}</span>
                <span className="text-zinc-400">{value}</span>
            </div>
            <div className="h-0.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                <motion.div
                    animate={{ width: `${progress}%` }}
                    className={`h-full ${color} transition-all duration-1000`}
                />
            </div>
        </div>
    );
}

// Add CSS for scanline animation
if (typeof document !== "undefined") {
    const style = document.createElement("style");
    style.innerHTML = `
        @keyframes scanline {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
        }
        .animate-scanline {
            animation: scanline 4s linear infinite;
        }
    `;
    document.head.appendChild(style);
}
