import Wrapper from "@/components/wrapper";
import { homeLoginUrl } from "@/lib/urls";
import { useAppStore } from "@/store";
import React, { useEffect } from "react";
import { Auth } from "./auth";

function Home() {
  const user: User | null = useAppStore((state) => state.user);
  console.log(user);

  const setAfterLogin = useAppStore((state) => state.setAfterLogin);
  const afterLogin = useAppStore((state) => state.afterLogin);
  // useEffect(() => {
  //   if (!user || user == null) {
  //     console.log("no user...redirecting");
  //     const currentPage: string = window.location.href;
  //     console.log(currentPage, "curr");

  //     setAfterLogin(currentPage);
  //     console.log("set successfully");

  //     window.location.href = homeLoginUrl;
  //   }
  // }, [user]);
  return (
    <div>
      <Auth />
    </div>
  );
}

export default Home;
