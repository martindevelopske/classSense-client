import LoginSignupPage from "@/pages/LoginSignupPage";
import { Route, Routes } from "react-router-dom";
import { FC } from "react";
export const HomeRouter: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginSignupPage />} />
    </Routes>
  );
};
export default HomeRouter;
