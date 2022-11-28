import React, { memo, useState } from "react";
import { stuDataEdit } from "../../redux/action/StudentProfileAction";
import Button from "../../reusable/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const EditStudentProfile = () => {
  const [name, setName] = useState({ name: "" });

  const handleChange = (e) => {
    setName({ name: e.target.value });
  };
  const handleSubmit = () => {
    dispatch(stuDataEdit(name, navigate));
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div>
      <div className="container">
        <div style={{ margin: "30px" }}>
          <h2>Edit Student Profile</h2>
        </div>
        <div className="row">
          <div className="col-10">
            <form>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                onChange={handleChange}
              ></input>
              <Button clickHandler={handleSubmit} name="name" value={name}>
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(EditStudentProfile);
