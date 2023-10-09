import { useQuery } from "react-query";
import { supabase } from "../supabase/client";
import { Tables } from "@/supabase/utility.types";

type Jugador = Tables<"jugadores">

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
  return useQuery<Jugador[]>(["jugadores"], () => fetchJugadores())
}
