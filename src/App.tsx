import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { LoginCallback, useOktaAuth } from '@okta/okta-react'
import { SignInPage } from './pages/SignIn'

const CCMPage = lazy(() => import('./CCM'))

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { authState } = useOktaAuth()

  if (!authState || authState.isPending) return null

  if (!authState.isAuthenticated) {
    return <SignInPage />
  }

  return <>{children}</>
}

function App() {
  return (
    <Routes>
      <Route path="/authorization-code/callback" element={<LoginCallback />} />
      <Route path="/login/callback" element={<LoginCallback />} />
      <Route path="/" element={<SignInPage />} />
      <Route
        path="/ccm"
        element={
          <RequireAuth>
            <Suspense fallback={null}>
              <CCMPage />
            </Suspense>
          </RequireAuth>
        }
      />
      <Route
        path="/ccm-sales-enablement"
        element={
          <RequireAuth>
            <Suspense fallback={null}>
              <CCMPage />
            </Suspense>
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
