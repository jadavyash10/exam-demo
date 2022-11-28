import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CreateExamField from "../../utils/CreateExamField";
import Button from "../../reusable/Button";
import Validation from "../Validation";
import { errorValidate, reset } from "../../utils/Function";
import giveExamFields from "../../utils/GiveExamFields";
import ReusableForm from "../../reusable/ReusableForm";
import _ from "lodash";

const CreateExam = (props) => {
  const { data, title, id, loadingData, index } = props;
  const initialState = {
    subjectName: "",
    questions: [],
    notes: [],
    question: "",
    answer: "",
    ans1: "",
    ans2: "",
    ans3: "",
    ans4: "",
    note: "",
    options: [],
    error: {},
  };

  const [examForm, setExamForm] = useState(initialState);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [examData, setExamData] = useState();

  const role = localStorage.getItem("role");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.createExam);

  const params = useParams();
  useEffect(() => {
    data !== undefined && setExamData(data);
  }, [data]);

  useEffect(() => {
    setExamForm(initialState);
    setCurrentQuestionIndex(0);
  }, []);

  useEffect(() => {
    const data1 =
      examData?.questions !== undefined
        ? examData?.questions[currentQuestionIndex]
        : {
            question: "",
            answer: "",
            options: ["", "", "", ""],
          };
    const subName = examData
      ? examData?.subjectName !== undefined
        ? examData?.subjectName
        : ""
      : "";
    const note = examData
      ? examData?.notes !== undefined
        ? examData?.notes[currentQuestionIndex]
        : ""
      : "";

    examData != undefined &&
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
  }, [examData, data]);

  useEffect(() => {
    index !== undefined && setCurrentQuestionIndex(index);
  }, [data, index]);

  useEffect(() => {
    window.onbeforeunload = () => {
      role === "student" &&
        localStorage.setItem("currentQuestionIndex", currentQuestionIndex);
    };
  }, [examData, currentQuestionIndex]);

  useEffect(() => {
    const currentQuestionIndex = localStorage.getItem("currentQuestionIndex");
    const allData = JSON.parse(localStorage.getItem("allData"));
    +currentQuestionIndex && setCurrentQuestionIndex(+currentQuestionIndex);
    allData && setExamData(allData);
  }, []);

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
  let cloneQuestions = (data === undefined ? examForm : examData)?.questions?.[
    currentQuestionIndex
  ];
  cloneQuestions?._id && delete cloneQuestions?._id;

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

  const handleDuplicateObject = () => {
    const cloneArr = obj?.options.filter((el) => el);
    let duplicateObject;
    let result = cloneArr.some((element, index) => {
      return cloneArr.indexOf(element) !== index;
    });
    result
      ? (duplicateObject = "options Are Repeated")
      : (duplicateObject = "");
    setExamForm({
      ...examForm,
      error: {
        ...examForm.error,
        duplicateObject,
      },
    });
    return result;
  };
  const handleDuplicateQuestion = (arr, question) => {
    const i = arr.findIndex(
      (value, i) => value.question.trim() === question.trim()
    );
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

    note ? notes.push(note) : notes.splice(currentQuestionIndex, 1);
    note === undefined && notes.splice(currentQuestionIndex, 1);

    setExamForm({
      ...examForm,
      subjectName: subjectName,
      questions: questions.push(obj),
      notes: cloneNotes,
    });
  };
  const handleNextButton = () => {
    if (Object.entries(errorValidate(examForm)).length) {
      setExamForm({ ...examForm, error: errorValidate(examForm) });
      return;
    }

    if (handleDuplicateObject()) {
      return;
    }
    if (handleDuplicateQuestion(questions, question)) {
      alert("Question Are Repeated ");
      return;
    }

    role !== "student" && handleAddItems();
    if (currentQuestionIndex != 14) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      clearData();
    }
    if (currentQuestionIndex === 14 && questions.length === 15) {
      handlePreviewButton();
    }
  };

  const handlePreviousValue = (id) => {
    const res = data === undefined ? questions[id] : examData.questions[id];
    const obj = {
      question: res?.question,
      answer: res?.answer,
      ans1: res?.options[0],
      ans2: res?.options[1],
      ans3: res?.options[2],
      ans4: res?.options[3],
      note:
        role != "student"
          ? data === undefined
            ? notes[id]
            : examData?.notes[id]
          : "",

      error: {},
    };
    setExamForm({ ...examForm, ...obj });
  };

  const checkPreButtonClickStateChangeIsSame = () => {
    var flag = false;
    if (cloneQuestions === undefined) {
      if (question || answer || ans1 || ans2 || ans3 || ans4) {
        return (flag = true);
      }
    } else {
      if (!_.isEqual(cloneQuestions, obj)) {
        return (flag = true);
      }
    }
    return flag;
  };
  const handlePreviousButton = () => {
    if (checkPreButtonClickStateChangeIsSame()) {
      if (window.confirm("Are you sure you want to go back")) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        handlePreviousValue(currentQuestionIndex - 1);
      }
    } else {
      handlePreviousValue(currentQuestionIndex - 1);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSkipButton = () => {
    let clone = examData.questions[currentQuestionIndex];
    examData?.questions?.splice(currentQuestionIndex, 1, clone);
    setExamData({ ...examData });
    if (currentQuestionIndex != 6) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreValueUpdate = () => {
    if (role != "student") {
      if (Object.entries(errorValidate(examForm)).length) {
        setExamForm({ ...examForm, error: errorValidate(examForm) });
        return;
      }
    }
    if (handleDuplicateObject()) {
      return;
    }
    if (
      role === "teacher" &&
      handleDuplicateQuestion(
        data === undefined ? questions : examData.questions,
        question
      )
    ) {
      alert("Question Are Repeated");
      return;
    }

    if (data === undefined) {
      questions.splice(currentQuestionIndex, 1, obj);
      note
        ? note === undefined
          ? notes.splice(currentQuestionIndex, 1)
          : notes.splice(currentQuestionIndex, 1, note)
        : notes.splice(currentQuestionIndex, 1);
      setExamForm({
        ...examForm,
        questions: [...questions],
        notes: [...notes],
      });
    } else {
      examData?.questions?.splice(currentQuestionIndex, 1, obj);
      note
        ? note === undefined
          ? examData?.notes?.splice(currentQuestionIndex, 1)
          : examData?.notes?.splice(currentQuestionIndex, 1, note)
        : examData?.notes?.splice(currentQuestionIndex, 1);
      setExamData({ ...examData, subjectName: subjectName });
    }

    clearData();
    if (
      role === "student"
        ? currentQuestionIndex != 6
        : currentQuestionIndex != 14
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    if (data === undefined) {
      questions.length >= currentQuestionIndex + 1 &&
        handlePreviousValue(currentQuestionIndex + 1);
    } else {
      examData?.questions?.length >= currentQuestionIndex + 1 &&
        handlePreviousValue(currentQuestionIndex + 1);
    }

    if (
      currentQuestionIndex === 14 &&
      (questions.length === 15 || examData?.questions?.length === 15)
    ) {
      handlePreviewButton();
    }
    if (role === "student") {
      if (currentQuestionIndex === 6 && examData?.questions?.length === 7) {
        handlePreviewButton();
      }
    }
    role === "student" &&
      examData &&
      localStorage.setItem("allData", JSON.stringify(examData));
  };

  const handlePreviewButton = () => {
    id !== undefined && localStorage.setItem("id", id);
    navigate("/previewData", {
      state: {
        editData: data !== undefined ? examData : examForm,
        title: title ? title : "Create Exam",
      },
    });
  };

  return (
    <div className="container">
      <h1>{title ? title : "Create Exam"}</h1>

      <div className="m-2">
        <h3>Question {currentQuestionIndex + 1}</h3>
        <div>
          <ReusableForm
            field={role === "student" ? giveExamFields : CreateExamField}
            Data={examForm}
            error={error}
            onChange={handleChange}
            currentQuestionIndex={currentQuestionIndex}
            onblur={handleDuplicateObject}
          />
        </div>
      </div>

      <div className="row">
        {currentQuestionIndex < 15 ? (
          role != "student" ? (
            <>
              <Button clickHandler={clearData}>Clear</Button>
            </>
          ) : null
        ) : null}
        <Button
          clickHandler={handlePreviousButton}
          disabled={currentQuestionIndex <= 0}
        >
          Pre
        </Button>
        {data != undefined ? (
          role !== "student" ? (
            <>
              <Button
                clickHandler={handlePreValueUpdate}
                disabled={questions.length > 15 || loadingData}
              >
                {currentQuestionIndex != 14 ? "Next" : "Preview"}
              </Button>
            </>
          ) : (
            <>
              <Button
                clickHandler={handleSkipButton}
                disabled={
                  currentQuestionIndex + 1 > examData?.questions?.length
                }
              >
                Skip
              </Button>
              <Button
                clickHandler={handlePreValueUpdate}
                disabled={loadingData}
              >
                {currentQuestionIndex != 6 ? "Next" : "Preview"}
              </Button>
            </>
          )
        ) : (
          <Button
            clickHandler={
              questions.length > currentQuestionIndex
                ? handlePreValueUpdate
                : handleNextButton
            }
            disabled={questions.length > 15 || loading}
          >
            {currentQuestionIndex != 14 ? "Next" : "Preview"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default React.memo(CreateExam);
