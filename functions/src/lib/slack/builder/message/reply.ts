import { mentionUser } from '@/lib/slack/builder/message/mention'
import { MessageAttachment } from '@slack/bolt'

export const reply = (args: {
  commentOwner: string
  discussionTitle: string
  discussionUrl: string
  commentBody: string
  commentUrl: string
  mentionTarget: string
}): MessageAttachment[] => {
  // TODO: 質問者にメンションがつくようにする
  const {
    commentOwner,
    discussionTitle,
    discussionUrl,
    commentBody,
    commentUrl,
    mentionTarget,
  } = args
  const text = `${commentOwner}が<${discussionUrl}|${discussionTitle}>に返答しました！`
  const mention = mentionUser(mentionTarget)
  return [
    {
      pretext: `${mention}\n ${text}`,
      text: commentBody,
      title: `${discussionTitle}への返答`,
      title_link: commentUrl,
      fallback: text,
    },
  ]
}
