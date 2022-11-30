import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewListItem(props) {
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected ": props.selected
  });

  const interviewer = {
    id: props.id,
    name: props.name,
    avatar: props.avatar
  };
  
  return(
    <li onClick={() => props.setInterviewer(props.id)} className={interviewerClass} >
      <img
        className="interviewers__item-image"
        src={interviewer.avatar}
        alt={interviewer.name}
      />
      {props.selected ? interviewer.name : ''}
    </li>
  )
};


