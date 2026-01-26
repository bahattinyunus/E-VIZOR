"use client";

import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Terminal, Cpu } from "lucide-react";
import RegulatorySearch from "./regulatory-search";

export default function IntelligencePage() {
    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-20">
            {/* Hero Section */}
            <div className="relative rounded-[40px] overflow-hidden border border-white/5 bg-gradient-to-br from-zinc-900 to-black p-12">
                <div className="absolute top-0 right-0 h-96 w-96 bg-purple-600/10 blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 h-64 w-64 bg-emerald-600/10 blur-[100px]"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="max-w-xl space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-black text-purple-400 uppercase tracking-widest">
                            <Sparkles className="h-3 w-3" /> Advanced AI Engine
                        </div>
                        <h1 className="text-5xl font-black text-white tracking-tighter leading-[1.1]">
                            Mevzuat <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">Zekası</span>
                        </h1>
                        <p className="text-lg text-zinc-400 font-light leading-relaxed">
                            OVEYS AI, binlerce sayfalık vergi mevzuatını saniyeler içinde tarar ve işletmenize özel risk analizi ile optimizasyon raporları sunar.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <MetricBox icon={<ShieldCheck className="h-4 w-4" />} label="DOĞRULUK" value="%99.9" color="text-emerald-400" />
                        <MetricBox icon={<Terminal className="h-4 w-4" />} label="GECİKME" value="42ms" color="text-purple-400" />
                        <MetricBox icon={<Cpu className="h-4 w-4" />} label="MODEL" value="OVEYS-2.0" color="text-zinc-400" />
                        <MetricBox icon={<Sparkles className="h-4 w-4" />} label="STATUS" value="Active" color="text-emerald-400" />
                    </div>
                </div>
            </div>

            {/* Search Section */}
            <div className="space-y-6">
                <div className="flex items-end justify-between px-2">
                    <div>
                        <h2 className="text-2xl font-black text-white px-1">Derin Mevzuat Taraması</h2>
                        <p className="text-zinc-500 text-sm mt-1 px-1">Semantik arama teknolojisi ile sonuçlar milisaniyeler içinde listelenir.</p>
                    </div>
                </div>
                <RegulatorySearch />
            </div>
        </div>
    );
}

function MetricBox({ icon, label, value, color }: any) {
    return (
        <div className="bg-white/5 border border-white/5 rounded-2xl p-4 min-w-[120px]">
            <div className="flex items-center gap-2 text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-2">
                {icon} {label}
            </div>
            <div className={`text-xl font-black ${color}`}>
                {value}
            </div>
        </div>
    );
}
