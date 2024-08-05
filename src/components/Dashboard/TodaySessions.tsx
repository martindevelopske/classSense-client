import { getTodaySessions } from "@/endpoints";
import useFetchData from "@/lib/fetchData";
import React, { useEffect, useState } from "react";
import FadeLoader from "react-spinners/FadeLoader";

function TodaySessions() {
  const [todaySessions, setTodaySessions] = useState<SessionResponse[] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const { fetchData } = useFetchData();
  const getCounts = async () => {
    try {
      setLoading(true);
      const counts = await fetchData(getTodaySessions).then((res) => {
        console.log(res);

        setTodaySessions(res.data.message);
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCounts();
  }, []);
  return (
    <div className="flex w-full h-auto p-2">
      {!loading && todaySessions && todaySessions.length > 0 && (
        <div className="flex flex-col justify-center items-start rounded-md h-auto bg-slate-400 w-full p-2">
          {todaySessions.map((session) => {
            return (
              <div
                key={session.id}
                className="flex flex-col justify-center items-start rounded-lg h-auto w-full"
              >
                <h2 className="font-bold">{session.name}</h2>
                <p>
                  Tutor: {session.instructor?.firstname}{" "}
                  {session.instructor?.lastname}
                </p>
                <p>Room: {session.location?.locationName}</p>
              </div>
            );
          })}
        </div>
      )}
      {loading && <FadeLoader />}
    </div>
  );
}

export default TodaySessions;
