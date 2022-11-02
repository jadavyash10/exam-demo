import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateExamField, { subjectNameField } from "../../utils/CreateExamField";
import Button from "../../reusable/Button";
import DropDown from "../../reusable/DropDown";
import Validation from "../Validation";
import Input from "../../reusable/Input";
import { reset } from "../../utils/Function";

const CreateExam = () => {
  const initialState = {
    subjectName: "",
    questions: [],
    notes: [],
  };
  const state = {
    question: "",
    answer: "",
    ans1: "",
    ans2: "",
    ans3: "",
    ans4: "",
  };
  const [fields, setFields] = useState(state);
  const [examForm, setExamForm] = useState(initialState);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState({});
  const [cloneData, setCloneData] = useState({});

  const handleSubjectNameChange = (e) => {
    setExamForm({ ...examForm, [e.target.name]: e.target.value });
    const newError = Validation(e.target.name, e.target.value);
    setError({ ...error, [e.target.name]: newError });
  };

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
    const newError = Validation(e.target.name, e.target.value);
    setError({ ...error, [e.target.name]: newError });
  };

  const handleAddQuestions = () => {
    const { subjectName, notes, questions } = examForm;
    let cloneQuestions = [...questions];
    const obj = {
      question: fields.question,
      answer: fields?.answer,
      options: [fields.ans1, fields.ans2, fields.ans3, fields.ans4],
    };
    cloneQuestions.push(obj);
    setExamForm({
      ...examForm,
      questions: cloneQuestions,
    });
    setFields(reset(fields));
  };

  const handlePreviousValue = (id) => {
    const res = examForm.questions[id];
    const obj = {
      question: res.question,
      answer: res?.answer,
      ans1: res?.options[0],
      ans2: res?.options[1],
      ans3: res?.options[2],
      ans4: res?.options[3],
    };
    setFields({ ...fields, ...obj });
    examForm.questions[id] = {
      question: res.question,
      answer: res?.answer,
      options: [
        res?.options[0],
        res?.options[1],
        res?.options[2],
        res?.options[3],
      ],
    };
  };

  const handlePrevious = () => {
    setIndex(index - 1);
    handlePreviousValue(index - 1);
  };

  const handleNext = () => {
    let error = {};
    Object.entries(fields).forEach(([key, value]) => {
      const newError = Validation(key, value);
      newError && (error[key] = newError);
      if (newError) error[key] = newError;
    });
    if (Object.entries(error).length) {
      setError(error);
      return;
    }
    handleAddQuestions();
    setIndex(index + 1);
  };

  console.log("first", examForm);
  // console.log("reset", fields);
  // console.log("value", examForm.questions[index]);

  return (
    <div className="container">
      <h1>Create Exam</h1>
      <DropDown
        defaultValue={examForm.subjectName}
        name="subjectName"
        optionField={subjectNameField}
        label="Select Subject Name:"
        onChange={handleSubjectNameChange}
        error={error}
      />
      <div className="m-2">
        <h3>Question {index + 1}</h3>
        <div>
          <form id="form">
            {CreateExamField?.map((v, i) => {
              {
                switch (v.type) {
                  case "text":
                    return (
                      <div>
                        <Input
                          label={v.name}
                          type={v.type}
                          id={v.id}
                          name={v.name}
                          value={fields[v.name] || ""}
                          {...v}
                          onChange={handleChange}
                          error={error}
                        />
                      </div>
                    );

                  case "radio":
                    return (
                      <div>
                        {v?.value?.map((value, index) => {
                          if (v.type === "radio") {
                            return (
                              <div>
                                <input
                                  type="radio"
                                  id={value.id}
                                  name={v.name}
                                  value={fields[value.name]}
                                  checked={
                                    fields[value.name] &&
                                    fields[value.name] === fields.answer
                                  }
                                  onChange={handleChange}
                                />
                                <input
                                  type="text"
                                  id={value.id}
                                  className="demo"
                                  name={value.name}
                                  value={fields[value.name]}
                                  onChange={handleChange}
                                />
                                {error && error[value.name] && (
                                  <span style={{ color: "red" }}>
                                    {error[value.name]}
                                  </span>
                                )}
                              </div>
                            );
                          }
                        })}
                      </div>
                    );
                }
              }
            })}
          </form>
        </div>
      </div>

      <div className="row">
        <Button clickHandler={handlePrevious} disabled={index <= 0}>
          Pre
        </Button>
        <Button clickHandler={() => setFields(reset(fields))}>Clear</Button>
        <Button disabled={index < 14} type="submit">
          Submit
        </Button>
        <Button clickHandler={handleNext} disabled={index >= 14}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default CreateExam;
