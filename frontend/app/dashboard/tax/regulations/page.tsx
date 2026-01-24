"use client";

import { motion } from "framer-motion";
import { Search, BookOpen, Scale, ShieldCheck, ArrowRight, Gavel, FileText } from "lucide-react";
import { useState } from "react";

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function RegulatoryExplorer() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [searching, setSearching] = useState(false);

    const handleSearch = async () => {
        setSearching(true);
        try {
            const res = await fetch(`http://localhost:8000/api/tax/regulations/search?q=${query}`);
            const data = await res.json();
            setResults(data);
        } catch (err) {
            console.error(err);
        }
        setSearching(false);
    };

    return (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-white">Mevzuat Zekası</h1>
                    <p className="text-zinc-500 text-sm mt-1">Yapay zeka destekli akıllı kanun ve tebliğ arama motoru.</p>
                </div>
            </div>

            {/* Search Launcher */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative flex bg-black rounded-2xl border border-white/5 p-2">
                    <div className="flex items-center px-4">
                        <Search className="h-5 w-5 text-zinc-600" />
                    </div>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        placeholder="Örn: 'KDV istisnaları', 'Binek araç gider kısıtı'..."
                        className="flex-1 bg-transparent border-none py-4 text-white focus:outline-none placeholder:text-zinc-700"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-purple-600 hover:bg-purple-500 text-white px-8 rounded-xl font-bold text-sm transition-all"
                    >
                        {searching ? "Taranıyor..." : "Keşfet"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Search Results */}
                <div className="lg:col-span-2 space-y-6">
                    {results.length > 0 ? results.map((result, i) => (
                        <motion.div
                            key={i}
                            variants={item}
                            className="p-8 rounded-3xl bg-zinc-900/20 border border-white/5 hover:border-purple-500/30 transition-all group"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                                    <Gavel className="h-4 w-4" />
                                </div>
                                <h3 className="text-lg font-bold text-white uppercase tracking-tight">{result.title}</h3>
                            </div>
                            <p className="text-zinc-400 font-light leading-relaxed mb-6">
                                {result.content}
                            </p>
                            <div className="flex items-center justify-between">
                                <div className="flex gap-2">
                                    {result.tags?.map((tag: string) => (
                                        <span key={tag} className="text-[10px] font-black text-zinc-600 bg-white/5 px-2 py-1 rounded-md uppercase tracking-widest border border-white/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <button className="flex items-center gap-2 text-[10px] font-black text-purple-400 uppercase tracking-widest hover:text-white transition-colors">
                                    Tam metni gör <ArrowRight className="h-3 w-3" />
                                </button>
                            </div>
                        </motion.div>
                    )) : (
                        <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
                            <BookOpen className="h-12 w-12 text-zinc-800 mx-auto mb-4" />
                            <p className="text-zinc-600 font-bold uppercase tracking-widest text-xs">Arama yapmak için bir terim girin</p>
                        </div>
                    )}
                </div>

                {/* Sidebar Info */}
                <div className="space-y-8">
                    <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-900/20 to-transparent border border-purple-500/20">
                        <h4 className="flex items-center gap-2 text-white font-black uppercase text-xs tracking-widest mb-6">
                            <ShieldCheck className="h-4 w-4 text-emerald-500" /> Resmi Kaynak Uyumu
                        </h4>
                        <p className="text-xs text-zinc-500 leading-relaxed font-light">
                            Tüm sonuçlar resmi gazete ve maliye bakanlığı veri tabanları ile otonom olarak senkronize edilmektedir.
                            OVEYS AI, yorum farklarını minimize eden çok katmanlı bir analiz protokolü kullanır.
                        </p>
                    </div>

                    <div className="p-8 rounded-3xl bg-zinc-900/20 border border-white/5">
                        <h4 className="text-white font-black uppercase text-xs tracking-widest mb-6">Popüler Başlıklar</h4>
                        <div className="space-y-4">
                            <QuickLink label="KDV %20 Geçiş Süreci" />
                            <QuickLink label="E-Defter Saklama Usulleri" />
                            <QuickLink label="Yurt Dışı İhracat İstisnası" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function QuickLink({ label }: { label: string }) {
    return (
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer group">
            <span className="text-xs text-zinc-400 group-hover:text-white transition-colors">{label}</span>
            <ArrowRight className="h-3 w-3 text-zinc-700 group-hover:text-purple-500 transition-all" />
        </div>
    );
}
