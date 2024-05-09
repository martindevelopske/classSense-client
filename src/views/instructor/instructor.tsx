import { Helmet } from "react-helmet";
import InstructorLandingPage from "./InstructorLandingPage";
import { useInstructorUserDataEffect } from "./useInstructorUserDataEffect";
import Wrapper from "@/components/wrapper";

export default function InstructorView() {
  useInstructorUserDataEffect();
  return (
    <>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Instructor Dashboard</title>
        </Helmet>
        <div className="px-2">
          <InstructorLandingPage />
        </div>
      </Wrapper>
    </>
  );
}
