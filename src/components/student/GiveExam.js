import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import getExamPaper, {
  giveExam,
  giveExamOnChange,
} from "../../redux/action/ExamPaperAction";
import Loader from "../../reusable/Loader";
import CreateExam from "../teacher/CreateExam";

const GiveExam = () => {
  const { examPaper, giveExamQuestions, loading } = useSelector(
    ({ getExamPaper }) => getExamPaper
  );
  const dispatch = useDispatch();

  const { id } = useParams();
  let data = useLocation();
  const subName = data.state.subjectName;

  useEffect(() => {
    dispatch(getExamPaper(id));
  }, [dispatch]);

  let new_array = examPaper?.map(function (ele) {
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
      ) : (
        <CreateExam data={giveExamData} title="Give Exam" id={id} />
      )}
    </div>
  );
};

export default GiveExam;
