import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';
import React, { useState } from 'react';

export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

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

  const { mode, transition, back } = useVisualMode();

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
          />
        </form>
        <InterviewerList value={interviewer} interviewers={props.interviewers} setInterviewer={interviewerOnChange} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={reset}>Cancel</Button>
          <Button confirm onClick={() => props.onClick([student, interviewer].toString())}>Save</Button>
        </section>
      </section>
    </main>
  );
}