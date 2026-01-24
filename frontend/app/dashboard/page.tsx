"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    TrendingUp,
    TrendingDown,
    AlertCircle,
    FileText,
    ArrowUpRight,
    ArrowDownRight,
    MoreHorizontal,
    Plus,
    Sparkles
} from "lucide-react";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function DashboardPage() {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-10"
        >
            {/* Header Greeting */}
            <motion.div variants={item} className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-white px-1">Hoş Geldin, Bahattin</h1>
                    <p className="text-zinc-500 text-sm mt-1 px-1">Platform genelinde vergi otonomisi aktiftir.</p>
                </div>
                <button className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-black transition-all hover:bg-zinc-200 active:scale-95">
                    <Plus className="h-4 w-4" />
                    Yeni İşlem
                </button>
            </motion.div>

            {/* Stats Cards */}
            <motion.div variants={item} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Toplam Gelir"
                    value="₺124,500.00"
                    trend="+12.5%"
                    icon={<ArrowUpRight className="h-4 w-4 text-green-400" />}
                    color="emerald"
                />
                <StatCard
                    title="Toplam Gider"
                    value="₺32,400.00"
                    trend="-4.2%"
                    icon={<ArrowDownRight className="h-4 w-4 text-red-400" />}
                    color="rose"
                    negative
                />
                <StatCard
                    title="Tahmini KDV"
                    value="₺8,250.40"
                    trend="Vadesine 4 gün"
                    icon={<AlertCircle className="h-4 w-4 text-amber-400" />}
                    color="amber"
                    warning
                />
                <StatCard
                    title="İşlenen Evrak"
                    value="1,248"
                    trend="+24 bugün"
                    icon={<FileText className="h-4 w-4 text-purple-400" />}
                    color="purple"
                />
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Main Chart Section */}
                <motion.div variants={item} className="lg:col-span-2 rounded-3xl border border-white/5 bg-zinc-900/20 p-8 backdrop-blur-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4">
                        <MoreHorizontal className="h-5 w-5 text-zinc-600 cursor-pointer hover:text-white transition-colors" />
                    </div>
                    <h3 className="mb-8 text-xl font-bold text-white">Nakit Akış Analizi</h3>

                    {/* SVG Chart Placeholder - A beautiful minimalist line chart */}
                    <div className="h-72 w-full relative">
                        <svg className="h-full w-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
                            {/* Grid lines */}
                            <line x1="0" y1="100" x2="1000" y2="100" stroke="white" strokeOpacity="0.03" strokeWidth="1" />
                            <line x1="0" y1="200" x2="1000" y2="200" stroke="white" strokeOpacity="0.03" strokeWidth="1" />
                            <line x1="0" y1="300" x2="1000" y2="300" stroke="white" strokeOpacity="0.03" strokeWidth="1" />

                            {/* Area mask for gradient */}
                            <defs>
                                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#818CF8" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
                                </linearGradient>
                            </defs>

                            {/* Area */}
                            <path
                                d="M0,350 L100,320 L200,300 L300,330 L400,280 L500,220 L600,240 L700,180 L800,120 L900,140 L1000,80 L1000,400 L0,400 Z"
                                fill="url(#areaGradient)"
                                className="animate-in fade-in duration-1000"
                            />

                            {/* Main Line */}
                            <motion.path
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                                d="M0,350 L100,320 L200,300 L300,330 L400,280 L500,220 L600,240 L700,180 L800,120 L900,140 L1000,80"
                                fill="none"
                                stroke="#A855F7"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                            {/* Dots */}
                            {[
                                { x: 100, y: 320 }, { x: 300, y: 330 }, { x: 500, y: 220 }, { x: 700, y: 180 }, { x: 900, y: 140 }, { x: 1000, y: 80 }
                            ].map((p, i) => (
                                <circle key={i} cx={p.x} cy={p.y} r="6" fill="#000" stroke="#A855F7" strokeWidth="2" />
                            ))}
                        </svg>
                    </div>

                    <div className="mt-8 flex items-center justify-between text-xs font-bold text-zinc-600 uppercase tracking-widest">
                        <span>Oca</span>
                        <span>Şub</span>
                        <span>Mar</span>
                        <span>Nis</span>
                        <span>May</span>
                        <span>Haz</span>
                        <span>Tem</span>
                    </div>
                </motion.div>

                {/* AI Insights Sidebar */}
                <motion.div variants={item} className="rounded-3xl border border-white/5 bg-gradient-to-br from-zinc-900/40 to-black p-8 backdrop-blur-sm relative overflow-hidden group">
                    <div className="absolute -top-10 -right-10 h-40 w-40 bg-purple-600/10 blur-[60px] group-hover:bg-purple-600/20 transition-all duration-700"></div>

                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                            <Sparkles className="h-5 w-5 text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white tracking-tight">OVEYS AI Zeka</h3>
                    </div>

                    <div className="space-y-6">
                        <InsightCard
                            type="urgent"
                            title="Vergi Uyarı Sistemi"
                            desc="KDV beyannameniz için 3 eksik fatura tespit edildi. Otomatik eşleştirme başlatılsın mı?"
                        />
                        <InsightCard
                            type="info"
                            title="Harcama Analizi"
                            desc="Yemek giderleriniz geçen aya göre %22 düştü. Verimlilik artışı sağlandı."
                        />
                        <InsightCard
                            type="success"
                            title="Resmi Onay"
                            desc="Nisan ayı SGK bildirimleriniz otonom olarak başarıyla tamamlandı."
                        />
                    </div>

                    <button className="mt-8 w-full rounded-2xl border border-white/5 py-4 text-sm font-bold text-zinc-300 hover:bg-white/5 transition-colors">
                        Tüm Raporları Gör
                    </button>
                </motion.div>
            </div>

            {/* Bottom Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* Recent Transactions List */}
                <motion.div variants={item} className="lg:col-span-2 rounded-3xl border border-white/5 bg-zinc-900/10 p-8 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-white">Son İşlemler</h3>
                        <Link href="/dashboard/documents" className="text-xs font-bold text-purple-400 uppercase tracking-wider hover:text-purple-300 transition-colors">Tümünü Gör</Link>
                    </div>

                    <div className="space-y-2">
                        <TransactionItem
                            title="Apple Store - MacBook Pro"
                            date="24 May 2025, 14:30"
                            amount="-₺82,400.00"
                            status="Gider"
                            color="rose"
                        />
                        <TransactionItem
                            title="Müşteri Ödemesi - Tech Corp"
                            date="23 May 2025, 09:12"
                            amount="+₺15,000.00"
                            status="Gelir"
                            color="emerald"
                        />
                        <TransactionItem
                            title="Akaryakıt - Petrol Ofisi"
                            date="22 May 2025, 11:45"
                            amount="-₺1,240.50"
                            status="Gider"
                            color="rose"
                        />
                        <TransactionItem
                            title="Aylık Kira Ödemesi"
                            date="21 May 2025, 10:00"
                            amount="-₺12,000.00"
                            status="Gider"
                            color="rose"
                        />
                    </div>
                </motion.div>

                {/* Audit Trackers / Quick Summary */}
                <motion.div variants={item} className="rounded-3xl border border-white/5 bg-zinc-900/10 p-8 flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-6">Blokzincir Güvencesi</h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-zinc-500">Ağ Durumu</span>
                                <span className="flex items-center gap-2 text-xs font-bold text-green-400">
                                    <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div> Aktif
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-zinc-500">Son Blok</span>
                                <span className="text-xs font-mono text-zinc-300">#42,910,231</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-zinc-500">Güven Puanı</span>
                                <span className="text-xs font-bold text-purple-400">99.9%</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 p-4 rounded-2xl bg-white/5 border border-white/5">
                        <p className="text-[10px] text-zinc-500 uppercase font-black mb-2 opacity-50">SİSTEM ÖZETİ</p>
                        <p className="text-xs text-zinc-400 leading-relaxed font-light">
                            Tüm finansal verileriniz E-VİZÖR Private Net üzerinde uçtan uca şifreli olarak korunmaktadır.
                        </p>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

