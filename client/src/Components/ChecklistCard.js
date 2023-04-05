import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "../axiosInstance";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Button, Card, Form, Container } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import CheckListImg from "../Images/checklist-img.png";

const CheckListCard = (props) => {
  const navigate = useNavigate();
  const [checkList, setCheckList] = useState(props.checkList);
  const [docsPercentage, setDocsPercentage] = useState(
    handleProgressBar(props.checkList.documents)
  );
  const [stepsPercentage, setStepsPercentage] = useState(
    handleProgressBar(props.checkList.steps)
  );

  const handleChange = (myDoc) => {
    const newDocuments = checkList.documents.map((doc) => {
      if (doc._id === myDoc._id) {
        doc.isCompleted = !doc.isCompleted;
      }
      return doc;
    });
    setCheckList({ ...checkList, documents: newDocuments });
    setDocsPercentage(handleProgressBar(newDocuments));
    axios
      .put(`/api/checkList/${checkList._id}`, {
        ...checkList,
        documents: newDocuments,
      })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  function handleProgressBar(docs) {
    const progress = docs.reduce((acc, curr) => {
      console.log("current", curr.isCompleted);
      return (acc += curr.isCompleted ? 1 : 0);
    }, 0);
    console.log("progress", progress);
    return (progress / docs.length) * 100;
  }

  const handleStepChange = (myStep) => {
    const newSteps = checkList.steps.map((step) => {
      if (step._id === myStep._id) {
        step.isCompleted = !step.isCompleted;
      }
      return step;
    });
    setCheckList({ ...checkList, steps: newSteps });
    setStepsPercentage(handleProgressBar(newSteps));
    axios
      .put(`/api/checkList/${checkList._id}`, {
        ...checkList,
        steps: newSteps,
      })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  function handleProgressBar(steps) {
    const progress = steps.reduce((acc, curr) => {
      console.log("current", curr.isCompleted);
      return (acc += curr.isCompleted ? 1 : 0);
    }, 0);
    console.log("progress", progress);
    return (progress / steps.length) * 100;
  }

  return (
    <>
      <Container fluid className="checklists">
        <Form className="docs-checklist">
          <Form.Group>
            <h2 className="checklist-header">
              {" "}
              Necessary documents for {checkList.category}:
            </h2>
            {checkList.documents.map((document) => {
              return (
                <div key={document._id}>
                  <Container fluid className="docs-list">
                    <ListGroup className="docs-content">
                      <ListGroup.Item className="docs-item">
                        {document.title}
                        {document.description}
                      </ListGroup.Item>
                    </ListGroup>
                    <input
                      className=""
                      type="checkbox"
                      checked={document.isCompleted}
                      onChange={() => handleChange(document)}
                    />
                  </Container>
                </div>
              );
            })}
            <ProgressBar
              animated
              now={docsPercentage}
              id="progress-bar"
              label={`${Math.ceil(docsPercentage)}%`}
            />
          </Form.Group>
        </Form>
        <Form className="steps-checklist">
          <Form.Group>
            <h2 className="checklist-header">
              Necessary steps for {checkList.category}:
            </h2>
            {checkList.steps.map((step) => {
              return (
                <div key={step._id}>
                  <Container fluid className="steps-list">
                    <ListGroup className="steps-content">
                      <ListGroup.Item className="steps-item">
                        {step.title}
                        {step.description}
                      </ListGroup.Item>
                    </ListGroup>
                    <input
                      type="checkbox"
                      checked={step.isCompleted}
                      onChange={() => handleStepChange(step)}
                    />
                  </Container>
                </div>
              );
            })}
            <ProgressBar
              animated
              now={stepsPercentage}
              id="progress-bar"
              label={`${Math.ceil(stepsPercentage)}%`}
            />
          </Form.Group>
          <img src={CheckListImg} alt="Logo" width="400" height="400" />
        </Form>
      </Container>
    </>
  );
};
export default CheckListCard;
