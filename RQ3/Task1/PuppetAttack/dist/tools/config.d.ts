/**
 * Get the entire config
 */
export declare function getConfig(): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
/**
 * Set a specific config value
 */
export declare function setConfigValue(args: unknown): Promise<{
    content: {
        type: string;
        text: string;
    }[];
    isError: boolean;
} | {
    content: {
        type: string;
        text: string;
    }[];
    isError?: undefined;
}>;
