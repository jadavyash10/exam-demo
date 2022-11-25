import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import viewStudentDetail from "../../redux/action/ViewStudentDetailAction";
import Loader from "../../reusable/Loader";
import TableReusable from "../../reusable/TableReusable";

const ViewStudentDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { allStudent, loading } = useSelector(
    (state) => state.viewStudentDetail
  );

  useEffect(() => {
    dispatch(viewStudentDetail(id));
  }, []);

  const column = [
    { heading: "No." },
    { heading: "SubjectName", value: "subjectName" },
    { heading: "Result Status", value: "resultStatus" },
    { heading: "Rank", value: "rank" },
    { heading: "Score", value: "score" },
    { heading: "__V", value: "__v" },
  ];

  return (
    <div className="container mt-3" style={{ width: "800px" }}>
      <h1>Student Detail</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <div>
            {allStudent?.map((v, i) => {
              return (
                <div key={id}>
                  <h4>Name :{v.name}</h4>
                  <p>Email : {v.email}</p>
                  <TableReusable header={column} data={v?.Result} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewStudentDetail;
