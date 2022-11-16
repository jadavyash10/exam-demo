import {
  VIEW_STUDENT_DETAIL,
  VIEW_STUDENT_DETAIL_ERROR,
  VIEW_STUDENT_DETAIL_REQ,
} from "../constant/Index";
import { axiosApi } from "../../components/axios";
import { token } from "../../utils/Constant";

export const viewStudentDetailReq = (state) => {
  return {
    type: VIEW_STUDENT_DETAIL_REQ,
   
  };
};
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
    dispatch(viewStudentDetailReq())
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
