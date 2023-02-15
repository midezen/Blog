import axios from "axios";
import { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

export const UserContext = createContext();
// const navigate = useNavigate();

export const UserContextProvider = ({ children }) => {
  //   const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const login = async (user) => {
    const res = await axios.post("/auth/login", user);
    setCurrentUser(res.data);
    //   navigate("/");
  };

  useEffect(() => {
    JSON.stringify(localStorage.setItem("user", currentUser));
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ login, currentUser }}>
      {children}
    </UserContext.Provider>
  );
};
