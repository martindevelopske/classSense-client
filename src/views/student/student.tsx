import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import StudentLandingPage from "./StudentLandingPage";
import { useEffect } from "react";
import { homeLoginUrl } from "@/lib/urls";
import { useAppStore } from "@/store";

export default function StudentView() {
  const user: User | null = useAppStore((state) => state.user);
  console.log(user);

  const fullState = useAppStore((state) => state);
  console.log(fullState);

  const setAfterLogin = useAppStore((state) => state.setAfterLogin);
  const afterLogin = useAppStore((state) => state.afterLogin);
  useEffect(() => {
    if (!user || user == null) {
      console.log("no user...redirecting");
      const currentPage: string = window.location.href;
      console.log(currentPage, "curr");

      setAfterLogin(currentPage);
      console.log("set successfully");
      console.log(afterLogin);

      // window.location.href = homeLoginUrl;
    }
  }, [user]);
  // useStudentUserDataEffect();
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
