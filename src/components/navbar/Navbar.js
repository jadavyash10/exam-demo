import { Link } from "react-router-dom";
import "../../styles/navabar.css";
const Navbar = () => {
  const token = localStorage.getItem("userToken");
  const role = localStorage.getItem("role");
  return (
    <div className="topnav">
      <Link to="/" id="nav">
        Home
      </Link>
      {!token ? (
        <div className="right">
          <Link to="/login" id="right">
            Login
          </Link>
          <Link to="/signup" id="right">
            SignUp
          </Link>
        </div>
      ) : null}
      {token ? (
        <>
          <div className="right">
            <Link to="/logout" id="right">
              Logout
            </Link>
            <Link to="/resetPassword" id="right">
              ResetPassword
            </Link>
          </div>
        </>
      ) : null}
      {token && role === "student" ? (
        <>
          <Link to="/studentDashboard">Dashboard</Link>
        </>
      ) : null}
      {token && role === "teacher" ? (
        <>
          <Link to="/teacherDashboard">Dashboard</Link>
          <Link to="/verifiedStudentData">VerifiedStudentData</Link>
          {/* <div className="right">
            <Link to="/logout" id="right" >
              Logout
            </Link>
            <Link to="/resetPassword" id="right">
              Resetpassword
            </Link>
          </div> */}
        </>
      ) : null}
    </div>
  );
};

export default Navbar;
