import { z } from 'zod'

export const MemberSchema = z.object({
  name: z.string(),
  slackId: z.string(),
  githubId: z.string(),
})

export type Member = z.infer<typeof MemberSchema>
