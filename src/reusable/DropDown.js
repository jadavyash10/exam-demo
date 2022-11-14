import React from "react";

const DropDown = (props) => {
  const { value, name, optionField, label ,onChange ,error} = props;
  console.log(value)
  return (
    <div>
      <div>
        <label>{label}</label>
        <select value={value} name={name} onChange={onChange} >
          <option value="">select Subject Name</option>
          {optionField?.map((value, index) => {
            return (
              <option value={value} key={index}>
                {value}
              </option>
            );
          })}
        </select>
      </div>
      {error.subjectName && <small style={{ color: "red" }}>{error.subjectName}</small>}
    </div>
  );
};

export default DropDown;
