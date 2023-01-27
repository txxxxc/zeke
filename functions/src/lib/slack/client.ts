import { env } from '@/constants'
import { App, LogLevel } from '@slack/bolt'
import { StringIndexed } from '@slack/bolt/dist/types/helpers'
import { WebClient } from '@slack/web-api'

export class SlackAPI {
  // functions起動時にenv読んでくれないのでfunctionが起動するタイミングで
  // appを初期化したい
  private static app: App<StringIndexed> | null = null
  static get getClient(): WebClient {
    if (!this.app) {
      const { SLACK_TOKEN, SLACK_SIGNING_SECRET } = env()
      this.app = new App({
        token: SLACK_TOKEN,
        signingSecret: SLACK_SIGNING_SECRET,
        logLevel: LogLevel.DEBUG,
      })
    }
    return this.app.client
  }
}
