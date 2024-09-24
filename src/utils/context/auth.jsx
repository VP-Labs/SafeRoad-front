import React, { useState, createContext } from 'react'
import { useNavigate } from "react-router-dom";



// MANAGE AUTH DIRECTLY WITH HOOKS --------------------------------------

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken") || "");
  const navigate = useNavigate();
  
  const loginAction = async (data) => {
    try {
      const response = await fetch("http://localhost:5005/auth/login", {        //  <<<< backend api here <<<
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.authToken) {
        setUser(data.email);
        setToken(res.authToken);
        localStorage.setItem("authToken", res.authToken);
        navigate("/");
        return;
      }
      console.log("Identifiants Incorrects");
      return;
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};



