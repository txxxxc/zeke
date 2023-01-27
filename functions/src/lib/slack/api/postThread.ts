import * as functions from 'firebase-functions'
import { SlackAPI } from '@/lib/slack/client'
import { ChatPostMessageArguments } from '@slack/web-api'

export type PostThreadInput = Pick<
  ChatPostMessageArguments,
  'channel' | 'thread_ts' | 'attachments'
>

export const postThread = async (params: PostThreadInput) => {
  try {
    const result = await SlackAPI.getClient.chat.postMessage({
      ...params,
    })
    functions.logger.log(result)
  } catch (error) {
    functions.logger.log(error)
    throw Error('An error occurred in chat.postThread')
  }
}
