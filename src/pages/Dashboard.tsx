import { Button } from "@/components/ui/button"
import { useBearStore } from "@/store/example"

const Dashboard = () => {
  
  const {bears, increase} = useBearStore(state => state)
  return (
    <div className="">
      <h1>Dashboard { bears }</h1>
      <Button variant={"default"} className={'bg-green-600 hover:bg-slate-400'} onClick={()=> increase(2)}>Increase Bear </Button>
    </div>
  )
}

export default Dashboard