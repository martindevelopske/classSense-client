import { Helmet } from "react-helmet";
import StudentLandingPage from "./StudentLandingPage";
import { useStudentUserDataEffect } from "./useStudentUserDataEffect";

export default function StudentView() {
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
