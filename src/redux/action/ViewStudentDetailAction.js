import {
  VIEW_STUDENT_DETAIL,
  VIEW_STUDENT_DETAIL_ERROR,
} from "../constant/Index";
import { axiosApi } from "../../components/axios";

export const viewStudentDetailSuceess = (state) => {
  return {
    type: VIEW_STUDENT_DETAIL,
    payload: state,
  };
};

export const viewStudentDetailError = (state) => {
  return {
    type: VIEW_STUDENT_DETAIL_ERROR,
    payload: state,
  };
};

const viewStudentDetail = (_id) => {
  const token = localStorage.getItem("userToken");

  return async (dispatch) => {
    await axiosApi
      .get(`dashboard/Teachers/viewStudentDetail?id=${_id}`, {
        headers: {
          "access-token": token,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.statusCode === 200) {
          dispatch(viewStudentDetailSuceess(res.data.data));
        } else {
          dispatch(viewStudentDetailError(res.data.message));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default viewStudentDetail;
