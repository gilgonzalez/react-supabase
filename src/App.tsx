import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import MainRouter from "./router/MainRouter"
import { useEffect } from "react"
import { usePlayersStore } from "./store/players"
import { Toaster } from "@/components/ui/toaster"

function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0
      }
    }
  })
  const { loadPlayers } = usePlayersStore(state => state)
  
  useEffect(() => {
    loadPlayers()
   },[loadPlayers])
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MainRouter />
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}

export default App
