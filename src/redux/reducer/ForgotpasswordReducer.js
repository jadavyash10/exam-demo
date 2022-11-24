import {
  FORGOT_PASSWORD_CLEAR,
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_ONCHANGE,
  FORGOT_PASSWORD_SUBMIT_REQ,
  FORGOT_PASSWORD_SUCCESS,
} from "../constant/Index";

const user = {
  email: "",
};

const initialState = {
  users: { ...user },
  message: "",
  errors: {},
  loading: false,
};

const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        message: action.payload,
        loading: false,
      };

    case FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        message: action.payload,
        loading: false,
      };
    case FORGOT_PASSWORD_SUBMIT_REQ:
      return {
        ...state,
        loading: true,
      };

    case FORGOT_PASSWORD_ONCHANGE:
      return {
        ...state,
        users: { ...state.users, ...action.payload },
      };

    case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        errors: { ...state.errors, ...action.payload },
      };

    case FORGOT_PASSWORD_CLEAR:
      return initialState;

    default:
      return state;
  }
};

export default forgotPasswordReducer;
