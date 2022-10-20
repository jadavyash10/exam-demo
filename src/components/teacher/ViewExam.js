import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import viewExam from '../../redux/action/ViewExamAction';

const ViewExam = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewExam());
  }, []);
  
  return (
    <div>ViewExam</div>
  )
}

export default ViewExam