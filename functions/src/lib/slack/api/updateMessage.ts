import { SlackAPI } from '@/lib/slack/client'
import * as functions from 'firebase-functions'
import { ChatUpdateArguments } from '@slack/web-api'

export type UpdateMessageInput = Pick<
  ChatUpdateArguments,
  'channel' | 'ts' | 'attachments'
>

export const updateMessage = async (params: UpdateMessageInput) => {
  try {
    const result = await SlackAPI.getClient.chat.update({
      ...params,
    })
    functions.logger.log(result)
  } catch (error) {
    functions.logger.log(error)
    throw Error('An error occurred in chat.update')
  }
}
