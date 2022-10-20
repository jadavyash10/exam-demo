export const subjectNameField = [
  "C",
  "C++",
  "Java",
  "Javascript",
  "Python",
  "Computer Networks",
  "Data Structure",
];

const CreateExamField = [
  {
    type: "text",
    name: "question",
    id: "question",
  },
  {
    type: "text",
    name: "answer",
    id: "answer",
    disabled: true,
  },
  {
    type: "radio",
    name: "answer",
    value: [
      {
        type: "text",
        name: "ans1",
        id: "ans1",
      },
      {
        type: "text",
        name: "ans2",
        id: "ans2",
      },
      {
        type: "text",
        name: "ans3",
        id: "ans3",
      },
      {
        type: "text",
        name: "ans4",
        id: "ans4",
      },
    ],
  },
];

export default CreateExamField;











