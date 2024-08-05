import { Button } from "@/components/ui/button";
import { getAllInstructors } from "@/endpoints";
import useFetchData from "@/lib/fetchData";
import { useEffect, useState } from "react";
import FadeLoader from "react-spinners/FadeLoader";

function Instructors() {
  const [instructors, setInstructors] = useState<InstructorResponse[] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const { fetchData } = useFetchData();
  const getInstructors = async () => {
    try {
      setLoading(true);
      await fetchData(getAllInstructors).then((res) => {
        console.log(res);

        setInstructors(res.data.message);
      });
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getInstructors();
  }, []);
  let count = 0;
  return (
    <>
      <div className="flex items-center justify-between w-ful h-auto p-2">
        <div className="w-3/4">
          <h2 className="text-purple text-2xl font-bold">All Instructors</h2>
          <div className="flex flex-col justify-center items-start rounded-md h-auto w-full p-2">
            {!loading &&
              instructors &&
              instructors.length > 0 &&
              instructors.map((instructor) => {
                return (
                  <div
                    key={instructor.id}
                    className="flex flex-col justify-between items-start rounded-lg h-auto w-full bg-slate-200 p-2"
                  >
                    <div className="flex gap-2 justify-between items-center w-full">
                      <h2>{++count}.</h2>
                      <h2 className="font-bold">
                        {instructor.firstname} {instructor.lastname}
                      </h2>
                      <p>{instructor.email}</p>
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
export default Instructors;
