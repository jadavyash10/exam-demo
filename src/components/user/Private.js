import React from "react";
import { useJwt } from "react-jwt";
import { Navigate, useNavigate } from "react-router-dom";

const Private = ({ children }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("userToken");

  const { decodedToken, isExpired } = useJwt(token);

  if (isExpired) {
    localStorage.clear();
    navigate("/login");
  }

  return token ? children : <Navigate to="/login" state={{ login: true }} />;
};

export default Private;
