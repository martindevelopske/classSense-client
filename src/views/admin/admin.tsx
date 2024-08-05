import { Helmet } from "react-helmet";
import { useAdminDataEffect } from "./useAdminDataEffect";
import AdminLandingPage from "./AdminLandingPage";
export default function AdminView() {
  useAdminDataEffect();
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
