import { useEffect, useState } from "react"
import useGetPlayers from "../../hooks/useGetPlayers"
import { Player } from "../../types/Player"

const ListPlayers = () => {
  const [players, setPlayers] = useState<Player[]>([])

  const { data, isFetching } = useGetPlayers()

  
  useEffect(() => {
    data && setPlayers(data)
  }, [isFetching, data])

  return (
    <>
      <div>ListPlayers</div>
    </>
  )
}

export default ListPlayers