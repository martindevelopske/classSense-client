import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import InstructorSessions from "./InstructorSession";
import { useState } from "react";
import CreateSessionModal from "@/components/modals/CreateSessionModal";
import { useInstructorUserDataEffect } from "./useInstructorUserDataEffect";
export default function InstructorLandingPage() {
  const [showCreateSessionModal, setShowCreateSessionModal] =
    useState<boolean>(false);
  useInstructorUserDataEffect();
  return (
    <>
      <div className="w-full h-full mt-[20px]">
        <div className="flex items-center justify-between">
          <h2 className="text-purple text-2xl font-bold">Your Sessions</h2>
          <Button
            variant="default"
            className="flex items-center gap-2 justify-center ml-[150px]"
            onClick={() => setShowCreateSessionModal(true)}
          >
            {/* <Link
              to="createSession"
              className="flex gap-2 items-center justify-center"
            > */}
            <PlusIcon />
            <span>Create New Session</span>
            {/* </Link> */}
          </Button>
          <CreateSessionModal
            showCreateSessionModal={showCreateSessionModal}
            setShowCreateSessionModal={setShowCreateSessionModal}
          />
        </div>
        <InstructorSessions />
      </div>
    </>
  );
}
