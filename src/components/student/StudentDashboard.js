import React, { useState } from "react";
import getAllExams from "../../redux/action/GetAllExamAction";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../../reusable/Loader";
import ModalComp from "../../reusable/ModalComp";
import Button from "../../reusable/Button";
import GiveExam from "./GiveExam";
import TableReusable from "../../reusable/TableReusable";

const StudentDashboard = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState();
  const dispatch = useDispatch();

  const { allExamData, loading } = useSelector(({ getStuExam }) => getStuExam);

  useEffect(() => {
    dispatch(getAllExams());
  }, [dispatch]);

  const handleModalClick = (id) => {
    setModalShow(true);
    let i = allExamData.findIndex((x) => x._id == id);
    setModalData(allExamData[i]);
  };

  const column = [
    { heading: "No." },
    { heading: "SubjectName", value: "subjectName" },
    { heading: "Email", value: "email" },
    { heading: "Result", value: "Result" },
    { heading: "Notes", value: "notes" },
    { heading: "Detail", onClick: handleModalClick },
    { heading: "Give Exam", path: `/GetExamPaper` },
  ];

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <h1>All Exams</h1>
          <div>
            <TableReusable header={column} data={allExamData} />
          </div>
          {/* <div className="row">
            <div className="col-10">
              <table className="table table-striped table-hover ">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>subjectName</th>
                    <th>email</th>
                    <th>Result</th>
                    <th>notes</th>
                    <th>Detail</th>
                    <th>GiveExam</th>
                  </tr>
                </thead>
                <tbody>
                  {allExamData.map((value, index) => {
                    let i = allExamData.findIndex((x) => x._id == value._id);
                    return (
                      <tr key={index} rowSpan="2">
                        <th>{index + 1}</th>
                        <td>{value.subjectName}</td>
                        <td>{value.email}</td>
                        <td>
                          {value?.Result?.map((v, i) => {
                            return <tr key={i}>{v?.resultStatus}</tr>;
                          })}
                        </td>
                        <td>
                          {value.notes.map((v, i) => {
                            return <tr key={i}>{v}</tr>;
                          })}
                        </td>
                        <td>
                          <>
                            <Button onClick={() => handleModalClick(value._id)}>
                              Detail
                            </Button>
                          </>
                        </td>
                        <td>
                          <Link
                            to={`/GetExamPaper/${value._id}`}
                            state={{
                              subjectName: allExamData[i].subjectName,
                            }}
                          >
                            Give Exam
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div> */}
          {modalShow ? (
            <ModalComp
              show={modalShow}
              onHide={() => setModalShow(false)}
              data={modalData}
            />
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
