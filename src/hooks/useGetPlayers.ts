import { useQuery } from "react-query";
import { client } from "../supabase/client";
import { Player } from "../types/Player";

const fetchJugadores = async () => {
  const { data, error } = await client
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
