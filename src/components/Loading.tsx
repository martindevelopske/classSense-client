import { CSSProperties, useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
export default function Loading({ loadingState }: { loadingState: boolean }) {
  const [loading] = useState<boolean>(loadingState);
  const [color] = useState<string>("#f97316");
  return (
    <>
      <div className="w-full flex items-center justify-center h-full">
        <ScaleLoader
          color={color}
          loading={loading}
          cssOverride={override}
          //   size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </>
  );
}
