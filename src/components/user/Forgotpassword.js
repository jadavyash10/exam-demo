import React from "react";
import { useDispatch, useSelector } from "react-redux";
import forgotPasswordSubmit, {
  forgotPassError,
  forgotPassOnChange,
} from "../../redux/action/ForgotPasswordAction";
import Validation from "../Validation";
import Button from "../../reusable/Button";
import { useNavigate } from "react-router-dom";
import Form from "../../reusable/Form";
import forgotPassField from "../../utils/forgotPassworField";
import { errorValidate } from "../../utils/Function";

const Forgotpassword = () => {
  const { users, message, errors } = useSelector(
    (state) => state.forgotPassword
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(forgotPassError({ [name]: Validation(name, value) }));
    dispatch(forgotPassOnChange({ [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(errorValidate(users)).length > 0) {
      dispatch(forgotPassError(errorValidate(users)));
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
