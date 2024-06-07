import { Button } from "../../components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import StudentsSessions from "./StudentSessions";
import { IoQrCodeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import ScanModal from "@/components/modals/ScanModal";
import { useState } from "react";
export default function StudentLandingPage() {
  const [showScanModal, setShowScanModal] = useState(false);
  const handleShowModal = () => {};
  return (
    <>
      <div className="w-full h-full mt-[20px]">
        <div className="flex flex-col gap-3 items-center justify-between">
          <div className="flex gap-2">
            <div className="flex bg-orange-500 p-2 rounded-md text-white items-center justify-center">
              <div
                className="flex gap-2 items-center justify-center cursor-pointer"
                onClick={() => setShowScanModal(true)}
              >
                <IoQrCodeOutline />
                <span>Scan QR</span>
              </div>
            </div>
            <Button className="flex items-center justify-center">
              <div className="flex gap-2 items-center justify-center">
                <PlusIcon />
                <span>Join A Session</span>
              </div>
            </Button>
          </div>
          <h2 className="text-purple self-start mt-4 text-2xl font-bold">
            Your Sessions
          </h2>
        </div>
        <StudentsSessions />
        {showScanModal && (
          <ScanModal
            showScanModal={showScanModal}
            setShowScanModal={setShowScanModal}
          />
        )}
      </div>
    </>
  );
}
