import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateExamField, { subjectNameField } from "../../utils/CreateExamField";
import ExamQuestions from "./ExamQuestions";
import Button from "../../reusable/Button";
import DropDown from "../../reusable/DropDown";
import Validation from "../Validation";
import Input from "../../reusable/Input";
import {
  createExamOnChange,
  first,
  indexUpdate,
  setSubjectName,
  setSubjname,
} from "../../redux/action/CreateExamAction";

const CreateExam = () => {
  const [fields, setFields] = useState({
    question: "",
    answer: "",
    ans1: "",
    ans2: "",
    ans3: "",
    ans4: "",
    notes1: "",
    notes2: "",
  });
  const dispatch = useDispatch();
  const { data, error, message, index } = useSelector(
    (state) => state.createExam
  );
  const { subjectName, questions, notes } = data;
  const { question, answer, options } = questions[index];
  const questionsAdd = {
    question: "",
    answer: "",
    options: ["", "", "", ""],
  };
  console.log(subjectName)
  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
    console.log([e.target.name])
   let sname= e.target.name==="subjectName"&&([e.target.name]=e.target.value)
    dispatch(first(sname))
  };

  const handleNextButton = () => {
    dispatch(indexUpdate(index + 1, questionsAdd));
  };
  return (
    <div className="container">
      <h1>Create Exam</h1>
      <DropDown
        defaultValue={subjectName}
        name="subjectName"
        optionField={subjectNameField}
        label="Select Subject Name:"
        onChange={handleChange}
        error={error}
      />
      <div className="m-2">
        <h3>Question {index + 1}</h3>
        <div>
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
                        defaultValue={questions[index][v.name]}
                        {...v}
                        onChange={handleChange}
                      />
                    </div>
                  );

                case "radio":
                  return (
                    <div>
                      {v?.value?.map((value, index) => {
                        const { name } = value;
                        if (v.type === "radio") {
                          return (
                            <div>
                              <input
                                type="radio"
                                id={value.id}
                                name={v.name}
                                defaultValue={options[index]}
                                checked={
                                  options[index] && options[index] === answer
                                }
                                onChange={handleChange}
                              />
                              <input
                                type="text"
                                name="options"
                                defaultValue={options[index]}
                                onChange={handleChange}
                              />
                            </div>
                          );
                        }
                      })}
                    </div>
                  );
              }
            }
          })}
        </div>
      </div>

      <div className="row">
        <Button clickHandler={""} disabled={index <= 0}>
          Pre
        </Button>
        <Button clickHandler={""}>ClearAll</Button>
        <Button>Submit</Button>
        <Button clickHandler={handleNextButton} disabled={index >= 14}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default CreateExam;
