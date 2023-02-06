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
    owner: Pick<Discussion['user'], 'login'>
  }
  comment: Pick<DiscussionCommentCreatedEvent['comment'], 'body' | 'html_url'>
  sender: Pick<DiscussionCommentCreatedEvent['sender'], 'login'>
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
    if (discussion.owner.login === sender.login) {
      const member = await getMemberByGitHubId(discussion.owner.login)
      await postThread({
        channel: channelId,
        attachments: builder.message.amend({
          discussionBody: comment.body,
          discussionTitle: discussion.title,
          discussionUrl: comment.html_url,
          questionOwnerName: member.slackId,
        }),
        thread_ts: ts,
      })
      return
    }

    if (discussion.owner.login !== sender.login) {
      const { slackId } = await getMemberByGitHubId(discussion.owner.login)
      await postThread({
        channel: channelId,
        attachments: builder.message.reply({
          commentOwner: slackId,
          commentUrl: comment.html_url,
          commentBody: comment.body,
          discussionTitle: discussion.title,
          discussionUrl: discussion.html_url,
          mentionTarget: slackId,
        }),
        thread_ts: ts,
      })
    }
  }
}
