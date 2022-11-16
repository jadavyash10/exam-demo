import { DELETE_EXAM, VIEW_EXAM_ERROR, VIEW_EXAM_REQ, VIEW_EXAM_SUCCESS } from "../constant/Index";

const initialState = {
  allExam: [],
  loading:true,
  message: "",
};

const viewExamReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_EXAM_REQ:
      return {
        ...state,
       loading:true,
      };
    case VIEW_EXAM_SUCCESS:
      return {
        ...state,
        loading:false,
        allExam: [...action.payload],
      };
    case VIEW_EXAM_ERROR:
      return {
        ...state,
        loading:false,
        message: action.payload,
      };
    case DELETE_EXAM:
      return {
        ...state,
        loading:false,       
        message: action.payload,
      };
    default:
      return state;
  }
};

export default viewExamReducer;
