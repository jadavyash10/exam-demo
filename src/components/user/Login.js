import { loginField } from "../../utils/loginFields";
import { Link } from "react-router-dom";
import Button from "../../reusable/Button";
import Input from "../../reusable/Input";
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
import Form from "../../reusable/Form";

const Login = () => {
  const { users, message, errors } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loginClear());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newError = Validation(name, value);
    dispatch(loginError({ [name]: newError }));
    dispatch(loginOnChange({ [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = {};
    Object.entries(users).forEach(([name, value], i) => {
      const newerror = Validation(name, value);
      if (newerror) {
        error[name] = newerror;
      }
    });
    if (Object.keys(error).length) {
      dispatch(loginError(error));
      return;
    }
    dispatch(loginSubmit(navigate));
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form>
        <Form
          field={loginField}
          Data={users}
          error={errors}
          handleChange={handleChange}
        />
        <div className="row">
          <Button clickHandler={handleSubmit}>Login</Button>

          <Link to="/forgotpassword">Forgotpassword?</Link>
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
