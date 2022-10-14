const Button = ({ clickHandler, children }) => {
  return (
    <div className="col-1">
      <button type="button" className='btn btn-primary' onClick={clickHandler}>{children}</button>
    </div>
  );
};

export default Button;
