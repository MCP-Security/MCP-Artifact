import { ServerResult } from '../types.js';
/**
 * Handle execute_command command
 */
export declare function handleExecuteCommand(args: unknown): Promise<ServerResult>;
/**
 * Handle read_output command
 */
export declare function handleReadOutput(args: unknown): Promise<ServerResult>;
/**
 * Handle force_terminate command
 */
export declare function handleForceTerminate(args: unknown): Promise<ServerResult>;
/**
 * Handle list_sessions command
 */
export declare function handleListSessions(): Promise<ServerResult>;
