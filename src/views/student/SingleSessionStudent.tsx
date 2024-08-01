import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackComponent from "@/components/BackComponent";
import Loading from "@/components/Loading";
import ErrorComponent from "@/components/Error";
import { useStudentUserDataEffect } from "../student/useStudentUserDataEffect";
import AttendanceDataTable from "../instructor/AttendanceDataTable";
import { getSingleSession } from "@/endpoints";

export default function SingleSessionStudent() {
  useStudentUserDataEffect();

  const { id } = useParams();

  const [session, setSession] = useState<SessionResponse | null>(null);
  const [attendance, setAttendance] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  // const attendanceUrl: string = `http://localhost:5173/student/addAttendance?sessionId=${id}`;

  const fetchSession = async (id: string) => {
    try {
      setLoading(true);
      const url = `${getSingleSession}/${id}`;
      const response = await axios.get(url, {
        withCredentials: true,
      });
      console.log(response)

      setSession(response.data.message);

      setAttendance(response.data.message.attendance);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      setError("Failed to fetch Session. Please Reload the page.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    id && fetchSession(id);
  }, [id]);

  return (
    <>
      <div className="flex flex-col gap-3 border-t mt-3 w-full p-3 h-auto">
        <BackComponent to="/student" />
        {loading && (
          <div className="mt-[200px]">
            <Loading loadingState={loading} />
          </div>
        )}
        {error && (
          <div className="mt-[200px]">
            <ErrorComponent errorMessage={error} />
          </div>
        )}

        {session && (
          <div>
            <div className="mt-3">
              <div className="font-bold text-lg">
                Session ID:{" "}
                <span className="font-light font-sans">{session.id}</span>
              </div>
              <div className="font-bold text-lg">Name: {session.name}</div>
              <div className="font-bold text-lg">
                Insructor:{" "}
                <span className="font-light">
                  {session?.instructor?.firstname}{" "}
                  {session?.instructor?.lastname}
                </span>
              </div>
              <div className="font-bold text-lg">
                Day: <span className="font-light">{session?.day}</span>
              </div>
              <div className="font-bold text-lg">Status: {session.status}</div>
            </div>
            {attendance ? (
              <AttendanceDataTable data={attendance} />
            ) : (
              <ErrorComponent errorMessage="Failed to Fetch attendance Data. Please Refresh the page." />
            )}
          </div>
        )}
      </div>
    </>
  );
}
