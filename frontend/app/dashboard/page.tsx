export default function DashboardPage() {
    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Toplam Gelir" value="₺124,500" trend="+12%" />
                <StatCard title="Giderler" value="₺32,400" trend="-4%" negative />
                <StatCard title="Bekleyen Vergiler" value="₺8,250" warning />
                <StatCard title="İşlenen Evrak" value="1,248" />
            </div>

            {/* Main Chart Placeholder */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                <h3 className="mb-4 text-lg font-medium text-zinc-200">Finansal Akış</h3>
                <div className="h-64 rounded-lg border-2 border-dashed border-zinc-800 bg-black/50 flex items-center justify-center text-zinc-500">
                    Grafik Alanı (Chart.js entegrasyonu yapılacak)
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Recent Transactions */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                    <h3 className="mb-4 text-lg font-medium text-zinc-200">Son İşlemler</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between border-b border-zinc-800 pb-2 last:border-0 last:pb-0">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded bg-zinc-800"></div>
                                    <div>
                                        <p className="text-sm font-medium text-zinc-200">Fatura #{1000 + i}</p>
                                        <p className="text-xs text-zinc-500">Bugün, 14:30</p>
                                    </div>
                                </div>
                                <span className="text-sm font-medium text-zinc-200">+₺1,200</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Insights */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-purple-400">🤖</span>
                        <h3 className="text-lg font-medium text-zinc-200">OVEYS Zeka</h3>
                    </div>
                    <div className="space-y-3">
                        <div className="rounded-lg bg-purple-500/10 border border-purple-500/20 p-3">
                            <p className="text-sm text-purple-200">KDV ödemeniz yaklaşıyor. Nakit akışınızı düzenlemenizi öneririm.</p>
                        </div>
                        <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-3">
                            <p className="text-sm text-blue-200">Geçen aya göre %15 daha fazla gider girişi tespit edildi.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, trend, negative, warning }: { title: string; value: string; trend?: string; negative?: boolean; warning?: boolean }) {
    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-zinc-700">
            <h4 className="text-sm font-medium text-zinc-400">{title}</h4>
            <div className="mt-2 flex items-baseline gap-2">
                <span className={`text-2xl font-bold ${warning ? "text-yellow-500" : "text-white"}`}>{value}</span>
                {trend && (
                    <span className={`text-xs font-medium ${negative ? "text-red-500" : "text-green-500"}`}>
                        {trend}
                    </span>
                )}
            </div>
        </div>
    );
}
