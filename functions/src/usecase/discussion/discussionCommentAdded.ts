import { getMemberByGitHubId, getPost } from '@/lib/firestore'
import { postThread, builder } from '@/lib/slack'
import { IUseCase } from '@/usecase'
import {
  Discussion,
  DiscussionCommentCreatedEvent,
} from '@octokit/webhooks-types'

export interface DiscussionCommentAddedInputs {
  githubPayload: GitHubPayload
}

type GitHubPayload = {
  discussion: Pick<Discussion, 'id' | 'title' | 'html_url' | 'body'> & {
    owner: Pick<Discussion['user'], 'id'>
  }
  comment: Pick<DiscussionCommentCreatedEvent['comment'], 'body' | 'html_url'>
  sender: Pick<DiscussionCommentCreatedEvent['sender'], 'id'>
}

export class DiscussionCommentAddedUseCase
  implements IUseCase<DiscussionCommentAddedInputs, void>
{
  async do(inputs: DiscussionCommentAddedInputs): Promise<void> {
    const {
      githubPayload: { discussion, comment, sender },
    } = inputs
    const { channelId, ts } = await getPost({
      discussionId: discussion.id.toString(),
    })
    // NOTE: 質問者がコメントを追加した場合はメンションなしのコメントを追加する
    if (discussion.owner.id === sender.id) {
      await postThread({
        channel: channelId,
        attachments: builder.message.amend({
          discussionBody: comment.body,
          discussionTitle: discussion.title,
          discussionUrl: comment.html_url,
          questionOwnerName: discussion.owner.id.toString(),
        }),
        thread_ts: ts,
      })
      return
    }

    if (discussion.owner.id !== sender.id) {
      const { slackId } = await getMemberByGitHubId(
        discussion.owner.id.toString()
      )
      await postThread({
        channel: channelId,
        attachments: builder.message.reply({
          commentOwner: sender.id.toString(),
          commentUrl: comment.html_url,
          commentBody: comment.body,
          discussionTitle: discussion.title,
          discussionUrl: discussion.html_url,
          mentionTarget: slackId,
        }),
      })
    }
  }
}
