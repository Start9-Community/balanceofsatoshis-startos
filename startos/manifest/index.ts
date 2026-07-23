import { setupManifest } from '@start9labs/start-sdk'
import { depLndDescription, long, short } from './i18n'

export const manifest = setupManifest({
  id: 'balanceofsatoshis',
  title: 'Balance of Satoshis',
  license: 'MIT',
  packageRepo: 'https://github.com/Start9-Community/balanceofsatoshis-startos',
  upstreamRepo: 'https://github.com/alexbosworth/balanceofsatoshis',
  marketingUrl: 'https://github.com/alexbosworth/balanceofsatoshis',
  donationUrl:
    'https://yalls.org/hashcash/7bff5e4f-4534-4cca-8daa-3d5a3c239919/',
  description: { short, long },
  volumes: ['main'],
  images: {
    balanceofsatoshis: {
      source: { dockerBuild: {} },
      arch: ['x86_64', 'aarch64'],
    },
  },
  dependencies: {
    lnd: {
      description: depLndDescription,
      optional: false,
      metadata: {
        title: 'LND',
        icon: 'https://raw.githubusercontent.com/Start9Labs/lnd-startos/refs/heads/master/icon.svg',
      },
    },
  },
})
