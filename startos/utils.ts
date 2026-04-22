export const bosSavedNode = 'embassy' as const
export const bosHomeDir = '/root' as const
export const bosConfigDir = `${bosHomeDir}/.bos/${bosSavedNode}` as const
export const bosCredentialsPath = `${bosConfigDir}/credentials.json` as const
export const lndMount = '/mnt/lnd' as const
export const lndSocket = 'lnd.startos:10009' as const
export const lndCertPath = `${lndMount}/tls.cert` as const
export const lndMacaroonPath =
  `${lndMount}/data/chain/bitcoin/mainnet/admin.macaroon` as const
