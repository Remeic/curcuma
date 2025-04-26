import { memosTable } from "./schema";
import { db } from "../../db";

// Funzione per ottenere tutte le memo
export async function getMemos() {
  return db.select().from(memosTable);
}

// Funzione per creare una nuova memo
export async function createMemo(content: string) {
  const result = await db
    .insert(memosTable)
    .values({
      content,
      title: "test",
    })
    .returning({ id: memosTable.id });

  return result[0];
}
