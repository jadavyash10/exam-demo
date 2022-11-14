import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import viewExam, { deleteExam } from "../../redux/action/ViewExamAction";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../reusable/Button";

const ViewExam = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(viewExam());
  },[]);
  
  const handleDelete = (id) => {
    dispatch(deleteExam(id));
  };
  const examData = useSelector(({ viewExam }) => viewExam.allExam);

  return (
    <div className="container">
      <h1>View Exams</h1>
      <div className="row">
        <div className="col-10">
          <table className="table table-striped table-hover ">
            <thead>
              <tr>
                <th>id</th>
                <th>subjectName</th>
                <th>email</th>
                <th>__v</th>
                <th>notes</th>
                <th>View</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {examData.map((value, index) => {
                return (
                  <tr key={index} rowSpan="2">
                    <th>{index + 1}</th>
                    <td>{value.subjectName}</td>
                    <td>{value.email}</td>
                    <td>{value.__v}</td>
                    <td>
                      {value.notes.map((v, i) => {
                        return <tr key={i}>{v}</tr>;
                      })}
                    </td>
                    <td>
                      <Link to={`/EditExam/${value._id}`}>View</Link>
                    </td>
                    <td>
                      <Button
                        clickHandler={() => handleDelete(value._id)}
                        className="btn-danger"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ViewExam);
