import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    /* `@react-pdf` wiegt gut ein Megabyte und löst die 500-kB-Warnung aus. Hier
       ist sie kein Hinweis, sondern Rauschen: Der Renderer liegt in einem
       eigenen Bündel, das erst geladen wird, wenn jemand im Ergebnis auf „Als
       PDF sichern" tippt (siehe `src/pdf/exportResult.ts`). Der Start der App
       trägt davon nichts. */
    chunkSizeWarningLimit: 1500,
  },
})
