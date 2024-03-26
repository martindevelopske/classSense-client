import { Helmet } from "react-helmet";
import StudentLandingPage from "@/views/student/StudentLandingPage";
import { Outlet } from "react-router-dom";

export default function StudentView() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Student Dashboard</title>
      </Helmet>
      {/* <Wrapper role={<Session />} /> */}
      <div className="px-2">
        {/* <StudentLandingPage /> */}
        <Outlet />
      </div>
    </>
  );
}
