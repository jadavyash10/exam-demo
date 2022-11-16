import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import getExamPaper, {
  giveExam,
  giveExamOnChange,
} from "../../redux/action/ExamPaperAction";
import Loader from "../../reusable/Loader";
import CreateExam from "../teacher/CreateExam";

const GiveExam = () => {
  const { examPaper, giveExamQuestions, loading } = useSelector(
    ({ getExamPaper }) => getExamPaper
  );
  const dispatch = useDispatch();

  const { id } = useParams();
  let data = useLocation();
  const subName = data.state.subjectName;

  useEffect(() => {
    dispatch(getExamPaper(id));
  }, [dispatch]);

  let new_array=examPaper?.map(function(ele){
       
    return {...ele,answer:''};
  })

  const giveExamData = {
    subjectName:subName !== undefined ? subName :"",
    questions:new_array,
  }
  console.log('giveExamData', giveExamData)
  return <div>
    {loading ? <Loader/>: <CreateExam data={giveExamData} title="Give Exam" id={id}/>}
  </div>;
};

export default GiveExam;








// import React, { useEffect, useState } from "react";

// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useParams } from "react-router-dom";
// import getExamPaper, {
//   giveExam,
//   giveExamOnChange,
// } from "../../redux/action/ExamPaperAction";
// import giveExamFields from "../../utils/GiveExamFields";
// import Input from "../../reusable/Input";
// import Loader from "../../reusable/Loader";
// import DropDown from "../../reusable/DropDown";
// import Button from "../../reusable/Button";

// const GiveExam = (props) => {
//   const dispatch = useDispatch();
//   const [quesIndex, setQuesIndex] = useState(0);
//   const [ans,setAns] = useState();

//   const examPaperData = useSelector(
//     ({ getExamPaper }) => getExamPaper.examPaper
//   );
//   const { giveExamQuestions, loading } = useSelector(
//     ({ getExamPaper }) => getExamPaper
//   );
//   console.log("questions", giveExamQuestions);

//   const { id } = useParams();
//   let data = useLocation();
//   const subName = data.state.subjectName;

//   useEffect(() => {
//     dispatch(getExamPaper(id));
//   }, [dispatch]);
//   const clone = [...giveExamQuestions];
//   clone[2] = {
//     ...clone[2],
//     answer: "sdf",
//   };

//   const handleChange = (e) => {
//     const clone = [...giveExamQuestions];
//     clone[quesIndex] = {
//       ...clone[quesIndex],
//       answer: e.target.value,
//     };
//     dispatch(giveExamOnChange(clone));
//   };

//   const handleExamButtonNext = (e) => {
//     setQuesIndex(quesIndex + 1);
//   };

//   const handleExamButtonSkip = (e) => {
//     const clone = [...giveExamQuestions];
//     clone[quesIndex] = {
//       ...clone[quesIndex],
//       answer: "",
//     };
//     dispatch(giveExamOnChange(clone));
//     setQuesIndex(quesIndex + 1);
//   };

//   const handleExamButtonPre = (e) => {
//     setQuesIndex(quesIndex - 1);
//   };
//   const giveExamSubmit = (second) => {
//     dispatch(giveExam(id, giveExamQuestions));
//   };
//   console.log("subName", examPaperData);
//   console.log("update", clone);
//   console.log("id", id);
//   console.log("examPaperData", examPaperData[quesIndex]);
//   // examPaperData[quesIndex]?.options[index] !==
//   //   undefined
//   //     ? (examPaperData[quesIndex]?.options[
//   //         index
//   //       ] ===
//   //         giveExamQuestions[quesIndex]) !==
//   //         undefined &&
//   //       giveExamQuestions[quesIndex]?.answer
//   //     : ""

//   return (
//     <div>
//       <div className="container">
//         <h1>Give Exam</h1>
//         <h2>{quesIndex + 1}</h2>
//         {loading ? (
//           <Loader />
//         ) : (
//           <form id="form">
//             {giveExamFields?.map((v, i) => {
//               {
//                 switch (v.type) {
//                   case "text":
//                     return (
//                       <div>
//                         <Input
//                           label={v.label}
//                           type={v.type}
//                           id={v.id}
//                           name={v.name}
//                           value={
//                             examPaperData[quesIndex] !== undefined &&
//                             examPaperData[quesIndex][v.name] !== undefined
//                               ? examPaperData[quesIndex][v.name]
//                               : ""
//                           }
//                           {...v}
//                           onChange={handleChange}
//                         />
//                       </div>
//                     );

//                   case "radio":
//                     return (
//                       <div>
//                         {v?.value?.map((value, index) => {
//                           if (v.type === "radio") {
//                             return (
//                               <div>
//                                 <input
//                                   type="radio"
//                                   id={value.id}
//                                   name={v.name}
//                                   value={
//                                     examPaperData[quesIndex]?.options[index] !==
//                                     undefined
//                                       ? examPaperData[quesIndex]?.options[index]
//                                       : ""
//                                   }
//                                   // checked={
//                                   //   examPaperData[quesIndex]?.options[index] === examPaperData[quesIndex][v.name] ||""
//                                   // }
//                                   onChange={handleChange}
//                                 />
//                                 <input
//                                   type="text"
//                                   id={value.id}
//                                   className="demo"
//                                   name={value.name}
//                                   value={
//                                     examPaperData[quesIndex]?.options[index] !==
//                                     undefined
//                                       ? examPaperData[quesIndex]?.options[index]
//                                       : ""
//                                   }
//                                   disabled={value.disabled}
//                                   onChange={handleChange}
//                                 />
//                               </div>
//                             );
//                           }
//                         })}
//                       </div>
//                     );
//                   case "select":
//                     return (
//                       <DropDown
//                         value={subName !== undefined ? subName : ""}
//                         name="subjectName"
//                         label={v.label}
//                       />
//                     );
//                 }
//               }
//             })}
//           </form>
//         )}
//         <div className="row mt-3">
//           <Button clickHandler={handleExamButtonSkip}>Skip</Button>
//           <Button clickHandler={handleExamButtonPre}>Previous</Button>
//           <Button clickHandler={handleExamButtonNext}>Next</Button>
//           <Button clickHandler={giveExamSubmit}>Finish</Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GiveExam;
