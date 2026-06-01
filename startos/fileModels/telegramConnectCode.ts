import { FileHelper } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

export const telegramConnectCode = FileHelper.string({
  base: sdk.volumes.main,
  subpath: './.bos/telegram_connect_code',
})
