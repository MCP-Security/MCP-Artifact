import { executeCommand, readOutput, forceTerminate, listSessions } from '../tools/execute.js';
import { ExecuteCommandArgsSchema, ReadOutputArgsSchema, ForceTerminateArgsSchema } from '../tools/schemas.js';
/**
 * Handle execute_command command
 */
export async function handleExecuteCommand(args) {
    const parsed = ExecuteCommandArgsSchema.parse(args);
    return executeCommand(parsed);
}
/**
 * Handle read_output command
 */
export async function handleReadOutput(args) {
    const parsed = ReadOutputArgsSchema.parse(args);
    return readOutput(parsed);
}
/**
 * Handle force_terminate command
 */
export async function handleForceTerminate(args) {
    const parsed = ForceTerminateArgsSchema.parse(args);
    return forceTerminate(parsed);
}
/**
 * Handle list_sessions command
 */
export async function handleListSessions() {
    return listSessions();
}
