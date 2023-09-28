import { useEffect, useState } from "react"
import useGetPlayers from "../../hooks/useGetPlayers"
import { Player } from "../../types/Player"
import { DataTable } from "../data-table/data-table"
import { columns } from "../data-table/columns"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog"
import { Label } from "@radix-ui/react-dropdown-menu"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Checkbox } from "../ui/checkbox"
import { Combobox } from "../ui/combobox"

const teams: { value: number, label: string }[] = [
  {
    value: 1,
    label: "Real Betis Balompié",
  },
  {
    value: 2,
    label: "Manchester United FC",
  },
  {
    value: 3,
    label: "Manchester City FC",
  },
  {
    value: 4,
    label: "Borussia Dortmund",
  }
];

const text = {
  search: 'Buscar equipo...',
  select: 'Seleccionar equipo...',
  notFound: 'Equipo no encontrado',
}

const ListPlayers = () => {
  const [players, setPlayers] = useState<Player[]>([])
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const { data, isFetching } = useGetPlayers()

  
  useEffect(() => {
    data && setPlayers(data)
  }, [isFetching, data])

  //no vea
  return (
    <>
      <div>ListPlayers</div>
     {data && <DataTable columns={columns} data={data}> </DataTable>}
      
     <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Nuevo Jugador</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nuevo Jugador</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input id="name" className="col-span-3" />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="terms1"
                className="text-right"
              >
                Activo
              </Label>
           </div>
            <Checkbox id="terms1" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
                htmlFor="terms1"
                className="text-right"
                >
                Equipo
            </Label>
            <Combobox text={text} options={teams}/>
          </div>
        </div>
        <DialogFooter>
          <Button className="bg-green-600" type="submit">Añadir jugador</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  )
}

export default ListPlayers