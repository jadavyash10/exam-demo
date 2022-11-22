export const sigupField = [
  {
    label: "Name",
    id: "name",
    name: "name",
    type: "text",
    placeholder: "Enter name",
  },
  {
    label: "Email",
    id: "email",
    name: "email",
    type: "email",
    placeholder: "Enter email address",
  },
  {
    label: "Password",
    id: "password",
    name: "password",
    type: "password",
    placeholder: "Enter password",
  },
  {
    label: "Role",
    name: "role",
    id: "role",
    type: "radio",
    value: [
      {
        name: "teacher",
        id: "teacher",
      },
      {
        name: "student",
        id: "student",
      },
    ],
  },
  {
    name: "Submit",
    type: "button",
  },
];
