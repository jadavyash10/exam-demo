import { Route } from "react-router-dom";
import Login from "../components/user/Login";
import Home from "../page/Home.page";
import Signup from "../components/user/Signup";
import Forgotpassword from "../components/user/Forgotpassword";
import ResetPassword from "../components/user/ResetPassword";
import NewPassword from "../components/user/NewPassword";
import Private from "../components/user/Private";
import TeacherDashboard from "../components/teacher/TeacherDashboard";
import VerifiedStudentData from "../components/teacher/VerifiedStudentData";
import ViewStudentDetail from "../components/teacher/ViewStudentDetail";
import CreateExam from "../components/teacher/CreateExam";
import StudentDashboard from "../components/student/StudentDashboard";
import ViewExam from "../components/teacher/ViewExam";
import EditExam from "../components/teacher/EditExam";
import StudentProfile from "../components/student/StudentProfile";
import EditStudentProfile from "../components/student/EditStudentProfile";
import GiveExam from "../components/student/GiveExam";
import DemoForm from "../utils/DemoForm";
import NotFound from "../components/NotFound";

export const RoutesArr = [
  {
    path: "login",
    element: <Login />,
    id: "login",
    privateElement: false,
  },
  {
    path: "signup",
    element: <Signup />,
    id: "signup",
    privateElement: false,
  },
  {
    path: "forgotpassword",
    element: <Forgotpassword />,
    id: "forgotpassword",
    privateElement: false,
  },
  {
    path: "newPassword",
    element: <NewPassword />,
    id: "newPassword",
    privateElement: false,
  },
  {
    path: "resetPassword",
    element: <ResetPassword />,
    id: "resetPassword",
    privateElement: true,
  },
  {
    path: "/",
    element: <Home />,
    id: "home",
    privateElement: false,
  },
  {
    path: "/teacherDashboard",
    element: <TeacherDashboard />,
    id: "teacherDashboard",
    privateElement: true,
  },
  {
    path: "/verifiedStudentData",
    element: <VerifiedStudentData />,
    id: "verifiedStudentData",
    privateElement: true,
  },
  {
    path: "/viewStudentDetail/:id",
    element: <ViewStudentDetail />,
    id: "viewStudentDetail",
    privateElement: true,
  },
  {
    path: "/createExam",
    element: <CreateExam />,
    id: "createExam",
    privateElement: true,
  },
  {
    path: "/viewExam",
    element: <ViewExam />,
    id: "viewExam",
    privateElement: true,
  },
  {
    path: "/EditExam/:id",
    element: <EditExam />,
    id: "detail",
    privateElement: true,
  },
  {
    path: "/studentDashboard",
    element: <StudentDashboard />,
    id: "studentDashboard",
    privateElement: true,
  },
  {
    path: "/studentProfile",
    element: <StudentProfile />,
    id: "studentProfile",
    privateElement: true,
  },
  {
    path: "/EditStuProfile/:id",
    element: <EditStudentProfile />,
    id: "EditStuProfile",
    privateElement: true,
  },
  {
    path: "/GetExamPaper/:id",
    element: <GiveExam />,
    id: "GetExamPaper",
    privateElement: true,
  },
  {
    path: "/demoForm",
    element: <DemoForm />,
    id: "demoForm",
  },
  {
    path: "*",
    element: <NotFound />,
    id: "demoForm",
  },
];

const routing = (arr) => {
  return (
    <>
      {arr?.map(({ path, element, id, childRoute, privateElement }, i) => {
        if (childRoute) {
          return (
            <>
              <Route key={id} path={path} element={element} />;
              {routing(childRoute)}
            </>
          );
        } else {
          return (
            <Route
              key={id}
              path={path}
              element={privateElement ? <Private>{element}</Private> : element}
            />
          );
        }
      })}
    </>
  );
};

export default routing;
