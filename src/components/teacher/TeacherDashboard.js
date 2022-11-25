import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import showStudentDatass from "../../redux/action/ShowStudentDataAction";
import Table from "../../reusable/Table";
import Loader from "../../reusable/Loader";
import TableReusable from "../../reusable/TableReusable";

const TeacherDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showStudentDatass());
  }, []);

  const { allStudent, loading, message } = useSelector(
    (state) => state.showStudentData
  );

  const column = [
    { heading: "No." },
    { heading: "Name", value: "name" },
    { heading: "Email", value: "email" },
    { heading: "Status", value: "status" },
    { heading: "Id", value: "_id" },
    { heading: "View Detail", path: `/viewStudentDetail` },
  ];

  return (
    <div className="container mt-3">
      <h1>Student Data</h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>
            <TableReusable header={column} data={allStudent} />
          </div>
        </>
      )}
    </div>
  );
};

export default TeacherDashboard;
