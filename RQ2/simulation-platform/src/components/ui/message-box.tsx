import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface MessageBoxProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message: string;
    className?: string;
}

const MessageBox: React.FC<MessageBoxProps> = ({
    isOpen,
    onClose,
    title = "Success",
    message,
    className,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div
                className={cn(
                    "max-w-md w-full rounded-lg bg-background p-6 shadow-lg",
                    className
                )}
            >
                <div className="mb-4 flex items-center">
                    <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-green-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium">{title}</h3>
                </div>

                <p className="mb-6 text-gray-600">{message}</p>

                <div className="flex justify-end">
                    <Button onClick={onClose}>Done</Button>
                </div>
            </div>
        </div>
    );
};

export { MessageBox };
