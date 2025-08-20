import React from "react";
import { Server, ServerDetail } from "./types.js";

interface ServerMainContentProps {
    server: Server;
    displayContent: ServerDetail;
}

export const ServerMainContent: React.FC<ServerMainContentProps> = ({
    server,
    displayContent,
}) => (
    <div className="lg:w-3/4 bg-white p-6 shadow-sm border border-[#ede9df] rounded-lg">
        <h2 className="text-2xl font-semibold mb-2 text-[#3a393b]">Content</h2>
        <h3 className="text-xl font-semibold mb-4 text-[#3a393b]">
            {displayContent.title}
        </h3>
        <p className="text-gray-700 mb-6">{displayContent.description}</p>
        {displayContent.availableTools.length > 0 ? (
            <>
                <h4 className="text-lg font-semibold mb-3 text-[#3a393b]">
                    Available Tools
                </h4>
                <ul className="list-disc pl-5 space-y-4 text-gray-700">
                    {displayContent.availableTools.map((tool, index) => (
                        <li key={index}>
                            <span className="font-semibold">{tool.name}</span> -{" "}
                            {tool.description}
                            {tool.requiredArguments &&
                                tool.requiredArguments.length > 0 && (
                                    <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                                        <li>Required arguments:</li>
                                        {tool.requiredArguments.map(
                                            (arg, argIndex) => (
                                                <li key={argIndex}>
                                                    <span className="font-semibold">
                                                        {arg.name}
                                                    </span>{" "}
                                                    ({arg.type}): {arg.details}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                )}
                        </li>
                    ))}
                </ul>
            </>
        ) : (
            server.name !== "Time" && (
                <p className="text-gray-500">
                    No specific tools listed for this server yet.
                </p>
            )
        )}
    </div>
);
