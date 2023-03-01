import { createContext, useState, useEffect } from "react";
import { axiosInstance } from "../config";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (user) => {
    const res = await axiosInstance.post("/auth/login", user);
    setCurrentUser(res.data);
  };

  const logout = async (user) => {
    await axiosInstance.post("/auth/logout");
    setCurrentUser(null);
  };

  const userData = async (id) => {
    try {
      const res = await axiosInstance.get(`/users/?id=${id}`);
      if (res.data[0].id === currentUser.id) {
        setCurrentUser(res.data[0]);
      }
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ login, currentUser, logout, userData }}>
      {children}
    </UserContext.Provider>
  );
};
