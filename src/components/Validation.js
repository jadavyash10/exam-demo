import { pass, re } from "../utils/regex";

const Validation = (name, value, userData) => {
  switch (name) {
    case "name":
      if (!value) {
        return "Please enter a username";
      }
      break;
    case "email":
      if (!value) {
        return "please enter a email";
      } else if (!re.test(value)) {
        return "please enter valid email";
      }
      break;
    case "password":
      if (!value) {
        return "please enter a password";
      } else if (!pass.test(value)) {
        return "password should contain at least one number and one special character";
      }
      break;
    case "oldPassword":
      if (!value) {
        return "please enter a password";
      } else if (!pass.test(value)) {
        return "password should contain at least one number and one special character";
      }
      break;
    case "Password":
      if (!value) {
        return "please enter a password";
      } else if (!pass.test(value)) {
        return "password should contain at least one number and one special character";
      }
      break;
    case "ConfirmPassword":
      if (!value) {
        return "please enter a password";
      }  else if (userData.Password && value !== userData.Password) {
        return "Password and Confirm Password does not match.";
      }
      break;
    case "role":
      if (!value) {
        return "Please select a role";
      }
      break;

    default:
      break;
  }
};

export default Validation;
