import {
    GET_STUDENT_PROFILE
  } from "../constant/Index";

const initialState = {
  data: [],
};

const stuDataProReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STUDENT_PROFILE:
      return {
        ...state,
        data: [action.payload],
      };
 
    default:
      return state;
  }
};

export default stuDataProReducer;
