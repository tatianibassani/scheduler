export function getAppointmentsForDay(state, day) {
  const days = state.days;

  let appointmentsForDay = [];

  for (let dayState of days) {
    if (dayState.name === day) {
      const appointments = dayState.appointments;
      for (let appt of appointments) {
        if (state.appointments[appt]) {
          appointmentsForDay.push(state.appointments[appt]);
        }
      }
    }
  }

  return appointmentsForDay;
}

export function getInterview(state, interview){
  let response = null;

  const appointments = Object.values(state.appointments);
  for (let appt of appointments) {
    if (appt.interview != null) {
      if (appt.interview === interview) {
        response = Object.assign({}, {
          student: interview.student,
          interviewer: state.interviewers[appt.interview.interviewer]
        });
        
      }
    }
  }
  return response;
}

export function getInterviewersForDay(state, day) {
  // const appointmentsForDay = getAppointmentsForDay(state, day);

  // let interviewers = [];
  // for (let appt of appointmentsForDay) {
  //   if (appt.interview !== null) {
  //     const interviewerId = appt.interview.interviewer;
  //     if (!interviewers.includes(state.interviewers[interviewerId])) {
  //       interviewers.push(state.interviewers[interviewerId]);
  //     }
  //   }
  // }
  // return interviewers;
  let result = [];

  const dayFromState = state.days.filter(d => d.name === day);
  if (dayFromState[0]) {
    const interviewersIdForDay = dayFromState[0].interviewers;

    for (let interviewerId of interviewersIdForDay) {
      result.push(state.interviewers[interviewerId]);
    }
  }

  return result;
}