import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import showStudentDatass from "../../redux/action/ShowStudentDataAction";
import showStudentData from "../../redux/action/ShowStudentDataAction";
import { axiosApi } from "../axios";
import Button from "../../reusable/Button";
import viewStudentDetail from "../../redux/action/ViewStudentDetailAction";
import { Link } from 'react-router-dom';

const TeacherDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showStudentDatass());
  }, []);

  const data = useSelector((state) => state.showStudentData.allStudent);
  return (
    <div className="container mt-3" style={{ width: "800px" }}>
      <h1>Studednt Data</h1>
      <div className="">
        <table className="table table-striped table-hover ">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Status</th>
              <th scope="col">Show</th>
            </tr>
          </thead>
          <tbody>
            {data?.map(({ _id, name, email, Result, status }, i) => {
              return (
                <tr key={_id}>
                  <th scope="row">{i}</th>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td
                    style={{ color: status === "Active" ? "green" : "orange" }}
                  >
                    {status}
                  </td>
                  <td>
                  <Link to={`/viewStudentDetail/${_id}`}>Show</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherDashboard;
