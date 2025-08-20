/**
 * Validates a path to ensure it can be accessed or created.
 * For existing paths, returns the real path (resolving symlinks).
 * For non-existent paths, validates parent directories to ensure they exist.
 *
 * @param requestedPath The path to validate
 * @returns Promise<string> The validated path
 * @throws Error if the path or its parent directories don't exist or if the path is not allowed
 */
export declare function validatePath(requestedPath: string): Promise<string>;
export interface FileResult {
    content: string;
    mimeType: string;
    isImage: boolean;
}
/**
 * Read file content from a URL
 * @param url URL to fetch content from
 * @returns File content or file result with metadata
 */
export declare function readFileFromUrl(url: string): Promise<FileResult>;
/**
 * Read file content from the local filesystem
 * @param filePath Path to the file
 * @param returnMetadata Whether to return metadata with the content
 * @returns File content or file result with metadata
 */
export declare function readFileFromDisk(filePath: string): Promise<FileResult>;
/**
 * Read a file from either the local filesystem or a URL
 * @param filePath Path to the file or URL
 * @param returnMetadata Whether to return metadata with the content
 * @param isUrl Whether the path is a URL
 * @returns File content or file result with metadata
 */
export declare function readFile(filePath: string, isUrl?: boolean): Promise<FileResult>;
export declare function writeFile(filePath: string, content: string): Promise<void>;
export interface MultiFileResult {
    path: string;
    content?: string;
    mimeType?: string;
    isImage?: boolean;
    error?: string;
}
export declare function readMultipleFiles(paths: string[]): Promise<MultiFileResult[]>;
export declare function createDirectory(dirPath: string): Promise<void>;
export declare function listDirectory(dirPath: string): Promise<string[]>;
export declare function moveFile(sourcePath: string, destinationPath: string): Promise<void>;
export declare function searchFiles(rootPath: string, pattern: string): Promise<string[]>;
export declare function getFileInfo(filePath: string): Promise<Record<string, any>>;
