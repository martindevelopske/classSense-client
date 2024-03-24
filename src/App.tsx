import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LoginSignupPage from "./pages/test";
import StudentView from "./views/student";
import InstructorView from "./views/instructor";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <LoginSignupPage />, // Login page for both instructors and students
    },
    {
      path: "/instructor",
      element: <InstructorView />, // Accessible only after successful login
    },
    {
      path: "/student",
      element: <StudentView />, // Accessible only after successful login
    },
  ],
  {
    future: {
      v7_normalizeFormMethod: true,
    },
  }
);

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
