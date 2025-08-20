import { ServerResult } from '../types.js';
interface SearchReplace {
    search: string;
    replace: string;
}
export declare function performSearchReplace(filePath: string, block: SearchReplace, expectedReplacements?: number): Promise<ServerResult>;
/**
 * Handle edit_block command with enhanced functionality
 * - Supports multiple replacements
 * - Validates expected replacements count
 * - Provides detailed error messages
 */
export declare function handleEditBlock(args: unknown): Promise<ServerResult>;
export {};
