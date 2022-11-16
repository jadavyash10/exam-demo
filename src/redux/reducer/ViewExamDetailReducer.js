import { VIEW_EXAM_DETAIL_ERROR, VIEW_EXAM_DETAIL_REQ, VIEW_EXAM_DETAIL_SUCCESS } from "../constant/Index";

const initialState = {
  data: [],
  loading:false,
  message: "",
};

const viewExamDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_EXAM_DETAIL_REQ:
      return {
        ...state,
        loading:true,
      };
    case VIEW_EXAM_DETAIL_SUCCESS:
      return {
        ...state,
        loading:false,
        data: action.payload,
      };
    case VIEW_EXAM_DETAIL_ERROR:
      return {
        ...state,
        loading:false,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default viewExamDetailReducer;
