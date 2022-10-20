import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import showStudentDatass from "../../redux/action/ShowStudentDataAction";
import showStudentData from "../../redux/action/ShowStudentDataAction";
import { axiosApi } from "../axios";
import Button from "../../reusable/Button";
import viewStudentDetail from "../../redux/action/ViewStudentDetailAction";
import { Link } from "react-router-dom";
import Table from "../../reusable/Table";

const TeacherDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showStudentDatass());
  }, []);

  const StudentData = useSelector((state) => state.showStudentData.allStudent);
  return (
    <div className="container mt-3" style={{ width: "800px" }}>
      <h1>Student Data</h1>
      <div className="">
        <Table
          th={["No.", "Name", "Email", "Status", "Show"]}
          tableData={StudentData}
          show={true}
        />
      </div>
    </div>
  );
};

export default TeacherDashboard;
