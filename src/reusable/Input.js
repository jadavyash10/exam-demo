import React from 'react'

const Input = (props) => {
    const { label,type, id, name, onChange, error, ...inputpprops } = props;
    return (
        <div className='col-4'>
            <label className='form-label'>{label}</label>
                <input
                className={type==='radio'?`form-check-input` : `form-control`}
                  id={id}
                  name={name}
                  type={type}
                  onChange={onChange}
                  {...inputpprops }
                />
                {error && <span style={{ color: "red" }}>{error[name]}</span>}
                <br />
            </div>
    )
}

export default Input