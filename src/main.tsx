import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// getElementById kann null liefern — TypeScript zwingt uns, den Fall zu
// behandeln, statt ihn mit `!` wegzuwinken.
const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Kein #root-Element gefunden — index.html prüfen.')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
