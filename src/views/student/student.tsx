import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import StudentLandingPage from "./StudentLandingPage";
import { useEffect } from "react";
import { useAppStore } from "@/store";
import Wrapper from "@/components/wrapper";

export default function StudentView() {
  const user: User | null = useAppStore((state) => state.user);

  const fullState = useAppStore((state) => state);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user == null) {
      // window.location.href = homeLoginUrl;
      navigate("/");
    }
  }, [user]);
  // useStudentUserDataEffect();
  return (
    <>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Student Dashboard</title>
        </Helmet>
        {/* <Wrapper role={<Session />} /> */}
        <div className="px-2">
          {/* <StudentLandingPage /> */}
          <StudentLandingPage />
        </div>
      </Wrapper>
    </>
  );
}
