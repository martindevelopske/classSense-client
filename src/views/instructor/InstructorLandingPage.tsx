import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import InstructorSessions from "./InstructorSession";
export default function InstructorLandingPage() {
  return (
    <>
      <div className="w-full h-full mt-[20px]">
        <div className="flex items-center justify-between">
          <h2 className="text-purple text-2xl font-bold">Your Sessions</h2>
          <Button className="flex items-center justify-center">
            <Link
              to="createSession"
              className="flex gap-2 items-center justify-center"
            >
              <PlusIcon />
              <span>Create New Session</span>
            </Link>
          </Button>
        </div>
        <InstructorSessions />
      </div>
    </>
  );
}
