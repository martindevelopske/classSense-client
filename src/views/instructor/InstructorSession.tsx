import ErrorComponent from "@/components/Error";
import Loading from "@/components/Loading";
import SessionCardInstructor from "@/components/SessionCardInstructor";
import { getInstructorSessions } from "@/endpoints";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function InstructorSessions() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [sessions, setSessions] = useState<SessionCard[] | null>(null);
  const fetchSessions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(getInstructorSessions, {
        withCredentials: true,
      });

      setSessions(response.data.message);
    } catch (error) {
      console.error("Error fetching sessions:", error);
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
        {sessions?.map((session) => (
          <div className="w-full p-3  h-auto mt-4" key={session.id}>
            <Link to={`/instructor/sessions/${session.id}`}>
              <SessionCardInstructor session={session} />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
