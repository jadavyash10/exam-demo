import { axiosApi } from "../../components/axios";
import { notify } from "../../reusable/Toast";

import {
  FORGOT_PASSWORD_CLEAR,
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_ONCHANGE,
  FORGOT_PASSWORD_SUCCESS,
} from "../constant/Index";
import { toastError, toastSuccess } from "./toastAction";

export const forgotPassSuccess = (message) => {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    payload: message,
  };
};

export const forgotPassFail = (message) => {
  return {
    type: FORGOT_PASSWORD_FAIL,
    payload: message,
  };
};

export const forgotPassOnChange = (user) => {
  return {
    type: FORGOT_PASSWORD_ONCHANGE,
    payload: user,
  };
};
export const forgotPassError = (message) => {
  return {
    type: FORGOT_PASSWORD_ERROR,
    payload: message,
  };
};
export const forgotPassClear = () => {
  return {
    type: FORGOT_PASSWORD_CLEAR,
  };
};

const forgotPasswordSubmit = () => {
  return async (dispatch, getState) => {
    const data = getState();
    const userData = data.forgotPassword.users;
    const message = data.forgotPassword.message;
    const error = data.forgotPassword.errors;

    await axiosApi
      .post("users/ForgotPassword", userData)
      .then((res) => {
        console.log("forgot", res);
        if (res.data.statusCode === 200) {
          toastSuccess(res.data.message);
          dispatch(forgotPassSuccess(res.data.message));
          dispatch(forgotPassClear());
        } else {
          dispatch(forgotPassClear());
          toastError(res.data.message);
        }
      })
      .catch((error) => {
        toastError(error.message);
      });
  };
};

export default forgotPasswordSubmit;
