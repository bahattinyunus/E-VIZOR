"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    ShieldCheck,
    Cpu,
    Database,
    CheckCircle2,
    AlertCircle
} from "lucide-react";
import { useEffect, useState } from "react";

interface ProcessingOverlayProps {
    isVisible: boolean;
    onComplete: () => void;
    fileName: string;
}

export function ProcessingOverlay({ isVisible, onComplete, fileName }: ProcessingOverlayProps) {
    const [step, setStep] = useState(0);

    const steps = [
        { id: 0, label: "OCR ANALİZİ", icon: <Cpu className="h-5 w-5" />, desc: "Yapay zeka verileri ayrıştırıyor..." },
        { id: 1, label: "VERGİ SINIFLANDIRMA", icon: <Database className="h-5 w-5" />, desc: "Mevzuat uyumluluğu kontrol ediliyor..." },
        { id: 2, label: "BLOKZİNCİR MÜHÜRLEME", icon: <ShieldCheck className="h-5 w-5" />, desc: "Private Net üzerinde Hash mühürleniyor..." },
        { id: 3, label: "İŞLEM TAMAMLANDI", icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />, desc: "Evrak güvenli bir şekilde arşive eklendi." }
    ];

    useEffect(() => {
        if (isVisible) {
            setStep(0);
            const timers = [
                setTimeout(() => setStep(1), 1500),
                setTimeout(() => setStep(2), 3000),
                setTimeout(() => setStep(3), 4500),
                setTimeout(() => {
                    onComplete();
                }, 6000)
            ];
            return () => timers.forEach(clearTimeout);
        }
    }, [isVisible, onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md p-6"
                >
                    <div className="w-full max-w-lg text-center">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="mb-12"
                        >
                            <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-6 relative">
                                <div className="absolute inset-0 rounded-3xl border-2 border-purple-500/50 animate-ping opacity-20"></div>
                                {steps[step].icon}
                            </div>
                            <h2 className="text-2xl font-black text-white tracking-tight uppercase">{steps[step].label}</h2>
                            <p className="text-zinc-500 text-sm mt-2">{fileName}</p>
                        </motion.div>

                        <div className="space-y-4 mb-12">
                            {steps.map((s, i) => (
                                <div key={s.id} className="flex items-center gap-4 text-left">
                                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center border transition-all duration-500 ${step >= i ? "bg-purple-500/20 border-purple-500 text-purple-400" : "bg-white/5 border-white/5 text-zinc-700"
                                        }`}>
                                        {step > i ? <CheckCircle2 className="h-4 w-4" /> : <span className="text-[10px] font-bold">{i + 1}</span>}
                                    </div>
                                    <div className="flex-1">
                                        <p className={`text-xs font-bold transition-colors ${step >= i ? "text-white" : "text-zinc-700"}`}>{s.label}</p>
                                        <p className={`text-[10px] transition-colors ${step === i ? "text-zinc-400" : "text-zinc-800"}`}>{s.desc}</p>
                                    </div>
                                    {step === i && i < 3 && (
                                        <div className="h-1 w-20 bg-zinc-900 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: 1.5, ease: "linear" }}
                                                className="h-full bg-purple-500"
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                            <div className="flex items-center gap-3 text-left">
                                <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
                                <p className="text-[10px] text-zinc-500 leading-relaxed font-light">
                                    Bu işlem geri döndürülemez bir blokzincir kaydı oluşturur. Lütfen sayfayı kapatmayın.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
