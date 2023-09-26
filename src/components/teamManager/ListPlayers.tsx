import { useEffect, useState } from "react"
import useGetPlayers from "../../hooks/useGetPlayers"
import { Player } from "../../types/Player"
import { DataTable } from "../data-table/data-table"
import { columns } from "../data-table/columns"

const ListPlayers = () => {
  const [players, setPlayers] = useState<Player[]>([])

  const { data, isFetching } = useGetPlayers()

  console.log(data);
  
  useEffect(() => {
    data && setPlayers(data)
  }, [isFetching, data])

  //no vea
  return (
    <>
      <div>ListPlayers</div>
     {data && <DataTable columns={columns} data={data} >

      </DataTable>}
    </>
  )
}

export default ListPlayers