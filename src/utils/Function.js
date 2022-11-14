import Validation from "../components/Validation";

export const reset = (obj) => {
  const newObj = Object.keys(obj).reduce((accumulator, current) => {
    if (
      current != "subjectName" &&
      current != "options" &&
      current != "questions" &&
      current != "notes" &&
      current != "currentQuestion" &&
      current != "error"
    ) {
      accumulator[current] = "";
    }
    return accumulator;
  }, {});
  return newObj;
};


export const errorValidate = (data) => {
  let error = {};
  Object.entries(data).forEach(([key, value]) => {
    if (
      key != "options" ||
      key != "questions" ||
      key != "notes" ||
      key != "error"
    ) {
      var newError = Validation(key, value);
      newError && (error[key] = newError);
    }
    if (newError) error[key] = newError;
  });
  return error;
};

export const xyz = (data) => {
  const error = {};
  Object.entries(data).forEach(([key, value]) => {
    switch (key) {
      case "subjectName":
        return !value
          ? (error.subjectName = "Please select a subjectName")
          : "";
      case "questions":
        return !value.length === 14
          ? (error.questions = "please enter 15 questions")
          : "";
      case "notes":
        return !value.length ? (error.notes = "please enter note ") : "";
    }
  });
  return error;
};
