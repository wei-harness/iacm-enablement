import { signInApp } from '../../auth'
import { useOktaAuth } from '@okta/okta-react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import styles from './SignIn.module.scss'

export function SignInPage() {
  const navigate = useNavigate()
  const { authState } = useOktaAuth()

  useEffect(() => {
    if (authState?.isAuthenticated) {
      navigate('/ccm', { replace: true })
    }
  }, [authState, navigate])

  return (
    <div className={styles.loginMain}>
      <Helmet>
        <title>Sign In | CCM Sales Enablement</title>
      </Helmet>

      <div className={styles.loginMainLeft}>
        <div className={styles.loginMainLeftInner}>
          <div className={styles.logo}>
            <img alt="Harness logo" src="/assets/logo.svg" />
          </div>
          <h2>
            <span>Harness Sales Enablement</span>
          </h2>

          <p>Sign in to get everything you need to understand, position, and sell Harness products.</p>

          {import.meta.env.MODE !== 'production' && <p>This is QA Environment for testing.</p>}

          <button onClick={() => signInApp()} className={styles.button}>
            Sign in with Okta
            <FaExternalLinkAlt />
          </button>
        </div>
      </div>

      <div className={styles.loginMainRight} />
    </div>
  )
}
