"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    TrendingUp,
    Zap,
    Target,
    ArrowUpRight,
    ArrowDownRight,
    BrainCircuit,
    Bot,
    ChevronRight,
    Sparkles
} from "lucide-react";

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function AnalyticsPage() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPredictive = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/tax/predictive");
                const result = await res.json();
                setData(result);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchPredictive();
    }, []);

    if (loading) return <div className="flex h-96 items-center justify-center text-zinc-500 font-black animate-pulse uppercase tracking-widest">Analiz Motoru Isınıyor...</div>;

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-10 pb-20"
        >
            {/* Header */}
            <motion.div variants={item} className="flex items-end justify-between">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter">Prediktif <span className="text-emerald-500">Analizler</span></h1>
                    <p className="text-zinc-500 mt-2 font-medium">OVEYS-2.0 Motoru tarafından üretilen gelecek projeksiyonları.</p>
                </div>
                <div className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 border border-white/10">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">AI Doğruluk: %{data.summary.confidence * 100}</span>
                </div>
            </motion.div>

            {/* Neural Trend Chart */}
            <motion.div variants={item} className="relative rounded-[32px] border border-white/5 bg-zinc-900/20 p-10 overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 flex gap-4">
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded bg-emerald-500"></div>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Bütçelenen</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded bg-purple-500"></div>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Gerçekleşen</span>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-12 flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-emerald-500" />
                    Tahmini Nakit Çıkış Eğrisi
                </h3>

                <div className="h-80 w-full relative">
                    <svg className="h-full w-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
                        {/* Grid lines */}
                        {[0, 100, 200, 300].map(y => (
                            <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="white" strokeOpacity="0.03" />
                        ))}

                        {/* Predicted Trend Line (Emerald) */}
                        <motion.path
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.5 }}
                            transition={{ duration: 2 }}
                            d={`M 0 350 ${data.predicted_trend.map((v: number, i: number) => `L ${i * 200} ${350 - (v / 800)}`).join(' ')}`}
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="2"
                            strokeDasharray="8 8"
                        />

                        {/* Actual Trend Line (Purple) */}
                        <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2.5, ease: "easeInOut" }}
                            d={`M 0 350 ${data.actual_trend.map((v: number, i: number) => `L ${i * 200} ${350 - (v / 800)}`).join(' ')}`}
                            fill="none"
                            stroke="#A855F7"
                            strokeWidth="4"
                            strokeLinecap="round"
                        />

                        {/* Points */}
                        {data.actual_trend.map((v: number, i: number) => (
                            <circle key={i} cx={i * 200} cy={350 - (v / 800)} r="6" fill="#000" stroke="#A855F7" strokeWidth="3" />
                        ))}
                    </svg>

                    <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-[10px] font-black text-zinc-700 uppercase tracking-widest">
                        {data.months.map((m: string) => <span key={m}>{m}</span>)}
                    </div>
                </div>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Projected Totals */}
                <motion.div variants={item} className="lg:col-span-1 space-y-6">
                    <ProjectionCard
                        title="YIL SONU TAHMİNİ"
                        value={`₺${data.summary.projected_yearly_tax.toLocaleString()}`}
                        trend="+₺12,400"
                        desc="Geçen yıla oranla %8.2 artış bekleniyor."
                        icon={<Target className="h-5 w-5 text-emerald-400" />}
                    />
                    <ProjectionCard
                        title="OPTIMİZASYON KAZANIMI"
                        value={`₺${data.summary.potential_savings.toLocaleString()}`}
                        trend="-%15 Risk"
                        desc="AI önerileri uygulanırsa beklenen tasarruf."
                        icon={<Zap className="h-5 w-5 text-purple-400" />}
                        highlight
                    />
                </motion.div>

                {/* Optimization Center */}
                <motion.div variants={item} className="lg:col-span-2 rounded-[32px] border border-white/5 bg-zinc-900/10 p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <Bot className="h-6 w-6 text-purple-400" />
                            <h3 className="text-xl font-bold text-white uppercase tracking-tight">AI Optimizasyon Merkezi</h3>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[8px] font-black text-purple-400 uppercase tracking-widest">
                            2 Aktif Strateji
                        </span>
                    </div>

                    <div className="space-y-4">
                        {data.optimizations.map((opt: any, idx: number) => (
                            <div key={idx} className="group flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                                <div className="flex items-start gap-5">
                                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-xl bg-zinc-800 ${opt.priority === 'High' ? 'text-red-400' : 'text-emerald-400'}`}>
                                        <BrainCircuit className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white group-hover:text-purple-400 transition-colors">{opt.title}</h4>
                                        <p className="text-xs text-zinc-500 leading-relaxed mt-1 max-w-md">{opt.description}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-black text-emerald-400">{opt.impact}</div>
                                    <div className="mt-2 flex items-center justify-end gap-1 text-[10px] font-bold text-zinc-600">
                                        AKSIYON AL <ChevronRight className="h-3 w-3" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-purple-500/5 to-transparent border border-purple-500/10 flex items-center gap-6">
                        <Sparkles className="h-10 w-10 text-purple-500/50 shrink-0" />
                        <p className="text-xs text-zinc-500 font-medium italic">
                            "Mevcut veri setiniz, Ar-Ge harcamalarınızın vergi matrahından düşülmesi durumunda nakit akışınızın %14 daha stabil kalacağını göstermektedir."
                        </p>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

function ProjectionCard({ title, value, trend, desc, icon, highlight }: any) {
    return (
        <div className={`rounded-[32px] border border-white/5 p-8 transition-all hover:border-emerald-500/30 group ${highlight ? 'bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/10' : 'bg-zinc-900/30'}`}>
            <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{title}</span>
                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {icon}
                </div>
            </div>
            <div className="space-y-1">
                <div className="text-3xl font-black text-white">{value}</div>
                <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-bold ${trend.startsWith('+') ? 'text-rose-500' : 'text-emerald-500'}`}>{trend}</span>
                    <span className="text-[11px] text-zinc-600 font-medium">{desc}</span>
                </div>
            </div>
        </div>
    );
}
