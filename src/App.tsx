// Games - Create a new game
// Quarters - Update the quarter/half
// Players - On Left/Right side of screen

import Landing from "./pages/Landing/Landing";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Teams from "./pages/Teams/Teams";
import Games from "./pages/Games/Games";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Players from "./pages/Players/Players";
import Game from "./pages/Games/Game/Game";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/games",
    element: <Games />,
  },
  {
    path: "/teams",
    element: <Teams />,
  },
  {
    path: "/players",
    element: <Players />,
  },
  {
    path: "/games/:id",
    element: <Game />,
  },
]);

// GameEvent - 2 points, 3 points, O Rebound, D Rebound, Assist, Steal, Turnover, Foul, Foul Shot
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={AppRouter} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
