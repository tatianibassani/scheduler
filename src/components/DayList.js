import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList (props) {

  const dayList = props.days.map(dayItem => {
    return (
      <DayListItem 
        key={dayItem.id} 
        name={dayItem.name} 
        spots={dayItem.spots} 
        selected={dayItem.name === props.day}
        setDay={props.onChange} 
      />
    )
  });

  return (
    <ul>
      {dayList}
    </ul>
  )

}