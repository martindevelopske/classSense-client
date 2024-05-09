import { FC } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Wrapper from "../components/wrapper";
import InstructorView from "../views/instructor/instructor";
import CreateSession from "../views/instructor/CreateSessionPage";
import SingleSession from "../views/instructor/SingleSession";
import StudentView from "../views/student/student";
import QRCodeScanner from "../views/student/QRCodeScanner";
import AddAttendance from "../views/student/AddAttendance";
import LoginSignupPage from "@/pages/LoginSignupPage";
import Home from "@/pages/Home";

// const homeRoutes = createBrowserRouter([
//   {
//     path: "/",
//     element: <Wrapper />,
//     children: [
//       {
//         path: "login",
//         element: <LoginSignupPage />,
//       },
//     ],
//   },
// ]);

// Define homeRouter as a function that returns JSX
export const HomeRouter: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginSignupPage />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};
// Define instructorRouter as a function that returns JSX
export const InstructorRouter: FC = () => {
  return (
    <Routes>
      <Route index element={<InstructorView />} />
      <Route path="createSession" element={<CreateSession />} />
      <Route path="sessions/:id" element={<SingleSession />} />
      <Route path="*" element={<h3>error page</h3>} />
    </Routes>
  );
};

// Define studentRouter as a function that returns JSX
export const StudentRouter: FC = () => {
  return (
    <Routes>
      <Route index element={<StudentView />} />
      <Route path="test" element={<h2>testing....</h2>} />
      <Route path="scan" element={<QRCodeScanner />} />
      <Route path="addAttendance" element={<AddAttendance />} />
      <Route path="*" element={<h3>error page</h3>} />
    </Routes>
  );
};
