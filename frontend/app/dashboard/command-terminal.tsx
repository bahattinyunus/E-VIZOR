"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Command,
    FileText,
    Settings,
    User,
    Zap,
    TrendingUp,
    Receipt,
    BrainCircuit,
    Wrench
} from "lucide-react";
import { useRouter } from "next/navigation";

export function CommandTerminal() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const router = useRouter();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
            if (e.key === "Escape") {
                setOpen(false);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const commands = [
        { id: "dashboard", label: "Dashboard'a Git", icon: <TrendingUp className="h-4 w-4" />, href: "/dashboard" },
        { id: "audit", label: "Denetim İzleyici (Audit Explorer)", icon: <Search className="h-4 w-4 text-purple-400" />, href: "/dashboard/audit" },
        { id: "documents", label: "Evrakları Görüntüle", icon: <FileText className="h-4 w-4" />, href: "/dashboard/documents" },
        { id: "tax", label: "Vergi Durumu", icon: <Receipt className="h-4 w-4" />, href: "/dashboard/tax" },
        { id: "intelligence", label: "Mevzuat Zekası", icon: <BrainCircuit className="h-4 w-4 text-emerald-400" />, href: "/dashboard/intelligence" },
        { id: "shield", label: "Executive AI Shield Durumu", icon: <Zap className="h-4 w-4 text-emerald-400 animate-pulse" />, href: "/dashboard" },
        { id: "corrections", label: "Otonom Düzeltme Kayıtları", icon: <Wrench className="h-4 w-4 text-amber-400" />, href: "/dashboard/audit" },
        { id: "scandoc", label: "Yeni Evrak Tara", icon: <Zap className="h-4 w-4 text-purple-400" />, href: "/dashboard/documents/new" },
        { id: "settings", label: "Ayarlar", icon: <Settings className="h-4 w-4" />, href: "/dashboard/settings" },
        { id: "profile", label: "Profilim", icon: <User className="h-4 w-4" />, href: "/dashboard/profile" },
    ];

    const filteredCommands = commands.filter(cmd =>
        cmd.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
                    />
                    <div className="fixed inset-0 z-[101] flex items-start justify-center pt-24 px-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl pointer-events-auto"
                        >
                            <div className="flex items-center border-b border-white/10 px-6 py-4">
                                <Search className="h-5 w-5 text-zinc-500 mr-3" />
                                <input
                                    autoFocus
                                    placeholder="İşlem arayın... (Sınırsız otonomi)"
                                    className="w-full bg-transparent text-lg text-white outline-none placeholder:text-zinc-600"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <div className="flex items-center gap-1.5 ml-4 px-2 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] font-black text-zinc-500">
                                    <Command className="h-3 w-3" /> K
                                </div>
                            </div>

                            <div className="p-2 max-h-[400px] overflow-y-auto">
                                {filteredCommands.length > 0 ? (
                                    filteredCommands.map((cmd) => (
                                        <button
                                            key={cmd.id}
                                            onClick={() => {
                                                router.push(cmd.href);
                                                setOpen(false);
                                            }}
                                            className="group flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-sm transition-all hover:bg-white/5"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 group-hover:bg-purple-500 group-hover:text-white transition-all">
                                                    {cmd.icon}
                                                </div>
                                                <span className="font-medium text-zinc-300 group-hover:text-white">{cmd.label}</span>
                                            </div>
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-500">
                                                    SEÇ <ArrowRightIcon className="h-3 w-3" />
                                                </div>
                                            </div>
                                        </button>
                                    ))
                                ) : (
                                    <div className="py-10 text-center text-zinc-500">Sonuç bulunamadı.</div>
                                )}
                            </div>

                            <div className="border-t border-white/5 bg-zinc-950/50 px-6 py-3 flex items-center justify-between text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                                <span>E-VİZÖR KOMUT TERMİNALİ</span>
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1"><kbd className="rounded bg-zinc-800 px-1.5 py-0.5 border border-white/5">↑↓</kbd> Gezin</span>
                                    <span className="flex items-center gap-1"><kbd className="rounded bg-zinc-800 px-1.5 py-0.5 border border-white/5">ENTER</kbd> Seç</span>
                                    <span className="flex items-center gap-1"><kbd className="rounded bg-zinc-800 px-1.5 py-0.5 border border-white/5">ESC</kbd> Kapat</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

function ArrowRightIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
    );
}
