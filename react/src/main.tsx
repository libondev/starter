import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

import './styles'

const routerFuture = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
}

createRoot(document.getElementById('app') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter future={routerFuture}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
