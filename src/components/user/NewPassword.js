import React from "react";
import Button from "../../reusable/Button";
import {
  newpasswordError,
  newpasswordOnChange,
  newpasswordSubmit,
} from "../../redux/action/NewPasswordAction";
import Validation from "../Validation";
import { useDispatch, useSelector } from "react-redux";
import { newPasswordField } from "../../utils/newPasswordFields";
import { useNavigate, useSearchParams } from "react-router-dom";
import Form from "../../reusable/Form";
import { errorValidate } from "../../utils/Function";

const NewPassword = () => {
  const { users, message, errors } = useSelector((state) => state.newPassword);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchparams] = useSearchParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(newpasswordError({ [name]: Validation(name, value, users) }));
    dispatch(newpasswordOnChange({ [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(errorValidate(users)).length > 0) {
      dispatch(newpasswordError(errorValidate(users)));
      return;
    }
    dispatch(newpasswordSubmit(navigate));
  };
  return (
    <div className="container">
      <h1>New Password</h1>

      <div className="row">
        <form>
          <Form
            field={newPasswordField}
            Data={users}
            error={errors}
            handleChange={handleChange}
          />
          <div>
            <Button clickHandler={handleSubmit}>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
