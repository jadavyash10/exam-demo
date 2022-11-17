import {
  SHOW_STUDENTDATA,
  SHOW_STUDENTDATA_ERROR,
  SHOW_STUDENTDATA_REQ,
} from "../constant/Index";
import { axiosApi } from "../../components/axios";

export const showStudentDataReq = () => {
  return {
    type: SHOW_STUDENTDATA_REQ,
  };
};
export const showStudentDataSuceess = (state) => {
  return {
    type: SHOW_STUDENTDATA,
    payload: state,
  };
};

export const showStudentDataError = (state) => {
  return {
    type: SHOW_STUDENTDATA_ERROR,
    payload: state,
  };
};

const showStudentDatass = () => {
  const token = localStorage.getItem("userToken");

  return (dispatch) => {
    dispatch(showStudentDataReq());
    axiosApi
      .get("dashboard/Teachers", {
        headers: {
          "access-token": token,
        },
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          dispatch(showStudentDataSuceess(res.data.data));
        } else {
          dispatch(showStudentDataError(res.data.message));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default showStudentDatass;
