import {
  SHOW_VERIFIED_STUDENTDATA,
  SHOW_VERIFIED_STUDENTDATA_ERROR,
  SHOW_VERIFIED_STUDENTDATA_REQ,
} from "../constant/Index";
import { axiosApi } from "../../components/axios";

export const showVerifiedStudentDataReq = (sate) => {
  return {
    type: SHOW_VERIFIED_STUDENTDATA_REQ,
   
  };
};
export const showVerifiedStudentDataSuceess = (state) => {
  return {
    type: SHOW_VERIFIED_STUDENTDATA,
    payload: state,
  };
};

export const showVerifiedStudentDataError = (state) => {
  return {
    type: SHOW_VERIFIED_STUDENTDATA_ERROR,
    payload: state,
  };
};

const showVerifiedStudentData = () => {
  const token = localStorage.getItem("userToken");

  return (dispatch) => {
    dispatch(showVerifiedStudentDataReq())
    axiosApi
      .get("dashboard/Teachers/StudentForExam", {
        headers: {
          "access-token": token,
        },
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          dispatch(showVerifiedStudentDataSuceess(res.data.data));
        } else {
          dispatch(showVerifiedStudentDataError(res.data.message));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default showVerifiedStudentData;
