import {
  NEW_PASSWORD_CLEAR,
  NEW_PASSWORD_ERROR,
  NEW_PASSWORD_FAIL,
  NEW_PASSWORD_ONCHANGE,
  NEW_PASSWORD_SUBMIT_REQ,
  NEW_PASSWORD_SUCCESS,
} from "../constant/Index";
import { axiosApi } from "../../components/axios";
import { toastError, toastSuccess } from "./toastAction";

export const newpasswordSuccess = (message) => {
  return {
    type: NEW_PASSWORD_SUCCESS,
    payload: message,
  };
};

export const newpasswordFail = (message) => {
  return {
    type: NEW_PASSWORD_FAIL,
    payload: message,
  };
};
export const newpasswordSubmitReq = () => {
  return {
    type: NEW_PASSWORD_SUBMIT_REQ,
  };
};

export const newpasswordOnChange = (user) => {
  return {
    type: NEW_PASSWORD_ONCHANGE,
    payload: user,
  };
};
export const newpasswordError = (message) => {
  return {
    type: NEW_PASSWORD_ERROR,
    payload: message,
  };
};
export const newpasswordClear = () => {
  return {
    type: NEW_PASSWORD_CLEAR,
  };
};

export const newpasswordSubmit = (token, navigate) => {
  return async (dispatch, getState) => {
    dispatch(newpasswordSubmitReq())
    const state = getState();
    const userData = state.newPassword.users;
    await axiosApi
      .post(`users/ForgotPassword/Verify?token=${token}`, userData)
      .then((res) => {
        if (res.data.statusCode === 200) {
          toastSuccess(res.data.message);
          dispatch(newpasswordSuccess(res.data.message));
          dispatch(newpasswordClear());
          navigate("/login");
        } else {
          dispatch(newpasswordFail(res.data.message))
          toastError(res.data.message);
        }
      })
      .catch((error) => {
        dispatch(newpasswordFail(error.message))
        toastError(error.message);
      });
  };
};
