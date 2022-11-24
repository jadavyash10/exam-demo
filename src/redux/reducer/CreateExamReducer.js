import {
  CREATE_EXAM_DATA,
  CREATE_EXAM_FAIL,
  CREATE_EXAM_SUBMIT_REQ,
  CREATE_EXAM_SUCCESS,
} from "../constant/Index";

const initialState = {
  data: { subjectName: "", questions: [], notes: [] },
  message: "",
  loading: false,
};

const createExamReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_EXAM_SUCCESS:
      return {
        ...state,
        message: action.payload,
        loading: false,
      };

    case CREATE_EXAM_FAIL:
      return {
        ...state,
        message: action.payload,
        loading: false,
      };

    case CREATE_EXAM_SUBMIT_REQ:
      return {
        ...state,
        loading: true,
      };

    case CREATE_EXAM_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          subjectName: action.payload.subjectName,
          questions: [...action.payload.questions],
          notes: [...action.payload.notes],
        },
      };

    default:
      return state;
  }
};

export default createExamReducer;
