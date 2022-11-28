import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import showVerifiedStudentData from "../../redux/action/verifiedStudentDataAction";
import viewStudentDetail from "../../redux/action/ViewStudentDetailAction";
import Button from "../../reusable/Button";
import { Link } from "react-router-dom";
import Table from "../../reusable/Table";
import Loader from "../../reusable/Loader";
import TableReusable from "../../reusable/TableReusable";
import HelmetComp from '../../reusable/HelmetComp';

const VerifiedStudentData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showVerifiedStudentData());
  }, []);

  const { allStudent, loading } = useSelector(
    (state) => state.verifiedStudentData
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
      <HelmetComp title="Verified Student Data" />
      <h1> Verified Student Data</h1>
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

export default memo(VerifiedStudentData);
