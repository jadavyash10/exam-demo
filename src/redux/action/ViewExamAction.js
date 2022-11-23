import {
  DELETE_EXAM,
  VIEW_EXAM_ERROR,
  VIEW_EXAM_REQ,
  VIEW_EXAM_SUCCESS,
} from "../constant/Index";

import { axiosApi } from "../../components/axios";
import { token } from "../../utils/Constant";
import { toastError, toastSuccess } from "./toastAction";

export const viewExamReq = () => {
  return {
    type: VIEW_EXAM_REQ,
  };
};
export const viewExamSuccess = (state) => {
  return {
    type: VIEW_EXAM_SUCCESS,
    payload: state,
  };
};

export const viewExamError = (state) => {
  return {
    type: VIEW_EXAM_ERROR,
    payload: state,
  };
};

export const delet = (state) => {
  return {
    type: DELETE_EXAM,
    payload: state,
  };
};
export const deleteExam = (id) => {
  let token = localStorage.getItem("userToken");
  return async (dispatch) => {
    await axiosApi
      .delete(`dashboard/Teachers/deleteExam?id=${id}`, {
        headers: {
          "access-token": token,
        },
      })
      .then((response) => {
        dispatch(delet(response.data.message));
        dispatch(viewExamSuccess);
        if (response.data.statusCode === 200) {
          dispatch(viewExam());
          toastSuccess(response.data.message);
        } else {
          toastError(response.data.message);
        }
      })
      .catch((error) => {
        toastError(error.message);
      });
  };
};

const viewExam = () => {
  let token = localStorage.getItem("userToken");
  return async (dispatch) => {
    dispatch(viewExamReq());
    await axiosApi
      .get(`dashboard/Teachers/viewExam`, {
        headers: {
          "access-token": token,
        },
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          dispatch(viewExamSuccess(res.data.data));
        } else {
          dispatch(viewExamError(res.data.message));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default viewExam;
