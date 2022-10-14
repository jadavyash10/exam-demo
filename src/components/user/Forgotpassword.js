import React from "react";
import { useDispatch, useSelector } from "react-redux";
import forgotPasswordSubmit, {
  forgotPassError,
  forgotPassOnChange,
} from "../../redux/action/ForgotPasswordAction";
import Input from "../../reusable/Input";
import Validation from "../Validation";
import Button from "../../reusable/Button";
import { useNavigate } from "react-router-dom";

const Forgotpassword = () => {
  const forgotpass = useSelector((state) => state.forgotPassword);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = forgotpass.users;
  const message = forgotpass.message;
  const error = forgotpass.errors;
  console.log(forgotpass);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newError = Validation(name, value);
    dispatch(forgotPassError({ [name]: newError }));
    dispatch(forgotPassOnChange({ [name]: value }));
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
      dispatch(forgotPassError(error));
      return;
    }
    dispatch(forgotPasswordSubmit(navigate));
  };

  return (
    <div className="container">
      <h1>Forgot Password</h1>
      <div className="row">
        <Input
          name="email"
          label="Email"
          value={userData["email"]}
          id="email"
          type="email"
          placeholder="enter email"
          onChange={handleChange}
          error={error || ""}
        />
      </div>
      <div className="row">
        <Button clickHandler={handleSubmit}>Submit</Button>
        <Button clickHandler={() => navigate("/login")}>Login</Button>
      </div>
    </div>
  );
};

export default Forgotpassword;
