import { Link, Outlet, useNavigate } from "react-router-dom";
import "../../styles/navabar.css";
import logout from "../../reusable/Logout";
const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");
  const role = localStorage.getItem("role");

  return (
    <>
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
              <Link
                id="right"
                onClick={() => {
                  logout(navigate);
                }}
              >
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
            <Link to="/studentProfile">studentProfile</Link>
          </>
        ) : null}
        {token && role === "teacher" ? (
          <>
            <Link to="/teacherDashboard">Dashboard</Link>
            <Link to="/verifiedStudentData">VerifiedStudentData</Link>
            <Link to="/createExam">CreateExam</Link>
            <Link to="/viewExam">ViewExam</Link>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Navbar;
