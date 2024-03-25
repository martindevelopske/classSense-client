import Session from "@/components/Sessions";
import Wrapper from "@/components/wrapper";
import { Helmet } from "react-helmet";

export default function StudentView() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Student Dashboard</title>
      </Helmet>
      <Wrapper role={<Session />} />
    </>
  );
}
