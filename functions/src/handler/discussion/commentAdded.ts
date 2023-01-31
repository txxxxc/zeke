import { Request, Response , https } from 'firebase-functions'
import { schemaForType } from '@/helper'
import { z } from 'zod'
import { Discussion, DiscussionCommentEvent } from '@octokit/webhooks-types'
import { DiscussionCommentAddedUseCase } from '@/usecase'

const sender = schemaForType<Pick<DiscussionCommentEvent['sender'], 'login'>>()(
  z.object({
    login: z.string(),
  })
)
const comment = schemaForType<
  Pick<DiscussionCommentEvent['comment'], 'body' | 'html_url'>
>()(
  z.object({
    body: z.string(),
    html_url: z.string(),
  })
)

const discussion = schemaForType<
  Pick<
    DiscussionCommentEvent['discussion'],
    'id' | 'title' | 'html_url' | 'body'
  > & {
    user: Pick<Discussion['user'], 'login'>
  }
>()(
  z.object({
    id: z.number(),
    title: z.string(),
    html_url: z.string(),
    body: z.string(),
    user: z.object({
      login: z.string(),
    }),
  })
)

const requestSchema = z.object({
  sender,
  comment,
  discussion,
})

export const commentAdded = https.onRequest(async (req: Request, res: Response) => {
  if (req.method !== 'POST') {
    res.status(405).json('This endpoint allows POST method only')
    return
  }
  const parseResult = requestSchema.safeParse(req.body)
  if (!parseResult.success) {
    res.status(400).json('Invalid Parameters')
    return
  }
  const usecase = new DiscussionCommentAddedUseCase()
  const { comment, sender } = parseResult.data
  const {
    body,
    id,
    html_url: htmlUrl,
    user,
    title,
  } = parseResult.data.discussion
  await usecase.do({
    githubPayload: {
      comment,
      sender,
      discussion: {
        body,
        id,
        html_url: htmlUrl,
        title,
        owner: {
          id: user.login,
        },
      },
    },
  })
  res.status(200).json('Member are sucessfully added')
})
