const CreateExamField = [
  {
    type: "select",
    label: "Subject Name:",
    id: "subjectName",
    subjectNameField: [
      "C",
      "C++",
      "Java",
      "Javascript",
      "Python",
      "Computer Networks",
      "Data Structure",
      "Angular",
      "Dbms",
      "English",
      "Hindi",
      "Advanced java"
    ],
  },
  {
    type: "text",
    label: "Question",
    name: "question",
    id: "question",
  },
  {
    type: "text",
    label: "Answer",
    name: "answer",
    id: "answer",
    disabled: true,
  },
  {
    type: "radio",
    label: "Answer",
    name: "answer",
    id: "ansSelect",
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
  {
    type: "text",
    name: "note",
    id: "note",
  },
];

export default CreateExamField;

// const CreateExamField = [
//   {
//     type: "select",
//     label: "Subject Name:",
//     id: "subjectName",
//     subjectNameField: [
//       "C",
//       "C++",
//       "Java",
//       "Javascript",
//       "Python",
//       "Computer Networks",
//       "Data Structure",
//       "Angular",
//       "Dbms",
//       "English",
//       "Hindi",
//       "Advanced java",
//     ],
//   },
//   {
//     type: "text",
//     label: "Question",
//     name: "question",
//     id: "question",
//   },
//   {
//     type: "text",
//     label: "Answer",
//     name: "answer",
//     id: "answer",
//     disabled: true,
//   },
//   {
//     type: "radio",
//     label: "Answer",
//     name: "answer",
//     id: "ansSelect",
//     value: [
//       {
//         type: "text",
//         name: "option0",
//         id: "option0",
//       },
//       {
//         type: "text",
//         name: "option1",
//         id: "option1",
//       },
//       {
//         type: "text",
//         name: "option2",
//         id: "option2",
//       },
//       {
//         type: "text",
//         name: "option3",
//         id: "option3",
//       },
//     ],
//   },
//   {
//     type: "text",
//     name: "note",
//     id: "note",
//   },
// ];

// export default CreateExamField;
