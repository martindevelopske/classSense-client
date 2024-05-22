import SessionCard from "@/components/SessionCard";
import SessionCardInstructor from "@/components/SessionCardInstructor";
import { getInstructorSessions } from "@/endpoints";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function InstructorSessions() {
  const [sessions, setSessions] = useState<unknown>(null);
  const fetchSessions = async () => {
    try {
      const response = await axios.get(getInstructorSessions, {
        withCredentials: true,
      });
      console.log(response);
      setSessions(response.data.message);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };
  useEffect(() => {
    fetchSessions();
  }, []);
  return (
    <>
      {sessions?.map((session) => (
        <div className="w-full p-3 border  h-auto mt-4" key={session.id}>
          <Link to={`/instructor/sessions/${session.id}`}>
            <SessionCardInstructor session={session} />
          </Link>
        </div>
      ))}
    </>
  );
}
