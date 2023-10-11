import { create } from 'zustand'

export interface User {
  status: 'authenticated' | 'unauthenticated' | null
  id: string | null
  email: string | null
  name: string | null
  team: string | null
}
interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
}
export const useAuthStore = create<AuthStore>()((set) => ({
  user: {} as User,
  setUser: (user) => set({ user })
})
)