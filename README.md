# curcuma-start

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run dev
```

## Environment Variables

For security reasons, this project uses `DATABASE_URL` (without the VITE_ prefix) for database connections to avoid exposing database credentials to the frontend.

Create a `.env` file in the project root with:

```
DATABASE_URL=postgresql://username:password@your-neon-db-url.neon.tech/dbname?sslmode=require
```

**Important**: When using Vite/Vinxi, only variables prefixed with `VITE_` are normally exposed to the client. However, we've configured the project to also recognize `DATABASE_` prefixed variables while keeping them secure from the frontend.

When deploying to Vercel, add the `DATABASE_URL` variable in the Vercel dashboard (Settings → Environment Variables).

## Database Management

This project uses Drizzle ORM with Neon PostgreSQL. The following commands are available:

```bash
# Generate migrations based on your schema changes
bun run db:generate

# Apply migrations to the database
bun run db:migrate

# Push schema changes directly to the database (dev only)
bun run db:push

# View and manage your database with Drizzle Studio
bun run db:studio

# Drop the database (use with caution)
bun run db:drop
```

This project was created using `bun init` in bun v1.2.3. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
