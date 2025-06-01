import React from "react";

interface BreadcrumbsProps {
    serverName: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ serverName }) => (
    <div className="flex items-center text-sm text-gray-500 mb-4">
        <a href="/" className="hover:underline">
            Home
        </a>
        <span className="mx-2">&gt;</span>
        <a href="/" className="hover:underline">
            Servers
        </a>
        <span className="mx-2">&gt;</span>
        <span className="text-gray-700">{serverName}</span>
    </div>
);
