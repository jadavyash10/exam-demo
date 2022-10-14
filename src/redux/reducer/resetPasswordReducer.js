import {
  RESET_PASSWORD_CLEAR,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_ONCHANGE,
  RESET_PASSWORD_SUCCESS,
} from "../constant/Index";

const user = {
  oldPassword: "",
  Password: "",
  ConfirmPassword: "",
};

const initialState = {
  users: { ...user },
  errors: {},
  message: "",
};

const resetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        message: action.payload,
      };

    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        message: action.payload,
      };

    case RESET_PASSWORD_ONCHANGE:
      return {
        ...state,
        users: { ...state.users, ...action.payload },
      };

    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        errors: { ...state.errors, ...action.payload },
      };

    case RESET_PASSWORD_CLEAR:
      return initialState;

    default:
      return state;
  }
};

export default resetPasswordReducer;
