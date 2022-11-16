import { Get_ALL_EXAM_SUCCESS, Get_ALL_EXAM_ERROR, Get_ALL_EXAM_REQ } from "../constant/Index";
import { axiosApi } from "../../components/axios";
import { token } from '../../utils/Constant';

export const getAllExamReq = () => {
  return {
    type: Get_ALL_EXAM_REQ,
  };
};
export const getAllExamSuccess = (state) => {
  return {
    type: Get_ALL_EXAM_SUCCESS,
    payload: state,
  };
};

export const getAllExamError = (state) => {
  return {
    type: Get_ALL_EXAM_ERROR,
    payload: state,
  };
};

const getAllExams = () => {
  const token = localStorage.getItem("userToken")
  return (dispatch) => {
    dispatch(getAllExamReq())
    axiosApi
      .get("student/studentExam", {
        headers: {
          "access-token": token,
        },
      })
      .then((res) => {
        console.log(res)
        if (res.data.statusCode === 200) {
          dispatch(getAllExamSuccess(res.data.data));
        } else {
          dispatch(getAllExamError(res.data.message));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default getAllExams;
