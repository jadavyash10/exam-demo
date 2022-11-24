import {
  LOGIN_CLEAR,
  LOGIN_ERROR,
  LOGIN_FAIL,
  LOGIN_ON_CHANGE,
  LOGIN_SUBMIT_REQ,
  LOGIN_SUCCESS,
} from "../constant/Index";

const user = {
  email: "",
  password: "",
};

const initialState = {
  users: { ...user },
  errors: {},
  loading: false,
  message: "",
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ON_CHANGE:
      return {
        ...state,
        users: { ...state.users, ...action.payload },
      };
    case LOGIN_SUBMIT_REQ:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        message: action.payload,
       loading: false, 

      };
    case LOGIN_FAIL:
      return {
        ...state,
        message: action.payload,
       loading: false, 

      };
    case LOGIN_ERROR:
      return {
        ...state,
        errors: { ...state.errors, ...action.payload },
      };
    case LOGIN_CLEAR:
      return initialState;
    default:
      return state;
  }
};

export default LoginReducer;
