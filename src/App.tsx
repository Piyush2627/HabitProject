import Routes from "./routes/Routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {
  return (
    <>
      <QueryClientProvider client={new QueryClient()}>
        <Routes />
      </QueryClientProvider>
    </>
  );
}

export default App;
