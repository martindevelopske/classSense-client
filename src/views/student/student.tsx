import { Helmet } from "react-helmet";

import { Outlet, useNavigate } from "react-router-dom";
import StudentLandingPage from "./StudentLandingPage";
import { useEffect } from "react";
import { useStudentUserDataEffect } from "./useStudentUserDataEffect";

export default function StudentView() {
  const navigate = useNavigate();
  useStudentUserDataEffect();
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Student Dashboard</title>
      </Helmet>
      {/* <Wrapper role={<Session />} /> */}
      <div className="px-2">
        {/* <StudentLandingPage /> */}
        <StudentLandingPage />
      </div>
    </>
  );
}
