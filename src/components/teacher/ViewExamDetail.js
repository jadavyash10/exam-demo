import React, { useEffect } from "react";
import viewExamDetail from "../../redux/action/ViewExamDetailAction";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ViewExamDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const viewExamData = useSelector(({ viewExamDetail }) => viewExamDetail.data);
  useEffect(() => {
    dispatch(viewExamDetail(id));
  }, []);
  console.log(viewExamData);
  return (
    <div className="container">
      <div className="row">
        <div className="col-10"></div>
      </div>
      <table className="table table-striped table-hover ">
        <thead>
          <tr>
            <th>id</th>
            <th>Question</th>
            <th>Answer</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {viewExamData?.questions?.map((v, index) => {
            return (
              <tr key={index} rowSpan="2">
                <th>{index + 1}</th>
                <td>{v.question}</td>
                <td>{v.answer}</td>
                <td>
                  {v?.options?.map((v, i) => {
                    return <tr key={i}>{v}</tr>;
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ViewExamDetail;
