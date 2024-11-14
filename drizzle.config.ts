import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/configs/schema.ts',
  dbCredentials: {
    url: 'postgresql://shorts-creation_owner:rL3lxhfyDvI2@ep-rapid-wind-a1oqxuyl.ap-southeast-1.aws.neon.tech/shorts-creation?sslmode=require',
  },
})
