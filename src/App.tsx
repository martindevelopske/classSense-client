import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Auth } from "./pages/auth";
import LoginSignupPage from "./pages/test";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <LoginSignupPage />,
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
