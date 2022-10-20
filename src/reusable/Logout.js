const logout = (navigate) => {
  localStorage.clear();
  navigate("/login");
};
export default logout;
