import { axiosApi } from "../../components/axios";
import { toastError, toastSuccess } from "./toastAction";
import { token } from "../../utils/Constant";
import { CREATE_EXAM_FAIL, CREATE_EXAM_SUCCESS } from "../constant/Index";

export const createExamSuccess = (state) => {
  return {
    type: CREATE_EXAM_SUCCESS,
    payload: state,
  };
};

export const createExamFail = (state) => {
  return {
    type: CREATE_EXAM_FAIL,
    payload: state,
  };
};

export const createExamSubmit = (initialState, navigate) => {
  console.log(token);
  return (dispatch) => {
    axiosApi
      .post("/dashboard/Teachers/Exam", initialState, {
        headers: {
          "access-token": token,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.statusCode === 200) {
          toastSuccess(res.data.message);
          navigate("/viewExam");
          dispatch(createExamSuccess(res.data.message));
        } else {
          toastError(res.data.message);
        }
      })
      .catch((error) => {
        toastError(error.message);
        dispatch(createExamFail(error.message));
      });
  };
};
