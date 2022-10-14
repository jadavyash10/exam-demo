import { SHOW_STUDENTDATA, SHOW_STUDENTDATA_ERROR } from "../constant/Index";

const initialState = {
  allStudent: [],
  message: "",
};

const showStudentDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_STUDENTDATA:
      return {
        ...state,
        allStudent: [...action.payload],
      };
    case SHOW_STUDENTDATA_ERROR:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default showStudentDataReducer;