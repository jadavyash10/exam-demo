import { SHOW_VERIFIED_STUDENTDATA, SHOW_VERIFIED_STUDENTDATA_ERROR } from "../constant/Index";

const initialState = {
  allStudent: [],
  message: "",
};

const verifiedStudentDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_VERIFIED_STUDENTDATA:
      return {
        ...state,
        allStudent: [...action.payload],
      };
    case SHOW_VERIFIED_STUDENTDATA_ERROR:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default verifiedStudentDataReducer;