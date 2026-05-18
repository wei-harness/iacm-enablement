import { useMutation, useQuery } from '@tanstack/react-query'
import { getCurrentUser } from '../api/user'
import type { User } from '../types/user'
import { queryKeys } from '../libs/query-client'

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (_data: Partial<User>) => Promise.resolve(null),
  })
}

export const useUserProfile = (enabled = true) => {
  return useQuery({
    queryKey: queryKeys.users.current(),
    queryFn: getCurrentUser,
    enabled,
    staleTime: 1000 * 60 * 30,
    retry: false,
  })
}
