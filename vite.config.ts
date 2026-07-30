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
    rollupOptions: {
      output: {
        // three.js was bundled in with the app, so 976 KB had to arrive before
        // anything appeared and every edit to a panel invalidated the cached
        // copy of a library that had not changed in months.
        manualChunks: {
          three: ['three', 'three/examples/jsm/controls/OrbitControls.js',
                  'three/examples/jsm/loaders/GLTFLoader.js',
                  'three/examples/jsm/loaders/DRACOLoader.js'],
        },
      },
    },
  },
})
