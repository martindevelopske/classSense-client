import { addAttendance } from "@/endpoints";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

function AddAttendance() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const sessionId = params.get("sessionId");
  console.log(sessionId);

  useEffect(() => {
    //should make the api call to the add attendance url
    const attendanceUrl: string = addAttendance;
  }, []);
  return <div>add Attendance</div>;
}

export default AddAttendance;
