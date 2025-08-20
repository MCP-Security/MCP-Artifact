"use client";
import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, Globe } from "lucide-react";

export function NavBar() {
    return (
        <nav className="w-full z-20 sticky top-0 bg-[#f2f2ec] border-b border-[#ece9e2]">
            <div className="max-w-7xl mx-auto px-6 flex h-14 items-center justify-between gap-4">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-1">
                        <span className="inline-flex items-center justify-center w-9 h-8 rounded-md border border-[#e9e6df] bg-white shadow-sm text-lg font-bold text-[#3a393b] mr-1">
                            Ms
                        </span>
                        <span className="font-semibold text-base tracking-tight text-[#3a393b]">
                            MCP
                            <span className="text-[#be5e48]">.simulation</span>
                        </span>
                    </Link>
                </div>
                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-6 text-sm font-medium text-[#3a393b]">
                    <Link
                        href="/#"
                        className="hover:text-[#be5e48] transition-colors"
                    >
                        Explore
                    </Link>
                    <Link
                        href="/"
                        className="hover:text-[#be5e48] transition-colors"
                    >
                        Chat
                    </Link>
                    <Link
                        href="/"
                        className="hover:text-[#be5e48] transition-colors"
                    >
                        Playground
                    </Link>
                    <Link
                        href="/"
                        className="hover:text-[#be5e48] transition-colors"
                    >
                        Ranking
                    </Link>
                    <span className="relative group">
                        <button
                            className="inline-flex items-center gap-1 hover:text-[#be5e48] transition-colors"
                            disabled
                        >
                            More <ChevronDown size={16} />
                        </button>
                    </span>
                </div>
                {/* Actions */}
                <div className="flex items-center gap-3">
                    <button
                        className="flex items-center gap-1 px-2 py-1 rounded text-sm text-[#7e7973] bg-transparent hover:bg-[#ebe6db] border-none"
                        disabled
                    >
                        <Globe size={16} />
                        <span className="">English</span>
                        <ChevronDown size={16} />
                    </button>
                    <Button
                        variant="ghost"
                        className="rounded px-2 text-[#be5e48] text-sm font-medium hover:bg-[#f6ece7]"
                    >
                        Submit
                    </Button>
                    <Button className="rounded px-5 py-2 h-8 bg-[#be5e48] hover:bg-[#d17b5e] text-white text-sm font-medium">
                        Sign In
                    </Button>
                </div>
            </div>
            <div className="w-full bg-transparent pb-4 overflow-hidden">
                <div className="whitespace-nowrap animate-marquee text-[#be5e48] font-semibold text-xs">
                    Disclaimer: This site is a simulated MCP server display
                    platform. All content is fictional and for
                    research/demonstration purposes only. Do not use any server
                    from this page in real-world environments.
                    免责声明：本站点为模拟MCP服务器展示平台，网站所有内容均为虚构，仅供研究/演示之用。请勿在真实环境中使用任何源自本页面的服务器。
                </div>
            </div>
            <style jsx>{`
                @keyframes marquee {
                    0% {
                        transform: translateX(100%);
                    }
                    100% {
                        transform: translateX(-100%);
                    }
                }
                .animate-marquee {
                    display: inline-block;
                    min-width: 100%;
                    animation: marquee 30s linear infinite;
                }
            `}</style>
        </nav>
    );
}

// Avertissement : Boutique d'applis MCP simulée. Contenu
// fictif. Recherche/démo seulement. Non destiné à un usage
// réel. Отказ от ответственности: Симулятор магазина
// приложений MCP. Вымышленный контент. Только для
// исследований/демо. Не для реального использования. Descargo
// de resp.: Tienda de apps MCP simulada. Contenido ficticio.
// Solo invest./demostración. No para uso real. تنويه: هذا
// الموقع عبارة عن متجر تطبيقات MCP محاكى. جميع المحتويات
// خيالية ولأغراض البحث/العرض فقط. لا تستخدمه في البيئات
// الحقيقية.
