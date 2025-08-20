// Usage: npx tsx index.test.ts
import { test, describe } from "node:test";
import assert from "node:assert";
import * as lancedb from "@lancedb/lancedb";
import path from "node:path";
import os from "node:os";
import { LanceSchema } from "@lancedb/lancedb/embedding";
import { Utf8 } from "apache-arrow";
import {
  createNotesTable,
  indexNotes,
  OnDeviceEmbeddingFunction,
  searchAndCombineResults,
} from "./index";

describe("Apple Notes Indexing", async () => {
  const db = await lancedb.connect(
    path.join(os.homedir(), ".mcp-apple-notes", "data")
  );
  const func = new OnDeviceEmbeddingFunction();

  const notesSchema = LanceSchema({
    title: func.sourceField(new Utf8()),
    content: func.sourceField(new Utf8()),
    creation_date: func.sourceField(new Utf8()),
    modification_date: func.sourceField(new Utf8()),
    vector: func.vectorField(),
  });

  test("should create notes table", async () => {
    const notesTable = await db.createEmptyTable("test-notes", notesSchema, {
      mode: "create",
      existOk: true,
    });

    assert.ok(notesTable, "Notes table should be created");
    const count = await notesTable.countRows();
    assert.ok(typeof count === "number", "Should be able to count rows");
  });

  test.skip("should index all notes correctly", async () => {
    const { notesTable } = await createNotesTable("test-notes");

    await indexNotes(notesTable);

    const count = await notesTable.countRows();
    assert.ok(typeof count === "number", "Should be able to count rows");
    assert.ok(count > 0, "Should be able to count rows");
  });

  test("should perform vector search", async () => {
    const start = performance.now();
    const { notesTable } = await createNotesTable("test-notes");
    const end = performance.now();
    console.log(`Creating table took ${Math.round(end - start)}ms`);

    await notesTable.add([
      {
        id: "1",
        title: "Test Note",
        content: "This is a test note content",
        creation_date: new Date().toISOString(),
        modification_date: new Date().toISOString(),
      },
    ]);

    const addEnd = performance.now();
    console.log(`Adding notes took ${Math.round(addEnd - end)}ms`);

    const results = await searchAndCombineResults(notesTable, "test note");

    const combineEnd = performance.now();
    console.log(`Combining results took ${Math.round(combineEnd - addEnd)}ms`);

    assert.ok(results.length > 0, "Should return search results");
    assert.equal(results[0].title, "Test Note", "Should find the test note");
  });

  test("should perform vector search on real indexed data", async () => {
    const { notesTable } = await createNotesTable("test-notes");

    const results = await searchAndCombineResults(notesTable, "15/12");

    assert.ok(results.length > 0, "Should return search results");
    assert.equal(results[0].title, "Test Note", "Should find the test note");
  });
});
