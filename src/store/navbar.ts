import { create } from 'zustand'

interface BearState {
  isOpen: boolean,
  toggle: () => void

}

export const useNavbarStore = create<BearState>()((set) => ({
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  isOpen: false,
})
)