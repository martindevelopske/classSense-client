import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
export default function BackComponent({ to }: { to: string }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(to);
  };
  return (
    <>
      <div className="w-full h-[50px] flex items-center justify-start cursor-pointer">
        <p
          onClick={handleClick}
          className="flex gap-2 items-center border p-2 rounded-md border-purple"
        >
          <BiArrowBack /> Back
        </p>
      </div>
    </>
  );
}
