import { useQuery } from "react-query";
import { supabase } from "../supabase/client";
import { Player } from "../types/Player";

const fetchJugadores = async () => {
  const { data, error } = await supabase
    .from("jugadores")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    throw new Error(error.message)
  }
  return data
}

export default function useGetPlayers() {
  return useQuery<Player[]>(["jugadores"], () => fetchJugadores())
}
