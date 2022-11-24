import { axiosApi } from "../../components/axios";
import { toastError, toastSuccess } from "./toastAction";
import { token } from "../../utils/Constant";
import {
  CREATE_EXAM_DATA,
  CREATE_EXAM_FAIL,
  CREATE_EXAM_SUBMIT_REQ,
  CREATE_EXAM_SUCCESS,
} from "../constant/Index";

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

export const createExamSubmitReq = () => {
  return {
    type: CREATE_EXAM_SUBMIT_REQ,
  };
};

export const createExamData = (subjectName, questions, notes) => {
  return {
    type: CREATE_EXAM_DATA,
    payload: { subjectName, questions, notes },
  };
};

export const createExamSubmit = (initialState, navigate) => {
  const token = localStorage.getItem("userToken");
  return (dispatch) => {
    dispatch(createExamSubmitReq());
    axiosApi
      .post("/dashboard/Teachers/Exam", initialState, {
        headers: {
          "access-token": token,
        },
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          toastSuccess(res.data.message);
          navigate("/viewExam");
          dispatch(createExamSuccess(res.data.message));
        } else {
          dispatch(createExamFail(res.data.message));
          toastError(res.data.message);
        }
      })
      .catch((error) => {
        toastError(error.message);
        dispatch(createExamFail(error.message));
      });
  };
};
