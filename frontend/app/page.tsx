"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  LayoutDashboard,
  Cpu,
  FileCheck,
  LineChart,
  ArrowRight,
  CheckCircle2,
  Clock,
  Globe,
  Database
} from "lucide-react";
import Image from "next/image";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-[#050505] text-white selection:bg-purple-500/30 overflow-x-hidden">

      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 font-bold">
              E
            </div>
            <span className="text-xl font-bold tracking-tighter">VİZÖR</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <Link href="#features" className="hover:text-white transition-colors">Özellikler</Link>
            <Link href="#how-it-works" className="hover:text-white transition-colors">Nasıl Çalışır</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Fiyatlandırma</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-sm font-medium hover:text-white transition-colors">Giriş Yap</Link>
            <Link
              href="/auth/register"
              className="rounded-full bg-zinc-100 px-5 py-2 text-sm font-semibold text-black transition-all hover:bg-white hover:scale-105"
            >
              Ücretsiz Başla
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 pt-32 pb-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black"></div>
        <div className="absolute top-0 left-1/2 -z-10 h-[500px] w-full -translate-x-1/2 bg-purple-600/10 blur-[120px]"></div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="z-10 text-center space-y-10 max-w-5xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-300 backdrop-blur-3xl shadow-[0_0_20px_rgba(168,85,247,0.15)]">
            <span className="flex h-2 w-2 rounded-full bg-purple-400 mr-2 animate-pulse"></span>
            E-VİZÖR PRO: Otonom Mali Müşavirlik Platformu
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-extrabold tracking-tight leading-[1.1]">
            Muhasebenin <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
              Yeni Event Horizonu
            </span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-light">
            Yapay zeka otonomisi ve blokzincir güvenliği ile mali süreçlerinizi ışık hızına taşıyın.
            Karmaşık beyannameler ve evrak yığını artık geçmişin tozlu sayfalarında.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
            <Link
              href="/dashboard"
              className="group flex items-center gap-2 rounded-full bg-white px-10 py-5 text-base font-bold text-black transition-all hover:bg-zinc-200 hover:scale-105 active:scale-95"
            >
              Şimdi Keşfet <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#features"
              className="rounded-full border border-zinc-800 bg-zinc-900/50 px-10 py-5 text-base font-semibold text-white transition-all hover:bg-zinc-800 hover:border-zinc-700 backdrop-blur-xl"
            >
              Demo İzle
            </Link>
          </motion.div>
        </motion.div>

        {/* Hero Visual */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative mt-20 w-full max-w-6xl mx-auto rounded-2xl border border-white/10 bg-zinc-900/20 p-2 backdrop-blur-2xl shadow-2xl"
        >
          <div className="rounded-xl overflow-hidden aspect-[16/9] border border-white/5 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
            <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
              <LayoutDashboard className="h-20 w-20 text-purple-500/50 animate-pulse" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Trust Section */}
      <section className="w-full py-20 border-y border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-medium text-zinc-500 uppercase tracking-widest mb-12">GÜVEN VEREN TEKNOLOJİ ALTYAPISI</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 items-center opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex justify-center font-bold text-xl uppercase tracking-tighter">E-DEVLET</div>
            <div className="flex justify-center font-bold text-xl uppercase tracking-tighter">İBBS</div>
            <div className="flex justify-center font-bold text-xl uppercase tracking-tighter">SMMMO</div>
            <div className="flex justify-center font-bold text-xl uppercase tracking-tighter">TÜRMOB</div>
            <div className="flex justify-center font-bold text-xl uppercase tracking-tighter">GİB</div>
            <div className="flex justify-center font-bold text-xl uppercase tracking-tighter">KOSGEB</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="w-full px-6 py-32 bg-zinc-950/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">Sınırları Zorlayan Özellikler</h2>
            <p className="text-zinc-500 text-lg max-w-2xl mx-auto">Klasik muhasebe yazılımlarından 10 kat daha hızlı, 100 kat daha güvenli.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Cpu className="h-6 w-6 text-purple-400" />}
              title="Otonom Vergi Zekası"
              desc="GİB mevzuatını anlık tarayan YZ motoru, beyannamelerinizi hatasız hazırlar."
              color="purple"
            />
            <FeatureCard
              icon={<ShieldCheck className="h-6 w-6 text-blue-400" />}
              title="Blokzincir Denetimi"
              desc="Her veri girişi Hyperledger tabanlı defterimize işlenir, silinemez ve değiştirilemez."
              color="blue"
            />
            <FeatureCard
              icon={<Zap className="h-6 w-6 text-pink-400" />}
              title="Anlık Nakit Akışı"
              desc="Banka entegrasyonları ile tüm hesap hareketlerinizi milisaniyeler içinde raporlayın."
              color="pink"
            />
            <FeatureCard
              icon={<FileCheck className="h-6 w-6 text-green-400" />}
              title="E-Fatura Otomasyonu"
              desc="Gelen ve giden faturaları otomatik eşleştirme ve kategorizasyon."
              color="green"
            />
            <FeatureCard
              icon={<LineChart className="h-6 w-6 text-orange-400" />}
              title="Prediktif Finans"
              desc="Gelecek ayın vergi yükünü ve kar oranını %98 doğrulukla tahmin edin."
              color="orange"
            />
            <FeatureCard
              icon={<Globe className="h-6 w-6 text-cyan-400" />}
              title="Global Uyumluluk"
              desc="Uluslararası finansal raporlama standartları (IFRS) ile tam uyumlu yapı."
              color="cyan"
            />
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="w-full py-32 bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full bg-zinc-800/50 px-4 py-1.5 text-sm font-semibold text-zinc-300">
              SÜREÇ NASIL İŞLER?
            </div>
            <h2 className="text-5xl font-bold leading-tight">Yükle, Onayla <br /> ve Rahatla.</h2>

            <div className="space-y-6">
              <StepItem
                number="01"
                title="Veri Kaynağını Bağla"
                desc="E-Fatura, banka hesapları veya taranmış evrakları sisteme entegre edin."
              />
              <StepItem
                number="02"
                title="YZ Analizini İzle"
                desc="Otonom motorumuz verileri sınıflandırır ve vergi optimizasyonlarını yapar."
              />
              <StepItem
                number="03"
                title="Dijital Onay Ver"
                desc="Hazırlanan rapor ve beyannameleri tek tıkla onaylayıp resmi mercilere gönderin."
              />
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500/20 blur-[100px] -z-10 animate-pulse"></div>
            <div className="rounded-3xl border border-white/10 bg-zinc-900/50 p-8 backdrop-blur-2xl">
              <div className="aspect-square bg-zinc-800/50 rounded-2xl flex items-center justify-center">
                <Database className="h-32 w-32 text-purple-500/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="w-full py-32 bg-zinc-950/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold">Şeffaf Fiyatlandırma</h2>
            <p className="mt-4 text-zinc-500">İhtiyacınıza uygun paketi seçin, hemen geleceğe adım atın.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard
              name="Freelancer"
              price="299"
              features={["Tek Kullanıcı", "Sınırsız Fatura Taslağı", "Temel Raporlama", "Banka Entegrasyonu (1)"]}
            />
            <PricingCard
              recommended
              name="Enterprise"
              price="1299"
              features={["Sınırsız Kullanıcı", "YZ Vergi Danışmanı", "Gelişmiş Analitik", "Blockchain Audit", "7/24 VIP Destek"]}
            />
            <PricingCard
              name="Startup"
              price="599"
              features={["5 Kullanıcı", "E-Fatura Otomasyonu", "Ön Muhasebe Modülü", "Gelişmiş Raporlama"]}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-32 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-900/40 to-pink-900/40 opacity-50"></div>
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          <h2 className="text-5xl md:text-7xl font-bold">Finansal Geleceğinizi <br /> Bugün İnşa Edin.</h2>
          <p className="text-xl text-zinc-300 font-light">E-VİZÖR ile otonom muhasebe devrimine katılan binlerce profesyonel arasına katılın.</p>
          <div className="flex justify-center gap-6">
            <button className="rounded-full bg-white px-12 py-6 text-lg font-bold text-black transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.2)]">Hemen Başla</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 py-12 bg-black">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-sm">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-zinc-100 font-bold text-black text-xs">E</div>
              <span className="font-bold tracking-tight">VİZÖR</span>
            </div>
            <p className="text-zinc-500">Geleceğin mali teknolojilerini bugünden şekillendiriyoruz.</p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold">Ürün</h4>
            <ul className="space-y-2 text-zinc-500">
              <li><Link href="/" className="hover:text-white">Genel Bakış</Link></li>
              <li><Link href="/" className="hover:text-white">Güvenlik</Link></li>
              <li><Link href="/" className="hover:text-white">API</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold">Şirket</h4>
            <ul className="space-y-2 text-zinc-500">
              <li><Link href="/" className="hover:text-white">Hakkımızda</Link></li>
              <li><Link href="/" className="hover:text-white">Kariyer</Link></li>
              <li><Link href="/" className="hover:text-white">İletişim</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold">Yasal</h4>
            <ul className="space-y-2 text-zinc-500">
              <li><Link href="/" className="hover:text-white">KVKK</Link></li>
              <li><Link href="/" className="hover:text-white">Gizlilik</Link></li>
              <li><Link href="/" className="hover:text-white">Şartlar</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center text-zinc-600 text-xs">
          © 2025 E-VİZÖR (OVEYS). Built for the future of finance.
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, desc, color }: { icon: React.ReactNode, title: string, desc: string, color: string }) {
  const colorMap: any = {
    purple: "group-hover:border-purple-500/50 from-purple-500/10",
    blue: "group-hover:border-blue-500/50 from-blue-500/10",
    pink: "group-hover:border-pink-500/50 from-pink-500/10",
    green: "group-hover:border-green-500/50 from-green-500/10",
    orange: "group-hover:border-orange-500/50 from-orange-500/10",
    cyan: "group-hover:border-cyan-500/50 from-cyan-500/10",
  };

  return (
    <div className={`group relative rounded-3xl border border-white/5 bg-zinc-900/30 p-8 transition-all duration-500 ${colorMap[color].split(' ')[0]}`}>
      <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${colorMap[color].split(' ')[1]} to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl`}></div>
      <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-zinc-500 leading-relaxed font-light">
        {desc}
      </p>
    </div>
  );
}

function StepItem({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div className="flex gap-6 group">
      <div className="text-2xl font-black text-white/10 group-hover:text-purple-500/50 transition-colors">{number}</div>
      <div className="space-y-1">
        <h4 className="text-xl font-bold">{title}</h4>
        <p className="text-zinc-500 font-light">{desc}</p>
      </div>
    </div>
  );
}

function PricingCard({ name, price, features, recommended }: { name: string, price: string, features: string[], recommended?: boolean }) {
  return (
    <div className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-500 ${recommended ? 'border-purple-500 bg-white/5 scale-105 shadow-[0_0_40px_rgba(168,85,247,0.2)]' : 'border-white/5 bg-zinc-900/30 hover:border-white/10'}`}>
      {recommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-purple-500 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
          EN ÇOK TERCİH EDİLEN
        </div>
      )}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-zinc-400">{name}</h3>
        <div className="mt-4 flex items-baseline">
          <span className="text-4xl font-black tracking-tighter">₺{price}</span>
          <span className="ml-1 text-zinc-500">/ay</span>
        </div>
      </div>
      <ul className="mb-10 space-y-4 flex-1">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-3 text-sm text-zinc-300 font-light">
            <CheckCircle2 className="h-4 w-4 text-purple-500 shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <button className={`w-full rounded-2xl py-4 text-sm font-bold transition-all ${recommended ? 'bg-purple-500 text-white hover:bg-purple-600' : 'bg-white text-black hover:bg-zinc-200'}`}>
        Planı Seç
      </button>
    </div>
  );
}
