import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
/**
 * Extended StdioServerTransport that filters out non-JSON messages.
 * This prevents the "Watching /" error from crashing the server.
 */
export declare class FilteredStdioServerTransport extends StdioServerTransport {
    constructor();
}
