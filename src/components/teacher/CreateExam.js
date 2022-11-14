import React, { useEffect, useState } from "react";
import CreateExamField from "../../utils/CreateExamField";
import Button from "../../reusable/Button";
import DropDown from "../../reusable/DropDown";
import Validation from "../Validation";
import Input from "../../reusable/Input";
import { errorValidate, reset } from "../../utils/Function";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createExamSubmit } from "../../redux/action/CreateExamAction";
import { editExamPut } from "../../redux/action/EditExamAction";

const CreateExam = ({ data, title, id }) => {
  const initialState = {
    subjectName: "",
    question: "",
    answer: "",
    ans1: "",
    ans2: "",
    ans3: "",
    ans4: "",
    note: "",
    options: [],
    questions: [],
    notes: [],
    error: {},
  };

  const [examForm, setExamForm] = useState(initialState);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [editData, setEditData] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    data !== undefined && setEditData(data);
  }, [data]);

  useEffect(() => {
    setExamForm(initialState);
    setCurrentQuestionIndex(0);
  }, []);

  useEffect(() => {
    const data1 =
      editData?.questions !== undefined
        ? editData?.questions[currentQuestionIndex]
        : {
            question: "",
            answer: "",
            options: ["", "", "", ""],
          };
    const subName = editData
      ? editData?.subjectName !== undefined
        ? editData?.subjectName
        : ""
      : "";
    const note = editData
      ? editData?.notes !== undefined
        ? editData?.notes[currentQuestionIndex]
        : ""
      : "";

    editData != undefined &&
      setExamForm({
        ...examForm,
        subjectName: subName,
        question: data1?.question,
        answer: data1?.answer,
        ans1: data1?.options[0],
        ans2: data1?.options[1],
        ans3: data1?.options[2],
        ans4: data1?.options[3],
        note: note,
      });
  }, [editData, data]);

  const {
    subjectName,
    question,
    answer,
    ans1,
    ans2,
    ans3,
    ans4,
    note,
    options,
    questions,
    notes,
    error,
  } = examForm;

  const obj = {
    question: question,
    answer: answer,
    options: [ans1, ans2, ans3, ans4],
  };

  const clearData = () => {
    setExamForm({ ...examForm, ...reset(examForm) });
  };

  const handleChange = (e) => {
    setExamForm({
      ...examForm,
      [e.target.name]: e.target.value,
      error: {
        ...error,
        [e.target.name]: Validation(e.target.name, e.target.value),
      },
    });
  };

  const handleDuplicateObject = (arr) => {
    let result = arr.some((element, index) => {
      return arr.indexOf(element) !== index;
    });
    return result;
  };

  const handleDuplicateQuestion = (arr, question) => {
    const i = arr.findIndex((value, i) => value.question === question);
    if (i != -1) {
      if (i == currentQuestionIndex) {
        return;
      } else {
        return true;
      }
    }
  };

  const handleAddItems = () => {
    let cloneQuestions = [...questions];
    const cloneNotes = [...notes];
    cloneQuestions.push(obj);
    if ((!note == "" || !note == undefined) && notes.length < 2) {
      cloneNotes.push(note);
    }
    note ? notes.push(note) : notes.splice(currentQuestionIndex, 1);
    note === undefined && notes.splice(currentQuestionIndex, 1);

    note
      ? note === undefined
        ? cloneQuestions.splice(currentQuestionIndex, 1)
        : cloneNotes.push(note)
      : cloneQuestions.splice(currentQuestionIndex, 1);

    setExamForm({
      ...examForm,
      subjectName: subjectName,
      questions: questions.push(obj),
      notes: cloneNotes,
    });
    clearData();
  };

  const handleNextButton = () => {
    if (Object.entries(errorValidate(examForm)).length) {
      setExamForm({ ...examForm, error: errorValidate(examForm) });
      return;
    }

    if (handleDuplicateObject(obj.options)) {
      alert("Options are same ");
      return;
    }
    if (handleDuplicateQuestion(questions, question)) {
      alert("Question are same ");
      return;
    }

    handleAddItems();
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePreviousValue = (id) => {
    const res = data === undefined ? questions[id] : editData.questions[id];
    const obj = {
      question: res?.question,
      answer: res?.answer,
      ans1: res?.options[0],
      ans2: res?.options[1],
      ans3: res?.options[2],
      ans4: res?.options[3],
      note: data === undefined ? notes[id] : editData?.notes[id],
    };
    setExamForm({ ...examForm, ...obj });
  };

  const handlePreviousButton = () => {
    handlePreviousValue(currentQuestionIndex - 1);
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handlePreValueUpdate = () => {
    if (Object.entries(errorValidate(examForm)).length) {
      setExamForm({ ...examForm, error: errorValidate(examForm) });
      return;
    }

    if (handleDuplicateObject(obj.options)) {
      alert("Options are same ");
      return;
    }
    if (
      handleDuplicateQuestion(
        data === undefined ? questions : editData.questions,
        question
      )
    ) {
      alert("Question are same ");
      return;
    }

    if (data === undefined) {
      questions.splice(currentQuestionIndex, 1, obj);
      note
        ? notes.splice(currentQuestionIndex, 1, note)
        : notes.splice(currentQuestionIndex, 1);
      note === undefined
        ? notes.splice(currentQuestionIndex, 1)
        : notes.splice(currentQuestionIndex, 1, note);
      setExamForm({
        ...examForm,
        questions: [...questions],
        notes: [...notes],
      });
    } else {
      editData?.questions?.splice(currentQuestionIndex, 1, obj);
      note
        ? editData?.notes?.splice(currentQuestionIndex, 1, note)
        : editData?.notes?.splice(currentQuestionIndex, 1);
      note === undefined
        ? editData?.notes?.splice(currentQuestionIndex, 1)
        : editData?.notes?.splice(currentQuestionIndex, 1, note);
      setEditData({ ...editData, subjectName: subjectName });
    }

    clearData();
    setCurrentQuestionIndex(currentQuestionIndex + 1);

    if (data === undefined) {
      questions.length >= currentQuestionIndex + 1 &&
        handlePreviousValue(currentQuestionIndex + 1);
    } else {
      editData?.questions?.length >= currentQuestionIndex + 1 &&
        handlePreviousValue(currentQuestionIndex + 1);
    }
  };
  const handleSubmit = () => {
    const a = { subjectName, questions, notes };
    data != undefined
      ? dispatch(editExamPut(id, editData, navigate))
      : dispatch(createExamSubmit(a, navigate));
  };

  console.log("create exam", examForm);
  console.log("edit", editData);

  return (
    <div className="container">
      <h1>{title ? title : "Create Exam"}</h1>
      {currentQuestionIndex > 14 ? (
        <h1>
          Click on Submit Button For {title ? title : "Create Exam"} for{" "}
          {subjectName}
        </h1>
      ) : (
        <div className="m-2">
          <h3>Question {currentQuestionIndex + 1}</h3>
          <div>
            <form id="form">
              {CreateExamField?.map((v, i) => {
                {
                  switch (v.type) {
                    case "text":
                      return (
                        <div>
                          <Input
                            label={v.label}
                            type={v.type}
                            id={v.id}
                            name={v.name}
                            value={examForm[v.name] || ""}
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
                                    value={examForm[value.name]}
                                    checked={
                                      examForm[value.name] &&
                                      examForm[value.name] === examForm.answer
                                    }
                                    onChange={handleChange}
                                  />
                                  <input
                                    type="text"
                                    id={value.id}
                                    className="demo"
                                    name={value.name}
                                    value={examForm[value.name] || ""}
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
                    case "select":
                      return (
                        <DropDown
                          value={examForm?.subjectName}
                          name="subjectName"
                          optionField={v.subjectNameField}
                          label={v.label}
                          onChange={handleChange}
                          error={error}
                        />
                      );
                  }
                }
              })}
            </form>
          </div>
        </div>
      )}
      <div className="row">
        {currentQuestionIndex < 15 ? (
          <>
            <Button clickHandler={clearData}>Clear</Button>
            <Button
              clickHandler={handlePreviousButton}
              disabled={currentQuestionIndex <= 0}
            >
              Pre
            </Button>
          </>
        ) : null}

        {data != undefined ? (
          <>
            <Button
              clickHandler={
                currentQuestionIndex != 15 ? handlePreValueUpdate : handleSubmit
              }
              disabled={questions.length > 15}
            >
              {currentQuestionIndex != 15 ? "Update" : "Submit"}
            </Button>
          </>
        ) : (
          <Button
            clickHandler={
              questions.length > currentQuestionIndex
                ? handlePreValueUpdate
                : questions.length === 15
                ? handleSubmit
                : handleNextButton
            }
            disabled={questions.length > 15}
          >
            {questions.length > currentQuestionIndex
              ? "Update"
              : questions.length == 15
              ? "Submit"
              : "Next"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default React.memo(CreateExam);
