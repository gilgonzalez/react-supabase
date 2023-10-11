import { supabase } from '@/supabase/client'
import { Tables } from '@/supabase/utility.types'
import { create } from 'zustand'

type Player = Tables<"jugadores">

interface PlayersState {
  players: Player[]
  teamId: number
  loadPlayers: () => Promise<void>
  getPlayer: (id: string | undefined) => Player | undefined
}

export const usePlayersStore = create<PlayersState>()((set, get) => ({
  players: [],
  teamId: 1,
  loadPlayers: async () => {
    const { data } = await supabase.from("jugadores").select("*")
    if (data) set({ players: data })
  },
  getPlayer(id) {
    if (!id) return undefined
    return get().players.find(player => player.id.toString() === id)
  },
})
)