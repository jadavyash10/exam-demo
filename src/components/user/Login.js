import { loginField } from "../../utils/loginFields";
import { Link } from "react-router-dom";
import Button from "../../reusable/Button";
import Input from "../../reusable/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  loginError,
  loginOnChange,
  loginSubmit,
} from "../../redux/action/loginAction";
import Validation from "../Validation";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Login = () => {
  const loginData = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = loginData.users;
  const message = loginData.message;
  const error = loginData.errors;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newError = Validation(name, value);
    dispatch(loginError({ [name]: newError }));
    dispatch(loginOnChange({ [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = {};
    Object.entries(userData).forEach(([name, value], i) => {
      const newerror = Validation(name, value);
      if (newerror) {
        error[name] = newerror;
      }
    });
    if (Object.keys(error).length > 0) {
      dispatch(loginError(error));
      return;
    }
    dispatch(loginSubmit(navigate));
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form>
        {loginField.map(({ name, label, placeholder, type, id }, i) => {
          return (
            <div key={id} className="row">
              <Input
                id={id}
                label={label}
                name={name}
                value={userData[name]}
                type={type}
                placeholder={placeholder}
                onChange={handleChange}
                error={error || ""}
              />
            </div>
          );
        })}
        <div className="row">
          <Button clickHandler={handleSubmit}>Login</Button>

          <Link to="/forgotpassword">Forgotpassword?</Link>
          <Link to="/resetPassword">ResetPassword?</Link>
        </div>
        <div className="row"></div>
        <div className="row">
          <div className="col-4">
            Not Have a Account? <Link to="/signup">signup</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
