"use client"; // Add this directive to make it a Client Component

import React from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link
import servers from "@/data/servers.json"; // Assuming you have a data file for servers
import { DefaultIcon } from "@/components/Icon"; // Assuming you have a default icon component
import { slugify } from "@/lib/utils";
import { logGAEvent } from "@/lib/gtagHelper"; // Import the GA helper
import { useLoading } from "@/components/ui/loading-context"; // Import loading context
import { useRouter } from "next/navigation"; // Import router

export function FeaturedServersSection() {
    const { showLoading } = useLoading(); // Use loading context
    const router = useRouter(); // Get router

    // Handle server card click
    const handleServerClick = (serverSlug: string, serverName: string) => {
        // Show loading state with English message
        showLoading(`Loading ${serverName} server...`);

        // Log GA event
        logGAEvent("click_server_card", {
            server_slug: serverSlug,
        });

        // Navigate to server page
        router.push(`/server/${serverSlug}?tab=content`);
    };

    return (
        <section className="max-w-7xl mx-auto px-4 mt-8 mb-12">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-[#3a393b]">
                    Latest MCP Servers
                </h2>
                <a
                    href="#"
                    className="flex items-center gap-1 text-sm text-[#be5e48] hover:underline font-semibold"
                >
                    View All
                    <span className="inline-block text-base">→</span>
                </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {servers.map((server) => {
                    const serverSlug = slugify(server.name);
                    const slugToUse = server.slug || serverSlug;

                    return (
                        <div
                            key={server.name}
                            onClick={() =>
                                handleServerClick(slugToUse, server.name)
                            }
                            className="block bg-white shadow-sm border border-[#ede9df] rounded-xl p-4 flex items-center gap-3 min-h-[100px] relative hover:shadow-md transition cursor-pointer"
                        >
                            {server.icon === "na" ? (
                                <DefaultIcon />
                            ) : (
                                <Image
                                    src={server.icon}
                                    alt={server.name + " icon"}
                                    width={32}
                                    height={32}
                                    className="rounded-md"
                                />
                            )}
                            <div className="flex flex-col flex-1 min-w-0">
                                <div className="flex items-center gap-1 mb-0.5">
                                    <span className="font-semibold text-base text-[#3a393b] truncate">
                                        {server.name}
                                    </span>
                                    {server.starred && (
                                        <span
                                            title="Featured"
                                            className="ml-1 text-[#e1b32a] text-lg"
                                        >
                                            ★
                                        </span>
                                    )}
                                </div>
                                <span
                                    className="text-xs text-[#98938d] line-clamp-2 overflow-hidden"
                                    title={server.desc}
                                >
                                    {server.desc}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
