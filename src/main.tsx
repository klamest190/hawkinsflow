import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Crash } from './components/Crash.tsx'

// getElementById kann null liefern — TypeScript zwingt uns, den Fall zu
// behandeln, statt ihn mit `!` wegzuwinken.
const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Kein #root-Element gefunden — index.html prüfen.')
}

/* A throw anywhere in the tree unmounts all of it. Instead of an error
   boundary — which React only offers as a class component — the root catches
   it here and renders the crash screen in its place.

   Only once: if the crash screen itself threw, rendering it again would loop,
   and a blank page is the lesser failure. */
let crashed = false

const root = createRoot(rootElement, {
  onUncaughtError(error) {
    console.error(error)
    if (crashed) return
    crashed = true
    root.render(<Crash />)
  },
})

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
