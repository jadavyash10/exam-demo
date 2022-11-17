import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import viewExam, { deleteExam } from "../../redux/action/ViewExamAction";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../reusable/Button";
import Loader from "../../reusable/Loader";
import TableReusable from "../../reusable/TableReusable";

const ViewExam = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewExam());
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteExam(id));
  };
  const { allExam, loading } = useSelector(({ viewExam }) => viewExam);

  const column = [
    { heading: "No." },
    { heading: "SubjectName", value: "subjectName" },
    { heading: "Email", value: "email" },
    { heading: "__V", value: "__v" },
    { heading: "Notes", value: "notes" },
    { heading: "Edit", path: `/EditExam` },
    { heading: "Delete", onClick: handleDelete ,className: " btn-danger"},
  ];

  return (
    <div className="container">
      <h1>View Exams</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="row">
          <div>
            <TableReusable header={column} data={allExam} />
          </div>
          {/* <div className="col-10">
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
                {allExam?.map((value, index) => {
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
          </div> */}
        </div>
      )}
    </div>
  );
};

export default React.memo(ViewExam);
