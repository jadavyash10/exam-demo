import { axiosApi } from "../../components/axios";
import { toastError, toastSuccess } from "./toastAction";
import { token } from "../../utils/Constant";
import {
  CREATE_EXAM_CLEAR,
  CREATE_EXAM_ERROR,
  CREATE_EXAM_FAIL,
  CREATE_EXAM_ONCHANGE,
  CREATE_EXAM_SUCCESS,
  SUBJECT_NAME,
  INDEX_UPDATE,
  CREATE_EXAM_SUBJECT_NAME,
} from "../constant/Index";

export const createExamSuccess = (state) => {
  return {
    type: CREATE_EXAM_SUCCESS,
    payload: state,
  };
};

export const createExamOnChangeAction = (state) => {
  return {
    type: CREATE_EXAM_ONCHANGE,
    payload: state,
  };
};

export const createExamFail = (state) => {
  return {
    type: CREATE_EXAM_FAIL,
    payload: state,
  };
};
export const createExamError = (state) => {
  return {
    type: CREATE_EXAM_ERROR,
    payload: state,
  };
};
export const createExamClear = () => {
  return {
    type: CREATE_EXAM_CLEAR,
  };
};

export const indexUpdate = (state, obj) => {
  return {
    type: INDEX_UPDATE,
    payload: { state: state, obj: obj },
  };
};


export const first = (state) => { 
  return {
    type:CREATE_EXAM_SUBJECT_NAME,
    payload:state
  }
 }

const createExamSubmit = (navigate) => {
  return (dispatch, getState) => {
    axiosApi
      .push("dashboard/Teachers/Exam", {
        Headers: {
          " access-token": token,
        },
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          toastSuccess(res.data.message);
          dispatch(createExamSuccess(res.data.message));
        } else {
          toastError(res.data.message);
        }
      })
      .catch((error) => {
        toastError(error.message);
      });
  };
};
