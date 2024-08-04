import React from "react";

function Card({
  title,
  value,
  description,
}: {
  title: string | number;
  value: string | number;
  description: string;
}) {
  return (
    <>
      <div className="flex flex-col items-center justify-center p-2 gap-1 border rounded-md bg-purple text-white">
        <div className="font-bold text-lg">{title}</div>
        <div className="text-2xl">{value}</div>
        <div>{description}</div>
      </div>
    </>
  );
}

export default Card;
