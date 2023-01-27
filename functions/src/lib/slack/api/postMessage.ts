import { SlackAPI } from '@/lib/slack/client'
import * as functions from 'firebase-functions'
import {
  ChatPostMessageArguments,
  ChatPostMessageResponse,
} from '@slack/web-api'
import { hasProperty, Unwrap } from '@/helper'

export type PostMessageInput = Unwrap<
  Pick<ChatPostMessageArguments, 'channel' | 'attachments'>
>

export type PostMessageOutput = Unwrap<
  Pick<ChatPostMessageResponse, 'channel' | 'ts'>
>

export const postMessage = async (
  params: PostMessageInput
): Promise<PostMessageOutput> => {
  try {
    const result = await SlackAPI.getClient.chat.postMessage({
      ...params,
    })
    if (!hasProperty(result)) {
      throw Error(`channel or ts is not returned ${JSON.stringify(result)}`)
    }
    return {
      channel: result.channel,
      ts: result.ts,
    }
  } catch (error) {
    functions.logger.log(error)
    throw Error('An error occurred in chat.postMessage')
  }
}
