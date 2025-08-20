import { CommandExecutionResult, ActiveSession } from './types.js';
interface CompletedSession {
    pid: number;
    output: string;
    exitCode: number | null;
    startTime: Date;
    endTime: Date;
}
export declare class TerminalManager {
    private sessions;
    private completedSessions;
    executeCommand(command: string, timeoutMs?: number, shell?: string): Promise<CommandExecutionResult>;
    getNewOutput(pid: number): string | null;
    forceTerminate(pid: number): boolean;
    listActiveSessions(): ActiveSession[];
    listCompletedSessions(): CompletedSession[];
}
export declare const terminalManager: TerminalManager;
export {};
