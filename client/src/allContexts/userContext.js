import axios from "axios";
import { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

export const UserContext = createContext();
// const navigate = useNavigate();

export const UserContextProvider = ({ children }) => {
  //   const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (user) => {
    const res = await axios.post("/auth/login", user);
    setCurrentUser(res.data);
    //   navigate("/");
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ login, currentUser }}>
      {children}
    </UserContext.Provider>
  );
};
