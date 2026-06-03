import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

/**
 * BoS reads its Telegram bot API key from
 *   ~/.bos/telegram_bot_api_key
 * as a single line of plain text (see upstream
 * telegram/get_telegram_bot.js).
 *
 * The `main` volume is mounted at `/root` in the subcontainer, so the
 * file appears at `/root/.bos/telegram_bot_api_key` which is exactly
 * where BoS looks.
 */
export const telegramApiKey = FileHelper.string(
  {
    base: sdk.volumes.main,
    subpath: './.bos/telegram_bot_api_key',
  },
  z.string().min(1),
)
