import { CREATE_EXAM_FAIL, CREATE_EXAM_SUCCESS } from "../constant/Index";

const initialState = {
  message: "",
};

const createExamReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_EXAM_SUCCESS:
      return {
        ...state,
        message: action.payload,
      };

    case CREATE_EXAM_FAIL:
      return {
        ...state,
        message: action.payload,
      };

    default:
      return state;
  }
};

export default createExamReducer;
