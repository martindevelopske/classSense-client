import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginForm } from "@/components/login";
import { SignupForm } from "@/components/signup";

const LoginSignupPage = () => {
  const [activeTab, setActiveTab] = useState("login");

  const showTab = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg border min-h-[600px] h-auto">
        <div className="flex justify-between mb-8 p-2">
          <Button
            onClick={() => showTab("login")}
            variant={activeTab == "login" ? "default" : "secondary"}
            className={`w-1/2 py-2 px-4 text-black hover:text-black hover:border `}
          >
            Login
          </Button>
          <Button
            onClick={() => showTab("signup")}
            variant={activeTab == "signup" ? "default" : "secondary"}
            className={`w-1/2 py-2 px-4 hover:text-black hover:border rounded-tr-lg rounded-br-lg`}
          >
            Sign Up
          </Button>
        </div>
        {activeTab === "login" && <LoginForm />}
        {activeTab === "signup" && <SignupForm />}
      </div>
    </div>
  );
};

export default LoginSignupPage;
