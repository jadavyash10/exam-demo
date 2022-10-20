import React from "react";

const Radio = (props) => {
  const { label, type, id, name, onChange, error, ...inputpprops } =
    props;
  return (
    <div className="col-1">
      <input
        className={type === "radio" ? `form-check-input m-1` : `form-control`}
        id={id}
        name={name}
        type={type}
        onChange={onChange}
        {...inputpprops}
      />
      <label className="form-label">{label}</label>
    </div>
  );
};

export default Radio;
