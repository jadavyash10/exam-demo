import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signUpError,
  signUpOnChange,
  signUpSubmit,
  signUpSuccess,
} from "../../redux/action/SignUpAction";
import Button from "../../reusable/Button";
import Input from "../../reusable/Input";
import { sigupField } from "../../utils/signupFields";
import Validation from "../Validation";

const Signup = () => {
  const signUpValue = useSelector((state) => state.signUp);
  const userData = signUpValue.users;
  const message = signUpValue.message;
  const error = signUpValue.errors;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newError = Validation(name, value);
    dispatch(signUpError({ [name]: newError }));
    dispatch(signUpOnChange({ [name]: value }));
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
      dispatch(signUpError(error));
      return;
    }
    dispatch(signUpSubmit(navigate));
  };

  return (
    <div className="container">
      <h1>Sign up</h1>
      <div>
        <form className="form-horizontal">
          <div className="container">
            {sigupField.map(({ label, name, id, type, placeholder }) => {
              if (type === "radio") {
                return (
                  <React.Fragment key={id}>
                    <Input
                      id={id}
                      name={name}
                      value={label}
                      checked={label === userData[name] || ""}
                      type={type}
                      onChange={handleChange}
                      label={label}
                      error={error || ""}
                    />
                  </React.Fragment>
                );
              }
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
              <Button clickHandler={handleSubmit}>Sign Up</Button>
              <Button clickHandler={() => navigate("/login")}>Login</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
