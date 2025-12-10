import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black text-white selection:bg-purple-500/30">
      
      {/* Hero Section */}
      <section className="relative flex w-full flex-col items-center justify-center px-4 py-24 md:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 -z-10 h-full w-full bg-black [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] opacity-50"></div>
        <div className="z-10 text-center space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-300 backdrop-blur-3xl">
            <span className="flex h-2 w-2 rounded-full bg-purple-400 mr-2 animate-pulse"></span>
            Yapay Zeka Destekli Muhasebe
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 pb-2">
            E-VİZÖR ile <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Geleceği Yönetin
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Otonom Vergi ve Evrak Yönetim Sistemi (OVEYS). Klasik muhasebe süreçlerini unutun. 
            Yapay zeka ve blokzincir güvencesiyle finansal özgürlüğün tadını çıkarın.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              href="/dashboard"
              className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-all hover:bg-zinc-200 hover:scale-105"
            >
              Hemen Başla
            </Link>
            <Link 
              href="#features"
              className="rounded-full border border-zinc-800 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-zinc-900"
            >
              Özellikleri Keşfet
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="w-full px-4 py-24 bg-zinc-950/50 backdrop-blur-sm border-t border-zinc-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 hover:border-purple-500/50 transition-all duration-300">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
            <div className="h-12 w-12 rounded-lg bg-zinc-800 flex items-center justify-center mb-4 text-2xl">
              🤖
            </div>
            <h3 className="text-xl font-semibold mb-2 text-zinc-100">Otonom Vergi Zekası</h3>
            <p className="text-zinc-400 leading-relaxed">
              Mevzuatı anlık takip eden YZ modülleri ile beyannameleriniz otomatik hazırlansın. Hata payı sıfır.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 hover:border-blue-500/50 transition-all duration-300">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
            <div className="h-12 w-12 rounded-lg bg-zinc-800 flex items-center justify-center mb-4 text-2xl">
              ⛓️
            </div>
            <h3 className="text-xl font-semibold mb-2 text-zinc-100">Blokzincir Güvencesi</h3>
            <p className="text-zinc-400 leading-relaxed">
              Değiştirilemez kayıt defteri teknolojisi ile tüm finansal verileriniz şifreli ve güvende.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 hover:border-pink-500/50 transition-all duration-300">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
            <div className="h-12 w-12 rounded-lg bg-zinc-800 flex items-center justify-center mb-4 text-2xl">
              ⚡
            </div>
            <h3 className="text-xl font-semibold mb-2 text-zinc-100">Akıllı Evrak İşleme</h3>
            <p className="text-zinc-400 leading-relaxed">
              Fiş ve faturalarınızı fotoğrafını çekerek yükleyin. OCR motorumuz anında dijitalleştirsin.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-900 py-8 text-center text-zinc-600">
        <p>© 2025 E-VİZÖR (OVEYS). Tüm hakları saklıdır.</p>
      </footer>
    </main>
  );
}
