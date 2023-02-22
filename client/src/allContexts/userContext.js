import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (user) => {
    const res = await axios.post("/auth/login", user);
    setCurrentUser(res.data);
  };

  const logout = async (user) => {
    await axios.post("/auth/logout");
    setCurrentUser(null);
  };

  const userData = async (id) => {
    try {
      const res = await axios.get(`/users/?id=${id}`);
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
