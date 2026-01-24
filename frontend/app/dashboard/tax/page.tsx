"use client";

import { motion } from "framer-motion";
import {
    Sparkles,
    Send,
    AlertTriangle,
    BookOpen,
    PieChart,
    ArrowUpRight,
    ShieldAlert
} from "lucide-react";
import { useEffect, useState } from "react";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function TaxPage() {
    const [advice, setAdvice] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8000/api/tax/advice?tax_type=genel")
            .then(res => res.json())
            .then(data => {
                setAdvice(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Fetch error:", err);
                setLoading(false);
            });
    }, []);

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-10"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-white">Vergi Zekası & Mevzuat</h1>
                    <p className="text-zinc-500 text-sm mt-1">OVEYS AI tarafından otonom olarak hazırlanan vergi raporları.</p>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* OVEYS AI Advisor Box */}
                <motion.div variants={item} className="lg:col-span-2 space-y-8">
                    <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-900/10 to-transparent p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Sparkles className="h-20 w-20 text-purple-400" />
                        </div>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-12 w-12 rounded-xl bg-purple-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                                <Sparkles className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Günün Tavsiyesi</h3>
                                <p className="text-xs text-purple-400 font-bold uppercase tracking-widest">AI Mevzuat Analizi</p>
                            </div>
                        </div>

                        {loading ? (
                            <div className="space-y-4">
                                <div className="h-4 w-3/4 bg-white/5 animate-pulse rounded"></div>
                                <div className="h-4 w-full bg-white/5 animate-pulse rounded"></div>
                                <div className="h-4 w-1/2 bg-white/5 animate-pulse rounded"></div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <p className="text-zinc-300 leading-relaxed text-lg font-light">
                                    "{advice?.advice || "Mevzuat taranıyor..."}"
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                                        Source: VUK Mükerrer 227
                                    </div>
                                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                                        Updated: Today
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Interactive Q&A Simulation */}
                    <div className="rounded-3xl border border-white/5 bg-zinc-900/20 p-8">
                        <h3 className="text-lg font-bold text-white mb-6">Mevzuat'a Sorun</h3>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Örn: 'Binek araç gider kısıtlaması nedir?'"
                                className="w-full rounded-2xl bg-black border border-white/5 py-4 pl-6 pr-14 text-sm text-zinc-300 focus:outline-none focus:border-purple-500 transition-all shadow-inner"
                            />
                            <button className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl bg-purple-600 flex items-center justify-center text-white hover:bg-purple-500 transition-colors">
                                <Send className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-2">
                            <SuggestedQuery label="KDV İndirimi" />
                            <SuggestedQuery label="Ba/Bs Mutabakatı" />
                            <SuggestedQuery label="Damga Vergisi" />
                        </div>
                    </div>
                </motion.div>

                {/* Tax Score & Alerts */}
                <motion.div variants={item} className="space-y-8">
                    <div className="rounded-3xl border border-white/5 bg-zinc-900/40 p-8 text-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent"></div>
                        <h4 className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">Uyum Puanı</h4>
                        <div className="relative inline-block">
                            <svg className="h-32 w-32 -rotate-90">
                                <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-zinc-800" />
                                <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="377" strokeDashoffset="37" className="text-purple-500" strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-3xl font-black text-white">90</span>
                            </div>
                        </div>
                        <p className="mt-6 text-sm text-zinc-400 font-light">Mükemmel seviyede mevzuat uyumu.</p>
                    </div>

                    <div className="rounded-3xl border border-rose-500/20 bg-rose-500/5 p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <ShieldAlert className="h-5 w-5 text-rose-500" />
                            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Kritik Riskler</h4>
                        </div>
                        <div className="space-y-4">
                            <RiskItem label="Gider Bildirimi" desc="3 fatura henüz onaylanmadı." />
                            <RiskItem label="KDV Beyanı" desc="Son 2 gün kaldı." />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Detailed Tax Breakdown Tables (Footer) */}
            <motion.div variants={item} className="grid md:grid-cols-2 gap-8">
                <div className="rounded-3xl border border-white/5 bg-zinc-900/10 p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <PieChart className="h-5 w-5 text-blue-400" />
                        <h4 className="text-white font-bold">Vergi Dağılımı</h4>
                    </div>
                    <ul className="space-y-4">
                        <TaxRow label="KDV (%20)" value="₺12,500.00" color="bg-blue-500" />
                        <TaxRow label="Muhtasar" value="₺4,200.00" color="bg-purple-500" />
                        <TaxRow label="Damga Vergisi" value="₺345.50" color="bg-pink-500" />
                    </ul>
                </div>
                <div className="rounded-3xl border border-white/5 bg-zinc-900/10 p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <BookOpen className="h-5 w-5 text-amber-400" />
                        <h4 className="text-white font-bold">Resmi Gazete Akışı</h4>
                    </div>
                    <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-start gap-4">
                            <ArrowUpRight className="h-4 w-4 text-emerald-500 mt-1 shrink-0" />
                            <p className="text-xs text-zinc-400 leading-relaxed">Yeni KDV tebliği yürürlüğe girdi. Hizmet bedellerinde %20 uygulaması netleşti.</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function SuggestedQuery({ label }: { label: string }) {
    return (
        <button className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
            {label}
        </button>
    );
}

function RiskItem({ label, desc }: any) {
    return (
        <div className="space-y-1">
            <p className="text-xs font-bold text-white">{label}</p>
            <p className="text-[10px] text-zinc-500">{desc}</p>
        </div>
    );
}

function TaxRow({ label, value, color }: any) {
    return (
        <li className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className={`h-2 w-2 rounded-full ${color}`}></div>
                <span className="text-sm text-zinc-500">{label}</span>
            </div>
            <span className="text-sm font-bold text-zinc-200">{value}</span>
        </li>
    );
}
