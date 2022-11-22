import { axiosApi } from "../../components/axios";
import { notify } from "../../reusable/Toast";
import {
  LOGIN_CLEAR,
  LOGIN_ERROR,
  LOGIN_FAIL,
  LOGIN_ON_CHANGE,
  LOGIN_SUCCESS,
} from "../constant/Index";
import { toastError, toastSuccess } from "./toastAction";

export const loginSuccess = (message) => {
  return {
    type: LOGIN_SUCCESS,
    payload: message,
  };
};
export const loginFail = (state) => {
  return {
    type: LOGIN_FAIL,
    payload: state,
  };
};

export const loginError = (state) => {
  return {
    type: LOGIN_ERROR,
    payload: state,
  };
};

export const loginOnChange = (user) => {
  return {
    type: LOGIN_ON_CHANGE,
    payload: user,
  };
};

export const loginClear = () => {
  return {
    type: LOGIN_CLEAR,
  };
};

export const loginSubmit = (navigate) => {
  return async (dispatch, getState) => {
    const state = getState();
    const userData = state.login.users;
    await axiosApi
      .post("users/Login", userData)
      .then((res) => {
        if (res.data.statusCode === 200) {
          localStorage.setItem("user", res.data.data.users);
          localStorage.setItem("userToken", res.data.data.token);
          localStorage.setItem("role", res.data.data.role);
          toastSuccess(res.data.message);
          dispatch(loginClear());
          if (res.data.data.role == "teacher") {
            navigate("/teacherDashboard");
          }
          if (res.data.data.role == "student") {
            navigate("/studentDashboard");
          }
        } else {
          dispatch(toastError(res.data.message));
        }
      })
      .catch((error) => {
        console.log('error', error)
        // dispatch(toastError(error.message));
      });
  };
};
