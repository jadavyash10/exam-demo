import { VIEW_EXAM_ERROR, VIEW_EXAM_SUCCESS } from "../constant/Index";

const initialState = {
  allExam: [],
  message: "",
};

const viewExamReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_EXAM_SUCCESS:
      return {
        ...state,
        allExam: [...action.payload],
      };
    case VIEW_EXAM_ERROR:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default viewExamReducer;
