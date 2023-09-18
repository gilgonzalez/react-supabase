import { FormEvent, useState } from "react"
import { client } from "../../supabase/client"
import { useMutation, useQueryClient } from 'react-query';

const PlayerForm = () => {
  
  const queryCreatePlayer = async () => { 
    const userUID = await (await client.auth.getUser()).data.user?.id
    userUID && await client.from('jugadores').insert({
      name: jugador,
      user_id: userUID,
      activo: true
    })
  }
  const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationFn: queryCreatePlayer,
    onMutate: () => {
      console.log('mutando')
      queryClient.refetchQueries(["jugadores"])
    },
  })
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => { 
    e.preventDefault()
    await mutation.mutate()
  }

  const [jugador , setJugador] = useState('')

  return (
    <form onSubmit={handleSubmit} className="form-widget">
      <input type="text" name="jugador" placeholder='escribe el nombre del jugador' onChange={(e) => setJugador(e.target.value)}/>
      <button type="submit">Add</button>
    </form>
  )
}

export default PlayerForm