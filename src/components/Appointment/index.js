import React from "react";
import "./styles.scss";
import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty.js";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETING = "ERROR_DELETING"

export default function Appointment (props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
      
    };

    transition(SAVING);
    props.bookInterview(props.id, interview)
         .then(() => transition(SHOW))
         .catch(error => transition(ERROR_SAVE, true));
  }

  function deleteConfirm() {
    transition(CONFIRM);
  }

  function deleteInterview() {
    transition(DELETING);
    props.deleteInterview(props.id)
         .then(() => transition(EMPTY))
         .catch(error => transition(ERROR_DELETING, true));
  }

  function editInterview() {
    transition(EDIT);
  };

  function returnToForm() {
    transition(CREATE);
  }

  function returnToShow() {
    transition(SHOW);
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name}/> : <Empty />} */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={deleteConfirm}
          onEdit={editInterview}
        />
      )}
      {mode === CREATE && (
        <Form
          student={''}
          interviewer={{}}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => transition(EMPTY)}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm message="Are you sure you would like to delete?"
                                    onCancel={() => transition(SHOW)}
                                    onConfirm={() => deleteInterview()}/>}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => transition(SHOW)}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Error to save the appointment." 
               onClose={returnToForm}/>
      )}
      {mode === ERROR_DELETING && (
        <Error message="Error to delete the appointment." 
               onClose={returnToShow}/>
      )}
    </article>
    
    )
  };