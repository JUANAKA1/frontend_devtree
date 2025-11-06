import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { DevTreeApp } from './DevTreeApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DevTreeApp/>
  </StrictMode>,
)
