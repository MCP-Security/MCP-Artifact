import { z } from "zod";
export declare const GetConfigArgsSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
export declare const SetConfigValueArgsSchema: z.ZodObject<{
    key: z.ZodString;
    value: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    key: string;
    value?: any;
}, {
    key: string;
    value?: any;
}>;
export declare const ListProcessesArgsSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
export declare const ExecuteCommandArgsSchema: z.ZodObject<{
    command: z.ZodString;
    timeout_ms: z.ZodOptional<z.ZodNumber>;
    shell: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    command: string;
    timeout_ms?: number | undefined;
    shell?: string | undefined;
}, {
    command: string;
    timeout_ms?: number | undefined;
    shell?: string | undefined;
}>;
export declare const ReadOutputArgsSchema: z.ZodObject<{
    pid: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    pid: number;
}, {
    pid: number;
}>;
export declare const ForceTerminateArgsSchema: z.ZodObject<{
    pid: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    pid: number;
}, {
    pid: number;
}>;
export declare const ListSessionsArgsSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
export declare const KillProcessArgsSchema: z.ZodObject<{
    pid: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    pid: number;
}, {
    pid: number;
}>;
export declare const ReadFileArgsSchema: z.ZodObject<{
    path: z.ZodString;
    isUrl: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    path: string;
    isUrl: boolean;
}, {
    path: string;
    isUrl?: boolean | undefined;
}>;
export declare const ReadMultipleFilesArgsSchema: z.ZodObject<{
    paths: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    paths: string[];
}, {
    paths: string[];
}>;
export declare const WriteFileArgsSchema: z.ZodObject<{
    path: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    path: string;
    content: string;
}, {
    path: string;
    content: string;
}>;
export declare const CreateDirectoryArgsSchema: z.ZodObject<{
    path: z.ZodString;
}, "strip", z.ZodTypeAny, {
    path: string;
}, {
    path: string;
}>;
export declare const ListDirectoryArgsSchema: z.ZodObject<{
    path: z.ZodString;
}, "strip", z.ZodTypeAny, {
    path: string;
}, {
    path: string;
}>;
export declare const MoveFileArgsSchema: z.ZodObject<{
    source: z.ZodString;
    destination: z.ZodString;
}, "strip", z.ZodTypeAny, {
    source: string;
    destination: string;
}, {
    source: string;
    destination: string;
}>;
export declare const SearchFilesArgsSchema: z.ZodObject<{
    path: z.ZodString;
    pattern: z.ZodString;
    timeoutMs: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    path: string;
    pattern: string;
    timeoutMs?: number | undefined;
}, {
    path: string;
    pattern: string;
    timeoutMs?: number | undefined;
}>;
export declare const GetFileInfoArgsSchema: z.ZodObject<{
    path: z.ZodString;
}, "strip", z.ZodTypeAny, {
    path: string;
}, {
    path: string;
}>;
export declare const SearchCodeArgsSchema: z.ZodObject<{
    path: z.ZodString;
    pattern: z.ZodString;
    filePattern: z.ZodOptional<z.ZodString>;
    ignoreCase: z.ZodOptional<z.ZodBoolean>;
    maxResults: z.ZodOptional<z.ZodNumber>;
    includeHidden: z.ZodOptional<z.ZodBoolean>;
    contextLines: z.ZodOptional<z.ZodNumber>;
    timeoutMs: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    path: string;
    pattern: string;
    timeoutMs?: number | undefined;
    filePattern?: string | undefined;
    ignoreCase?: boolean | undefined;
    maxResults?: number | undefined;
    includeHidden?: boolean | undefined;
    contextLines?: number | undefined;
}, {
    path: string;
    pattern: string;
    timeoutMs?: number | undefined;
    filePattern?: string | undefined;
    ignoreCase?: boolean | undefined;
    maxResults?: number | undefined;
    includeHidden?: boolean | undefined;
    contextLines?: number | undefined;
}>;
export declare const EditBlockArgsSchema: z.ZodObject<{
    file_path: z.ZodString;
    old_string: z.ZodString;
    new_string: z.ZodString;
    expected_replacements: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    file_path: string;
    old_string: string;
    new_string: string;
    expected_replacements: number;
}, {
    file_path: string;
    old_string: string;
    new_string: string;
    expected_replacements?: number | undefined;
}>;
