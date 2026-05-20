const TOKEN_KEY = 'iacm_access_token'

export const setToken = (token: string) => {
  sessionStorage.setItem(TOKEN_KEY, token)
}

export const clearToken = () => {
  sessionStorage.removeItem(TOKEN_KEY)
}

export const getToken = () => {
  return sessionStorage.getItem(TOKEN_KEY)
}
