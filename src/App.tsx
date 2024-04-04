import LoginSignupPage from "./pages/test";
import StudentView from "./views/student/student";
import InstructorView from "./views/instructor/instructor";

import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import Wrapper from "./components/wrapper";
import CreateSession from "./views/instructor/CreateSessionPage";

import { Scan } from "lucide-react";
import SingleSession from "./views/instructor/SingleSession";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Wrapper />,
      children: [
        {
          path: "login",
          element: <LoginSignupPage />,
        },
        {
          path: "instructor",
          element: <Outlet />,
          children: [
            {
              index: true,
              element: <InstructorView />,
            },
            {
              path: "createSession",
              element: <CreateSession />,
            },
            {
              path: "sessions/:id",
              element: <SingleSession />,
            },
          ],
        },
        {
          path: "student",
          element: <Outlet />,
          children: [
            {
              index: true,
              element: <StudentView />,
            },
            {
              path: "test",
              element: <h2>testing....</h2>,
            },
            {
              path: "scan",
              element: <Scan />,
            },
          ],
        },
        { path: "*", element: <h3>error page</h3> },
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
