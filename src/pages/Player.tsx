import { usePlayersStore } from "@/store/players";
import { useParams } from "react-router-dom";

const Player = () => {
  const { playerId } = useParams();
  const getPlayer = usePlayersStore(state => state.getPlayer)
  const currentPlayer = getPlayer(playerId)

  if (!currentPlayer) return (<h1>No se encontró el jugador</h1>)
  return (
    <div>
      <h1>{JSON.stringify(currentPlayer)}</h1>
    </div>
  )
}

export default Player