import { supabase } from '@/supabase/client'
import { Tables } from '@/supabase/utility.types'
import { create } from 'zustand'

type Player = Tables<"jugadores">

interface PlayersState {
  players: Player[]
  teamId: number
  loadPlayers: () => Promise<void>
}

export const usePlayersStore = create<PlayersState>()((set) => ({
  players: [],
  teamId: 1,
  loadPlayers: async () => {
    const { data } = await supabase.from("jugadores").select("*")
    if (data) set({ players: data })
  }
})
)