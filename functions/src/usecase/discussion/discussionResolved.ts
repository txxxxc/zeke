import { getPost } from '@/lib/firestore'
import { builder, updateMessage } from '@/lib/slack'
import { IUseCase } from '@/usecase'
import { Discussion, User } from '@octokit/webhooks-types'

export type DiscussionResolvedUseCaseInputs = {
  channelId: string
  githubPayload: GitHubPayload
}

type GitHubPayload = {
  discussion: Pick<Discussion, 'id' | 'title' | 'html_url' | 'body'>
  sender: Pick<User, 'login'>
}

// NOTE: interface作ってもいいけどE2E出来るしmock化する意味ない気がするので一旦作りません！
export class DiscussionResolvedUseCase
  implements IUseCase<DiscussionResolvedUseCaseInputs, void>
{
  async do(inputs: DiscussionResolvedUseCaseInputs): Promise<void> {
    try {
      const { resolve } = builder.message
      const {
        githubPayload: { discussion, sender },
      } = inputs
      const { channelId } = inputs
      const { ts } = await getPost({ discussionId: discussion.id.toString() })
      updateMessage({
        channel: channelId,
        ts,
        attachments: resolve(
          sender.login,
          discussion.title,
          discussion.html_url,
          discussion.body
        ),
      })
    } catch {
      throw Error('Failed to execute DiscussionResolvedUseCase')
    }
  }
}
