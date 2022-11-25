import React from "react";
import { useLocation, useParams } from "react-router-dom";
import CreateExam from "./CreateExam";

const EditPreviewData = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const data = state?.data;
  const title = state?.title;

  return (
    <div className="container">
      <div>
        <CreateExam data={data} index={+id} title={title} />
      </div>
    </div>
  );
};

export default EditPreviewData;
