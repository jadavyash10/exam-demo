import {
  RESET_PASSWORD_CLEAR,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_ONCHANGE,
  RESET_PASSWORD_SUCCESS,
} from "../constant/Index";
import { axiosApi } from "../../components/axios";
import { toastError, toastSuccess } from "./toastAction";

export const resetpasswordSuccess = (message) => {
  return {
    type: RESET_PASSWORD_SUCCESS,
    payload: message,
  };
};

export const resetpasswordFail = (message) => {
  return {
    type: RESET_PASSWORD_FAIL,
    payload: message,
  };
};

export const resetpasswordOnChange = (user) => {
  return {
    type: RESET_PASSWORD_ONCHANGE,
    payload: user,
  };
};
export const resetpasswordError = (message) => {
  return {
    type: RESET_PASSWORD_ERROR,
    payload: message,
  };
};
export const resetpasswordClear = () => {
  return {
    type: RESET_PASSWORD_CLEAR,
  };
};

export const resetpasswordSubmit = (navigate, token) => {
  return async (dispatch, getState) => {
    const state = getState();
    const userData = state.resetPassword.users;
    await axiosApi
      .post("users/ResetPassword", userData, {
        headers:{
          'access-token' : token,
        }
      })
      .then((res) => {
        console.log("reset", res);
        if (res.data.statusCode === 200) {
          toastSuccess(res.data.message);
          dispatch(resetpasswordSuccess(res.data.message));
          dispatch(resetpasswordClear());
          localStorage.clear();
          navigate('/login');
        } else {
          toastError(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error)
        // toastError(error.message);
      });
  };
};
