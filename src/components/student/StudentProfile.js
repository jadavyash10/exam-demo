import React, { memo, useEffect, useState } from "react";
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
import Validation from "../Validation";
import HelmetComp from '../../reusable/HelmetComp';

const StudentProfile = () => {
  const [name, setName] = useState({ name: "" });
  const [error, setError] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(stuDataReq());
  }, []);

  const stuData = useSelector(({ getStuProfile }) => getStuProfile.data);
  const loading = useSelector(({ getStuProfile }) => getStuProfile.loading);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const temp = [...stuData];
    temp[0] = {
      ...temp[0],
      [e.target.name]: e.target.value,
    };
    setError({ [name]: Validation(name, value) });
    dispatch(StudentProfileOnchange(temp));
  };
  const handleSubmit = () => {
    if (Object.values(error).every((v) => v)) {
      return;
    }
    dispatch(stuDataEdit({ name: stuData[0].name }, navigate));
  };

  const buttonArr = [{ children: "Submit", onClick: handleSubmit }];

  return (
    <div className="container">
      <HelmetComp title="Student Profile" />
      <h1>Student Profile</h1>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <ReusableForm
            field={StudentProfileFields}
            Data={stuData}
            error={error}
            onChange={handleChange}
            buttonArr={buttonArr}
          />
        </div>
      )}
    </div>
  );
};

export default memo(StudentProfile);
