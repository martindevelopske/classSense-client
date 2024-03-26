import Session from "@/views/student/StudentLandingPage";
import Wrapper from "@/components/wrapper";
import { Helmet } from "react-helmet";

export default function StudentView() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Student Dashboard</title>
      </Helmet>
      {/* <Wrapper role={<Session />} /> */}
      <h2>Student</h2>
    </>
  );
}
