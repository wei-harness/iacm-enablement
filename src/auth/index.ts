import {
  ensureValidToken,
  getTokenExpiration,
  getUserOkta,
  isTokenExpired,
  refreshTokenOkta,
  setTokenOkta,
  signInOkta,
  signOutOkta,
} from './adapters/okta'

import { clearToken, setToken } from '../components/token-session/utils'
import { getCurrentUser } from '../api/user'

export const signInApp = async () => {
  await signInOkta()
}

export const signOutApp = async () => {
  clearToken()
  await signOutOkta()
}

export const setAuthToken = async () => {
  const accessToken = await setTokenOkta()
  if (accessToken) {
    setToken(accessToken)
  }
  return !!accessToken
}

export const refreshAuthToken = async () => {
  const accessToken = await refreshTokenOkta()
  if (accessToken) {
    setToken(accessToken)
  }
  return !!accessToken
}

export const getUser = async () => getUserOkta()

export const getTokenExpirationTime = async () => getTokenExpiration()

export const checkTokenExpiration = async () => isTokenExpired()

export const getValidToken = async () => ensureValidToken()

export const getUserWithRole = async () => {
  try {
    const user = await getCurrentUser()
    return user
  } catch (error) {
    console.error('Error fetching user with role:', error)
    return null
  }
}
