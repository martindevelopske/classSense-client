import LoginSignupPage from "./pages/test";
import StudentView from "./views/student/student";
import InstructorView from "./views/instructor/instructor";

import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Wrapper from "./components/wrapper";
import CreateSession from "./views/instructor/CreateSessionPage";

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
          element: <Outlet />,
          children: [
            {
              index: true,
              element: <InstructorView />, // Accessible only after successful login
            },
            { path: "createSession", element: <CreateSession /> },
          ],
        },
        {
          path: "student",
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
