import { SHOW_STUDENTDATA_REQ, SHOW_VERIFIED_STUDENTDATA, SHOW_VERIFIED_STUDENTDATA_ERROR, SHOW_VERIFIED_STUDENTDATA_REQ } from "../constant/Index";

const initialState = {
  allStudent: [],
  loading: false,
  message: "",
};

const verifiedStudentDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_VERIFIED_STUDENTDATA_REQ:
      return {
        ...state,
       loading: true
      };
    case SHOW_VERIFIED_STUDENTDATA:
      return {
        ...state,
        loading:false,
        allStudent: [...action.payload],
      };
    case SHOW_VERIFIED_STUDENTDATA_ERROR:
      return {
        ...state,
        loading:false,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default verifiedStudentDataReducer;