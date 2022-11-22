import React, { useEffect, useState } from "react";

const DemoForm = () => {
  const initialState = {
    subjectName: "",
    questions: [
      {
        question: "",
        answer: "",
        options: new Array(4).fill(""),
      },
    ],
    notes: [""],
  };
  const [data, setData] = useState(initialState);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState();
  let obj = data?.questions?.[index];
  useEffect(() => {
    setData(initialState);
  }, []);

  const handleDuplicateObject = (arr) => {
    let result = arr.some((element, i) => {
      return arr.indexOf(element) !== i;
    });
    return result;
  };

  const handleDuplicateQuestion = (arr, question) => {
    const i = arr.findIndex(
      (value, i) => value.question.trim() === question.trim()
    );
    if (i != -1) {
      if (i == index) {
        return;
      } else {
        return true;
      }
    }
  };

  const handleChange = (e) => {
    
    const { name, value } = e.target;
    const temp = { ...data };
    if (name === "subjectName") {
      temp.subjectName = value;
    }
    if (name === "question") {
      temp.questions[index].question = value;
    }
    if (name === "answer") {
      temp.questions[index].answer = value;
    }
    const optionsIndex = +name[name.length - 1];
    if (
      name === "option0" ||
      name === "option1" ||
      name === "option2" ||
      name === "option3"
    ) {
      temp.questions[index].options = Object.assign(
        [...temp?.questions[index]?.options],
        { [optionsIndex]: value }
      );
    }
    if (name === "note") {
      if (value) {
        if (value !== undefined) {
          temp.notes[index] = value;
        }
      }
    }
    setData(temp);
  };

  const clearField = () => {
    const tempData = { ...data };
    tempData.questions[index] = {
      question: "",
      answer: "",
      options: new Array(4).fill(""),
    };
    setData(tempData);
  };

  console.log("data", data);

  const handleNext = (e) => {
    if (handleDuplicateQuestion(data?.questions, obj.question)) {
      alert("Question Are Repeated ");
      return;
    }
    if (handleDuplicateObject(obj?.options)) {
      alert("Options Are Repeated ");
      return;
    }

    if (data.questions[index + 1] == undefined) {
      setData({
        ...data,
        questions: [
          ...data.questions,
          {
            question: "",
            answer: "",
            options: new Array(4).fill(""),
          },
        ],
      });
    }
    setIndex(index + 1);
  };

  const handlePrevious = (e) => {
    setIndex(index - 1);
  };
  return (
    <div className="container">
      <h2>Question {index + 1} </h2>
      <div>
        <form>
          <div>
            <label htmlFor="subjectName">Subject Name</label>
            <input
              type="text"
              name="subjectName"
              placeholder="Subject Name"
              onChange={handleChange}
              value={data?.subjectName}
            />
          </div>
          <div>
            <label htmlFor="subjectName">Question</label>
            <input
              type="text"
              name="question"
              placeholder="question"
              onChange={handleChange}
              value={obj?.question}
            />
          </div>
          <div>
            <label htmlFor="subjectName">Answer</label>
            <input
              type="text"
              name="answer"
              placeholder="answer"
              onChange={handleChange}
              value={obj?.answer}
              disabled
            />
          </div>
          <div>
            <input
              type="radio"
              name="answer"
              onChange={handleChange}
              value={obj?.options?.[0]}
              checked={obj?.options?.[0] === obj?.answer}
            />
            <input
              type="text"
              name="option0"
              placeholder="option1"
              value={obj?.options?.[0]}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="radio"
              name="answer"
              onChange={handleChange}
              value={obj?.options?.[1]}
              checked={obj?.options?.[1] === obj?.answer}
            />
            <input
              type="text"
              name="option1"
              placeholder="option2"
              value={obj?.options?.[1]}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="radio"
              name="answer"
              onChange={handleChange}
              value={obj?.options?.[2]}
              checked={obj?.options?.[2] === obj?.answer}
            />
            <input
              type="text"
              name="option2"
              placeholder="option3"
              value={obj?.options?.[2]}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="radio"
              name="answer"
              onChange={handleChange}
              value={obj?.options?.[3]}
              checked={obj?.options?.[3] === obj?.answer}
            />
            <input
              type="text"
              name="option3"
              placeholder="option4"
              value={obj?.options?.[3]}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="note"
              placeholder="Notes"
              onChange={handleChange}
              value={data?.notes?.[index] || ""}
            />
          </div>
        </form>
        <div>
          <button onClick={clearField}>Clear</button>
          <button onClick={handlePrevious}>Prev</button>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default DemoForm;
