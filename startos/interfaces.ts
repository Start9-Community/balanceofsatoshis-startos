import { sdk } from './sdk'

/**
 * Balance of Satoshis is a command-line only service. It does not bind any
 * ports and has no HTTP/RPC/P2P interface of its own — users interact with
 * it by SSH'ing into the server and running `bos` commands inside the
 * service container.
 */
export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  return []
})
