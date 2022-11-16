import {
  Get_ALL_EXAM_SUCCESS,
  Get_ALL_EXAM_ERROR,
  GET_STUDENT_PROFILE_EDIT,
  Get_ALL_EXAM_REQ,
} from "../constant/Index";

const initialState = {
  allExamData: [],
  loading: false,
  message: "",
};

const getStuExamReducer = (state = initialState, action) => {
  switch (action.type) {
    case Get_ALL_EXAM_REQ:
      return {
        ...state,
        loading: true,
      };
    case Get_ALL_EXAM_SUCCESS:
      return {
        ...state,
        loading: false,
        allExamData: [...action.payload],
      };

    case Get_ALL_EXAM_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case GET_STUDENT_PROFILE_EDIT:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default getStuExamReducer;
