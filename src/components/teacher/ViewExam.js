import React, { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import viewExam, { deleteExam } from "../../redux/action/ViewExamAction";
import { useSelector } from "react-redux";
import Loader from "../../reusable/Loader";
import TableReusable from "../../reusable/TableReusable";
import HelmetComp from '../../reusable/HelmetComp';

const ViewExam = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewExam());
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteExam(id));
  };
  const { allExam, loading } = useSelector(({ viewExam }) => viewExam);

  const column = [
    { heading: "No." },
    { heading: "SubjectName", value: "subjectName" },
    { heading: "Email", value: "email" },
    { heading: "__V", value: "__v" },
    { heading: "Notes", value: "notes" },
    { heading: "Edit", path: `/EditExam` },
    { heading: "Delete", onClick: handleDelete, className: " btn-danger" },
  ];

  return (
    <div className="container">
      <HelmetComp title="View Exams" />
      <h1>View Exams</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="row">
          <div>
            <TableReusable header={column} data={allExam} />
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(ViewExam);
