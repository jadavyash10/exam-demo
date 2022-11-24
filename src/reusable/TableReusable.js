import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const TableReusable = ({ header, data }) => {
  const headerArr = ["View Detail", "Edit", "Delete", "Detail", "Give Exam"];
  const role = localStorage.getItem("role");
  return (
    <>
      <table className="table table-striped table-hover ">
        <thead>
          <tr>
            {header.map((v, i) => {
              return (
                <th scope="col" key={v.heading}>
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
                            onClick={(e) => {
                              if (
                                data[index]?.Result[0]?.resultStatus ===
                                "Declared"
                              ) {
                                e.preventDefault();
                              }
                            }}
                          >
                            {v.heading}
                          </Link>
                        ) : (
                          <Button
                            clickHandler={() => v?.onClick(value?._id)}
                            className={v.className}
                            disabled={
                             role != "teacher" && data?.[index]?.Result[0]?.resultStatus !==
                              "Declared"
                                ? true
                                : false
                            }
                          >
                            {v.heading}
                          </Button>
                        )}
                      </td>
                    );
                  } else {
                    if (v?.heading === "Notes") {
                      return (
                        <td key={i}>
                          {value.notes.map((item, ii) => {
                            return <p key={ii}>{item}</p>;
                          })}
                        </td>
                      );
                    } else if (v?.heading === "Result") {
                      return (
                        <td key={i}>
                          {value?.Result?.map((v, i) => {
                            return <p key={i}>{v?.resultStatus}</p>;
                          })}
                        </td>
                      );
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
