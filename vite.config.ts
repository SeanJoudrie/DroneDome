import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves this from /<repo>/, local dev serves it from /.
const base = process.env.GITHUB_ACTIONS ? '/DroneDome/' : '/'

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    // The model library is already Draco-compressed; don't inline any of it.
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 900,
  },
})
