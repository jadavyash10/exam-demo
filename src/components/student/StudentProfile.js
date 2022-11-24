import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  stuDataEdit,
  stuDataReq,
  StudentProfileOnchange,
} from "../../redux/action/StudentProfileAction";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../reusable/Loader";
import TableReusable from "../../reusable/TableReusable";
import { StudentProfileFields } from "../../utils/StudentProfileFields";
import ReusableForm from "../../reusable/ReusableForm";

const StudentProfile = () => {
  const [name, setName] = useState({ name: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(stuDataReq());
  }, []);

  const stuData = useSelector(({ getStuProfile }) => getStuProfile.data);
  const loading = useSelector(({ getStuProfile }) => getStuProfile.loading);

  const handleChange = (e) => {
    const temp = [...stuData];
    temp[0] = {
      ...temp[0],
      [e.target.name]: e.target.value,
    };
    dispatch(StudentProfileOnchange(temp));
  };

  const handleSubmit = () => {
    dispatch(stuDataEdit({ name: stuData[0].name }, navigate));
  };

  const buttonArr = [{ children: "Login", onClick: handleSubmit }];

  return (
    <div className="container">
      <h1>Student Profile</h1>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <ReusableForm
            field={StudentProfileFields}
            Data={stuData}
            error={name.error}
            onChange={handleChange}
            buttonArr={buttonArr}
          />
          {/* <TableReusable header={column} data={stuData} /> */}

          {/* <div className="row">
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
                    return (
                      <tr key={i}>
                        <th>{i + 1}</th>
                        <td>{value.name}</td>
                        <td>{value.email}</td>
                        <td>
                          <Link to={`/EditStuProfile/${value._id}`}>Edit</Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
