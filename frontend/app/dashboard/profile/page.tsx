"use client";

import { motion } from "framer-motion";
import {
    User,
    Award,
    Zap,
    Activity,
    Terminal,
    Cpu,
    ShieldCheck,
    Code,
    Github,
    Linkedin,
    MapPin,
    Calendar
} from "lucide-react";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
};

export default function ProfilePage() {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-10"
        >
            {/* Header / Cover Section */}
            <div className="relative rounded-3xl h-64 overflow-hidden border border-white/5 bg-zinc-900/40">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-blue-600/20"></div>
                <div className="absolute bottom-0 left-0 p-10 flex items-end gap-8">
                    <div className="h-32 w-32 rounded-3xl bg-black border-4 border-zinc-950 flex items-center justify-center text-zinc-800 shadow-2xl relative">
                        <User className="h-16 w-16" />
                        <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-xl bg-purple-600 border-4 border-zinc-950 flex items-center justify-center text-white">
                            <Award className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="pb-2">
                        <h1 className="text-4xl font-black text-white tracking-tight">Bahattin Yunus Çetin</h1>
                        <p className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-[10px] mt-1 flex items-center gap-2">
                            Senior IT Architect & Strategic Software Engineer <span className="h-1 w-1 rounded-full bg-zinc-700"></span> <MapPin className="h-3 w-3" /> Istanbul, TR
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Tactical Stats */}
                <motion.div variants={item} className="space-y-6">
                    <div className="rounded-3xl border border-white/5 bg-zinc-900/20 p-8">
                        <h3 className="text-xs font-black text-zinc-600 uppercase tracking-widest mb-6">Sistem Yetkinlikleri</h3>
                        <div className="space-y-5">
                            <SkillBar label="Mimari Tasarım" progress={98} />
                            <SkillBar label="Blokzincir Entegrasyonu" progress={92} />
                            <SkillBar label="Yapay Zeka / NLP" progress={85} />
                            <SkillBar label="DevOps & Güvenlik" progress={95} />
                        </div>
                    </div>

                    <div className="rounded-3xl border border-white/5 bg-zinc-900/20 p-8">
                        <h3 className="text-xs font-black text-zinc-600 uppercase tracking-widest mb-6">Operasyonel Bağlantılar</h3>
                        <div className="flex flex-col gap-3">
                            <SocialButton icon={<Github className="h-4 w-4" />} label="GitHub" href="https://github.com/bahattinyunus" />
                            <SocialButton icon={<Linkedin className="h-4 w-4" />} label="LinkedIn" href="https://www.linkedin.com/in/bahattinyunus/" />
                        </div>
                    </div>
                </motion.div>

                {/* Main Experience / Log */}
                <motion.div variants={item} className="lg:col-span-2 space-y-8">
                    <div className="rounded-3xl border border-white/5 bg-zinc-900/20 p-10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform">
                            <Terminal className="h-24 w-24 text-purple-500" />
                        </div>
                        <h2 className="text-xl font-black text-white mb-6">E-VİZÖR Pro Misyonu</h2>
                        <p className="text-zinc-400 leading-relaxed font-light">
                            "Finansal verinin sadece saklanması değil, mühürlenmesi gerektiğine inanıyorum. E-VİZÖR Pro, mali müşavirlik mesleğini IT keskinliğiyle donatan,
                            otonom denetim mekanizmalarını blokzincir güvencesiyle sunan bir Metal Yaka vizyonudur."
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
                            <SmallStat label="Deployment" value="Stable" color="text-green-400" />
                            <SmallStat label="Uptime" value="99.9%" color="text-blue-400" />
                            <SmallStat label="Security" value="Lvl 4" color="text-purple-400" />
                            <SmallStat label="Protocol" value="SHA-256" color="text-amber-400" />
                        </div>
                    </div>

                    <div className="rounded-3xl border border-white/5 bg-zinc-900/20 p-10">
                        <h2 className="text-xl font-black text-white mb-8">Sistem Başarımları</h2>
                        <div className="space-y-6">
                            <AchievementItem
                                icon={<ShieldCheck className="h-5 w-5" />}
                                title="Blokzincir Mimarı"
                                desc="Private Net altyapısı başarıyla mühürlendi."
                            />
                            <AchievementItem
                                icon={<Cpu className="h-5 w-5" />}
                                title="OVEYS Entegrasyonu"
                                desc="Yapay zeka mevzuat analiz motoru devreye alındı."
                            />
                            <AchievementItem
                                icon={<Zap className="h-5 w-5" />}
                                title="Gerçek Zamanlı Senkron"
                                desc="Milisaniyelik evrak işleme hızına ulaşıldı."
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

function SkillBar({ label, progress }: any) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                <span className="text-zinc-500">{label}</span>
                <span className="text-white">{progress}%</span>
            </div>
            <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-purple-500"
                />
            </div>
        </div>
    );
}

function SocialButton({ icon, label, href }: any) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 w-full p-4 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 hover:bg-white/10 transition-all text-sm font-bold text-zinc-400 hover:text-white"
        >
            {icon} {label}
        </a>
    );
}

function SmallStat({ label, value, color }: any) {
    return (
        <div className="p-4 rounded-xl bg-black/40 border border-white/5">
            <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">{label}</p>
            <p className={`text-sm font-black ${color}`}>{value}</p>
        </div>
    );
}

function AchievementItem({ icon, title, desc }: any) {
    return (
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all">
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-tight">{title}</h4>
                <p className="text-xs text-zinc-500 mt-0.5">{desc}</p>
            </div>
        </div>
    );
}
