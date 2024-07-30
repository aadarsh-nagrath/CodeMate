import { defineConfig } from 'drizzle-kit'
import { config } from 'dotenv'

config() // Load .env file
export default defineConfig({
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
})
