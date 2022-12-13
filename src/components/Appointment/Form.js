import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';
import React, { useState } from 'react';

export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const studentOnChange = (event) => {
    setStudent(event.target.value);
  }

  const interviewerOnChange = (interviewer) => {
    setInterviewer(interviewer);
  }

  const reset = () => {
    setStudent("");
    setInterviewer(null);
  }

  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

    console.log(interviewer);
    if (JSON.stringify(interviewer) === '{}') {
      setError("Please select an interviewer");
      return;
    }
  
    props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={e => { e.preventDefault(); }}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={studentOnChange}
            value={student}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList value={interviewer} interviewers={props.interviewers} setInterviewer={interviewerOnChange} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => props.onCancel()}>Cancel</Button>
          <Button confirm onClick={() => validate()}>Save</Button>
        </section>
      </section>
    </main>
  );
}