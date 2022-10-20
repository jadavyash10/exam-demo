import { pass, re } from "../utils/regex";

const Validation = (name, value, userData) => {
  switch (name) {
    case "name":
      return !value ? "Please enter a username" : "";

    case "email":
      return !value
        ? "please enter a email"
        : !re.test(value)
        ? "please enter valid email"
        : "";

    case "password":
      return !value
        ? "please enter a password"
        : !pass.test(value)
        ? "password should contain at least one number and one special character"
        : "";

    case "oldPassword":
      return !value
        ? "please enter a password"
        : !pass.test(value)
        ? "password should contain at least one number and one special character"
        : "";

    case "Password":
      return !value
        ? "please enter a password"
        : !pass.test(value)
        ? "password should contain at least one number and one special character"
        : "";

    case "ConfirmPassword":
      return !value
        ? "please enter a password"
        : userData.Password && value !== userData.Password
        ? "Password and Confirm Password does not match."
        : "";

    case "role":
      return !value ? "Please select a role" : "";

    case "subjectName":
      return !value ? "Please select a subjectName" : "";

    default:
      break;
  }
};

export default Validation;
