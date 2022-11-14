import React, { memo } from "react";
import CreateExam from "./CreateExam";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import viewExamDetail from "../../redux/action/ViewExamDetailAction";
import viewExam from "../../redux/action/ViewExamAction";

const EditExam = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const viewExamDetailData = useSelector(
    ({ viewExamDetail }) => viewExamDetail.data
  );

  const viewExamData = useSelector(({ viewExam }) => viewExam.allExam);
  let index = viewExamData.findIndex((x) => x._id == id);

  const data = {
    subjectName: viewExamData[index]?.subjectName,
    questions: viewExamDetailData?.questions,
    notes: viewExamData[index]?.notes,
  };

  useEffect(() => {
    dispatch(viewExamDetail(id));
    dispatch(viewExam());
  }, [dispatch]);

  return <CreateExam data={data} title="Edit Exam" id={id} />;
};

export default React.memo(EditExam);
