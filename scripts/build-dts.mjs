// scripts/build-dts.mjs
import { build } from 'vite'

const { dtsConfig } = await import('../packages/composables/vite.config.ts')

await build(dtsConfig)