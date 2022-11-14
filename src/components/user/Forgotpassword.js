import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import forgotPasswordSubmit, {
  forgotPassClear,
  forgotPassError,
  forgotPassOnChange,
} from "../../redux/action/ForgotPasswordAction";
import Validation from "../Validation";
import Button from "../../reusable/Button";
import { useNavigate } from "react-router-dom";
import Form from "../../reusable/Form";
import forgotPassField from "../../utils/forgotPassworField";

const Forgotpassword = () => {
  
  useEffect(()=>{
    dispatch(forgotPassClear())
  },[])

  const { users, message, errors } = useSelector(
    (state) => state.forgotPassword
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newError = Validation(name, value);
    dispatch(forgotPassError({ [name]: newError }));
    dispatch(forgotPassOnChange({ [name]: value }));
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
        <Form
          field={forgotPassField}
          Data={users}
          error={errors}
          handleChange={handleChange}
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
