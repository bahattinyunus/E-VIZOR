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
    Sparkles,
    Terminal,
    ShieldCheck,
    Cpu,
    Zap,
    History
} from "lucide-react";

import { ProcessingOverlay } from "./components/processing-overlay";

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

import { useEffect, useState } from "react";

export default function DashboardPage() {
    const [isSealing, setIsSealing] = useState(false);
    const [stats, setStats] = useState<any>(null);
    const [advice, setAdvice] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [secureMode, setSecureMode] = useState(false);

    const handleNewTransaction = () => {
        setIsSealing(true);
    };

    const handleSealComplete = () => {
        setIsSealing(false);
        // Refresh data or show success toast
        window.location.reload();
    };

    useEffect(() => {
        // Fetch stats and documents simulation info
        const fetchData = async () => {
            try {
                const [statsRes, adviceRes] = await Promise.all([
                    fetch("http://localhost:8000/api/documents/"),
                    fetch("http://localhost:8000/api/tax/advice?tax_type=genel")
                ]);
                const statsData = await statsRes.json();
                const adviceData = await adviceRes.json();

                // Calculate mock totals from docs
                const totals = statsData.reduce((acc: any, doc: any) => ({
                    income: acc.income + (doc.extracted_data?.total_amount || 0),
                    tax: acc.tax + (doc.extracted_data?.tax_amount || 0),
                    count: acc.count + 1
                }), { income: 0, tax: 0, count: 0 });

                setStats(totals);
                setAdvice(adviceData);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-10"
        >
            {/* Executive AI Shield Overlay (New Phase 10) */}
            <motion.div variants={item} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-[32px] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 rounded-[32px] border border-white/10 bg-zinc-900/40 p-10 backdrop-blur-2xl">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/5 flex items-center justify-center border border-emerald-500/30">
                                <ShieldCheck className="h-10 w-10 text-emerald-400" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-lg bg-zinc-900 border border-emerald-500/50 flex items-center justify-center">
                                <Cpu className="h-3 w-3 text-emerald-500 animate-pulse" />
                            </div>
                        </div>
                        <div>
                            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[8px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-2">
                                Autonomous Executive Shield Active
                            </div>
                            <h2 className="text-3xl font-black text-white tracking-tighter">Sistem <span className="text-emerald-400">Güvenliği</span> & Otonomi</h2>
                            <p className="text-zinc-500 text-sm mt-1 max-w-lg">
                                OV-EYS Motoru tüm finansal izlekleri otonom olarak doğrular, hataları düzeltir ve vergi kalkanınızı dinamik olarak optimize eder.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <ExecutiveStat label="Şifa Puanı" value="100%" sub="Self-Healing" />
                        <ExecutiveStat label="Güvenlik" value="Grade A+" sub="Military Tier" />
                        <ExecutiveStat label="AI Katmanı" value="Executive" sub="Decision Support" />
                    </div>
                </div>
            </motion.div>

            {/* Header Greeting */}
            <motion.div variants={item} className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-white px-1">Hoş Geldin, Bahattin</h1>
                    <p className="text-zinc-500 text-sm mt-1 px-1">Platform genelinde vergi otonomisi aktiftir.</p>
                </div>
                <button
                    onClick={handleNewTransaction}
                    className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-black transition-all hover:bg-zinc-200 active:scale-95"
                >
                    <Plus className="h-4 w-4" />
                    Yeni İşlem
                </button>
            </motion.div>

            {/* Stats Cards */}
            <motion.div variants={item} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Toplam Gelir"
                    value={loading ? "..." : `₺${stats?.income.toLocaleString()}`}
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
                    value={loading ? "..." : `₺${stats?.tax.toLocaleString()}`}
                    trend="Vadesine 4 gün"
                    icon={<AlertCircle className="h-4 w-4 text-amber-400" />}
                    color="amber"
                    warning
                />
                <StatCard
                    title="İşlenen Evrak"
                    value={loading ? "..." : stats?.count.toString()}
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
                            title="Yapay Zeka Sonuçları"
                            desc={loading ? "Mevzuat taranıyor..." : advice?.advice}
                        />
                        <InsightCard
                            type="info"
                            title="Harcama Analizi"
                            desc="Yemek giderleriniz geçen aya göre %22 düştü. Verimlilik artışı sağlandı."
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

            {/* Tactical Timeline (New Phase 5 Feature) */}
            <motion.div variants={item} className="rounded-3xl border border-white/5 bg-zinc-900/10 p-10">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-3">
                        <Terminal className="h-5 w-5 text-zinc-500" />
                        <h3 className="text-xl font-black text-white">Sistem Kronolojisi</h3>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[8px] font-black text-zinc-600 uppercase tracking-widest">
                        Otonom Loglama Aktif
                    </div>
                </div>

                <div className="space-y-8 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-px before:bg-zinc-800">
                    <TimelineItem
                        time="10:42"
                        title="Blok #42,910,231 Onaylandı"
                        desc="Yeni evrak (Fatura_05.pdf) mühürleme işlemi tamamlandı."
                        icon={<ShieldCheck className="h-3 w-3" />}
                        status="success"
                    />
                    <TimelineItem
                        time="09:15"
                        title="OVEYS Mevzuat Güncellemesi"
                        desc="Resmi Gazete No: 32421 tarandı. KDV tebliği analiz edildi."
                        icon={<Sparkles className="h-3 w-3" />}
                        status="info"
                    />
                    <TimelineItem
                        time="Dün"
                        title="Anomali Tespiti"
                        desc="Tekrarlanan gider kalemi yakalandı ve karantinaya alındı."
                        icon={<AlertCircle className="h-3 w-3" />}
                        status="warning"
                    />
                </div>
            </motion.div>

            <ProcessingOverlay
                isVisible={isSealing}
                onComplete={handleSealComplete}
                fileName="TR_FATURA_2025_05.pdf"
            />
        </motion.div>
    );
}

function TimelineItem({ time, title, desc, icon, status }: any) {
    const statusColors: any = {
        success: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
        info: "text-blue-500 bg-blue-500/10 border-blue-500/20",
        warning: "text-amber-500 bg-amber-500/10 border-amber-500/20"
    };

    return (
        <div className="flex gap-6 relative group">
            <div className={`mt-1 h-9 w-9 shrink-0 rounded-xl border flex items-center justify-center relative z-10 transition-transform group-hover:scale-110 ${statusColors[status]}`}>
                {icon}
            </div>
            <div className="flex-1 pb-2">
                <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-zinc-100 group-hover:text-white transition-colors">{title}</h4>
                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{time}</span>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed max-w-xl group-hover:text-zinc-400 transition-colors">{desc}</p>
            </div>
        </div>
    );
}

function ExecutiveStat({ label, value, sub }: any) {
    return (
        <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-center min-w-[140px]">
            <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-xl font-black text-white leading-none">{value}</p>
            <p className="text-[8px] font-bold text-emerald-500/50 uppercase mt-1">{sub}</p>
        </div>
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
