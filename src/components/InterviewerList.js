import React, { useState } from "react";
import "./InterviewerList.scss";
// import classNames from "classnames";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const interviewersList = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        setInterviewer={interviewer.setInterviewer}
        setInterviewer={event => props.setInterviewer(interviewer.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersList}</ul>
    </section>
  );
}