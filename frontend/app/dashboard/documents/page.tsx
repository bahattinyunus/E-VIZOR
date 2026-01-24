"use client";

import { motion } from "framer-motion";
import {
    FileText,
    Search,
    Filter,
    Download,
    ShieldCheck,
    ChevronRight,
    MoreVertical,
    ExternalLink
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.05 }
    }
};

const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
};

export default function DocumentsPage() {
    const [documents, setDocuments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8000/api/documents/")
            .then(res => res.json())
            .then(data => {
                setDocuments(data);
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
            className="space-y-8"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white">Evrak Arşivi</h1>
                    <p className="text-zinc-500 text-sm mt-1">Tüm belgeleriniz blokzinciri üzerinde mühürlenmiştir.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/5 px-4 py-2 text-sm font-bold text-zinc-300 hover:bg-white/10 transition-all">
                        <Filter className="h-4 w-4" /> Filtrele
                    </button>
                    <button className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2 text-sm font-bold text-white hover:bg-purple-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                        Yeni Evrak Yükle
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-600" />
                <input
                    type="text"
                    placeholder="Evrak adı, mükellef veya tutar ile ara..."
                    className="w-full rounded-2xl bg-zinc-900/40 border border-white/5 py-4 pl-12 pr-4 text-white focus:outline-none focus:border-purple-500/50 transition-all"
                />
            </div>

            {/* Documents List */}
            <div className="rounded-3xl border border-white/5 bg-zinc-900/20 overflow-hidden backdrop-blur-sm">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-zinc-500 font-black">
                            <th className="px-8 py-5">Evrak Detayı</th>
                            <th className="px-4 py-5">Tarih</th>
                            <th className="px-4 py-5">Tutar</th>
                            <th className="px-4 py-5">Durum / Audit</th>
                            <th className="px-8 py-5 text-right">İşlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="px-8 py-20 text-center">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="h-8 w-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                                        <p className="text-sm text-zinc-600 font-bold uppercase tracking-widest">Veriler İşleniyor...</p>
                                    </div>
                                </td>
                            </tr>
                        ) : documents.map((doc) => (
                            <motion.tr
                                key={doc.id}
                                variants={item}
                                className="group border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                            >
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400 group-hover:scale-110 transition-transform">
                                            <FileText className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white uppercase tracking-tight">{doc.extracted_data?.merchant_name || doc.filename}</p>
                                            <p className="text-[10px] font-bold text-zinc-600 uppercase mt-0.5">{doc.extracted_data?.invoice_type || "Bilinmiyor"}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-5">
                                    <p className="text-sm font-light text-zinc-400">{doc.extracted_data?.date || "—"}</p>
                                </td>
                                <td className="px-4 py-5">
                                    <p className="text-sm font-black text-white">
                                        {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: doc.extracted_data?.currency || 'TRY' }).format(doc.extracted_data?.total_amount || 0)}
                                    </p>
                                </td>
                                <td className="px-4 py-5">
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-purple-400 uppercase bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                                            <ShieldCheck className="h-3 w-3" /> VERIFIED
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 text-zinc-600 hover:text-white transition-colors">
                                            <Download className="h-4 w-4" />
                                        </button>
                                        <button className="p-2 text-zinc-600 hover:text-white transition-colors">
                                            <MoreVertical className="h-4 w-4" />
                                        </button>
                                        <ChevronRight className="h-4 w-4 text-zinc-800 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Blockchain Tracker Info */}
            <motion.div variants={item} className="p-8 rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                    <ShieldCheck className="h-24 w-24 text-purple-500" />
                </div>
                <h4 className="text-white font-bold mb-2">Audit Traceability</h4>
                <p className="text-sm text-zinc-500 max-w-2xl leading-relaxed">
                    Sistemdeki her evrak, yüklendiği andan itibaren SHA-256 algoritması ile özetlenir ve E-VİZÖR Private Blockchain ağında zaman damgalı olarak saklanır.
                    Bu sayede geçmişe dönük hiçbir veri silinemez ve değiştirilemez.
                </p>
                <button className="mt-4 flex items-center gap-2 text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors uppercase tracking-widest">
                    Audit Explorer'ı Aç <ExternalLink className="h-3 w-3" />
                </button>
            </motion.div>
        </motion.div>
    );
}
