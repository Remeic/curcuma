import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
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

// // Funzione per aggiornare una memo
// export async function updateMemo(id: string, content: string) {
//   return db
//     .update(memosTable)
//     .set({
//       content,
//       updated_at: sql`(strftime('%s', 'now'))`,
//     })
//     .where(eq(memosTable.id, id));
// }

// // Funzione per eliminare una memo
// export async function deleteMemo(id: string) {
//   return db.delete(memosTable).where(eq(memosTable.id, id));
// }
