import { z } from 'zod'

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  DATABASE_URL: z.string().url().optional(),
  PORT: z.string().transform(Number).default('3000')
})

export type EnvVars = z.infer<typeof envSchema>

export function validateEnv(raw: Record<string, unknown>): EnvVars {
  const parsed = envSchema.safeParse(raw)

  if (!parsed.success) {
    console.error('[❌] Invalid environment variables:')
    console.error(parsed.error.format())
    process.exit(1)
  }

  return parsed.data
}
