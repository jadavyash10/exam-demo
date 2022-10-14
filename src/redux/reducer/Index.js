import { combineReducers } from "redux";
import forgotPasswordReducer from "./ForgotpasswordReducer";
import LoginReducer from "./LoginReducer";
import newPasswordReducer from "./NewPasswordReducer";
import resetPasswordReducer from "./resetPasswordReducer";
import showStudentDataReducer from "./ShowStudentDataReducer";
import SignUpReducer from "./SignUpReducer";
import verifiedStudentDataReducer from "./verifiedStudentDataReducer";
import ViewStudentDetailReducer from "./ViewStudentDetailReducer";

const rootReducer = combineReducers({
  signUp: SignUpReducer,
  login: LoginReducer,
  forgotPassword: forgotPasswordReducer,
  newPassword: newPasswordReducer,
  resetPassword: resetPasswordReducer,
  showStudentData: showStudentDataReducer,
  verifiedStudentData: verifiedStudentDataReducer,
  viewStudentDetail: ViewStudentDetailReducer,
});

export default rootReducer;
