// Games - Create a new game
// Quarters - Update the quarter/half
// Players - On Left/Right side of screen

import Landing from "./Pages/Landing/Landing";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Teams from "./Pages/Teams/Teams";
import Games from "./Pages/Games/Games";

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
]);

// GameEvent - 2 points, 3 points, O Rebound, D Rebound, Assist, Steal, Turnover, Foul, Foul Shot
function App() {
  return (
    <>
      <RouterProvider router={AppRouter} />
    </>
  );
}

export default App;
