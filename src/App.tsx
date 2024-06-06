import { RouterProvider, createBrowserRouter } from "react-router-dom";

import InstructorView from "./views/instructor/instructor";
import CreateSession from "./views/instructor/CreateSessionPage";
import SingleSession from "./views/instructor/SingleSession";
import StudentView from "./views/student/student";
import QRCodeScanner from "./views/student/QRCodeScanner";
import AddAttendance from "./views/student/AddAttendance";
import LoginSignupPage from "./pages/LoginSignupPage";
import axios from "axios";
import Wrapper from "./components/wrapper";
import ErrorBoundary from "./components/ErrorBoundary";
import SingleSessionError from "./components/Error/SingleSessionError";
import ErrorComponent from "./components/Error";
import Test from "./components/test";

//set axios defaults
axios.defaults.headers.common.Accept = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginSignupPage />,
    },
    {
      path: "/instructor",
      element: <Wrapper />,
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
      element: <Wrapper />,
      children: [
        {
          index: true,

          element: <StudentView />,
        },
        {
          path: "sessions/:id",
          element: <SingleSession />,
        },
        {
          path: "scan",
          element: <QRCodeScanner />,
        },
        {
          path: "addAttendance",
          element: <AddAttendance />,
        },
        {
          path: "test",
          element: (
            <ErrorBoundary
              fallback={<ErrorComponent errorMessage="Test page error." />}
            >
              <Test />
            </ErrorBoundary>
          ),
        },
      ],
    },
  ]);
  // const AppRouter = getApp();

  return <RouterProvider router={router}></RouterProvider>;
};
export default App;
