import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import showStudentDatass from "../../redux/action/ShowStudentDataAction";
import Table from "../../reusable/Table";
import Loader from '../../reusable/Loader';

const TeacherDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showStudentDatass());
  }, []);

  const { allStudent, loading, message } = useSelector(
    (state) => state.showStudentData
  );
  console.log(loading);
  return (
    <div className="container mt-3" style={{ width: "800px" }}>
      <h1>Student Data</h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="">
            <Table
              th={["No.", "Name", "Email", "Status", "Show"]}
              tableData={allStudent}
              show={true}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default TeacherDashboard;
