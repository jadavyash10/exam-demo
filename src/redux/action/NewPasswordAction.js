import {
  NEW_PASSWORD_CLEAR,
  NEW_PASSWORD_ERROR,
  NEW_PASSWORD_FAIL,
  NEW_PASSWORD_ONCHANGE,
  NEW_PASSWORD_SUCCESS,
} from "../constant/Index";
import { axiosApi } from "../../components/axios";
import { toastError, toastSuccess } from "./toastAction";
import { token } from "../../utils/Constant";

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

export const newpasswordSubmit = (navigate) => {
  return async (dispatch, getState) => {
    const state = getState();
    const userData = state.newPassword.users;
    await axiosApi
      .post(`users/ForgotPassword/Verify?token=${token}`, userData,{
       headers: {
        Authorization : token,
       },
      })
      .then((res) => {
        console.log("new", res);
        if (res.data.statusCode === 200) {
          toastSuccess(res.data.message);
          dispatch(newpasswordSuccess(res.data.message));
          dispatch(newpasswordClear());
          navigate("/login");
        } else {
          toastError(res.data.message);
        }
      })
      .catch((error) => {
        toastError(error.message);
      });
  };
};
