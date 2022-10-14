import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Private = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");
  return token ? children : <Navigate to="/login" />;
};

export default Private;


