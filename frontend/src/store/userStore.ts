import type { User } from '@/types/auth'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface UserState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setUser: (user: User) => void
  setToken: (token: string) => void
  logout: () => void
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      set => ({
        user: null,
        token: null,
        isAuthenticated: false,
        setUser: user => set({ user, isAuthenticated: true }),
        setToken: token => set({ token }),
        logout: () => set({ user: null, token: null, isAuthenticated: false }),
      }),
      {
        name: 'user-storage',
      }
    ),
    {
      name: 'UserStore',
    }
  )
)
