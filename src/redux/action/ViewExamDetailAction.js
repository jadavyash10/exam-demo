import {
  VIEW_EXAM_DETAIL_ERROR,
  VIEW_EXAM_DETAIL_REQ,
  VIEW_EXAM_DETAIL_SUCCESS,
} from "../constant/Index";

import { axiosApi } from "../../components/axios";
import { token } from "../../utils/Constant";

export const viewExamDetailReq = () => {
  return {
    type: VIEW_EXAM_DETAIL_REQ,
  };
};

export const viewExamDetailSuccess = (state) => {
  return {
    type: VIEW_EXAM_DETAIL_SUCCESS,
    payload: state,
  };
};

export const viewExamDetailError = (state) => {
  return {
    type: VIEW_EXAM_DETAIL_ERROR,
    payload: state,
  };
};

const viewExamDetail = (id) => {
  const token = localStorage.getItem("userToken");
  return async (dispatch) => {
    dispatch(viewExamDetailReq());
    await axiosApi
      .get(`dashboard/Teachers/examDetail?id=${id}`, {
        headers: {
          "access-token": token,
        },
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          dispatch(viewExamDetailSuccess(res.data.data));
        } else {
          dispatch(viewExamDetailError(res.data.message));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default viewExamDetail;
