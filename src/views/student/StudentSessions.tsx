import SessionCard from "@/components/SessionCard";
import { getUserSessions } from "@/endpoints";
import axios from "axios";
import { useEffect, useState } from "react";

export default function StudentsSessions() {
  const [sessions, setSessions] = useState([]);
  const fetchSessions = async () => {
    try {
      const response = await axios.get(getUserSessions, {
        withCredentials: true,
      });
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
      {sessions?.map((session: SessionProps) => (
        <div className="w-full p-3 border  h-auto mt-4" key={session.id}>
          <SessionCard session={session} />
        </div>
      ))}
    </>
  );
}
