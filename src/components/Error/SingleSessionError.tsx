import { PiWarningFill } from "react-icons/pi";
export default function SingleSessionError() {
  return (
    <div className="flex flex-col items-center justify-center w-full mt-[-100px]">
      <PiWarningFill size={50} color="red" />
      <p className="text-lg">(error boundary).</p>
    </div>
  );
}
