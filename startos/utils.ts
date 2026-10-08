export const bosSavedNode = 'embassy' as const
export const bosHomeDir = '/root' as const
export const lndMount = '/mnt/lnd' as const
export const lndCertPath = `${lndMount}/tls.cert` as const
export const lndMacaroonPath =
  `${lndMount}/data/chain/bitcoin/mainnet/admin.macaroon` as const

export const bosReport = (stdout: string | Buffer, command: string) => ({
  type: 'multiline' as const,
  value: stdout.toString().trim(),
  copyable: true,
  filename: `bos-${command}.txt`,
})
