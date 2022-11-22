import {
  GET_EXAM_PAPER_CLEAR,
  GET_EXAM_PAPER_ERROR,
  GET_EXAM_PAPER_REQ,
  GET_EXAM_PAPER_SUCCESS,
  GIVE_EXAM_FAIL,
  GIVE_EXAM_ONCHANGE,
  GIVE_EXAM_SET_QUESTIONS,
  GIVE_EXAM_SUCCESS,
} from "../constant/Index";
import { axiosApi } from "../../components/axios";
import { toastError, toastSuccess } from "./toastAction";

export const getExamPaperReq = () => {
  return {
    type: GET_EXAM_PAPER_REQ,
  };
};
export const getExamPaperSuccess = (state) => {
  return {
    type: GET_EXAM_PAPER_SUCCESS,
    payload: state,
  };
};

export const getExamPaperError = (state) => {
  return {
    type: GET_EXAM_PAPER_ERROR,
    payload: state,
  };
};

export const giveExamSetQuestions = (state) => {
  return {
    type: GIVE_EXAM_SET_QUESTIONS,
    payload: state,
  };
};

export const giveExamOnChange = (state) => {
  return {
    type: GIVE_EXAM_ONCHANGE,
    payload: state,
  };
};

export const giveExamSuccess = (state) => {
  return {
    type: GIVE_EXAM_SUCCESS,
    payload: state,
  };
};

export const giveExamError = (state) => {
  return {
    type: GIVE_EXAM_FAIL,
    payload: state,
  };
};
export const giveExamClear = (state) => {
  return {
    type: GET_EXAM_PAPER_CLEAR,
    payload: state,
  };
};

const getExamPaper = (id) => {
  const token = localStorage.getItem("userToken");
  return (dispatch) => {
    dispatch(getExamPaperReq());
    axiosApi
      .get(`/student/examPaper?id=${id}`, {
        headers: {
          "access-token": token,
        },
      })
      .then((res) => {
        const queArr = res?.data?.data?.map((v, i) => {
          return { question: v.question, answer: "" };
        });
        if (res.data.statusCode === 200) {
          dispatch(getExamPaperSuccess(res.data.data));
          dispatch(giveExamSetQuestions(queArr));
        } else if (res.data.statusCode === 500) {
          dispatch(giveExamClear(res.data.message));
        } else {
          dispatch(getExamPaperError(res.data.message));
          toastError(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const giveExam = (id, data, navigate) => {
  const token = localStorage.getItem("userToken");
  return (dispatch) => {
    axiosApi
      .post(`student/giveExam?id=${id}`, data, {
        headers: {
          "access-token": token,
        },
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          dispatch(giveExamSuccess(res.data.message));
          toastSuccess(res.data.message);
          navigate("/studentDashboard");
        } else {
          dispatch(giveExamError());
          toastError(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default getExamPaper;
