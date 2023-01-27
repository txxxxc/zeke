import { mentionUsers } from '@/lib/slack/builder/message/mention'
import { MessageAttachment } from '@slack/bolt'

export const create = (args: {
  questionOwner: string
  discussionTitle: string
  discussionUrl: string
  discussionBody: string
  mentionedSlackIds: string[]
}): MessageAttachment[] => {
  const {
    questionOwner,
    discussionTitle,
    discussionUrl,
    discussionBody,
    mentionedSlackIds,
  } = args
  const text = `${questionOwner}さんが質問を投稿しました！`
  const mentionedUsers = mentionUsers(mentionedSlackIds)
  return [
    {
      color: 'warning',
      pretext: `${mentionedUsers}\n${text}`,
      title: discussionTitle,
      title_link: discussionUrl,
      text: discussionBody,
      fallback: text,
    },
  ]
}
