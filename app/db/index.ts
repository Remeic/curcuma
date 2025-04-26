import { memosTable } from "./schema";
import { db } from "../../db";
import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm/sql";

// Function to get all memos
export async function getMemos() {
  try {
    console.log("Attempting to retrieve memos from database...");
    const memos = await db.select().from(memosTable);
    console.log(`Successfully retrieved ${memos.length} memos`);
    return memos;
  } catch (error) {
    console.error("Error retrieving memos:", error);
    throw new Error(`Error retrieving memos: ${error.message}`);
  }
}

// Function to create a new memo
export async function createMemo(content: string) {
  try {
    console.log("Attempting to create a new memo...");
    const result = await db
      .insert(memosTable)
      .values({
        content,
        title: "test",
      })
      .returning({ id: memosTable.id });

    console.log("Memo created successfully:", result[0]);
    return result[0];
  } catch (error) {
    console.error("Error creating memo:", error);
    throw new Error(`Error creating memo: ${error.message}`);
  }
}
