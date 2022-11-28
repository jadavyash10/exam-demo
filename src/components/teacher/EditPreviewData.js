import React, { memo } from "react";
import { useLocation, useParams } from "react-router-dom";
import CreateExam from "./CreateExam";
import HelmetComp from '../../reusable/HelmetComp';

const EditPreviewData = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const data = state?.data;
  const title = state?.title;

  return (
    <div className="container">
      <HelmetComp title={title} />

      <div>
        <CreateExam data={data} index={+id} title={title} />
      </div>
    </div>
  );
};

export default memo(EditPreviewData);
