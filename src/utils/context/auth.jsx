import React, { useState, createContext } from 'react'
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from '../../../api.config';



// MANAGE AUTH DIRECTLY WITH HOOKS --------------------------------------

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState(localStorage.getItem("authUser") || "");
  const [token, setToken] = useState(localStorage.getItem("authToken") || "");
  const navigate = useNavigate();
  
  const loginAction = async (data) => {
    try {
      const response = await fetch(API_ENDPOINT + "/auth/login", {        //  <<<< backend api here <<<
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.authToken) {
        setUser(data.email);
        localStorage.setItem("authUser", data.email);
        setToken(res.authToken);
        localStorage.setItem("authToken", res.authToken);
        navigate("/");
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const logOut = () => {
    setUser("");
    setToken("");
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    navigate("/login");
  };
  
  const signupAction = async (data) => {
    try {
      const response = await fetch(API_ENDPOINT + "/auth/signup", {        //  <<<< backend api here <<<
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.user) { return true; }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
  


  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut, signupAction }}>
      {children}
    </AuthContext.Provider>
  );

};






