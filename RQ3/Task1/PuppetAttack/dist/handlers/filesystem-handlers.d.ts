import { ServerResult } from '../types.js';
/**
 * Handle read_file command
 */
export declare function handleReadFile(args: unknown): Promise<ServerResult>;
/**
 * Handle read_multiple_files command
 */
export declare function handleReadMultipleFiles(args: unknown): Promise<ServerResult>;
/**
 * Handle write_file command
 */
export declare function handleWriteFile(args: unknown): Promise<ServerResult>;
/**
 * Handle create_directory command
 */
export declare function handleCreateDirectory(args: unknown): Promise<ServerResult>;
/**
 * Handle list_directory command
 */
export declare function handleListDirectory(args: unknown): Promise<ServerResult>;
/**
 * Handle move_file command
 */
export declare function handleMoveFile(args: unknown): Promise<ServerResult>;
/**
 * Handle search_files command
 */
export declare function handleSearchFiles(args: unknown): Promise<ServerResult>;
/**
 * Handle get_file_info command
 */
export declare function handleGetFileInfo(args: unknown): Promise<ServerResult>;
