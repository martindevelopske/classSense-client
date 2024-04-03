import SessionCard from "@/components/SessionCard";
import { getUserSessions } from "@/endpoints";
import axios from "axios";
import { useEffect, useState } from "react";

export default function StudentsSessions() {
  const [sessions, setSessions] = useState<unknown>(null);
  const fetchSessions = async () => {
    try {
      const response = await axios.get(getUserSessions, {
        withCredentials: true,
      });
      console.log(response.data);
      setSessions(response.data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };
  useEffect(() => {
    fetchSessions();
  }, []);
  return (
    <>
      {sessions?.map((session, index) => (
        <div className="w-full p-3 border  h-auto mt-4">
          <SessionCard key={index} session={session} />
        </div>
      ))}
    </>
  );
}
