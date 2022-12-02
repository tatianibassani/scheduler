import React, { useState, useEffect } from "react";
import DayList from "./DayList";

import "components/Application.scss";
import Appointment from "./Appointment";
import axios from "axios";

export default function Application(props) {

  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));
  const setAppointments = appointments => setState(prev => ({ ...prev, appointments }));

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  useEffect(() => {
    axios.get("/api/days").then(response => setDays(response.data));
    axios.get("/api/appointments").then(response => setAppointments(response.data));
  }, []);
  /*useEffect(() => {
    axios.get("http://localhost:8001/api/days")
      .then(response => {
        setDays(response.data);
      })
  }, []);*/
  
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
        {Object.values(state.appointments).map(appt => {
           return <Appointment key={appt.id} time={appt.time} interview={appt.interview}/>
        })}
      </section>
    </main>

    
  );
}
