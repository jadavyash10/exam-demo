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
    type: "radio",
    value: [
      {
        name: "teacher",
      },
      {
        name: "student",
      },
    ],
    id: "role",
  },
  // {
  //   label: "Teacher",
  //   name: "role",
  //   id: "teacher",
  //   type: "radio",
  //   errorShow: false,
  // },
  // {
  //   label: "Student",
  //   name: "role",
  //   id: "Student",
  //   type: "radio",
  //   errorShow: true,
  // },
];
