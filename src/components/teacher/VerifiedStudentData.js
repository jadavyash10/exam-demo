import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import showVerifiedStudentData from "../../redux/action/verifiedStudentDataAction";
import viewStudentDetail from "../../redux/action/ViewStudentDetailAction";
import Button from "../../reusable/Button";
import { Link } from "react-router-dom";
import Table from "../../reusable/Table";

const VerifiedStudentData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showVerifiedStudentData());
  }, []);

  const verifiedStudentData = useSelector(
    (state) => state.verifiedStudentData.allStudent
  );
  return (
    <div className="container mt-3" style={{ width: "800px" }}>
      <h1> Verified Student Data</h1>
      <div className="">
        <Table
          th={["No.", "Name", "Email", "Status", "Show"]}
          tableData={verifiedStudentData}
          show={true}
        />
      </div>
    </div>
  );
};

export default VerifiedStudentData;
