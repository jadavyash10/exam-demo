import { Navigate, Route } from "react-router-dom";
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
];

const Routing = (arr) => {
  return (
    <>
      {arr?.map(({ path, element, id, childRoute, privateElement }, i) => {
        if (childRoute) {
          return (
            <>
              <Route key={id} path={path} element={element} />;
              {Routing(childRoute)}
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

export default Routing;
