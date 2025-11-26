import { RouterProvider } from "react-router-dom"
import { router as routes } from "./routes";

function App() {
  return <RouterProvider router={routes} />
}

export default App