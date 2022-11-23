const giveExamFields = [
  {
    type: "select",
    label: "Subject Name:",
    id: "subjectName",
    disabled: true,
  },
  {
    type: "text",
    label: "Question",
    name: "question",
    id: "question",
    disabled: true,
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
        disabled: true,
      },
      {
        type: "text",
        name: "ans2",
        id: "ans2",
        disabled: true,
      },
      {
        type: "text",
        name: "ans3",
        id: "ans3",
        disabled: true,
      },
      {
        type: "text",
        name: "ans4",
        id: "ans4",
        disabled: true,
      },
    ],
  },
];

export default giveExamFields;

// const giveExamFields = [
//   {
//     type: "select",
//     label: "Subject Name:",
//     id: "subjectName",
//     disabled: true,
//   },
//   {
//     type: "text",
//     label: "Question",
//     name: "question",
//     id: "question",
//     disabled: true,
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
//         disabled: true,
//       },
//       {
//         type: "text",
//         name: "option1",
//         id: "option1",
//         disabled: true,
//       },
//       {
//         type: "text",
//         name: "option2",
//         id: "option2",
//         disabled: true,
//       },
//       {
//         type: "text",
//         name: "option3",
//         id: "option3",
//         disabled: true,
//       },
//     ],
//   },
// ];

// export default giveExamFields;
