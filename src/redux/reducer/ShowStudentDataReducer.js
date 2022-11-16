import { SHOW_STUDENTDATA, SHOW_STUDENTDATA_ERROR, SHOW_STUDENTDATA_REQ } from "../constant/Index";

const initialState = {
  allStudent: [],
  loading:false,
  message: "",
};

const showStudentDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_STUDENTDATA_REQ:
      return {
        ...state,
       loading: true
      };
    case SHOW_STUDENTDATA:
      return {
        ...state,
        loading:false,
        allStudent: [...action.payload],
      };
    case SHOW_STUDENTDATA_ERROR:
      return {
        ...state,
        loading:false,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default showStudentDataReducer;