import React, {useState} from "react";
import "./styles.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import useVisualMode from "../../hooks/useVisualMode"
import Form from "./Form"
import Status from "./Status";
import Confirm from "./Confirm"
import Error from "./Error"


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  ); // if interview is present, show the interview, else show empty

  

  function save(name, interviewer) {
  const interview = { // creating an interview object
    student: name,
    interviewer
  };

  transition(SAVING);

  props
    .bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
}

function destroy() {
  transition(DELETING, true);
  props
    .cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));
}

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
     {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />} 
{mode === SHOW &&
  <Show student={props.interview.student}
    interviewer={props.interview.interviewer}
    onDelete={() => transition(CONFIRM)}
    onEdit={() => transition(EDIT)}
  />
}
{mode === CREATE && (
  <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
)}
{mode === EDIT && (
  <Form
    name={props.interview.student}
    interviewer={props.interview.interviewer.id}
    interviewers={props.interviewers}
    onCancel={back}
    onSave={save}
  />
)}
{mode === SAVING && <Status message="Saving" />}
{mode === DELETING && <Status message="Deleting" />}
{mode === CONFIRM && (
  <Confirm
    message="Are you sure you would like to delete?"
    onCancel={back}
    onConfirm={destroy}
  />
)}
{mode === ERROR_SAVE && (
  <Error message="Could not book appointment." onClose={back} />
)}
{mode === ERROR_DELETE && (
  <Error message="Could not cancel appointment." onClose={back} />
)}
    </article>
  );
}
