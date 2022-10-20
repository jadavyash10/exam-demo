// import React, { Fragment } from "react";
// import {
//   createExamError,
//   createExamOnChangeForOptions,
//   createExamOnChangeForQuestion,
// } from "../../redux/action/CreateExamAction";
// import Validation from "../Validation";
// import { useDispatch } from "react-redux";
// import Input from "../../reusable/Input";

// const ExamQuestions = (props) => {
//   const { questions, CreateExamField, index, onChange } = props;
//   const { question, answer, options } = questions;
//   let optionArr = {
//     ans1: "",
//     ans2: "",
//     ans3: "",
//     ans4: "",
//   };
//   console.log(questions);
//   const dispatch = useDispatch();

//   const handleChangeForQuestion = (e) => {
//     const { name, value } = e.target;
//     const newError = Validation(name, value);
//     dispatch(createExamOnChangeForQuestion({ [name]: value }));
//     dispatch(createExamError({ [name]: newError }));
//   };
//   const handleChangeForOptions = (e) => {
//     const { name, value } = e.target;
//     const newError = Validation(name, value);
//     optionArr={ ...optionArr, [name]: value };
//     console.log(optionArr.ans1,optionArr.ans2)
//     // dispatch(createExamOnChangeForOptions({ [name]: value }));
//     // dispatch(createExamError({ [name]: newError }));
//   };

//   return (
//     <div className="m-2">
//       <h3>Question {index + 1}</h3>
//       <div>
//         {CreateExamField?.map((v, i) => {
//           const vname = v?.value?.name;
//           console.log(question,v?.value?.name,optionArr.vname);
//           {
//             switch (v.type) {
//               case "text":
//                 return (
//                   <div>
//                     <Input
//                       label={v.name}
//                       type="text"
//                       id={v.id}
//                       name={v.name}
//                       onChange={handleChangeForQuestion}
//                       {...v}
//                     />
//                   </div>
//                 );

//               case "radio":
//                 return (
//                   <div>
//                     {v?.value?.map((value, index) => {
//                       console.log(typeof value)
//                       const {name}=value
//                       console.log(value.name, v.name,optionArr);
//                       if (v.type === "radio") {
//                         return (
//                           <div>
//                             <input
//                               type="radio"
//                               name="answer"
//                               // checked={value.name === "answer" || ""}
//                               value={optionArr[value.name]}
//                               onChange={(e)=>e.target.value}
//                             />
//                             <input
//                               type="text"
//                               // value={options[index]}
//                               name={value.name}
//                               onChange={handleChangeForOptions}
//                             />
//                           </div>
//                         );
//                       }
//                     })}
//                   </div>
//                 );
//             }
//           }
//         })}
//       </div>
//     </div>
//   );
// };

// export default ExamQuestions;




//    {/* <ExamQuestions
//         questions={questions[index]}
//         CreateExamField={CreateExamField}
//         index={index}
//         // onChange={handleChange}
//       /> */}