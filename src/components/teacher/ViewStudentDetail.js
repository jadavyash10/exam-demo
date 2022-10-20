import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import viewStudentDetail from "../../redux/action/ViewStudentDetailAction";
import Table from "../../reusable/Table";

const ViewStudentDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    dispatch(viewStudentDetail(id));
  }, []);

  const ViewStudentData = useSelector(
    (state) => state.viewStudentDetail.allStudent
  );
  return (
    <div className="container mt-3" style={{ width: "800px" }}>
      <h1>Student Detail</h1>
      <div className="container">
        <div>
          {ViewStudentData.map((v, i) => {
            return (
              <div key={id}>
                <h4>Name :{v.name}</h4>
                <p>Email : {v.email}</p>
                {v.Result.map((v, i) => {
                  return (
                    <div key={v.id}>
                      <p>Rank :{v.rank}</p>
                      <p>subjectName :{v.subjectName}</p>
                      <p>score :{v.score}</p>
                      <p>resultStatus :{v.resultStatus}</p>
                      <p>__v :{v.__v}</p>
                      <hr />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        {/* <Table th={["No.", "Name", "Email"]} tableData={ViewStudentData} /> */}
      </div>
    </div>
  );
};

export default ViewStudentDetail;
