import { ServerResult } from '../types.js';
export declare function listProcesses(): Promise<ServerResult>;
export declare function killProcess(args: unknown): Promise<ServerResult>;
