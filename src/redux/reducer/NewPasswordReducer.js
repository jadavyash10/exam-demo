import {
  NEW_PASSWORD_CLEAR,
  NEW_PASSWORD_ERROR,
  NEW_PASSWORD_FAIL,
  NEW_PASSWORD_ONCHANGE,
  NEW_PASSWORD_SUBMIT_REQ,
  NEW_PASSWORD_SUCCESS,
} from "../constant/Index";

const user = {
  Password: "",
  ConfirmPassword: "",
};

const initialState = {
  users: { ...user },
  errors: {},
  message: "",
  loading: false,
};

const newPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_PASSWORD_SUCCESS:
      return {
        ...state,
        message: action.payload,
        loading: false,
      };

    case NEW_PASSWORD_FAIL:
      return {
        ...state,
        message: action.payload,
        loading: false,
      };
    case NEW_PASSWORD_SUBMIT_REQ:
      return {
        ...state,
        loading: true,
      };

    case NEW_PASSWORD_ONCHANGE:
      return {
        ...state,
        users: { ...state.users, ...action.payload },
      };

    case NEW_PASSWORD_ERROR:
      return {
        ...state,
        errors: { ...state.errors, ...action.payload },
      };

    case NEW_PASSWORD_CLEAR:
      return initialState;

    default:
      return state;
  }
};

export default newPasswordReducer;
