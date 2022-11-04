import { VIEW_EXAM_DETAIL_ERROR, VIEW_EXAM_DETAIL_SUCCESS } from "../constant/Index";

const initialState = {
  data: [],
  message: "",
};

const viewExamDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_EXAM_DETAIL_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case VIEW_EXAM_DETAIL_ERROR:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default viewExamDetailReducer;
