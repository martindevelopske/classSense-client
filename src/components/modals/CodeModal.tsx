import { Dispatch, SetStateAction, useState } from "react";
import { IoClose } from "react-icons/io5";
import { LiaRedoAltSolid } from "react-icons/lia";
import { Button } from "../ui/button";
import SaveImageButton from "../SaveImageButton";

function CodeModal({
  data,
  name,
  setFullscreen,
}: {
  data: string;
  name: string;
  setFullscreen: Dispatch<SetStateAction<boolean>>;
}) {
  const [redo, setRedo] = useState(false);
  return (
    <div className="h-full w-full bg-modalbg bg-opacity-90 fixed top-0 right-0 flex items-center justify-center z-50">
      <div className="bg-white w-4/5 rounded-md h-3/4 flex flex-col items-center justify-between gap-2 p-3">
        <div className="w-full h-50 flex items-center justify-end  self-start mb-3">
          <button onClick={() => setFullscreen(false)}>
            <IoClose color="RGB(249 115 22)" size={35} />
          </button>
        </div>
        <div className="text-2xl">{name} Code</div>
        {name == "sign-in" && <div>Scan this code to sign in to class</div>}
        {name == "joining" && (
          <div>Scan this code to join this session as a new member</div>
        )}
        <img className="" src={data} alt="QR Code" />
        <div className="w-full flex items-center justify-around gap-3">
          <Button
            variant="destructive"
            className="flex items-center justify-center"
            onClick={() => setFullscreen(false)}
          >
            <div className="flex gap-2 items-center justify-center">
              <span>Close</span>
            </div>
          </Button>
          <SaveImageButton dataUrl={data} />
        </div>
      </div>
    </div>
  );
}

export default CodeModal;
