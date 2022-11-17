import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const TableReusable = ({ header, data }) => {
  const headerArr = ["View Detail", "Edit", "Delete", "Detail", "Give Exam"];
  return (
    <>
      <table className="table table-striped table-hover ">
        <thead>
          <tr>
            {header.map((v, i) => {
              return (
                <th scope="col" key={i}>
                  {v.heading}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data?.map((value, index) => {
            let subjectIndex = data?.findIndex((x) => x._id == value._id);
            return (
              <tr key={index}>
                {header.map((v, i) => {
                  if (v.heading === "No.") {
                    return <td key={i}>{index + 1}</td>;
                  }
                  if (headerArr.includes(v.heading)) {
                    return (
                      <td key={i}>
                        {v.path && (value.id || value?._id) ? (
                          <Link
                            to={`${v.path}/${
                              value?._id ? value?._id : value.id
                            }`}
                            state={{
                              subjectName: data[subjectIndex]?.subjectName,
                            }}
                            className="btn btn-primary"
                          >
                            {v.heading}
                          </Link>
                        ) : (
                          <Button
                            clickHandler={() => v?.onClick(value?._id)}
                            className={v.className}
                          >
                            {v.heading}
                          </Button>
                        )}
                      </td>
                    );
                  } else {
                    if (v?.heading === "Notes") {
                      return (
                        <td>
                          {value.notes.map((item, ii) => {
                            return <tr key={ii}>{item}</tr>;
                          })}
                        </td>
                      );
                    } else if (v?.heading === "Result") {
                     return <td>
                        {value?.Result?.map((v, i) => {
                          return <tr key={i}>{v?.resultStatus}</tr>;
                        })}
                      </td>;
                    } else {
                      return <td key={i}>{value[v.value]}</td>;
                    }
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default TableReusable;
