import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { supabase } from "@/supabase/client"
import { useEffect, useState } from "react"

const Dashboard = () => {

  const [w, setW] = useState()

  const logOut = async () => { 
    return await supabase.auth.signOut()
  }
  useEffect(() => { 
    supabase.auth.getUser().then(res => { 
      res && setW(res.data.user)
      console.log(res.data.user)
    })
  },[])
  return (
    <div className="">
      <Calendar />
      <Button onClick={()=> logOut()}>Log out</Button>
    </div>
  )
}

export default Dashboard