import React from "react";
import Link from "next/link";
import { slugify } from "@/lib/utils"; // Import slugify from utils

interface Tab {
    name: string;
    href: string;
    icon: string; // Added icon
    slug: string; // Added slug for comparison
}

interface ServersTabsProps {
    serverName: string;
    activeTab: string;
}

export function ServersTabs({ serverName, activeTab }: ServersTabsProps) {
    const tabsData = [
        { name: "Overview", slug: "overview", icon: "ⓘ" },
        { name: "Content", slug: "content", icon: "📄" },
        { name: "Tools", slug: "tools", icon: "🛠️" },
        { name: "Comments", slug: "comments", icon: "💬" },
    ];

    const serverSlug = slugify(serverName);

    const tabs: Tab[] = tabsData.map((tab) => ({
        name: tab.name,
        href: `/server/${serverSlug}?tab=${tab.slug}`,
        icon: tab.icon,
        slug: tab.slug,
    }));

    return (
        <div className="flex justify-center w-full border-b border-[#ece9e2] px-2 mb-6">
            {" "}
            {/* Removed bg-[#f2f2ec] */}
            <div className="flex gap-2 md:gap-4 py-2 text-sm font-medium overflow-x-auto max-w-full">
                {tabs.map((tab) => (
                    <Link
                        href={tab.href}
                        key={tab.name}
                        className={`flex items-center gap-1.5 px-3 md:px-4 py-2 transition-colors whitespace-nowrap
              ${
                  activeTab === tab.slug
                      ? "border-b-2 border-[#D85A2C] text-[#D85A2C]" // Active style: orange text and border
                      : "text-[#7e7973] hover:text-[#D85A2C] border-b-2 border-transparent" // Inactive style: gray text, hover orange text, transparent border for consistent height
              }
            `}
                    >
                        <span>{tab.icon}</span>
                        <span>{tab.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
