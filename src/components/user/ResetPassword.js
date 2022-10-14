import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  resetpasswordSubmit,
  resetpasswordError,
  resetpasswordOnChange,
} from "../../redux/action/ResetPasswordAction";
import Input from "../../reusable/Input";
import Validation from "../Validation";
import Button from "../../reusable/Button";
import { resetPassField } from "../../utils/resetPassField";

const ResetPassword = () => {
  const newPassword = useSelector((state) => state.resetPassword);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = newPassword.users;
  const message = newPassword.message;
  const error = newPassword.errors;
  const token = localStorage.getItem("userToken");
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newError = Validation(name, value, userData);
    dispatch(resetpasswordError({ [name]: newError }));
    dispatch(resetpasswordOnChange({ [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = {};
    Object.entries(userData).forEach(([name, value], i) => {
      const newerror = Validation(name, value, userData);
      if (newerror) {
        error[name] = newerror;
      }
    });
    if (Object.keys(error).length > 0) {
      dispatch(resetpasswordError(error));
      return;
    }
    dispatch(resetpasswordSubmit(navigate, token));
  };

  return (
    <div className="container">
      <h1>Reset Password</h1>

      <div className="row">
        {resetPassField.map(({ name, label, placeholder, type, id }, i) => {
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
      </div>
      <div>
        <Button clickHandler={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default ResetPassword;
