const Button = ({ clickHandler, children ,...input}) => {
  return (
    <div className="col-1">
      <button type="button" className='btn btn-primary' onClick={clickHandler} {...input}>{children}</button>
    </div>
  );
};

export default Button;
