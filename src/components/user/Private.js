import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
// import verifyToken from "react-jwt

const Private = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");
  return token ? children : <Navigate to="/login" state={{login:true}}/>;
};

export default Private;


