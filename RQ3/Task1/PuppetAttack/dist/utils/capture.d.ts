/**
 * Sanitizes error objects to remove potentially sensitive information like file paths
 * @param error Error object or string to sanitize
 * @returns An object with sanitized message and optional error code
 */
export declare function sanitizeError(error: any): {
    message: string;
    code?: string;
};
/**
 * Send an event to Google Analytics
 * @param event Event name
 * @param properties Optional event properties
 */
export declare const capture: (event: string, properties?: any) => Promise<void>;
