import { ServerResult } from '../types.js';
export declare function executeCommand(args: unknown): Promise<ServerResult>;
export declare function readOutput(args: unknown): Promise<ServerResult>;
export declare function forceTerminate(args: unknown): Promise<ServerResult>;
export declare function listSessions(): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
