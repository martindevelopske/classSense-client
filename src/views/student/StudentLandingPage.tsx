import { Button } from "../../components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import StudentsSessions from "./StudentSessions";
export default function StudentLandingPage() {
  return (
    <>
      <div className="w-full h-full mt-[20px]">
        <div className="flex items-center justify-between">
          <h2 className="text-purple text-2xl font-bold">Your Sessions</h2>
          <Button className="flex items-center justify-center">
            <div className="flex gap-2 items-center justify-center">
              <PlusIcon />
              <span>Join A Session</span>
            </div>
          </Button>
        </div>
        <StudentsSessions />
      </div>
    </>
  );
}
