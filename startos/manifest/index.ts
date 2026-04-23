import { setupManifest } from '@start9labs/start-sdk'
import { alertInstall, depLndDescription, long, short } from './i18n'

export const manifest = setupManifest({
  id: 'balanceofsatoshis',
  title: 'Balance of Satoshis',
  license: 'MIT',
  packageRepo: 'https://github.com/Start9Labs/balanceofsatoshis-startos',
  upstreamRepo: 'https://github.com/alexbosworth/balanceofsatoshis',
  marketingUrl: 'https://github.com/alexbosworth/balanceofsatoshis',
  donationUrl:
    'https://yalls.org/hashcash/7bff5e4f-4534-4cca-8daa-3d5a3c239919/',
  docsUrls: [
    'https://github.com/alexbosworth/balanceofsatoshis#readme',
    'https://github.com/alexbosworth/balanceofsatoshis/blob/master/commands/README.md',
  ],
  description: { short, long },
  volumes: ['main'],
  images: {
    balanceofsatoshis: {
      source: { dockerBuild: {} },
      arch: ['x86_64', 'aarch64'],
    },
  },
  alerts: {
    install: alertInstall,
    update: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
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
