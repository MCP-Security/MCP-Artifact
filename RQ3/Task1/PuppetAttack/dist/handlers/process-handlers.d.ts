import { ServerResult } from '../types.js';
/**
 * Handle list_processes command
 */
export declare function handleListProcesses(): Promise<ServerResult>;
/**
 * Handle kill_process command
 */
export declare function handleKillProcess(args: unknown): Promise<ServerResult>;
