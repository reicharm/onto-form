import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// Pass --mode lib (see package.json's "build:lib" script) to produce a
// distributable library bundle. Default (no --mode, or any other mode)
// builds the standalone dev/demo app as before.
//
// Deliberately using Vite's --mode flag instead of a shell-set environment
// variable (e.g. `BUILD_LIB=1 vite build`) — env-var assignment syntax
// differs between shells (`FOO=1 cmd` on bash/zsh vs `set FOO=1&& cmd` on
// Windows cmd.exe) and there is no single invocation that works on both
// without an extra dependency (e.g. cross-env). `--mode` is a native Vite
// CLI flag and works identically on every platform/shell.
export default defineConfig(({ mode }) => {
  const isLibBuild = mode === 'lib'

  return {
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
  }
})
