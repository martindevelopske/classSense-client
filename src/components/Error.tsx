import { PiWarningFill } from "react-icons/pi";
export default function ErrorComponent({
  errorMessage,
}: {
  errorMessage: string;
}) {
  return (
    <div className="flex items-center justify-center w-full">
      <PiWarningFill size={50} color="red" />
      <p className="text-lg">{errorMessage}</p>
    </div>
  );
}
