import { Modal } from "react-bootstrap";
import React from "react";
import Button from "./Button";

const ModalComp = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-label
      by="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.data.subjectName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Email : {props.data.email}</p>
        <hr style={{ width: "40%" }} />
        <h6>Notes :</h6>
        {props.data.notes?.map((v, i) => (
          <p>{v}</p>
        ))}
        <hr style={{ width: "40%" }} />
        <h6>Result :</h6>
        {props.data.Result?.map((v, i) => {
          return (
            <div key={i}>
              <p>ResultStatus: {v.resultStatus}</p>
              <p>Rank: {v.rank}</p>
              <p>Score: {v.score}</p>
            </div>
          );
        })}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComp;
