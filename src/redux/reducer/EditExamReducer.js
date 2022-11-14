import { EDIT_EXAM_ERROR, EDIT_EXAM_SUCCESS } from "../constant/Index";

const initialState = {
  data: [],
  message: "",
};

const EditExamReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_EXAM_SUCCESS:
      return {
        ...state,
        message: action.payload,
      };
    case EDIT_EXAM_ERROR:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default EditExamReducer;