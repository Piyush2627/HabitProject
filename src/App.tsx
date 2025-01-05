import ObserverProvider from "./hooks/ObserverProvider";
import Routes from "./routes/Routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ObserverProvider>
          <Routes />
        </ObserverProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
