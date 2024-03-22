import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LoginSignupPage from "./pages/test";
import StudentView from "./views/student";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginSignupPage />,
  },
  {
    path: "/student",
    element: <StudentView />,
  },
  {
    path: "/instructor",
    element: <StudentView />,
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
