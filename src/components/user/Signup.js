import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signUpClear,
  signUpError,
  signUpOnChange,
  signUpSubmit,
  signUpSuccess,
} from "../../redux/action/SignUpAction";
import Button from "../../reusable/Button";
import Form from "../../reusable/Form";
import { errorValidate } from "../../utils/Function";
import { sigupField } from "../../utils/signupFields";
import Validation from "../Validation";
import ReusableForm from "../../reusable/ReusableForm";

const Signup = () => {
  const { users, message, errors } = useSelector((state) => state.signUp);

  useEffect(() => {
    dispatch(signUpClear());
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(signUpError({ [name]: Validation(name, value) }));
    dispatch(signUpOnChange({ [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errorValidate(users)).length > 0) {
      dispatch(signUpError(errorValidate(users)));
      return;
    }
    dispatch(signUpSubmit(navigate));
  };

  const buttonArr = [{children:"Submit", onClick: handleSubmit }];
  return (
    <div className="container">
      <h1>Sign up</h1>
      <div>
        <ReusableForm
          field={sigupField}
          Data={users}
          error={errors}
          onChange={handleChange}
          buttonArr={buttonArr}
        />
      </div>
      {/* <div>
        <form className="form-horizontal">
          <div className="container">
            <Form
              field={sigupField}
              Data={users}
              error={errors}
              handleChange={handleChange}
            />

            <div className="row">
              <Button clickHandler={handleSubmit}>SignUp</Button>
            </div>
          </div>
        </form>
      </div> */}
    </div>
  );
};

export default Signup;
