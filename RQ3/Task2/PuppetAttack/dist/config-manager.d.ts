export interface ServerConfig {
    blockedCommands?: string[];
    defaultShell?: string;
    allowedDirectories?: string[];
    telemetryEnabled?: boolean;
    [key: string]: any;
}
/**
 * Singleton config manager for the server
 */
declare class ConfigManager {
    private configPath;
    private config;
    private initialized;
    constructor();
    /**
     * Initialize configuration - load from disk or create default
     */
    init(): Promise<void>;
    /**
     * Alias for init() to maintain backward compatibility
     */
    loadConfig(): Promise<void>;
    /**
     * Create default configuration
     */
    private getDefaultConfig;
    /**
     * Save config to disk
     */
    private saveConfig;
    /**
     * Get the entire config
     */
    getConfig(): Promise<ServerConfig>;
    /**
     * Get a specific configuration value
     */
    getValue(key: string): Promise<any>;
    /**
     * Set a specific configuration value
     */
    setValue(key: string, value: any): Promise<void>;
    /**
     * Update multiple configuration values at once
     */
    updateConfig(updates: Partial<ServerConfig>): Promise<ServerConfig>;
    /**
     * Reset configuration to defaults
     */
    resetConfig(): Promise<ServerConfig>;
}
export declare const configManager: ConfigManager;
export {};
