import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import Loader from "../../reusable/Loader";
import CreateExam from "../teacher/CreateExam";
import getExamPaper from "../../redux/action/ExamPaperAction";

const GiveExam = () => {
  const { examPaper, giveExamQuestions, loading, error, giveExamLoading } =
    useSelector(({ getExamPaper }) => getExamPaper);
  const dispatch = useDispatch();

  const { id } = useParams();
  const { state } = useLocation();
  const subName = state?.subjectName;

  useEffect(() => {
    let allData = JSON.parse(localStorage.getItem("allData"));
    !allData && dispatch(getExamPaper(id));
    id !== undefined && localStorage.setItem("id", id);
  }, [dispatch]);

  let new_array = examPaper.map(function (ele) {
    return { ...ele, answer: "" };
  });

  const giveExamData = {
    subjectName: subName !== undefined ? subName : "",
    questions: new_array,
  };
  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <CreateExam
          data={giveExamData}
          title="Give Exam"
          id={id}
          loadingData={giveExamLoading}
        />
      )}
    </div>
  );
};

export default GiveExam;
