import React from "react";
import Image from "next/image";
import { DefaultIcon } from "@/components/Icon";
import { slugify } from "@/lib/utils";
import { Server } from "./types";

interface ServerSidebarProps {
    serverConfig: any;
    recommendServers: Server[];
    isButtonDisabled: boolean;
    onTry: () => void;
    logGAEvent: (event: string, params: any) => void;
    currentServerSlug: string;
}

export const ServerSidebar: React.FC<ServerSidebarProps> = ({
    serverConfig,
    recommendServers,
    isButtonDisabled,
    onTry,
    logGAEvent,
    currentServerSlug,
}) => (
    <div className="lg:w-1/4 space-y-6">
        <button
            className={`w-full bg-[#D85A2C] text-white py-3 px-4 rounded-lg font-bold transition flex items-center justify-center gap-2 ${
                isButtonDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-opacity-90"
            }`}
            onClick={onTry}
            disabled={isButtonDisabled}
        >
            Try this server
            <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="w-4 h-4"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path>
            </svg>
        </button>
        <div
            className="bg-white p-6 shadow-sm border border-[#ede9df] rounded-lg"
            onClick={() =>
                logGAEvent("view_server_config", {
                    server_slug: currentServerSlug,
                })
            }
        >
            <h3 className="text-xl font-semibold mb-4 text-[#3a393b]">
                Server Config
            </h3>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                <code>{JSON.stringify(serverConfig, null, 2)}</code>
            </pre>
        </div>
        <div className="bg-white p-6 shadow-sm border border-[#ede9df] rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-[#3a393b]">
                Recommend Servers
            </h3>
            <div className="space-y-4">
                {recommendServers.map((recServer) => (
                    <a
                        href={`/server/${slugify(recServer.name)}?tab=content`}
                        key={recServer.name}
                        className="block p-4 border border-[#ede9df] rounded-lg hover:shadow-md transition"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 flex-shrink-0">
                                {recServer.icon === "na" ? (
                                    <DefaultIcon className="w-8 h-8" />
                                ) : (
                                    <Image
                                        src={recServer.icon}
                                        alt={recServer.name}
                                        width={32}
                                        height={32}
                                        className="rounded-md"
                                    />
                                )}
                            </div>
                            <div className="flex-grow min-w-0">
                                <h4 className="font-semibold text-[#3a393b]">
                                    {recServer.name}
                                </h4>
                                <p className="text-xs text-gray-500 line-clamp-3">
                                    {recServer.desc}
                                </p>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    </div>
);
