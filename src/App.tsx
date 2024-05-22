import { useEffect, FC } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import InstructorView from "./views/instructor/instructor";
import CreateSession from "./views/instructor/CreateSessionPage";
import { Auth } from "./pages/auth";
import SingleSession from "./views/instructor/SingleSession";
import StudentView from "./views/student/student";
import QRCodeScanner from "./views/student/QRCodeScanner";
import AddAttendance from "./views/student/AddAttendance";
import LoginSignupPage from "./pages/LoginSignupPage";
import axios from "axios";

//set axios defaults
axios.defaults.headers.common.Accept = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
const App: FC = () => {
  const router = createBrowserRouter([
    {
      path: "",
      element: <LoginSignupPage />,
    },
    {
      path: "/instructor",
      element: <Outlet />,
      children: [
        { index: true, element: <InstructorView /> },
        { path: "createSession", element: <CreateSession /> },
        {
          path: "sessions/:id",
          element: <SingleSession />,
        },
        { path: "*", element: <h3>error page</h3> },
      ],
    },
    {
      path: "/student",
      element: <Outlet />,
      children: [
        { index: true, element: <StudentView /> },
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
  ]);
  // const AppRouter = getApp();

  return <RouterProvider router={router}></RouterProvider>;
};
export default App;
