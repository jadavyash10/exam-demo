import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signUpClear,
  signUpError,
  signUpOnChange,
  signUpSubmit,
  signUpSuccess,
} from "../../redux/action/SignUpAction";
import { errorValidate } from "../../utils/Function";
import { sigupField } from "../../utils/signupFields";
import Validation from "../Validation";
import ReusableForm from "../../reusable/ReusableForm";
import HelmetComp from "../../reusable/HelmetComp";

const Signup = () => {
  const { users, message, errors, loading } = useSelector(
    (state) => state.signUp
  );

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
  const buttonArr = [
    {
      children: "Submit",
      onClick: handleSubmit,
      disabled: loading ? true : false,
    },
  ];
  return (
    <div className="container">
      <HelmetComp title="Sign up" />
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
    </div>
  );
};

export default memo(Signup);
