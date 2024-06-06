import { useEffect } from "react";

export default function Test() {
  useEffect(() => {
    throw new Error("test");
  }, []);
  return <div>hello</div>;
}
