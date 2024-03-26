import Session from "@/views/student/StudentLandingPage";
import Wrapper from "@/components/wrapper";
import { Helmet } from "react-helmet";
import InstructorLandingPage from "./InstructorLandingPage";

export default function InstructorView() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Instructor Dashboard</title>
      </Helmet>
      <div>hello instructor</div>
    </>
  );
}
