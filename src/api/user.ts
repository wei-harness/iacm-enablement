import { getUserOkta } from '../auth/adapters/okta'
import type { User } from '../types/user'

export const getCurrentUser = async (): Promise<User | null> => {
  const claims = await getUserOkta()
  if (!claims) return null
  return {
    name: (claims.name as string) || '',
    email: (claims.email as string) || '',
  }
}
