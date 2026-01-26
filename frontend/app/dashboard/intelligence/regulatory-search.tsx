"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, Tag, ShieldCheck, ArrowRight, Zap, Scale } from "lucide-react";

interface Regulation {
    title: string;
    content: string;
    tags: string[];
}

export default function RegulatorySearch() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Regulation[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!query.trim()) return;

        setIsSearching(true);
        try {
            const res = await fetch(`http://localhost:8000/api/tax/regulations/search?q=${encodeURIComponent(query)}`);
            const data = await res.json();
            setResults(data);
        } catch (err) {
            console.error("Search error:", err);
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-emerald-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <form onSubmit={handleSearch} className="relative flex items-center bg-zinc-900/90 border border-white/10 rounded-2xl px-6 py-4 backdrop-blur-xl">
                    <Search className="h-5 w-5 text-zinc-500 mr-4" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Mevzuat, kanun maddesi veya anahtar kelime ara..."
                        className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder:text-zinc-600"
                    />
                    <button
                        type="submit"
                        disabled={isSearching}
                        className="ml-4 px-6 py-2 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all active:scale-95 disabled:opacity-50"
                    >
                        {isSearching ? "Taranıyor..." : "Sorgula"}
                    </button>
                </form>
            </div>

            <div className="grid gap-6">
                <AnimatePresence mode="popLayout">
                    {results.length > 0 ? (
                        results.map((reg, idx) => (
                            <motion.div
                                key={reg.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/40 p-6 backdrop-blur-sm hover:border-purple-500/30 transition-all"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                                    <Scale className="h-10 w-10 text-purple-500" />
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                                        <BookOpen className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-white mb-2">{reg.title}</h3>
                                        <p className="text-zinc-400 text-sm leading-relaxed mb-4">{reg.content}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {reg.tags.map(tag => (
                                                <span key={tag} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                                                    <Tag className="h-3 w-3" /> {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : query && !isSearching ? (
                        <div className="py-20 text-center">
                            <Zap className="h-12 w-12 text-zinc-800 mx-auto mb-4" />
                            <p className="text-zinc-500 font-medium">Sonuç bulunamadı. Lütfen farklı anahtar kelimeler deneyin.</p>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2">
                            <QuickCard
                                icon={<ShieldCheck className="h-5 w-5" />}
                                title="VUK Rehberi"
                                desc="Vergi Usul Kanunu otonom tarama metodları."
                                onClick={() => { setQuery("VUK"); handleSearch(); }}
                            />
                            <QuickCard
                                icon={<ArrowRight className="h-5 w-5" />}
                                title="KDV Değişiklikleri"
                                desc="Son yayınlanan KDV tebliğleri ve etkileri."
                                onClick={() => { setQuery("KDV"); handleSearch(); }}
                            />
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function QuickCard({ icon, title, desc, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-4 text-left p-6 rounded-2xl border border-white/5 bg-zinc-900/20 hover:bg-white/5 transition-all group"
        >
            <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <div>
                <h4 className="font-bold text-white">{title}</h4>
                <p className="text-xs text-zinc-500 mt-0.5">{desc}</p>
            </div>
        </button>
    );
}
