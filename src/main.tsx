import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './pages/context/ThemeProvider.tsx'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <App className="bg-primary text-primary-text"/>
        </ThemeProvider>
      </QueryClientProvider>
  </StrictMode>,
)
