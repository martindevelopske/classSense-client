import ErrorComponent from "@/components/Error";
import Loading from "@/components/Loading";
import SessionCard from "@/components/SessionCard";
import { getUserSessions } from "@/endpoints";
import useFetchData from "@/lib/fetchData";
import { useAppStore } from "@/store";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function StudentsSessions() {
  const [sessions, setSessions] = useState<SessionMembersResponse[] | null>([]);
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

      setSessions(response.data.message);
    } catch (error) {
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
        {sessions?.map((session: SessionMembersResponse) => (
          <div
            className="w-full p-3 h-auto mt-4 self-start
          "
            key={session.id}
          >
            <Link to={`sessions/${session.session.id}`}>
              <div className="w-full flex gap-3 p-2 ">
                <SessionCard session={session.session} />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
