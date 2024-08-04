import { Helmet } from "react-helmet";
import { useAdminDataEffect } from "./useAdminDataEffect";
import AdminLandingPage from "./AdminLandingPage";
import { useAppStore } from "@/store";
export default function AdminView() {
  // useAdminDataEffect();
  const setUser= useAppStore.getState().setUser;
  setUser({user:null, userType: "admin"})
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Admin Dashboard</title>
      </Helmet>
      <div className="px-2">
        <AdminLandingPage />
      </div>
    </>
  );
}
