import { useState } from "react"
import useGetPlayers from "../../hooks/useGetPlayers"
import { DataTable } from "../data-table/data-table"
import { columns } from "../data-table/columns"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import {  FormField,Form } from "../ui/form"
import FormInput from '../ui/FormInput';
import { Checkbox } from "../ui/checkbox"
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/supabase/client"


const schema = z.object(
  {
    name: z.string().min(1),
    active: z.boolean()
  }
)
const resolver = zodResolver(schema);

const ListPlayers = () => {
  const [open, setOpen] = useState(false)
  const { data: players , isFetching, refetch } = useGetPlayers()
  const form = useForm<z.infer<typeof schema>>({ values: { name: "", active: false }, mode: "onChange", resolver  })

  const onSubmit = async (inputs: z.infer<typeof schema>) => { 
    try {
      const { data: insertedPlayer } = await supabase
  .from('jugadores')
  .insert([
    { name : inputs.name, active : inputs.active  },
  ])
      refetch()
      form.reset()
      console.log(insertedPlayer)
    } catch (err) { 
      console.log(err)
    }
  }

  return (
    <>
      {players && <DataTable tableId="players" columns={columns} data={players} loading={isFetching} extraButtons={<Button onClick={() => setOpen(true)} variant="outline">Nuevo Jugador</Button>} />}

      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Nuevo Jugador</DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput
              control={form.control}
              name="name"
              label="Nombre"
              placeholder="Nombre del jugador"
              />
              
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => {
                  return (
                    <span className="flex gap-2 items-center">
                      <Checkbox id="active" name="activo" onCheckedChange={field.onChange} checked={field.value}/>
                        <label htmlFor="" id="active">Disponible actualmente</label>
                        
                    </span>
                  )
                }}
              />
          <DialogFooter className="flex justify-end gap-2">
            <Button className="bg-green-600" onClick={() => setOpen(false)} type="submit">Añadir jugador</Button>
          </DialogFooter>
          </form>
        </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ListPlayers