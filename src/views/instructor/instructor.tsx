import { Helmet } from "react-helmet";
import InstructorLandingPage from "./InstructorLandingPage";
import { useInstructorUserDataEffect } from "./useInstructorUserDataEffect";
import Wrapper from "@/components/wrapper";
import { useAppStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
