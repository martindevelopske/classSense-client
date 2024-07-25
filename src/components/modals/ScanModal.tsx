import QRCodeScanner from "@/views/student/QRCodeScanner";
import { Dispatch, SetStateAction, useState } from "react";
import { IoClose } from "react-icons/io5";
import { LiaRedoAltSolid } from "react-icons/lia";
import { Button } from "../ui/button";

function ScanModal({
  setShowScanModal,
}: {
  setShowScanModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [redo, setRedo] = useState(false);
  return (
    <div className="h-full w-full bg-modalbg bg-opacity-90 fixed top-0 right-0 flex items-center justify-center">
      <div className="bg-white w-4/5 rounded-md h-3/4 flex flex-col items-center justify-between gap-2 p-3">
        <div className="w-full h-50 flex items-center justify-end  self-start mb-3">
          <button onClick={() => setShowScanModal(false)}>
            <IoClose color="RGB(249 115 22)" size={35} />
          </button>
        </div>
        <QRCodeScanner redo={redo} />
        <div className="w-full flex items-center justify-around gap-3">
          <Button
            variant="destructive"
            className="flex items-center justify-center"
            onClick={() => setShowScanModal(false)}
          >
            <div className="flex gap-2 items-center justify-center">
              <span>Close</span>
            </div>
          </Button>
          <Button
            className="flex items-center justify-center"
            onClick={() => {
              console.log("heopx");
              setRedo(true);
            }}
          >
            <div className="flex gap-2 items-center justify-center">
              <LiaRedoAltSolid />
              <span>Scan Again</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ScanModal;
