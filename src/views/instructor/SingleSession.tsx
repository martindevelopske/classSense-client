import Breadcrumbs from "@/components/BreadCrumps";
import { getInstructorSessions, getSingleSession } from "@/endpoints";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function SingleSession() {
  const [session, setSession] = useState<unknown>(null);
  const location = useLocation();
  const fetchSession = async (id: number) => {
    try {
      const url = `${getSingleSession}/${Number(id)}`;
      console.log(url);

      const response = await axios.get(url, {
        withCredentials: true,
      });
      console.log(response);
      setSession(response.data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };
  useEffect(() => {
    console.log(location.pathname);

    fetchSession(6);
  }, []);
  return (
    <>
      <div>single session</div>
    </>
  );
}
