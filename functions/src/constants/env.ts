import { z } from 'zod'

export const envSchema = z.object({
  SLACK_TOKEN: z.string(),
  SLACK_SIGNING_SECRET: z.string(),
  SLACK_CHANNEL_ID: z.string(),
})

export const env = (): z.infer<typeof envSchema> => {
  return envSchema.parse(process.env)
}
