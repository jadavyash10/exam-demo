import React from "react";

const DropDown = (props) => {
  const { value, name, optionfield, label ,onChange ,error,key} = props;
  return (
    <div>
      <div>
        <label>{label}</label>
        <select value={value} name={name} onChange={onChange} {...props}>
          {value ?<option value={value}>{value}</option>:<option value="">select Subject Name</option>}
          { optionfield?.map((value, index) => {
            return (
              <option value={value} key={value}>
                {value}
              </option>
            );
          })}
        </select>
      </div>
      {error && error.subjectName && <small style={{ color: "red" }}>{error.subjectName}</small>}
    </div>
  );
};

export default DropDown;
