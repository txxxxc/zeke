import { Request, Response , https } from 'firebase-functions'
import { schemaForType } from '@/helper'
import { z } from 'zod'
import { Discussion, User } from '@octokit/webhooks-types'
import { DiscussionCreatedUseCase } from '@/usecase'
import { env } from '@/constants'

const requestSchema = z.object({
  sender: schemaForType<Pick<User, 'id'>>()(z.object({ id: z.number() })),
  discussion: schemaForType<
    Pick<Discussion, 'id' | 'title' | 'html_url' | 'body'>
  >()(
    z.object({
      id: z.number(),
      title: z.string(),
      html_url: z.string(),
      body: z.string(),
    })
  ),
})

export const created = https.onRequest(async (req: Request, res: Response) => {
  if (req.method !== 'POST') {
    res.status(405).json('This endpoint allows POST method only')
    return
  }
  const parseResult = requestSchema.safeParse(req.body)
  if (!parseResult.success) {
    res.status(400).json('Invalid Parameters')
  }
  const channelId = env().SLACK_CHANNEL_ID
  const usecase = new DiscussionCreatedUseCase()
  await usecase.do({
    channelId,
    githubPayload: parseResult.data,
  })
  res.status(200).json('Members are sucessfully added')
})
