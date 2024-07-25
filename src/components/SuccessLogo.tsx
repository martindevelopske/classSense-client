import { FcApproval } from "react-icons/fc";

export default function SuccessLogo({
  size,
  message,
}: {
  size?: number;
  message: string;
}) {
  return (
    <div className="flex items-center flex-col">
      <FcApproval size={size ? size : 100} />
      <div>{message}</div>
    </div>
  );
}
