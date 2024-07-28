import ErrorComponent from "@/components/Error";
import Loading from "@/components/Loading";
import SessionCard from "@/components/SessionCard";
import { getUserSessions } from "@/endpoints";
import useFetchData from "@/lib/fetchData";
import { useAppStore } from "@/store";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type NoInstructor = Omit<SessionProps, "instructor">;
export default function StudentsSessions() {
  const [sessions, setSessions] = useState<NoInstructor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const setUser = useAppStore((state) => state?.setUser);
  const navigate = useNavigate();

  const { fetchData } = useFetchData();
  const fetchSessions = async () => {
    try {
      setLoading(true);
      // const response = await axios.get(getUserSessions, {
      //   withCredentials: true,
      // });
      const response = await fetchData(getUserSessions);
      console.log(response);

      setSessions(response.data.message);
    } catch (error) {
      if (error == "login") {
        //clear the current user data if any
        //update state
        setUser(null);

        // Redirect to login page
        navigate("/");
      }
      setError("Failed to fetch your Sessions. Please Reload the page.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSessions();
  }, []);
  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center">
        {loading && (
          <div>
            <Loading loadingState={loading} />
          </div>
        )}
        {error && (
          <div>
            <ErrorComponent errorMessage={error} />
          </div>
        )}
        {sessions?.length > 0 ? (
          sessions?.map((session: NoInstructor) => (
            <div
              className="w-full p-3 h-auto mt-4 self-start
          "
              key={session.id}
            >
              <Link to={`sessions/${session.session.id}`}>
                <div className="w-full flex gap-3 p-2 ">
                  <SessionCard sessionData={session} />
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            You are not a member of any session. Scan a Session code to join a
            session.
          </div>
        )}
      </div>
    </>
  );
}
