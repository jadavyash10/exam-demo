import React, { memo } from "react";
import CreateExam from "./CreateExam";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import viewExamDetail from "../../redux/action/ViewExamDetailAction";
import viewExam from "../../redux/action/ViewExamAction";
import Loader from "../../reusable/Loader";
import HelmetComp from "../../reusable/HelmetComp";

const EditExam = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const viewExamDetailData = useSelector(
    ({ viewExamDetail }) => viewExamDetail.data
  );
  const loading1 = useSelector(({ viewExamDetail }) => viewExamDetail.loading);
  const { allExam, loading } = useSelector(({ viewExam }) => viewExam);
  const editExamLoading = useSelector((state) => state.EditExam.loading);

  let index = allExam.findIndex((x) => x._id == id);

  const data = {
    subjectName: allExam[index]?.subjectName,
    questions: viewExamDetailData?.questions,
    notes: allExam[index]?.notes,
  };

  useEffect(() => {
    dispatch(viewExamDetail(id));
    dispatch(viewExam());
  }, [dispatch]);

  return (
    <div>
      <HelmetComp title="Edit Exam" />
      {loading && loading1 ? (
        <Loader />
      ) : (
        <CreateExam
          data={data}
          title="Edit Exam"
          id={id}
          loadingData={editExamLoading}
        />
      )}
    </div>
  );
};

export default memo(EditExam);
