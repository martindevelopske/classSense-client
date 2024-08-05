import { getAllSessions } from "@/endpoints";
import useFetchData from "@/lib/fetchData";
import { useEffect, useState } from "react";
import FadeLoader from "react-spinners/FadeLoader";

function Sessions() {
  const [sessions, setSessions] = useState<SessionResponse[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { fetchData } = useFetchData();
  const getSessions = async () => {
    try {
      setLoading(true);
      await fetchData(getAllSessions).then((res) => {
        console.log(res);

        setSessions(res.data.message);
      });
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getSessions();
  }, []);
  let count = 0;
  return (
    <>
      <div className="flex items-center justify-between w-full p-2">
        <div className="w-full">
          <h2 className="text-purple text-2xl font-bold">All Sessions</h2>
          <div className="flex flex-col justify-center items-start rounded-md h-auto w-full p-2">
            {!loading &&
              sessions &&
              sessions.length > 0 &&
              sessions.map((session) => {
                return (
                  <div
                    key={session.id}
                    className="flex flex-col justify-center items-start rounded-lg h-auto w-full"
                  >
                    <div className="flex gap-2 items-center w-full justify-between bg-slate-200 ">
                      <h2>{++count}.</h2>
                      <h2 className="font-bold">{session.name}</h2>
                      <h2>
                        {session.instructor?.firstname}{" "}
                        {session.instructor?.lastname}
                      </h2>
                      <p>{session.status}</p>

                      <div>{session.location?.locationName}</div>
                    </div>
                  </div>
                );
              })}
            {loading && <FadeLoader />}
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}
export default Sessions;
