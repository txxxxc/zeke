import { getAdminMembers, getMemberByGitHubId, savePost } from '@/lib/firestore'
import { builder, postMessage } from '@/lib/slack'
import { IUseCase } from '@/usecase'
import { Discussion, User } from '@octokit/webhooks-types'

export type DiscussionCreatedInputs = {
  channelId: string
  githubPayload: GitHubPayload
}

type GitHubPayload = {
  discussion: Pick<Discussion, 'id' | 'title' | 'html_url' | 'body'>
  sender: Pick<User, 'login'>
}

export class DiscussionCreatedUseCase
  implements IUseCase<DiscussionCreatedInputs, void>
{
  async do(inputs: DiscussionCreatedInputs): Promise<void> {
    const {
      channelId,
      githubPayload: { discussion, sender },
    } = inputs
    const member = await getMemberByGitHubId(sender.login)
    const adminMembers = await getAdminMembers()
    const adminMembersSlackIdList = adminMembers.map((member) => member.slackId)
    // TODO: senderのloginからslackの表示名取得したい
    const { ts, channel } = await postMessage({
      channel: channelId,
      attachments: builder.message.create({
        questionOwner: member.slackId,
        mentionedSlackIds: adminMembersSlackIdList,
        discussionTitle: discussion.title,
        discussionBody: discussion.body,
        discussionUrl: discussion.html_url,
      }),
    })

    await savePost({
      channelId: channel,
      discussionId: discussion.id.toString(),
      ts,
    })
  }
}
