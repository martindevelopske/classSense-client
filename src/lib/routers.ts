import { createBrowserRouter } from "react-router-dom";
import LoginSignupPage from "./pages/test";
import StudentView from "../views/student/student";
import InstructorView from "../views/instructor/instructor";

import Wrapper from "../components/wrapper";
import CreateSession from "../views/instructor/CreateSessionPage";

import SingleSession from "../views/instructor/SingleSession";
import QRCodeScanner from "../views/student/QRCodeScanner";
import AddAttendance from "../views/student/AddAttendance";

export const instructorRouter = createBrowserRouter([
  {
    path: "/instructor",
    element: <Wrapper />,
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
      { path: "*", element: <h3>error page</h3> },
    ],
  },
]);

export const studentRouter = createBrowserRouter([
  {
    path: "/student",
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
        element: <QRCodeScanner />,
      },
      {
        path: "addAttendance",
        element: <AddAttendance />,
      },
    ],
  },
  { path: "*", element: <h3>error page</h3> },
]);
