import React, { useState, useEffect } from "react";
import DayList from "./DayList";

import "components/Application.scss";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {

  const setDay = day => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments")])
    .then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data}));
    })
  }, []);
  
  return (
    
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"/>
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
            <DayList
              days={state.days}
              day={state.day}
              onChange={setDay} 
            />
          </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"/>
      </section>
      <section className="schedule">
        {/*{Object.values(state.appointments).map(appt => {*/}
        {dailyAppointments.map(appt => {
           return <Appointment key={appt.id} time={appt.time} interview={appt.interview}/>
        })}
      </section>
    </main>

    
  );
}
