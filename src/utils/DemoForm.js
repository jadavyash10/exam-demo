import React, { useEffect, useState } from "react";
import Validation from "../components/Validation";
import { createExamSubmit } from "../redux/action/CreateExamAction";
import { validate } from "./Function";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editExamPut } from "../redux/action/EditExamAction";
import { giveExam } from "../redux/action/ExamPaperAction";
import Button from "../reusable/Button";
import ReusableForm from "../reusable/ReusableForm";
import giveExamFields from "./GiveExamFields";
import CreateExamField from "./CreateExamField";

const DemoForm = (props) => {
  const initialState = {
    subjectName: "",
    questions: [
      {
        question: "",
        answer: "",
        options: new Array(4).fill(""),
      },
    ],
    notes: [""],
  };
  const [data, setData] = useState(initialState);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let obj = data?.questions?.[index];
  const role = localStorage.getItem("role");

  useEffect(() => {
    setData(initialState);
    setError({});
    setIndex(0);
  }, []);

  useEffect(() => {
    props.data !== undefined && setData(props.data);
  }, [props.data]);

  const handleDuplicateObject = (arr) => {
    let result = arr.some((element, i) => {
      return arr.indexOf(element) !== i;
    });
    return result;
  };

  const handleDuplicateQuestion = (arr, question) => {
    const i = arr.findIndex(
      (value, i) => value.question.trim() === question.trim()
    );
    if (i != -1) {
      if (i == index) {
        return;
      } else {
        return true;
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setError({ ...error, [name]: Validation(name, value) });
    const temp = { ...data };
    if (name === "subjectName") {
      temp.subjectName = value;
    }
    if (name === "question") {
      temp.questions[index].question = value;
    }
    if (name === "answer") {
      temp.questions[index].answer = value;
    }
    const optionsIndex = +name[name.length - 1];
    if (
      name === "option0" ||
      name === "option1" ||
      name === "option2" ||
      name === "option3"
    ) {
      temp.questions[index].options = Object.assign(
        [...temp?.questions[index]?.options],
        { [optionsIndex]: value }
      );
    }
    if (name === "note") {
      temp.notes.splice(index, 1, value);
    }

    setData(temp);
  };

  const clearField = () => {
    const tempData = { ...data };
    tempData.questions[index] = {
      question: "",
      answer: "",
      options: new Array(4).fill(""),
    };
    setData(tempData);
  };

  const handleNext = (e) => {
    if (Object.values(validate(data, index)).length) {
      setError({ ...error, ...validate(data, index) });
    }
    let errorVal = Object.values(validate(data, index));
    if (
      errorVal.some((v, i) => {
        return v !== "";
      })
    ) {
      return;
    }

    if (handleDuplicateQuestion(data?.questions, obj.question)) {
      alert("Question Are Repeated ");
      return;
    }
    if (handleDuplicateObject(obj?.options)) {
      alert("Options Are Repeated ");
      return;
    }

    if (
      data.questions[index + 1] == undefined &&
      index < 14 &&
      role === "teacher"
    ) {
      setData({
        ...data,
        questions: [
          ...data.questions,
          {
            question: "",
            answer: "",
            options: new Array(4).fill(""),
          },
        ],
        notes: [...data.notes, ""],
      });
    }
    if (role === "teacher" ? index < 14 : index < 6) {
      setIndex(index + 1);
    }
    const filterNotes = data?.notes?.filter((value) => value);
    if (
      role === "teacher"
        ? index == 14 && data.questions.length === 15
        : index == 6 && data.questions.length === 7
    ) {
      const cloneData = {
        subjectName: data.subjectName,
        questions: data.questions,
        notes: filterNotes,
      };
      const giveExamData = data?.questions?.map(({ options, _id, ...rest }) => {
        return rest;
      });
      props.data == undefined
        ? dispatch(createExamSubmit(cloneData, navigate))
        : role !== "student"
        ? dispatch(editExamPut(props.id, cloneData, navigate))
        : dispatch(giveExam(props.id, giveExamData, navigate));
    }
  };
  const handlePrevious = (e) => {
    setIndex(index - 1);
  };

  const handleSkipButton = () => {
    obj = {
      ...obj,
      answer: "",
    };
    data?.questions?.splice(index, 1, obj);
    if (role === "teacher" ? index < 14 : index < 6) {
      setIndex(index + 1);
    }
  };

  const buttonArr = [
    {
      children: role === "teacher" ? "Clear" : "Skip",
      onClick: role === "teacher" ? clearField : handleSkipButton,
    },
    {
      children: "Pre",
      onClick: handlePrevious,
      disabled: index <= 0,
    },
    {
      children:
        role === "teacher"
          ? index < 14
            ? "Next"
            : "Submit"
          : index < 6
          ? "Next"
          : "Submit",
      onClick: handleNext,
    },
  ];
  return (
    <div className="container">
      <div>
        <h1>{props.title ? props.title : "Create Exam"}</h1>
      </div>
      <h2>Question {index + 1} </h2>
      <div>
        {/* <ReusableForm
          field={role === "student" ? giveExamFields : CreateExamField}
          Data={data}
          error={error}
          onChange={handleChange}
          index={index}
        /> */}
        <form>
          <div>
            <label htmlFor="subjectName">Subject Name</label>
            <input
              type="text"
              name="subjectName"
              placeholder="Subject Name"
              onChange={handleChange}
              value={data?.subjectName}
            />
          </div>
          <div>
            <label htmlFor="subjectName">Question</label>
            <input
              type="text"
              name="question"
              placeholder="question"
              onChange={handleChange}
              value={obj?.question}
            />
          </div>
          <div>
            <label htmlFor="subjectName">Answer</label>
            <input
              type="text"
              name="answer"
              placeholder="answer"
              onChange={handleChange}
              value={obj?.answer}
              disabled
            />
          </div>
          <div>
            <input
              type="radio"
              name="answer"
              onChange={handleChange}
              value={obj?.options?.[0]}
              checked={obj?.options?.[0] === obj?.answer}
            />
            <input
              type="text"
              name="option0"
              placeholder="option1"
              value={obj?.options?.[0]}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="radio"
              name="answer"
              onChange={handleChange}
              value={obj?.options?.[1]}
              checked={obj?.options?.[1] === obj?.answer}
            />
            <input
              type="text"
              name="option1"
              placeholder="option2"
              value={obj?.options?.[1]}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="radio"
              name="answer"
              onChange={handleChange}
              value={obj?.options?.[2]}
              checked={obj?.options?.[2] === obj?.answer}
            />
            <input
              type="text"
              name="option2"
              placeholder="option3"
              value={obj?.options?.[2]}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="radio"
              name="answer"
              onChange={handleChange}
              value={obj?.options?.[3]}
              checked={obj?.options?.[3] === obj?.answer}
            />
            <input
              type="text"
              name="option3"
              placeholder="option4"
              value={obj?.options?.[3]}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="note"
              placeholder="Notes"
              onChange={handleChange}
              value={
                (data?.notes?.[index] !== undefined && data?.notes?.[index]) ||
                ""
              }
            />
          </div>
        </form>
        <div className="row">
          {role === "teacher" ? (
            <Button clickHandler={clearField}>Clear</Button>
          ) : (
            <Button clickHandler={handleSkipButton}>Skip</Button>
          )}
          <Button clickHandler={handlePrevious} disabled={index <= 0}>
            Prev
          </Button>
          <Button clickHandler={handleNext}>
            {role === "teacher"
              ? index < 14
                ? "Next"
                : "Submit"
              : index < 6
              ? "Next"
              : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DemoForm;
