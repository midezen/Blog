import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const login = async (user) => {
    try {
      const res = await axios.post("/auth/login", user);
      setCurrentUser(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };
  useEffect(() => {
    JSON.stringify(localStorage.setItem("user", currentUser));
  }, [currentUser]);
  return (
    <AuthContext.Provider value={{ login, error, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
