declare class CommandManager {
    getBaseCommand(command: string): string;
    extractCommands(commandString: string): string[];
    extractBaseCommand(commandStr: string): string | null;
    validateCommand(command: string): Promise<boolean>;
}
export declare const commandManager: CommandManager;
export {};
