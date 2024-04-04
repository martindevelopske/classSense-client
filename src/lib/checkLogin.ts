import checkCookie from "./checkCookie";

export const checkLogin = () => {
  const userDataString = localStorage.getItem("userData");
  if (userDataString) {
    const userData = JSON.parse(userDataString);
    if (userData) {
      const cookie = checkCookie("userToken");
      if (cookie) return userData;
    }
  }
  return false;
};
