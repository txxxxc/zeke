import { env } from '@/constants'
import { z } from 'zod'
import { Request, Response , https } from 'firebase-functions'
import { Discussion, User } from '@octokit/webhooks-types'
import { DiscussionResolvedUseCase } from '@/usecase'
import { schemaForType } from '@/helper/schemaForType'

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

export const resolved = https.onRequest(async (req: Request, res: Response) => {
  const channelId = env().SLACK_CHANNEL_ID
  if (req.method !== 'POST') {
    res.status(405).json('This endpoint allows POST method only')
    return
  }
  const parseResult = requestSchema.safeParse(req.body)
  if ('error' in parseResult) {
    res.status(400).json('Invalid Parameters')
    return
  }
  if ('data' in parseResult) {
    const usecase = new DiscussionResolvedUseCase()
    await usecase.do({
      channelId,
      githubPayload: parseResult.data,
    })
    res.status(200).json('Members are sucessfully added')
    return
  }

  // fallback
  res.status(500).send('Something went wrong')
})
