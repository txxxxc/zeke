import { MessageAttachment } from '@slack/bolt'

export const resolve = (
  user: string,
  discussionTitle: string,
  discussionUrl: string,
  discussionBody: string
): MessageAttachment[] => {
  // TODO: 質問者にメンションがつくようにする
  const text = `${user}さんが質問を投稿しました！`
  return [
    {
      color: 'good',
      pretext: text,
      title: `[解決済み]${discussionTitle}`,
      title_link: discussionUrl,
      text: discussionBody,
      fallback: text,
    },
  ]
}
