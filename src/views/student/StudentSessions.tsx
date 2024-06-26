import ErrorComponent from "@/components/Error";
import Loading from "@/components/Loading";
import SessionCard from "@/components/SessionCard";
import { getUserSessions } from "@/endpoints";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function StudentsSessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const fetchSessions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(getUserSessions, {
        withCredentials: true,
      });
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
        {sessions?.map((session: SessionProps) => (
          <div
            className="w-full p-3 h-auto mt-4 self-start
          "
            key={session.id}
          >
            <Link to={`sessions/${session.session.id}`}>
              <div className="w-full flex gap-3 p-2 ">
                <SessionCard session={session} />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
