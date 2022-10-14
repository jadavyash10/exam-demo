import {
  SIGNUP_CLEAR,
  SIGNUP_ERROR,
  SIGNUP_FAIL,
  SIGNUP_ON_CHANGE,
  SIGNUP_SUCCESS,
} from "../constant/Index";

const user = {
  name: "",
  email: "",
  password: "",
  role: "",
};

const initialState = {
  users: { ...user },
  errors: {},
  message: "",
};

const SIGNUPReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_ON_CHANGE:
      return {
        ...state,
        users: { ...state.users, ...action.payload },
      };

    case SIGNUP_ERROR:
      return {
        ...state,
        errors: { ...state.errors, ...action.payload },
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        message: action.payload,
      };

    case SIGNUP_FAIL:
      return {
        ...state,
        message: action.payload,
      };
    case SIGNUP_CLEAR:
      return initialState;

    default:
      return state;
  }
};

export default SIGNUPReducer;
