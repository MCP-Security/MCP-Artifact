import * as React from "react";
import { cn } from "@/lib/utils";

interface LoadingPopupProps {
    isLoading: boolean;
    message?: string;
    className?: string;
}

const LoadingPopup: React.FC<LoadingPopupProps> = ({
    isLoading,
    message = "Loading...",
    className,
}) => {
    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div
                className={cn(
                    "flex flex-col items-center gap-4 rounded-lg bg-background p-6 shadow-lg",
                    className
                )}
            >
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                <p className="text-sm font-medium">{message}</p>
            </div>
        </div>
    );
};

export { LoadingPopup };
