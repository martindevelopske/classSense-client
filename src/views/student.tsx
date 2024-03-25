import Navbar from "@/components/Header";
import Wrapper from "@/components/wrapper";
import { Helmet } from "react-helmet";

export default function StudentView() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Student Dashboard</title>
      </Helmet>
      {/* <Navbar role="student" />
        <div>student view</div> */}
      <Wrapper />
    </>
  );
}
