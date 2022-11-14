import {
  VIEW_EXAM_DETAIL_ERROR,
  VIEW_EXAM_DETAIL_SUCCESS,
} from "../constant/Index";

import { axiosApi } from "../../components/axios";
import { token } from "../../utils/Constant";

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
  const token = localStorage.getItem("userToken")
  console.log("first");
  return async (dispatch) => {
    console.log("first");
    await axiosApi
      .get(`dashboard/Teachers/examDetail?id=${id}`, {
        headers: {
          "access-token": token,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.statusCode === 200) {
          dispatch(viewExamDetailSuccess(res.data.data));
          console.log("res.data.data", res.data.data);
        } else {
          dispatch(viewExamDetailError(res.data.message));
          console.log("first");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default viewExamDetail;
