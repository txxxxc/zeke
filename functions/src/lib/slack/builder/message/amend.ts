import { MessageAttachment } from '@slack/bolt'

export const amend = (args: {
  questionOwnerName: string
  discussionTitle: string
  discussionUrl: string
  discussionBody: string
}): MessageAttachment[] => {
  // TODO: 質問者にメンションがつくようにする
  const { questionOwnerName, discussionTitle, discussionUrl, discussionBody } =
    args
  const text = `${questionOwnerName}がコメントを追加しました`
  return [
    {
      pretext: text,
      fallback: text,
      title: `${discussionTitle}へのコメント`,
      title_link: discussionUrl,
      text: discussionBody,
    },
  ]
}
