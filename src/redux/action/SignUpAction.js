import { axiosApi } from "../../components/axios";
import { notify } from "../../reusable/Toast";
import {
  SIGNUP_CLEAR,
  SIGNUP_ERROR,
  SIGNUP_FAIL,
  SIGNUP_ON_CHANGE,
  SIGNUP_SUCCESS,
} from "../constant/Index";
import { toastError, toastSuccess } from "./toastAction";

export const signUpSuccess = (message) => {
  return {
    type: SIGNUP_SUCCESS,
    payload: message,
  };
};
export const signUpFail = (state) => {
  return {
    type: SIGNUP_FAIL,
    payload: state,
  };
};

export const signUpError = (state) => {
  return {
    type: SIGNUP_ERROR,
    payload: state,
  };
};

export const signUpOnChange = (user) => {
  return {
    type: SIGNUP_ON_CHANGE,
    payload: user,
  };
};

export const signUpClear = () => {
  return {
    type: SIGNUP_CLEAR,
  };
};

export const signUpSubmit = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const userData = state.signUp.users;
    await axiosApi
      .post("users/SignUp", userData)
      .then((res) => {
        console.log("first", res.data);
        if (res.data.statusCode === 200) {
          dispatch(signUpSuccess(res.data.message));
          dispatch(toastSuccess(res.data.message));
          dispatch(signUpClear());
        }
        dispatch(signUpFail(res.data.message));
        dispatch(toastError(res.data.message));
      })
      .catch((error) => {
        dispatch(signUpClear());
      });
  };
};
