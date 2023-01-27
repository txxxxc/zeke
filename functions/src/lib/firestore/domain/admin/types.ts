import { z } from 'zod'
export const AdminSchema = z.object({
  name: z.string(),
  slackId: z.string(),
  githubId: z.string(),
})

export type Admin = z.infer<typeof AdminSchema>
