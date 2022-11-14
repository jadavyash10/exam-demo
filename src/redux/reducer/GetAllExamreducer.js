import {
  Get_ALL_EXAM_SUCCESS,
  Get_ALL_EXAM_ERROR,
  GET_STUDENT_PROFILE_EDIT,
} from "../constant/Index";

const initialState = {
  allExamData: [],
  message: "",
};

const getStuExamReducer = (state = initialState, action) => {
  switch (action.type) {
    case Get_ALL_EXAM_SUCCESS:
      return {
        ...state,
        allExamData: [...action.payload],
      };

    case Get_ALL_EXAM_ERROR:
      return {
        ...state,
        message: action.payload,
      };

    case GET_STUDENT_PROFILE_EDIT:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default getStuExamReducer;
