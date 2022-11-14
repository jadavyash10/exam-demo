import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stuDataReq } from "../../redux/action/StudentProfileAction";
import { Link } from 'react-router-dom';

const StudentProfile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(stuDataReq());
  }, []);
  const stuData = useSelector(({ getStuProfile }) => getStuProfile.data);

  console.log("stuData", stuData);
  return (
    <div>
      <h1>Student Profile</h1>
      <div className="container">
        <div className="row">
          <div className="col-10">
            <table className="table table-striped table-hover ">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>email</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {stuData?.map((value, i) => {
                    console.log('value', value)
                 return <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{value.name}</td>
                    <td>{value.email}</td>
                    <td>
                      <Link to={`/EditStuProfile/${value._id}`}>Edit</Link>
                    </td>
                  </tr>;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
