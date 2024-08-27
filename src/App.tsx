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
import { Toaster } from "./components/ui/toaster";

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

// GameEvents
// 2 points, 3 points, O Rebound, D Rebound, Assist, Steal, Turnover,
// Foul Shot, Block, Jump Ball, Shot Clock Violation
// Technical Foul, Flagrant Foul, Personal Foul
// Timeout, Injury Timeout

// Made shot by player, assisted by player
// Missed shot by player, blocked by player
// Made shot by player, fouled by player
// Made/missed foul shot by player
// Shooting foul by player
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={AppRouter} />
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster />
      </QueryClientProvider>
    </>
  );
}

export default App;
