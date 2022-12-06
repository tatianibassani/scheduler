import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import Appointment from "./Appointment";
import "components/Application.scss";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {

  const setDay = day => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const appointments = getAppointmentsForDay(state, state.day);

  const interviewers = getInterviewersForDay(state, state.day);

  // const bookInterview = (id, interview) => {

  //     const newAppointment={...state.appointments [id], interview:interview};
  //      const newApp={...state.appointments, [id]:newAppointment};
  //      const newState={...state,appointments:newApp};
  //     const spots = getAppointmentsForDay(newState);
  //      const newNewState= updateSpots;
  
  //      setState(newNewState)
  
  //      console.log(id, interview);
  // }
  function bookInterview(id, time, interview) {
    // const newAppointment = {
    //   id,
    //   time,
    //   interview
    // };
    // const newState = {
    //   ...state,
    //   appointments: {
    //     ...appointments,
    //     [id]: newAppointment,
    //   }
    // };
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log(appointments);
    setState({
      ...state,
      appointments
    });
  }

  const schedule = Object.values(appointments).map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
      />
    );
  });

  // const bookInterview = (id, interview) => {

  //   const newAppointment={...state.appointments [id], interview:interview};
  //   const newApp={...state.appointments, [id]:newAppointment};
  //   const newState={...state,appointments:newApp};
  //   const spots = getAppointmentsForDay(newState);
  //   const newNewState= updateSpots;

  //   setState(newNewState)

  //   console.log(id, interview);

  //   function save(name, interviewer) {
  //     const interview = {...bookInterview}
  //       student: name,
  //       interviewer
  //     }
  //   };
  
  

  

  //const dailyAppointments = getAppointmentsForDay(state, state.day);

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")])
    .then((all) => {
      setState(prev => ({...prev, days: all[0].data, 
                                  appointments: all[1].data,
                                  interviewers: all[2].data
                                }));
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
        {/* {dailyAppointments.map(appt => {
           return <Appointment key={appt.id} time={appt.time} interview={appt.interview}/>
        })}
         */}
         {schedule}
      </section>
    </main>

    
  );
        }