"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        // Simulate network request
        setTimeout(() => {
            setIsLoading(false);
            // Redirect or handle login
        }, 2000);
    }

    return (
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black font-sans text-white">
            {/* Background Effects */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-black [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] opacity-40"></div>
            <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-purple-500/20 blur-[128px]"></div>
            <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-blue-500/20 blur-[128px]"></div>

            <div className="w-full max-w-md p-8">
                <div className="mb-8 text-center">
                    <Link href="/" className="inline-block text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
                        E-VİZÖR
                    </Link>
                    <h1 className="text-3xl font-semibold tracking-tight text-white">Giriş Yap</h1>
                    <p className="mt-2 text-sm text-zinc-400">
                        Otonom vergi yönetimi platformuna hoş geldiniz.
                    </p>
                </div>

                <div className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-xl transition-all hover:border-zinc-700">
                    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none text-zinc-300" htmlFor="email">
                                E-Posta
                            </label>
                            <input
                                className="flex h-12 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
                                id="email"
                                placeholder="ornek@sirket.com"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium leading-none text-zinc-300" htmlFor="password">
                                    Şifre
                                </label>
                                <Link
                                    href="/auth/forgot-password"
                                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                                >
                                    Şifremi Unuttum?
                                </Link>
                            </div>
                            <input
                                className="flex h-12 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
                                id="password"
                                placeholder="••••••••"
                                type="password"
                                autoComplete="current-password"
                                required
                            />
                        </div>
                        <button
                            className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-8 text-sm font-medium text-white transition-all hover:opacity-90 active:scale-95 disabled:pointer-events-none disabled:opacity-50"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                    Giriş Yapılıyor...
                                </div>
                            ) : (
                                "Giriş Yap"
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-zinc-500">Hesabınız yok mu? </span>
                        <Link href="/auth/register" className="font-medium text-white hover:text-purple-400 transition-colors">
                            Hemen Kaydolun
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
