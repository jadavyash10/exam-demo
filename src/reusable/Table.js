import React from "react";
import { Link } from "react-router-dom";

const Table = ({ th, tableData ,show}) => {
  return (
    <>
      <table className="table table-striped table-hover ">
        <thead>
          <tr>
            {th.map((v, i) => {
              return (
                <th scope="col" key={i}>
                  {v}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {tableData?.map(({ _id, name, email, Result, status }, i) => {
            return (
              <tr key={_id}>
                <th scope="row">{i + 1}</th>
                <td>{name}</td>
                <td>{email}</td>
                {status ? (
                  <td
                    style={{ color: status === "Active" ? "green" : "orange" }}
                  >
                    {status}
                  </td>
                ) : null}
                {show ? (
                  <td>
                    <Link to={`/viewStudentDetail/${_id}`}>Show</Link>
                  </td>
                ) : null}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
