import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TableReusable from "./TableReusable";
import Button from "./Button";
import { editExamPut } from "../redux/action/EditExamAction";
import { giveExam } from "../redux/action/ExamPaperAction";
import { createExamSubmit } from "../redux/action/CreateExamAction";
import { useDispatch, useSelector } from "react-redux";

const Preview = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("currentQuestionIndex");
  }, []);
  const questions = state?.editData?.questions;
  const title = state?.title;
  const id = localStorage.getItem("id");
  const role = localStorage.getItem("role");

  const handleSubmit = () => {
    const giveExamData =
      role === "student" &&
      state?.editData?.questions?.map(({ options, _id, ...rest }) => {
        return rest;
      });

    const newArr = {
      subjectName: state?.editData?.subjectName,
      questions: state?.editData?.questions,
      notes: state?.editData?.notes,
    };

    role === "student"
      ? dispatch(giveExam(id, giveExamData, navigate))
      : id
      ? dispatch(editExamPut(id, state?.editData, navigate))
      : dispatch(createExamSubmit(newArr, navigate));
  };

  const handleEdit = (index) => {
    navigate(`/editPreviewData/${index}`, {
      state: {
        data: state?.editData,
        title: title,
      },
    });
  };

  const column = [
    { heading: "No." },
    { heading: "Question", value: "question" },
    { heading: "Answer", value: "answer" },
    { heading: "Options", value: "options" },
    { heading: "Edit", onClick: handleEdit },
  ];
  return (
    <div className="container">
      <h2>Preview All Questions for {state?.editData?.subjectName}</h2>
      <div>
        <TableReusable header={column} data={questions} />
      </div>
      <div>
        <Button clickHandler={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default Preview;
