"use client";

import { motion } from "framer-motion";
import { Calculator, TrendingUp, AlertCircle, RefreshCcw, ArrowRight } from "lucide-react";
import { useState } from "react";

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function TaxSimulation() {
    const [revenue, setRevenue] = useState(100000);
    const [expense, setExpense] = useState(40000);

    // Simple mock calculation
    const taxVat = revenue * 0.20 - (expense * 0.20);
    const profit = revenue - expense;
    const taxIncome = profit * 0.22;
    const netProfit = profit - taxIncome - Math.max(0, taxVat);

    return (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-10">
            <div>
                <h1 className="text-3xl font-black text-white">Vergi Simülatörü</h1>
                <p className="text-zinc-500 text-sm mt-1">Stratejik finansal kararlar için vergi yükü projeksiyonu.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Controls */}
                <div className="space-y-8 p-10 rounded-3xl bg-zinc-900/20 border border-white/5">
                    <div className="space-y-6">
                        <SimInput label="Aylık Tahmini Ciro" value={revenue} onChange={setRevenue} color="text-emerald-500" />
                        <SimInput label="Aylık Tahmini Gider" value={expense} onChange={setExpense} color="text-rose-500" />
                    </div>

                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                        <div className="flex items-center gap-3 text-amber-500 mb-2">
                            <AlertCircle className="h-4 w-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Profesyonel Not</span>
                        </div>
                        <p className="text-xs text-zinc-500 leading-relaxed font-light">
                            Bu simülasyon genel oranlar üzerinden hesaplama yapar. Geçici vergi, damga vergisi ve SGK teşvikleri dahil değildir.
                            Tam rapor için OVEYS AI'yı yetkilendirin.
                        </p>
                    </div>

                    <button className="w-full py-4 rounded-2xl bg-white text-black font-black text-sm hover:bg-zinc-200 transition-all flex items-center justify-center gap-2">
                        <RefreshCcw className="h-4 w-4" /> Senaryoyu Güncelle
                    </button>
                </div>

                {/* Results Visualizer */}
                <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-6">
                        <SimResultCard label="Tahmini KDV" value={taxVat.toLocaleString()} color="text-blue-400" />
                        <SimResultCard label="Gelir Vergisi" value={taxIncome.toLocaleString()} color="text-purple-400" />
                    </div>

                    <div className="p-10 rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                            <TrendingUp className="h-24 w-24 text-emerald-500" />
                        </div>
                        <h3 className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.3em] mb-4">Senaryo Sonu Tahmini Kar</h3>
                        <p className="text-5xl font-black text-white">₺{netProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>

                        <div className="mt-10 flex items-center justify-between p-4 rounded-xl bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Uygulanabilir Teşvikler</span>
                            </div>
                            <button className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Keşfet <ArrowRight className="h-3 w-3 inline" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function SimInput({ label, value, onChange, color }: any) {
    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                <span>{label}</span>
                <span className={color}>₺{value.toLocaleString()}</span>
            </div>
            <input
                type="range"
                min="0"
                max="1000000"
                step="1000"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
            />
        </div>
    );
}

function SimResultCard({ label, value, color }: any) {
    return (
        <div className="p-6 rounded-2xl border border-white/5 bg-zinc-900/30">
            <h4 className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-2">{label}</h4>
            <p className={`text-xl font-black ${color}`}>₺{value}</p>
        </div>
    );
}
