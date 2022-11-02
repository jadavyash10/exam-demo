import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { isTeacher, reset, resetAll } from "../../Utils/function";
import createExamFields from "../../Constants/CreateExamFields";
import DemoButton from "../ReusableComponents/DemoButton";
import Loading from "../ReusableComponents/Loading";

import { createExamRequest } from "../../Redux/action/createExam";
import { useState } from "react";
import validation from "../validation";
import { editExamData } from "../../Redux/action/editExam";
import {
  ExamDetailClear,
  ExamDetailRequest,
} from "../../Redux/action/viewExamDetail";

const initialData = {
  subjectName: "",
  questions: [],
  notes: [],
};

const CreateExam = ({ isEdit }) => {
  const location = useLocation();
  const search = location.search;
  const myData = location.state;
  const id = new URLSearchParams(search).get("id");
  const [data, setData] = useState(initialData);
  const [index, setIndex] = useState(1);
  const [formValues, setFormValues] = useState({});
  const [formerror, setFormerror] = useState({});
  const [cloneData, setCloneData] = useState({});
  const [btnValue, setBtnValue] = useState("Next");
  const naviget = useNavigate();
  const loading = useSelector((state) => state.examDetailReducer.loading);
  const examDetail = useSelector((state) => state.examDetailReducer.examDetail);
  const exasmDetailState = useSelector((state) => state.examDetailReducer);

  const exasmDetail = exasmDetailState.examDetail;

  useEffect(() => {
    isTeacher();
    if (isEdit) {
      dispatch(ExamDetailRequest(id));
    }
    createExamFields.map((data) =>
      setFormValues((prv) => ({ ...prv, [data.name]: "" }))
    );

    return () => {
      console.log("data :>> ", data);
      setData(
        ((data.subjectName = ""), (data.questions = []), (data.notes = []))
      );
      console.log("data :>> ", data);
      dispatch(ExamDetailClear());
      // setData({});
      // console.log("data :>> ", data);
    };
  }, []);

  useEffect(() => {
    if (isEdit) {
      if (examDetail?.questions?.length) {
        editValue(index - 1);
      }
    }
  }, [examDetail]);

  useEffect(() => {
    if (Object.keys(cloneData || {})?.length) {
      setFormValues(cloneData);
    }
  }, [cloneData]);

  const dispatch = useDispatch();

  const handalSubmit = (e) => {
    console.log("rweaulbgrfviuybefbiubvferbgvergvre :>> ");
    let error = {};
    e.preventDefault();
    Object.entries(formValues).forEach(([key, value]) => {
      const newError = validation(key, value);
      if (newError) error[key] = newError;
    });
    if (Object.entries(error).length) {
      setFormerror(error);
      return;
    } else {
      data.subjectName = formValues.subjectName || data.subjectName;

      data.questions[index - 1] = {
        question: formValues.question,
        answer: formValues.answer,
        options: [
          formValues.option1,
          formValues.option2,
          formValues.option3,
          formValues.option4,
        ],
      };
      data.notes[index - 1] = formValues.notes;

      if (index < 15) {
        if (isEdit) {
          editValue(index);
        } else if (!isEdit) {
          setFormValues(reset(formValues));
        }
        setBtnValue("Next");
        setIndex(index + 1);
      } else if ((index) => 15) {
        console.log("data.questions", data.questions.length);
        console.log("initialData.questions :>> ", initialData.questions.length);
        if (isEdit) {
          console.log("data :>> ", data);
          dispatch(editExamData(id, data, naviget));
        } else if (!isEdit) {
          dispatch(createExamRequest(initialData, naviget));
          console.log("api caling from heare");
        }
      }
    }
    console.log("initialData", data);
    console.log("cloneData :>> ", cloneData);
    console.log("location :>> ", location);
    console.log(" examDetail:>> ", examDetail);
  };

  const editValue = (number) => {
    let cloneData1 = {};
    Object.entries(data.questions[number] || {}).map(([key, value]) => {
      switch (key) {
        case "subjectName":
          cloneData1.subjectName = value || "";
          break;
        case "options":
          cloneData1.option1 = value[0];
          cloneData1.option2 = value[1];
          cloneData1.option3 = value[2];
          cloneData1.option4 = value[3];
          break;
        case "question":
          cloneData1.question = value || "";
          break;
        case "answer":
          cloneData1.answer = value || "";
          break;
        default:
          break;
      }
    });
    setCloneData({ ...cloneData1, notes: data.notes[number] });
  };

  const handleChange = (e) => {
    if (isEdit) {
      setBtnValue("Update");
    }
    const newError = validation(e.target.name, e.target.value);
    setFormerror({ ...formerror, [e.target.name]: newError });
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  function btnClickPrevious() {
    editValue(index - 2);
    setIndex(index - 1);
  }
  function btnClickNext() {
    if (data.questions.length - 1 <= index) {
      setFormValues(reset(formValues));
    }
    editValue(index);
    setIndex(index + 1);
  }

  if (isEdit) {
    data.notes = myData.notes;
    data.subjectName = myData.subjectName;

    data.questions = exasmDetail.questions || "";

    formValues.subjectName = data.subjectName;
  }

  console.log("data", data);
  console.log("formValues", formValues);
  // console.log("location", location.state);

  return (
    <div>
      <div className="container my-3">
        <div className="container">
          {isEdit && loading ? (
            <Loading></Loading>
          ) : (
            <form onSubmit={handalSubmit}>
              <h2> Question No : {index}</h2>
              {createExamFields.map((data, i) => {
                return (
                  <div key={i}>
                    {(() => {
                      switch (data.type) {
                        case "radio":
                          return (
                            <div>
                              {data.value.map((ele, i) => {
                                return (
                                  <div
                                    className="my-3"
                                    style={{ display: "flex" }}
                                    key={i}
                                  >
                                    <input
                                      className="form-check-input mx-3"
                                      type="radio"
                                      name={data.name}
                                      onChange={handleChange}
                                      value={
                                        typeof ele === "string"
                                          ? ele
                                          : formValues[ele.name]
                                      }
                                      checked={
                                        formValues[ele.name] &&
                                        formValues[ele.name] ===
                                          formValues.answer
                                      }
                                    />
                                    {data.name !== "answer" ? (
                                      <p style={{ color: "red" }}>
                                        {formerror[data.name]}
                                      </p>
                                    ) : null}
                                    {typeof ele === "string" ? (
                                      <label>{ele}</label>
                                    ) : (
                                      <>
                                        <div className="mb-3 ">
                                          <input
                                            className="form-control"
                                            type={ele.type}
                                            name={ele.name}
                                            value={formValues[ele.name] || ""}
                                            placeholder={ele.placeholder}
                                            onChange={handleChange}
                                          />
                                        </div>
                                      </>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          );
                        // case "dropdown":
                        //   return (
                        //     <div>
                        //       <div className="mb-3">
                        //         <select
                        //           onChange={handleChange}
                        //           name={data.name}
                        //           value={formValues[data.name]}
                        //           className="form-select"
                        //         >
                        //           <option value="">Select Subject</option>
                        //           {data.options.map((option, index) => {
                        //             return <option key={index}>{option}</option>;
                        //           })}
                        //         </select>
                        //       </div>
                        //     </div>
                        //   );
                        default:
                          return (
                            <div>
                              <div>
                                <div className="mb-3">
                                  <input
                                    className="form-control"
                                    label={data.label}
                                    disabled={data?.disabled}
                                    value={formValues[data.name]}
                                    type={data.type}
                                    name={data.name}
                                    placeholder={data.placeholder}
                                    onChange={handleChange}
                                  />
                                  <p style={{ color: "red" }}>
                                    {formerror[data.name]}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                      }
                    })()}
                  </div>
                );
              })}
              <DemoButton
                onClick={btnClickPrevious}
                disabled={index > 1 ? false : true}
                type={"button"}
              >
                Previous
              </DemoButton>

              {isEdit ? null : (
                <DemoButton
                  disabled={index < data.questions.length > 0 ? false : true}
                  onClick={btnClickNext}
                  type={"button"}
                >
                  Next
                </DemoButton>
              )}

              {/* <DemoButton type={"submit"}>Upsdgfdsgdfsdfgdate</DemoButton> */}

              <DemoButton type={"submit"}>
                {isEdit
                  ? btnValue
                  : data.questions.length === 14
                  ? "Create Exam"
                  : "Add Question"}
              </DemoButton>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateExam;
