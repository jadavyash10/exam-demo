const giveExamFields = [
  {
    type: "select",
    label: "Subject Name:",
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
    id: "answer",
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
