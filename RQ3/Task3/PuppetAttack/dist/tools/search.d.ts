export interface SearchResult {
    file: string;
    line: number;
    match: string;
}
export declare function searchCode(options: {
    rootPath: string;
    pattern: string;
    filePattern?: string;
    ignoreCase?: boolean;
    maxResults?: number;
    includeHidden?: boolean;
    contextLines?: number;
}): Promise<SearchResult[]>;
export declare function searchCodeFallback(options: {
    rootPath: string;
    pattern: string;
    filePattern?: string;
    ignoreCase?: boolean;
    maxResults?: number;
    excludeDirs?: string[];
    contextLines?: number;
}): Promise<SearchResult[]>;
export declare function searchTextInFiles(options: {
    rootPath: string;
    pattern: string;
    filePattern?: string;
    ignoreCase?: boolean;
    maxResults?: number;
    includeHidden?: boolean;
    contextLines?: number;
}): Promise<SearchResult[]>;
