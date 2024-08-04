import { testconnetion } from "@/endpoints";
import useFetchData from "@/lib/fetchData";
import { useAppStore } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
export function useAdminDataEffect() {
  const navigate = useNavigate();
   const {fetchData}= useFetchData();
  const user: LoginResponse| null = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);
  async function testconnection() {
    try {
      const response = await fetchData(testconnetion);
      return response.status === 200; // Return true or false based on status check
    } catch (error) {
      console.error("Error testing connection:", error);
      return false; // Return false on error
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const isConnectionGood = await testconnection(); // Await the result of testconnection

        // Check user and connection status
        if (!user || user === null ) {
          setUser(null);
          navigate("/", { state: { redirect: location.pathname } });
        } else if (user.userType !== "admin") {
          setUser(null);
          navigate("/", { state: { redirect: location.pathname } });
        }

        // Proceed with other logic based on connection and user status
        // Example: check userToken in cookies, if needed
        // const cookie = Cookies.get("userToken");
        // if (!cookie) {
        //   setUser(null);
        //   navigate("/", { state: { redirect: location.pathname } });
        // }
      } catch (error) {
        console.error("Error testing connection:", error);
        setUser(null);
        navigate("/", { state: { redirect: location.pathname } });
      }
    };

    fetchData(); // Call the async function to fetch data
    // }
  }, [user]);
}
