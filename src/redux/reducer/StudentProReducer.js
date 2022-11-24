import {
    GET_STUDENT_PROFILE, GET_STUDENT_PROFILE_FAIL, GET_STUDENT_PROFILE_REQ,GET_STUDENT_ONCHANGE
  } from "../constant/Index";

const initialState = {
  data: [],
  loading: false,
  message:""
};

const stuDataProReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STUDENT_PROFILE_REQ:
      return {
        ...state,
        loading: true,

      };
    case GET_STUDENT_PROFILE:
      return {
        ...state,
        loading: false,
        data: [action.payload],
      };
    case GET_STUDENT_ONCHANGE:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case GET_STUDENT_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
 
    default:
      return state;
  }
};

export default stuDataProReducer;
