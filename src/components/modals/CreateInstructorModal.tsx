import { Dispatch, SetStateAction } from "react";
import { IoClose } from "react-icons/io5";
import { Button } from "../ui/button";
import CreateInstructorForm from "@/views/instructor/Forms/CreateInstructorForm";

function CreateInstructorModal({
  showCreateInstructorModal,
  setShowCreateInstructorModal,
}: {
  showCreateInstructorModal: boolean;
  setShowCreateInstructorModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    showCreateInstructorModal && (
      <div className="h-full w-full bg-modalbg bg-opacity-90 fixed top-0 right-0 z-50 flex items-center justify-center">
        <div className="bg-white w-4/5 rounded-md h-auto flex flex-col items-center justify-between gap-2 p-3">
          <div className="w-full h-50 flex items-center justify-end  self-start mb-3">
            <button onClick={() => setShowCreateInstructorModal(false)}>
              <IoClose color="RGB(249 115 22)" size={35} />
            </button>
          </div>
          <CreateInstructorForm />
          <div className="w-full flex items-center justify-around gap-3">
            <Button
              variant="destructive"
              className="flex items-center justify-center"
              onClick={() => setShowCreateInstructorModal(false)}
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

export default CreateInstructorModal;
