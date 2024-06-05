import { Link, useNavigate } from "react-router-dom";

export default function BackComponent({ to }: { to: string }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(to);
  };
  return (
    <>
      <div className="w-full h-[50px] flex items-center justify-start cursor-pointer">
        <p onClick={handleClick}> Back</p>
      </div>
    </>
  );
}