function StatCard({ title, value, trend, icon, color, negative, warning }: any) {
    const borderColors: any = {
        emerald: "hover:border-emerald-500/50",
        rose: "hover:border-rose-500/50",
        amber: "hover:border-amber-500/50",
        purple: "hover:border-purple-500/50"
    };

    return (
        <div className={`rounded-3xl border border-white/5 bg-zinc-900/30 p-8 transition-all duration-500 ${borderColors[color]} group`}>
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500">{title}</h4>
                <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {icon}
                </div>
            </div>
            <div className="mt-2 flex flex-col gap-1">
                <span className={`text-2xl font-black ${warning ? "text-amber-500" : "text-white"}`}>{value}</span>
                <span className={`text-[11px] font-bold ${negative ? "text-rose-500/70" : warning ? "text-amber-500/70" : "text-emerald-500/70"}`}>
                    {trend}
                </span>
            </div>
        </div>
    );
}

function InsightCard({ type, title, desc }: any) {
    const styles: any = {
        urgent: "bg-red-500/10 border-red-500/20 text-red-200",
        info: "bg-blue-500/10 border-blue-500/20 text-blue-200",
        success: "bg-green-500/10 border-green-500/20 text-green-200"
    };

    return (
        <div className={`rounded-2xl border p-5 space-y-2 transition-all hover:translate-x-1 ${styles[type]}`}>
            <h4 className="text-sm font-bold">{title}</h4>
            <p className="text-xs leading-relaxed opacity-70 font-light">{desc}</p>
        </div>
    );
}

function TransactionItem({ title, date, amount, status, color }: any) {
    return (
        <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/5">
            <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-xl bg-${color}-500/10 flex items-center justify-center text-xl`}>
                    {status === "Gelir" ? "💰" : "📉"}
                </div>
                <div>
                    <p className="text-sm font-bold text-zinc-100 group-hover:text-white transition-colors">{title}</p>
                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-tighter mt-0.5">{date}</p>
                </div>
            </div>
            <div className="text-right">
                <p className={`text-sm font-black ${status === "Gelir" ? "text-emerald-400" : "text-white"}`}>{amount}</p>
                <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-tighter mt-0.5">{status}</p>
            </div>
        </div>
    );
}
