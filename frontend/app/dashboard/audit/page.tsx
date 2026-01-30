"use client";

import { motion } from "framer-motion";
import {
    ShieldCheck,
    Hash,
    Clock,
    Search,
    ArrowRight,
    Database,
    Link as LinkIcon,
    RefreshCcw,
    Zap
} from "lucide-react";
import { useEffect, useState } from "react";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.05 }
    }
};

const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1 }
};

export default function AuditExplorer() {
    const [blocks, setBlocks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate block data
        const mockBlocks = Array.from({ length: 10 }).map((_, i) => ({
            height: 42910231 - i,
            hash: "0x" + Math.random().toString(16).slice(2, 64),
            timestamp: new Date(Date.now() - i * 3600000).toLocaleString(),
            transactions: Math.floor(Math.random() * 20) + 1,
            validator: "OVEYS-NODE-01"
        }));
        setTimeout(() => {
            setBlocks(mockBlocks);
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white">Private Net Audit Explorer</h1>
                    <p className="text-zinc-500 text-sm mt-1">E-VİZÖR mühürleme işlemlerinin gerçek zamanlı blokzincir kaydı.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black text-green-400 animate-pulse">
                        <Zap className="h-3 w-3" /> LIVE NETWORK
                    </div>
                    <button className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-zinc-400 hover:text-white transition-all">
                        <RefreshCcw className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Network Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AuditStatCard title="Total Blocks" value="42,910,231" icon={<Database className="h-4 w-4" />} />
                <AuditStatCard title="Avg Seal Time" value="1.2s" icon={<Clock className="h-4 w-4" />} />
                <AuditStatCard title="Audit Verified" value="100%" icon={<ShieldCheck className="h-4 w-4" />} />
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-600" />
                <input
                    type="text"
                    placeholder="Blok Height veya Hash ile ara..."
                    className="w-full rounded-2xl bg-zinc-900/40 border border-white/5 py-5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all font-mono"
                />
            </div>

            {/* Self-Healing Log (Phase 10) */}
            <motion.div variants={item} className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6">
                    <ShieldCheck className="h-10 w-10 text-emerald-500/20" />
                </div>
                <h3 className="text-xl font-bold text-emerald-400 mb-6 flex items-center gap-2">
                    <Zap className="h-5 w-5" /> Autonomous Healing Log
                </h3>
                <div className="space-y-4">
                    <HealingItem
                        title="KDV Tutarı Düzeltildi"
                        desc="Fatura_003.pdf üzerinde %22 sapma tespit edildi. Mevzuata uygun olarak '%20' oranına otonom revize edildi."
                        time="10 Dakika Önce"
                    />
                    <HealingItem
                        title="Mükellef Verisi Onarıldı"
                        desc="OCR katmanındaki karakter bozulması (M1GR0S -> MIGROS) semantik motor tarafından giderildi."
                        time="42 Dakika Önce"
                    />
                </div>
            </motion.div>

            {/* Block List */}
            <div className="space-y-4">
                {loading ? (
                    <div className="py-20 text-center text-zinc-700 animate-pulse font-bold tracking-widest uppercase">
                        Sorgulanıyor...
                    </div>
                ) : blocks.map((block) => (
                    <motion.div
                        key={block.height}
                        variants={item}
                        className="group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/20 p-6 hover:border-purple-500/30 transition-all cursor-pointer"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                            <LinkIcon className="h-12 w-12 text-purple-500" />
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-center gap-6">
                                <div className="h-12 w-12 rounded-xl bg-white/5 flex flex-col items-center justify-center border border-white/5 text-purple-400">
                                    <Hash className="h-4 w-4 mb-0.5" />
                                    <span className="text-[8px] font-black uppercase">Block</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-mono font-bold text-white leading-none">#{block.height}</h3>
                                    <p className="text-[10px] text-zinc-600 font-mono mt-1 overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px] md:max-w-none">
                                        HASH: {block.hash}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                                <div className="text-left">
                                    <p className="text-[10px] font-black text-zinc-700 uppercase tracking-tighter">İşlem</p>
                                    <p className="text-sm font-bold text-zinc-300">{block.transactions} Evrak</p>
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-black text-zinc-700 uppercase tracking-tighter">Validator</p>
                                    <p className="text-sm font-bold text-zinc-300">{block.validator}</p>
                                </div>
                                <div className="text-left hidden md:block">
                                    <p className="text-[10px] font-black text-zinc-700 uppercase tracking-tighter">Zaman</p>
                                    <p className="text-sm font-bold text-zinc-500">{block.timestamp}</p>
                                </div>
                            </div>

                            <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-purple-500 transition-all text-zinc-600 hover:text-white">
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <button className="w-full py-4 rounded-2xl border border-white/5 border-dashed text-[10px] font-black text-zinc-600 hover:text-white transition-colors uppercase tracking-[0.3em]">
                Daha Fazla Blok Yükle
            </button>
        </motion.div>
    );
}

function HealingItem({ title, desc, time }: any) {
    return (
        <div className="flex items-start gap-4 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 hover:border-emerald-500/30 transition-all group">
            <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-emerald-100">{title}</h4>
                    <span className="text-[10px] font-black text-emerald-500/50 uppercase tracking-widest">{time}</span>
                </div>
                <p className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">{desc}</p>
            </div>
        </div>
    );
}

function AuditStatCard({ title, value, icon }: any) {
    return (
        <div className="p-6 rounded-2xl border border-white/5 bg-zinc-900/30">
            <div className="flex items-center gap-3 mb-3">
                <div className="text-purple-400 opacity-50">{icon}</div>
                <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{title}</h4>
            </div>
            <p className="text-2xl font-black text-white">{value}</p>
        </div>
    );
}
