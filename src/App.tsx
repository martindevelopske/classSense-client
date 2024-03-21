import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Auth } from "./pages/auth";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
  },
]);

function App() {
  return (
    <>
      <div className="w-full min-h-screen text-base">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
