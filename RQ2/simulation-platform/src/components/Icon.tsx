import * as React from "react";

interface DefaultIconProps {
    className?: string;
}

export function DefaultIcon({ className }: DefaultIconProps) {
    return (
        <span
            className={`inline-flex items-center justify-center w-8 h-8 rounded-md border border-[#e9e6df] bg-white shadow-sm text-md font-bold text-[#3a393b] ${className}`}
        >
            Ms
        </span>
    );
}
