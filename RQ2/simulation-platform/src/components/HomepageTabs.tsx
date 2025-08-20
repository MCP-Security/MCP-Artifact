import React from "react";

interface Tab {
    name: string;
    active: boolean;
    disabled: boolean;
}

export function HomepageTabs() {
    const tabs: Tab[] = [
        { name: "Latest", active: true, disabled: false },
        { name: "Featured", active: false, disabled: true },
        { name: "Clients", active: false, disabled: true },
        { name: "Hosted", active: false, disabled: true },
        { name: "Official", active: false, disabled: true },
    ];

    return (
        <div className="flex justify-center w-full border-b border-[#ece9e2] bg-[#f2f2ec] px-2 mb-6">
            <div className="flex gap-2 md:gap-4 py-2 text-sm font-medium overflow-x-auto max-w-full">
                {tabs.map((tab) => (
                    <button
                        key={tab.name}
                        disabled={tab.disabled}
                        className={`px-3 md:px-4 py-1 rounded transition-colors whitespace-nowrap
                            ${
                                tab.active
                                    ? "bg-[#fff4ee] text-[#be5e48] border border-[#ffe0cf] shadow-sm"
                                    : "text-[#7e7973] hover:bg-[#f7f4ed] hover:text-[#be5e48]"
                            }
                            ${
                                tab.disabled
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                            }
                        `}
                    >
                        {tab.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
