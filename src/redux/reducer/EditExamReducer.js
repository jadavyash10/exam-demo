import {
  EDIT_EXAM_ERROR,
  EDIT_EXAM_SUCCESS,
  EDIT_EXAM_FAIL,
  EDIT_EXAM_SUBMIT_REQ,
} from "../constant/Index";

const initialState = {
  data: [],
  message: "",
  loading: false,
};

const EditExamReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_EXAM_SUCCESS:
      return {
        ...state,
        message: action.payload,
        loading: false,
      };
    case EDIT_EXAM_FAIL:
      return {
        ...state,
        message: action.payload,
        loading: false,
      };
    case EDIT_EXAM_SUBMIT_REQ:
      return {
        ...state,
        loading: true,
      };
    case EDIT_EXAM_ERROR:
      return {
        ...state,
        message: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default EditExamReducer;
