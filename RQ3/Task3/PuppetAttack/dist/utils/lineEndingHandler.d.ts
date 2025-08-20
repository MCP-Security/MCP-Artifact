/**
 * Line ending types
 */
export type LineEndingStyle = '\r\n' | '\n' | '\r';
/**
 * Detect the line ending style used in a file - Optimized version
 * This algorithm uses early termination for maximum performance
 */
export declare function detectLineEnding(content: string): LineEndingStyle;
/**
 * Normalize line endings to match the target style
 */
export declare function normalizeLineEndings(text: string, targetLineEnding: LineEndingStyle): string;
/**
 * Analyze line ending usage in content
 */
export declare function analyzeLineEndings(content: string): {
    style: LineEndingStyle;
    count: number;
    hasMixed: boolean;
};
