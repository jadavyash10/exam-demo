import { loginField } from "../../utils/loginFields";
import { Link } from "react-router-dom";
import Button from "../../reusable/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  loginClear,
  loginError,
  loginOnChange,
  loginSubmit,
} from "../../redux/action/loginAction";
import Validation from "../Validation";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { errorValidate } from "../../utils/Function";
import ReusableForm from "../../reusable/ReusableForm";

const Login = () => {
  const { users, message, errors, loading } = useSelector(
    (state) => state.login
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loginClear());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(loginError({ [name]: Validation(name, value) }));
    dispatch(loginOnChange({ [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errorValidate(users)).length) {
      dispatch(loginError(errorValidate(users)));
      return;
    }
    dispatch(loginSubmit(navigate));
  };
  const buttonArr = [
    {
      children: "Login",
      onClick: handleSubmit,
      disabled: loading ? true : false,
    },
  ];

  return (
    <div className="container">
      <h1>Login</h1>
      <div>
        <ReusableForm
          field={loginField}
          Data={users}
          error={errors}
          onChange={handleChange}
          buttonArr={buttonArr}
        />
      </div>

      <div>
        <Link to="/forgotpassword">ForgotPassword?</Link>
      </div>
      <div className="row">
        <div className="col-4">
          Not Have a Account? <Link to="/signup">signup</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
