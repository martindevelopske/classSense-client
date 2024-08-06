import { RouterProvider, createBrowserRouter } from "react-router-dom";

import InstructorView from "./views/instructor/instructor";
import CreateSession from "./views/instructor/Forms/CreateSessionForm";
import StudentView from "./views/student/student";
import AddAttendance from "./views/student/AddAttendance";
import LoginSignupPage from "./pages/LoginSignupPage";
import ProfilePage from "./pages/ProfilePage.tsx";
import axios from "axios";
import Wrapper from "./components/wrapper";
import ErrorBoundary from "./components/ErrorBoundary";
import ErrorComponent from "./components/Error";
import Test from "./components/test";
import SingleSessionStudent from "./views/student/SingleSessionStudent";
import SingleSessionInstructor from "./views/instructor/SingleSessionInstructor";
import JoinSession from "./views/student/JoinSession.tsx";
import AdminView from "./views/admin/admin.tsx";
import Instructors from "./views/admin/Instructors.tsx";
import Sessions from "./views/admin/Sessions.tsx";
import Roles from "./views/admin/Roles.tsx";
import Rooms from "./views/admin/Rooms.tsx";
import InstructorSessions from "./views/instructor/InstructorSession.tsx";

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
          path: "sessions",
          element: <InstructorSessions />,
        },
        {
          path: "sessions/:id",
          element: <SingleSessionInstructor />,
        },
        { path: "profile", element: <ProfilePage /> },
        { path: "*", element: <h3>error page. Page not found</h3> },
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
          element: <SingleSessionStudent />,
        },

        {
          path: "sessions/:id/addAttendance",
          element: <AddAttendance />,
        },
        {
          path: "sessions/:id/join",
          element: <JoinSession />,
        },
        { path: "profile", element: <ProfilePage /> },
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
    {
      path: "/admin",
      element: <Wrapper />,
      children: [
        { index: true, element: <AdminView /> },
        { path: "createSession", element: <CreateSession /> },
        { path: "Instructors", element: <Instructors /> },
        { path: "Sessions", element: <Sessions /> },
        { path: "Roles", element: <Roles /> },
        { path: "Rooms", element: <Rooms /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "*", element: <h3>error page. Page not found</h3> },
      ],
    },
  ]);
  // const AppRouter = getApp();

  return <RouterProvider router={router}></RouterProvider>;
};
export default App;
