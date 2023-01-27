import { z } from 'zod'

export const PostSchema = z.object({
  discussionId: z.string(),
  channelId: z.string(),
  ts: z.string(),
})

export type Post = z.infer<typeof PostSchema>
