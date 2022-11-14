import React from "react";
import getAllExams from "../../redux/action/GetAllExamAction";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const dispatch = useDispatch();

  const viewStuExamData = useSelector(
    ({ getStuExam }) => getStuExam.allExamData
  );

  useEffect(() => {
    dispatch(getAllExams());
  }, []);
  console.log(viewStuExamData);
  return (
    <div>
      <div className="container">
        <h1>All Exams</h1>
        <div className="row">
          <div className="col-10">
            <table className="table table-striped table-hover ">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>subjectName</th>
                  <th>email</th>
                  <th>Result</th>
                  <th>notes</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {viewStuExamData.map((value, index) => {
                  return (
                    <tr key={index} rowSpan="2">
                      <th>{index + 1}</th>
                      <td>{value.subjectName}</td>
                      <td>{value.email}</td>
                      {/* <td>{value.Result}</td> */}
                      <td>
                        {value.notes.map((v, i) => {
                          return <tr key={i}>{v}</tr>;
                        })}
                      </td>
                      <td>
                        <Link to={`student/giveExam?id=${value._id}`}>Give Exam</Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
