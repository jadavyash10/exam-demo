import { VIEW_EXAM_ERROR, VIEW_EXAM_SUCCESS } from "../constant/Index";

  import { axiosApi } from "../../components/axios";
  import { token } from "../../utils/Constant";
  
  export const viewExamSuccess = (state) => {
    return {
      type: VIEW_EXAM_SUCCESS,
      payload: state,
    };
  };
  
  export const viewExamError = (state) => {
    return {
      type: VIEW_EXAM_ERROR,
      payload: state,
    };
  };
  
  const viewExam = () => {
  
    return async (dispatch) => {
      await axiosApi
        .get(`dashboard/Teachers/viewExam`, {
          headers: {
            "access-token": token,
          },
        })
        .then((res) => {
          if (res.data.statusCode === 200) {
            dispatch(viewExamSuccess(res.data.data));
          } else {
            dispatch(viewExamError(res.data.message));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };
  
  export default viewExam;
  