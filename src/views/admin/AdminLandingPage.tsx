import Card from "@/components/Dashboard/Card";
import { Chart } from "@/components/Dashboard/Chart";
import TodaySessions from "@/components/Dashboard/TodaySessions";

export default function AdminLandingPage() {
  return (
    <>
      <div className="w-full h-full mt-[20px]">
        <div className="flex items-center justify-between">
          <h2 className="text-purple text-2xl font-bold">Overview</h2>
        </div>
        <div className=" flex gap-2 w-full mt-10">
          <div className="w-3/4">
            <div className="flex gap-2 w-full">
              <Card
                title="Students"
                value="1000"
                description="up by 20% from last week"
              />
              <Card
                title="Intructors"
                value="1000"
                description="up by 20% from last week"
              />
              <Card
                title="Sessions"
                value="1000"
                description="up by 20% from last week"
              />
              <Card
                title="Rooms"
                value="44"
                description="up by 20% from last week"
              />
            </div>
            <div className="w-1/2 flex flex-col mt-10">
              <div>Overall Attendance Overview</div>
              <Chart />
            </div>
          </div>
          <div className="w-1/4">
            <h3 className="text-purple text-xl font-bold">Today's Sessions</h3>
            <TodaySessions />{" "}
          </div>
        </div>
      </div>
    </>
  );
}
