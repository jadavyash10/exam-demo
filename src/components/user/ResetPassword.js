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
import Form from "../../reusable/Form";
import { errorValidate } from "../../utils/Function";

const ResetPassword = () => {
  const { users, message, errors } = useSelector(
    (state) => state.resetPassword
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(resetpasswordError({ [name]: Validation(name, value, users) }));
    dispatch(resetpasswordOnChange({ [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errorValidate(users)).length > 0) {
      dispatch(resetpasswordError(errorValidate(users)));
      return;
    }
    dispatch(resetpasswordSubmit(navigate));
  };

  return (
    <div className="container">
      <h1>Reset Password</h1>

      <div className="row">
        <Form
          field={resetPassField}
          Data={users}
          error={errors}
          handleChange={handleChange}
        />
      </div>
      <div>
        <Button clickHandler={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default ResetPassword;
