import {
  GET_STUDENT_PROFILE,
  GET_STUDENT_PROFILE_EDIT,
  GET_STUDENT_PROFILE_FAIL,
  GET_STUDENT_PROFILE_REQ,
} from "../constant/Index";
import { toastError, toastSuccess } from "./toastAction";
import { axiosApi } from "../../components/axios";
import { token } from "../../utils/Constant";

export const StudentProfileReq = () => {
  return {
    type: GET_STUDENT_PROFILE_REQ,
  };
};
export const StudentProfileSuccess = (state) => {
  return {
    type: GET_STUDENT_PROFILE,
    payload: state,
  };
};
export const StudentProfileFail = (state) => {
  return {
    type: GET_STUDENT_PROFILE_FAIL,
    payload: state,
  };
};

export const StudentProfileEditSuccess = (state) => {
  return {
    type: GET_STUDENT_PROFILE_EDIT,
    payload: state,
  };
};

export const stuDataReq = () => {
  const token = localStorage.getItem("userToken");
  return async (dispatch) => {
    dispatch(StudentProfileReq());
    axiosApi
      .get("student/getStudentDetail", {
        headers: {
          "access-token": token,
        },
      })
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch(StudentProfileSuccess(response.data.data));
        } else {
          toastError(response.data.message);
          dispatch(StudentProfileFail());
        }
      })
      .catch((error) => {
        toastError(error.message);
      });
  };
};

export const stuDataEdit = (data, navigate) => {
  return async (dispatch) => {
    axiosApi
      .put("student/studentProfile", data, {
        headers: {
          "access-token": token,
        },
      })
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch(StudentProfileEditSuccess(response.data.message));
          navigate("/studentProfile");
        } else {
          toastError(response.data.message);
        }
      })
      .catch((error) => {
        toastError(error.message);
      });
  };
};
