import {
  VIEW_STUDENT_DETAIL,
  VIEW_STUDENT_DETAIL_ERROR,
} from "../constant/Index";
const initialState = {
  allStudent: [],
  message: "",
};

const ViewStudentDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_STUDENT_DETAIL:
      return {
        ...state,
        allStudent: [...action.payload],
      };
    case VIEW_STUDENT_DETAIL_ERROR:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default ViewStudentDetailReducer;
