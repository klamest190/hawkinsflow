import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

/* Eine eigene Testkonfiguration, aus genau einem Grund: den Schriften.
 *
 * `ResultDocument` lädt Inter über `…woff?url`. Im Browser wird daraus die URL
 * eines gebündelten Assets — genau das, was `@react-pdf` dort braucht. Unter
 * Node löst Vite dasselbe Import zu einem wurzelrelativen Pfad auf, und den kann
 * `@react-pdf` nicht von der Platte lesen; der Rauchtest bräche an der Schrift
 * und nicht am Dokument.
 *
 * Das Plugin schreibt diese Importe deshalb auf den absoluten Dateipfad um. In
 * `vite.config.ts` darf es nicht stehen: für den Browser muss `?url` eine
 * Asset-URL bleiben.
 */
const woffUrlAsAbsolutePath = {
  name: 'woff-url-as-abs-path',
  enforce: 'pre' as const,
  load(id: string) {
    if (!id.endsWith('.woff?url')) return null
    return `export default ${JSON.stringify(id.slice(0, -'?url'.length))}`
  },
}

export default defineConfig({
  plugins: [woffUrlAsAbsolutePath, react()],
  test: {
    environment: 'node',
    include: ['src/**/*.test.{ts,tsx}'],
    // Ein PDF zu setzen dauert; die Voreinstellung von 5 s reicht dafür nicht.
    testTimeout: 60000,
  },
})
