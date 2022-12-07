import React from "react";
import "./styles.scss";
import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty.js";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

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
    props.bookInterview(props.id, interview);
    setTimeout( () => {
      transition(SHOW);
    }, 1300);
  }

  function deleteConfirm() {
    transition(CONFIRM);
  }

  function deleteInterview() {
    props.deleteInterview(props.id);
    setTimeout( () => {
      transition(EMPTY);
    }, 1300);
    transition(DELETING);
  }

  function editInterview() {
    transition(EDIT);
  };


  return (
    <article className="appointment">
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
          onCancel={() => transition(EMPTY)}
        />
      )}                       
    </article>
    
    )
  };