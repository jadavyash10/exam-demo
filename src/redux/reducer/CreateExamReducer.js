import {
  CREATE_EXAM_CLEAR,
  CREATE_EXAM_ERROR,
  CREATE_EXAM_FAIL,
  CREATE_EXAM_ONCHANGE,
  CREATE_EXAM_SUBJECT_NAME,
  CREATE_EXAM_SUCCESS,
  INDEX_UPDATE,
  QUESTIONS,
  SUBJECT_NAME,
} from "../constant/Index";

const initialState = {
  data: {
    subjectName: "",
    questions: [
      {
        question: "",
        answer: "",
        options: ["", "", "", ""],
      },
    ],
    notes: [],
  },
  error: {},
  message: "",
  index: 0,
};

const createExamReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_EXAM_SUCCESS:
      return {
        ...state,
        message: action.payload,
      };

    case CREATE_EXAM_ONCHANGE:
      return {
        ...state,
        data: { ...state.data, ...action.payload },
      };
    // case QUESTIONS:
    //   return {
    //     ...state,
    //     data: {
    //       ...state.data,
    //       questions: [...state.data.questions, action.payload],
    //     },
    //   };
    case CREATE_EXAM_ONCHANGE:
      return {
        ...state,
        data: { ...state.data, ...action.payload },
      };

    case CREATE_EXAM_FAIL:
      return {
        ...state,
        message: action.payload,
      };

    case CREATE_EXAM_ERROR:
      return {
        ...state,
        error: { ...state.error, ...action.payload },
      };
    case INDEX_UPDATE:
      return {
        ...state,
        index: action.payload.state,
        data: {
          ...state.data,
          questions: [...state.data.questions, action.payload.obj],
        },
      };
    case CREATE_EXAM_SUBJECT_NAME:
      return {
        ...state,
        data:{ ...state.data, subjectName : action.payload}
      };

    case CREATE_EXAM_CLEAR:
      return initialState;

    default:
      return state;
  }
};

export default createExamReducer;
