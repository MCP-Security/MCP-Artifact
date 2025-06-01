import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer"; // Import the Footer component
import Script from "next/script"; // Import Script

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "MCP Servers",
    description:
        "The largest collection of MCP Servers, including Awesome MCP Servers and Claude MCP integration.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable}`}
        >
            <body suppressHydrationWarning>
                <div className="min-h-screen relative font-sans text-[#3a393b] bg-[#f2f2ec] flex flex-col">
                    {/* NavBar at top */}
                    <NavBar />
                    <ClientBody>{children}</ClientBody>
                    <Footer />
                </div>
                {/* Google Analytics Scripts */}
                <Script
                    strategy="afterInteractive"
                    src="https://www.googletagmanager.com/gtag/js?id=G-6LQ5NBSZXF"
                />
                <Script
                    id="google-analytics-inline"
                    strategy="afterInteractive"
                >
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-6LQ5NBSZXF');
                    `}
                </Script>
            </body>
        </html>
    );
}
