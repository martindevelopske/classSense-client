import { useEffect } from "react";
import { PiWarningFill } from "react-icons/pi";
export default function ErrorComponent({
  errorMessage,
}: {
  errorMessage: string;
}) {
  useEffect(() => {
    console.log("rendered");
  }, []);
  return (
    <div className="flex h-[500px] flex-col items-center justify-center w-full mt-[-100px]">
      <div className="flex items-center justify-center gap-3">
        <PiWarningFill size={50} color="red" />
        <p className="text-lg">{errorMessage}</p>
      </div>
    </div>
  );
}
