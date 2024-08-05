import { Button } from "@/components/ui/button";
import { getAllLocations } from "@/endpoints";
import useFetchData from "@/lib/fetchData";
import { useEffect, useState } from "react";
import FadeLoader from "react-spinners/FadeLoader";

function Rooms() {
  const [rooms, setRooms] = useState<LocationResponse[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { fetchData } = useFetchData();
  const getRooms = async () => {
    try {
      setLoading(true);
      await fetchData(getAllLocations).then((res) => {
        console.log(res);

        setRooms(res.data.message);
      });
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getRooms();
  }, []);
  let count = 0;
  return (
    <>
      <div className="flex items-center justify-between w-ful h-auto p-2">
        <div className="w-3/4">
          <h2 className="text-purple text-2xl font-bold">All rooms</h2>
          <div className="flex flex-col justify-center items-start rounded-md h-auto w-full p-2">
            {!loading &&
              rooms &&
              rooms.length > 0 &&
              rooms.map((rooms) => {
                return (
                  <div
                    key={rooms.id}
                    className="flex flex-col justify-between items-start rounded-lg h-auto w-full bg-slate-200 p-2"
                  >
                    <div className="flex gap-2 justify-between items-center w-full">
                      <h2>{++count}.</h2>
                      <h2 className="font-bold">{rooms.locationName}</h2>
                      <p>{rooms.locationDescription}</p>
                    </div>
                  </div>
                );
              })}
            {loading && <FadeLoader />}
          </div>
        </div>
        <div>
          <Button>Create New Instructor</Button>
        </div>
      </div>
    </>
  );
}
export default Rooms;
