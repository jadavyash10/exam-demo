import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  resetpasswordSubmit,
  resetpasswordError,
  resetpasswordOnChange,
  resetpasswordClear,
} from "../../redux/action/ResetPasswordAction";
import Validation from "../Validation";
import Button from "../../reusable/Button";
import { resetPassField } from "../../utils/resetPassField";
import Form from "../../reusable/Form";
import ReusableForm from "../../reusable/ReusableForm";

const ResetPassword = () => {
  useEffect(() => {
    dispatch(resetpasswordClear());
  }, []);

  const { users, message, errors } = useSelector(
    (state) => state.resetPassword
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newError = Validation(name, value, users);
    dispatch(resetpasswordError({ [name]: newError }));
    dispatch(resetpasswordOnChange({ [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const error = {};
    Object.entries(users).forEach(([name, value], i) => {
      const newerror = Validation(name, value, users);
      if (newerror) {
        error[name] = newerror;
      }
    });
    if (Object.keys(error).length > 0) {
      dispatch(resetpasswordError(error));
      return;
    }
    dispatch(resetpasswordSubmit(navigate));
  };

  const buttonArr = [{children:"Submit", onClick: handleSubmit }];

  return (
    <div className="container">
      <h1>Reset Password</h1>
      <div>
        <ReusableForm
          field={resetPassField}
          Data={users}
          error={errors}
          onChange={handleChange}
          buttonArr={buttonArr}
        />
      </div>
      {/* <div className="row">
        <Form
          field={resetPassField}
          Data={users}
          error={errors}
          handleChange={handleChange}
        />
      </div>
      <div>
        <Button clickHandler={handleSubmit}>Submit</Button>
      </div> */}
    </div>
  );
};

export default ResetPassword;
