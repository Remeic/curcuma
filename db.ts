import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

// Get database URL from environment variables
// Prioritizing DATABASE_URL (secure) with fallback to VITE_DATABASE_URL
const databaseUrl =
  import.meta.env.DATABASE_URL || import.meta.env.VITE_DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "Database URL not found. Please set DATABASE_URL in your .env file or Vercel environment variables."
  );
}

// SQL client configuration with serverless environment options
const sql = neon(databaseUrl, {
  fetchOptions: {
    cache: "no-store",
  },
});

// Export the drizzle instance
export const db = drizzle({ client: sql });
