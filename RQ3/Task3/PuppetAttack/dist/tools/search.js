import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs/promises';
import { validatePath } from './filesystem.js';
import { rgPath } from '@vscode/ripgrep';
import { capture } from "../utils/capture.js";
// Function to search file contents using ripgrep
export async function searchCode(options) {
    const { rootPath, pattern, filePattern, ignoreCase = true, maxResults = 1000, includeHidden = false, contextLines = 0 } = options;
    // Validate path for security
    const validPath = await validatePath(rootPath);
    // Build command arguments
    const args = [
        '--json', // Output in JSON format for easier parsing
        '--line-number', // Include line numbers
    ];
    if (ignoreCase) {
        args.push('-i');
    }
    if (maxResults) {
        args.push('-m', maxResults.toString());
    }
    if (includeHidden) {
        args.push('--hidden');
    }
    if (contextLines > 0) {
        args.push('-C', contextLines.toString());
    }
    if (filePattern) {
        args.push('-g', filePattern);
    }
    // Add pattern and path
    args.push(pattern, validPath);
    // Run ripgrep command
    return new Promise((resolve, reject) => {
        const results = [];
        const rg = spawn(rgPath, args);
        let stdoutBuffer = '';
        // Store a reference to the child process for potential termination
        const childProcess = rg;
        // Store in a process list - this could be expanded to a global registry
        // of running search processes if needed for management
        globalThis.currentSearchProcess = childProcess;
        rg.stdout.on('data', (data) => {
            stdoutBuffer += data.toString();
        });
        rg.stderr.on('data', (data) => {
            console.error(`ripgrep error: ${data}`);
        });
        rg.on('close', (code) => {
            // Clean up the global reference
            if (globalThis.currentSearchProcess === childProcess) {
                delete globalThis.currentSearchProcess;
            }
            if (code === 0 || code === 1) {
                // Process the buffered output
                const lines = stdoutBuffer.trim().split('\n');
                for (const line of lines) {
                    if (!line)
                        continue;
                    try {
                        const result = JSON.parse(line);
                        if (result.type === 'match') {
                            result.data.submatches.forEach((submatch) => {
                                results.push({
                                    file: result.data.path.text,
                                    line: result.data.line_number,
                                    match: submatch.match.text
                                });
                            });
                        }
                        else if (result.type === 'context' && contextLines > 0) {
                            results.push({
                                file: result.data.path.text,
                                line: result.data.line_number,
                                match: result.data.lines.text.trim()
                            });
                        }
                    }
                    catch (error) {
                        const errorMessage = error instanceof Error ? error.message : String(error);
                        capture('server_request_error', { error: `Error parsing ripgrep output: ${errorMessage}` });
                        console.error(`Error parsing ripgrep output: ${errorMessage}`);
                    }
                }
                resolve(results);
            }
            else {
                reject(new Error(`ripgrep process exited with code ${code}`));
            }
        });
    });
}
// Fallback implementation using Node.js for environments without ripgrep
export async function searchCodeFallback(options) {
    const { rootPath, pattern, filePattern, ignoreCase = true, maxResults = 1000, excludeDirs = ['node_modules', '.git'], contextLines = 0 } = options;
    const validPath = await validatePath(rootPath);
    const results = [];
    const regex = new RegExp(pattern, ignoreCase ? 'i' : '');
    const fileRegex = filePattern ? new RegExp(filePattern) : null;
    async function searchDir(dirPath) {
        if (results.length >= maxResults)
            return;
        try {
            const entries = await fs.readdir(dirPath, { withFileTypes: true });
            for (const entry of entries) {
                if (results.length >= maxResults)
                    break;
                const fullPath = path.join(dirPath, entry.name);
                try {
                    await validatePath(fullPath);
                    if (entry.isDirectory()) {
                        if (!excludeDirs.includes(entry.name)) {
                            await searchDir(fullPath);
                        }
                    }
                    else if (entry.isFile()) {
                        if (!fileRegex || fileRegex.test(entry.name)) {
                            const content = await fs.readFile(fullPath, 'utf-8');
                            const lines = content.split('\n');
                            for (let i = 0; i < lines.length; i++) {
                                if (regex.test(lines[i])) {
                                    // Add the matched line
                                    results.push({
                                        file: fullPath,
                                        line: i + 1,
                                        match: lines[i].trim()
                                    });
                                    // Add context lines
                                    if (contextLines > 0) {
                                        const startIdx = Math.max(0, i - contextLines);
                                        const endIdx = Math.min(lines.length - 1, i + contextLines);
                                        for (let j = startIdx; j <= endIdx; j++) {
                                            if (j !== i) { // Skip the match line as it's already added
                                                results.push({
                                                    file: fullPath,
                                                    line: j + 1,
                                                    match: lines[j].trim()
                                                });
                                            }
                                        }
                                    }
                                    if (results.length >= maxResults)
                                        break;
                                }
                            }
                        }
                    }
                }
                catch (error) {
                    // Skip files/directories we can't access
                    continue;
                }
            }
        }
        catch (error) {
            // Skip directories we can't read
        }
    }
    await searchDir(validPath);
    return results;
}
// Main function that tries ripgrep first, falls back to native implementation
export async function searchTextInFiles(options) {
    try {
        return await searchCode(options);
    }
    catch (error) {
        return searchCodeFallback({
            ...options,
            excludeDirs: ['node_modules', '.git', 'dist']
        });
    }
}
