import { Helmet } from "react-helmet";
import InstructorLandingPage from "./InstructorLandingPage";
import { useInstructorUserDataEffect } from "./useInstructorUserDataEffect";

export default function InstructorView() {
  useInstructorUserDataEffect();

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Instructor Dashboard</title>
      </Helmet>
      <div className="px-2">
        <InstructorLandingPage />
      </div>
    </>
  );
}
