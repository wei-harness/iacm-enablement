import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Security } from '@okta/okta-react'
import { QueryClientProvider } from '@tanstack/react-query'
import { oktaAuth } from './auth/adapters/okta'
import { queryClient } from './libs/query-client'
import App from './App.tsx'
import './index.css'

const restoreOriginalUri = async (_oktaAuth: unknown, originalUri: string) => {
  try {
    const path = new URL(originalUri).pathname
    window.location.replace(path === '/' || !path ? '/iacm-sales-enablement' : originalUri)
  } catch {
    window.location.replace('/iacm-sales-enablement')
  }
}

if (import.meta.env.MODE === 'production') {
  console.log = function () {}
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
            <App />
          </Security>
        </HelmetProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
