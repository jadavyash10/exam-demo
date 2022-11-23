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

export const validate = (data, index) => {
  let error = {};
  Object.entries(data).forEach(([key, value]) => {
    if (key === "subjectName") {
      error[key] = Validation(key, value);
    }
    if (key === "questions") {
      Object.entries(value[index]).forEach(([key1, value1]) => {
        if (key1 === "question") {
          error[key1] = Validation(key1, value1);
        }
        if (key1 === "answer") {
          error[key1] = Validation(key1, value1);
        }
        if (key1 === "options") {
          Object.entries(value[index].options).forEach(([key2, value2]) => {
            if (key2 === "0") {
              error.option0 = Validation("option0", value2);
            }
            if (key2 === "1") {
              error.option1 = Validation("option1", value2);
            }
            if (key2 === "2") {
              error.option2 = Validation("option2", value2);
            }
            if (key2 === "3") {
              error.option3 = Validation("option3", value2);
            }
          });
        }
      });
    }
  });
  return error;
};
