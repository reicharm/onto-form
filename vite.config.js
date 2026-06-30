import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// Set BUILD_LIB=1 (or VITE_LIB=1) to produce a distributable library bundle.
// Default (no env var) builds the standalone dev/demo app as before.
const isLibBuild = process.env.BUILD_LIB === '1'

export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },

  ...(isLibBuild ? {
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.js'),
        name: 'OntoForm',
        // ESM → .es.js  |  UMD → .umd.cjs (package.json type:module requires .cjs for CommonJS)
        fileName: (format) => format === 'umd' ? 'onto-form.umd.cjs' : `onto-form.${format}.js`
      },
      rollupOptions: {
        // Vue is a peer dependency — never bundle it
        external: ['vue'],
        output: {
          globals: { vue: 'Vue' },
          // Keep CSS in a separate file so host apps can opt out
          assetFileNames: 'onto-form.[ext]'
        }
      },
      // Generate source maps for the library so host apps can debug
      sourcemap: true,
      // Do not empty dist so a parallel app build isn't wiped
      emptyOutDir: true
    }
  } : {
    // App (standalone) build — default behaviour, no overrides needed
  })
})
