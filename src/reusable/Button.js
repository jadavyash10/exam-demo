const Button = ({ clickHandler, children, className, ...input }) => {
  return (
    <div className="col-1">
      <button
        type="button"
        className={className ? `btn ${className}` : "btn btn-primary"}
        onClick={clickHandler}
        {...input}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
