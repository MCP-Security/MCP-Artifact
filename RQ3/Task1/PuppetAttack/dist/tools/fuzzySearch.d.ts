/**
 * Recursively finds the closest match to a query string within text using fuzzy matching
 * @param text The text to search within
 * @param query The query string to find
 * @param start Start index in the text (default: 0)
 * @param end End index in the text (default: text.length)
 * @param parentDistance Best distance found so far (default: Infinity)
 * @returns Object with start and end indices, matched value, and Levenshtein distance
 */
export declare function recursiveFuzzyIndexOf(text: string, query: string, start?: number, end?: number | null, parentDistance?: number, depth?: number): {
    start: number;
    end: number;
    value: string;
    distance: number;
};
/**
 * Calculates the similarity ratio between two strings
 * @param a First string
 * @param b Second string
 * @returns Similarity ratio (0-1)
 */
export declare function getSimilarityRatio(a: string, b: string): number;
