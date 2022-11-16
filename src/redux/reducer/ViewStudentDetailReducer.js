import {
  VIEW_STUDENT_DETAIL,
  VIEW_STUDENT_DETAIL_ERROR,
  VIEW_STUDENT_DETAIL_REQ,
} from "../constant/Index";
const initialState = {
  allStudent: [],
  loading: false,
  message: "",
};

const ViewStudentDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_STUDENT_DETAIL_REQ:
      return {
        ...state,
        loading: true
      };
    case VIEW_STUDENT_DETAIL:
      return {
        ...state,
        loading:false,
        allStudent: [...action.payload],
      };
    case VIEW_STUDENT_DETAIL_ERROR:
      return {
        ...state,
        loading:false,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default ViewStudentDetailReducer;
