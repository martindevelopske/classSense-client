import { Dispatch, SetStateAction } from "react";
import { IoClose } from "react-icons/io5";
import { Button } from "../ui/button";
import CreateSessionForm from "@/views/instructor/Forms/CreateSessionForm";

interface SessionData {
  name: string;
  status: string;
  day: string;
  locationId: string;
}
function EditSessionModal({
  showEditSessionModal,
  setShowEditSessionModal,

  name,
  status,
  day,
  locationId,
}: {
  showEditSessionModal: boolean;
  setShowEditSessionModal: Dispatch<SetStateAction<boolean>>;
  name: string | undefined;
  status: string | undefined;
  day: string | undefined;
  locationId: string | undefined;
}) {
  return (
    showEditSessionModal && (
      <div className="h-full w-full bg-modalbg bg-opacity-90 fixed top-0 right-0 z-50 flex items-center justify-center">
        <div className="bg-white w-4/5 rounded-md h-auto flex flex-col items-center justify-between gap-2 p-3">
          <div className="w-full h-50 flex items-center justify-end  self-start mb-3">
            <button onClick={() => setShowEditSessionModal(false)}>
              <IoClose color="RGB(249 115 22)" size={35} />
            </button>
          </div>
          <CreateSessionForm />
          <div className="w-full flex items-center justify-around gap-3">
            <Button
              variant="destructive"
              className="flex items-center justify-center"
              onClick={() => setShowEditSessionModal(false)}
            >
              <div className="flex gap-2 items-center justify-center">
                <span>Close</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    )
  );
}

export default EditSessionModal;
