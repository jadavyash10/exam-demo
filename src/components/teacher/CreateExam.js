import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateExamField from "../../utils/CreateExamField";
import Button from "../../reusable/Button";
import DropDown from "../../reusable/DropDown";
import Validation from "../Validation";
import Input from "../../reusable/Input";
import { errorValidate, reset, xyz } from "../../utils/Function";
import { createExamSubmit } from "../../redux/action/CreateExamAction";
import { useNavigate, useParams } from "react-router-dom";
import viewExamDetail from "../../redux/action/ViewExamDetailAction";

const CreateExam = () => {
  const initialState = {
    subjectName: "",
    questions: [],
    notes: [],
  };
  const state = {
    question: "",
    answer: "",
    ans1: "",
    ans2: "",
    ans3: "",
    ans4: "",
    note: "",
  };
  const [examForm, setExamForm] = useState(initialState);
  const [fields, setFields] = useState(state);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState({});
  const [preShow, setPreShow] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const viewExamData = useSelector(({ viewExamDetail }) => viewExamDetail.data);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(viewExamDetail(id));
    }
  }, []);

  useEffect(() => {
    setExamForm(initialState);
  }, []);


  const { subjectName, notes, questions } = examForm;
  const obj = {
    question: fields.question,
    answer: fields?.answer,
    options: [fields.ans1, fields.ans2, fields.ans3, fields.ans4],
  };

  const handleSubjectNameChange = (e) => {
    setExamForm({ ...examForm, [e.target.name]: e.target.value });

    setError({
      ...error,
      [e.target.name]: Validation(e.target.name, e.target.value),
    });
  };

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
    setError({
      ...error,
      [e.target.name]: Validation(e.target.name, e.target.value),
    });
  };

  const handleAddItems = () => {
    let cloneQuestions = [...questions];
    const cloneNotes = [...notes];
    cloneQuestions.push(obj);
    if (!fields.note == "" && notes.length < 2) {
      cloneNotes.push(fields.note);
    }
    setExamForm({
      ...examForm,
      questions: cloneQuestions,
      notes: cloneNotes,
    });
    setFields(reset(fields));
  };

  const handlePreviousValue = (id) => {
    const res = questions[id];
    const obj = {
      question: res?.question,
      answer: res?.answer,
      ans1: res?.options[0],
      ans2: res?.options[1],
      ans3: res?.options[2],
      ans4: res?.options[3],
      note: notes[id],
    };
    setFields({ ...fields, ...obj });
  };

  const handlePrevious = () => {
    setIndex(index - 1);
    setPreShow(true);
    handlePreviousValue(index - 1);
  };

  const handleNext = () => {
    if (Object.entries(errorValidate(fields)).length) {
      setError(errorValidate(fields));
      return;
    }
    handleAddItems();
    setIndex(index + 1);
  };

  const handleUpdate = () => {
    if (Object.entries(errorValidate(fields)).length) {
      setError(errorValidate(fields));
      return;
    }
    questions.splice(index, 1, obj);
    notes.splice(index, 1, fields.note);
    setExamForm({ ...examForm, questions: [...questions], notes: [...notes] });
    setIndex(index + 1);
    setFields(reset(fields));
    questions.length > index + 1
      ? handlePreviousValue(index + 1)
      : setPreShow(false);
  };

  const handleSubmit = () => {
    const error = xyz(examForm);
    if (Object.entries(error).length) {
      setError(error);
      return;
    }
    console.log("error", error);
    dispatch(createExamSubmit(examForm, navigate));
  };
  console.log("examForm", examForm);

  return (
    <div className="container">
      <h1>Create Exam</h1>

      <div className="m-2">
        <h3>Question {index + 1}</h3>
        <div>
          <form id="form">
            {CreateExamField?.map((v, i) => {
              {
                switch (v.type) {
                  case "text":
                    return (
                      <div>
                        <Input
                          label={v.name}
                          type={v.type}
                          id={v.id}
                          name={v.name}
                          value={fields[v.name] || ""}
                          {...v}
                          onChange={handleChange}
                          error={error}
                        />
                      </div>
                    );

                  case "radio":
                    return (
                      <div>
                        {v?.value?.map((value, index) => {
                          if (v.type === "radio") {
                            return (
                              <div>
                                <input
                                  type="radio"
                                  id={value.id}
                                  name={v.name}
                                  value={fields[value.name]}
                                  checked={
                                    fields[value.name] &&
                                    fields[value.name] === fields.answer
                                  }
                                  onChange={handleChange}
                                />
                                <input
                                  type="text"
                                  id={value.id}
                                  className="demo"
                                  name={value.name}
                                  value={fields[value.name]}
                                  onChange={handleChange}
                                />
                                {error && error[value.name] && (
                                  <span style={{ color: "red" }}>
                                    {error[value.name]}
                                  </span>
                                )}
                              </div>
                            );
                          }
                        })}
                      </div>
                    );
                  case "select":
                    return (
                      <DropDown
                        defaultValue={subjectName}
                        name="subjectName"
                        optionField={v.subjectNameField}
                        label={v.label}
                        onChange={handleSubjectNameChange}
                        error={error}
                      />
                    );
                }
              }
            })}
          </form>
        </div>
      </div>
      <div>
        {Object.keys(examForm).map((value, i) => {
          return (
            error[value] && <span style={{ color: "red" }}>{error[value]}</span>
          );
        })}
      </div>
      <div className="row">
        <Button clickHandler={handlePrevious} disabled={index <= 0}>
          Pre
        </Button>
        <Button clickHandler={() => setFields(reset(fields))}>Clear</Button>
        {id ? (
          <Button clickHandler={handleSubmit} disabled={index < 15 && !preShow}>
            Submit
          </Button>
        ) : (
          <Button clickHandler={handleSubmit} disabled={index < 15 && !preShow}>
            Submit
          </Button>
        )}

        {!preShow ? (
          <Button clickHandler={handleNext} disabled={index >= 15}>
            Next
          </Button>
        ) : (
          <Button disabled={index >= 15} clickHandler={handleUpdate}>
            Update
          </Button>
        )}
      </div>
    </div>
  );
};

export default CreateExam;
