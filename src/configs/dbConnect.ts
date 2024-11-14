import { neon } from '@neondatabase/serverless'
import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/neon-http'

config({ path: '.env' }) // or .env.local

const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL as string)
export const db = drizzle({ client: sql }) //exporting the db so that we can use it in other files
