import LoginSignupPage from "./pages/test";
import StudentView from "./views/student/student";
import InstructorView from "./views/instructor/instructor";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Wrapper from "./components/wrapper";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Wrapper />,
      children: [
        {
          path: "/login",
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
    },
  ],
  {
    future: {
      v7_normalizeFormMethod: true,
    },
  }
);

export default function App() {
  return (
    <>
      <div>
        <RouterProvider router={router}></RouterProvider>
      </div>
    </>
  );
}
