import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import viewStudentDetail from "../../redux/action/ViewStudentDetailAction";

const ViewStudentDetail = () => {
  const dispatch = useDispatch();
  const {id} = useParams();
  console.log(id)

  useEffect(() => {
    dispatch(viewStudentDetail(id));
  }, []);

  const data = useSelector((state) => state.viewStudentDetail.allStudent);
  return (
    <div className="container mt-3" style={{ width: "800px" }}>
      <h1>Studednt Detail</h1>
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
                  {/* <td><Button clickHandler={viewStudentDetail(_id)}>Show</Button></td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewStudentDetail;
