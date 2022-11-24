import {
  GET_EXAM_PAPER_CLEAR,
  GET_EXAM_PAPER_ERROR,
  GET_EXAM_PAPER_REQ,
  GET_EXAM_PAPER_SUCCESS,
  GIVE_EXAM_FAIL,
  GIVE_EXAM_ONCHANGE,
  GIVE_EXAM_SET_QUESTIONS,
  GIVE_EXAM_SUBMIT_REQ,
  GIVE_EXAM_SUCCESS,
} from "../constant/Index";

const initialState = {
  examPaper: [],
  loading: false,
  giveExamLoading: false,
  giveExamQuestions: [],
  message: "",
  error: "",
};

const getExamPaperReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EXAM_PAPER_REQ:
      return {
        ...state,
        loading: true,
      };

    case GET_EXAM_PAPER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        examPaper: [...action.payload],
      };

    case GET_EXAM_PAPER_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case GIVE_EXAM_SET_QUESTIONS:
      return {
        ...state,
        loading: false,
        giveExamQuestions: [...action.payload],
      };
    case GIVE_EXAM_ONCHANGE:
      return {
        ...state,
        loading: false,
        giveExamQuestions: [...action.payload],
      };

    case GIVE_EXAM_SUCCESS:
      return {
        ...state,
        message: action.payload,
        giveExamLoading: false,
      };

    case GIVE_EXAM_FAIL:
      return {
        ...state,
        message: action.payload,
        giveExamLoading: false,
      };

    case GIVE_EXAM_SUBMIT_REQ:
      return {
        ...state,
        giveExamLoading: true,
      };
    case GET_EXAM_PAPER_CLEAR:
      return {
        ...state,
        loading: false,
        examPaper: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export default getExamPaperReducer;
