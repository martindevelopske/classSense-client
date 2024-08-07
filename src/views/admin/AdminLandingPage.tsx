import Card from "@/components/Dashboard/Card";
import { Chart } from "@/components/Dashboard/Chart";
import TodaySessions from "@/components/Dashboard/TodaySessions";
import { getDashboardCounts } from "@/endpoints";
import useFetchData from "@/lib/fetchData";
import { useEffect, useState } from "react";

export default function AdminLandingPage() {
  const [countsData, setCountsData] = useState<CountsResponse | null>(null);
  const { fetchData } = useFetchData();
  const getCounts = async () => {
    try {
      const counts = await fetchData(getDashboardCounts).then((res) => {
        console.log(res);

        setCountsData(res.data.message);
      });
    } catch (err) {}
  };
  useEffect(() => {
    getCounts();
  }, []);
  return (
    <>
      <div className="w-full h-full mt-[20px]">
        <div className="flex items-center justify-between">
          <h2 className="text-purple text-2xl font-bold">Overview</h2>
        </div>
        <div className=" flex gap-2 w-full mt-10 ">
          <div className="md:w-3/5 lg:w-3/4 border">
            <div className="flex gap-1 w-full flex-wrap">
              <Card
                title="Students"
                value={countsData?.students}
                description=""
              />
              <Card
                title="Intructors"
                value={countsData?.instructors}
                description=""
              />
              <Card
                title="Sessions"
                value={countsData?.sessions}
                description=""
              />
              <Card title="Rooms" value={countsData?.rooms} description="" />
            </div>
            <div className="w-1/2 flex flex-col mt-10">
              {/* <div>Overall Attendance Overview</div> */}
              {/* <Chart /> */}
            </div>
          </div>
          <div className="w-1/4 border">
            <h3 className="text-purple text-xl font-bold">Today's Sessions</h3>
            <TodaySessions />
          </div>
        </div>
      </div>
    </>
  );
}
