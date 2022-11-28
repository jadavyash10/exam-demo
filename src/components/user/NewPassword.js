import React, { useEffect } from "react";
import {
  newpasswordClear,
  newpasswordError,
  newpasswordOnChange,
  newpasswordSubmit,
} from "../../redux/action/NewPasswordAction";
import Validation from "../Validation";
import { useDispatch, useSelector } from "react-redux";
import { newPasswordField } from "../../utils/newPasswordFields";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReusableForm from "../../reusable/ReusableForm";
import { memo } from "react";
import HelmetComp from '../../reusable/HelmetComp';

const NewPassword = () => {
  useEffect(() => {
    dispatch(newpasswordClear());
  }, []);

  const { users, message, errors, loading } = useSelector(
    (state) => state.newPassword
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const token = searchParams.get("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newError = Validation(name, value, users);
    dispatch(newpasswordError({ [name]: newError }));
    dispatch(newpasswordOnChange({ [name]: value }));
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
      dispatch(newpasswordError(error));
      return;
    }
    dispatch(newpasswordSubmit(token, navigate));
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
      <HelmetComp title="New Password" />
      <h1>New Password</h1>
      <div>
        <ReusableForm
          field={newPasswordField}
          Data={users}
          error={errors}
          onChange={handleChange}
          buttonArr={buttonArr}
        />
      </div>
    </div>
  );
};

export default memo(NewPassword);
