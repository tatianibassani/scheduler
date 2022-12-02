import React from "react";

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