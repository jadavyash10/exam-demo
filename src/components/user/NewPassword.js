import React from "react";
import Input from "../../reusable/Input";
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

const NewPassword = () => {
  const newPassword = useSelector((state) => state.newPassword);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchparams] = useSearchParams();

  const token = searchparams.get("token");
  console.log(token)
  const userData = newPassword.users;
  const message = newPassword.message;
  const error = newPassword.errors;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newError = Validation(name, value, userData);
    dispatch(newpasswordError({ [name]: newError }));
    dispatch(newpasswordOnChange({ [name]: value }));
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
      dispatch(newpasswordError(error));
      return;
    }
    dispatch(newpasswordSubmit(navigate, token));
  };
  return (
    <div className="container">
      <h1>New Password</h1>

      <div className="row">
        {newPasswordField.map(({ name, label, placeholder, type, id }, i) => {
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

export default NewPassword;
