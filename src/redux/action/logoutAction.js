import { Navigate } from "react-router-dom";

const handleLogout = () => {
  localStorage.clear();
  <Navigate to="/login" />;
};
export default handleLogout;