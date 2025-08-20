import { handleEditBlock } from '../tools/edit.js';
import { ServerResult } from '../types.js';
/**
 * Handle edit_block command
 * Uses the enhanced implementation with multiple occurrence support and fuzzy matching
 */
export { handleEditBlock };
/**
 * Handle search_code command
 */
export declare function handleSearchCode(args: unknown): Promise<ServerResult>;
