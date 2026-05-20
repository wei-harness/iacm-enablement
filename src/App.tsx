import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { LoginCallback, useOktaAuth } from '@okta/okta-react'
import { SignInPage } from './pages/SignIn'

const IACMPage = lazy(() => import('./IACM'))

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
        path="/iacm"
        element={
          <RequireAuth>
            <Suspense fallback={null}>
              <IACMPage />
            </Suspense>
          </RequireAuth>
        }
      />
      <Route
        path="/iacm-sales-enablement"
        element={
          <RequireAuth>
            <Suspense fallback={null}>
              <IACMPage />
            </Suspense>
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
