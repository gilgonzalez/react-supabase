import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import MainRouter from "./router/MainRouter"

function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0
      }
    }
  })
  return (
    <>
      <QueryClientProvider client={queryClient}>
            <MainRouter />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}

export default App
