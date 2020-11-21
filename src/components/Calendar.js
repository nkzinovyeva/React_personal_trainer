import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import * as moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";


function SportsCalendar() {
  
  const localizer = momentLocalizer(moment);
  const [trainings, setTrainings] = useState([{
      title: "",
      start: "",
      end: "",
  },]);
  
  useEffect(() => {
    getTrainings();
  }, []);
  
  //get trainings from the database
  const getTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then((response) => response.json())
    .then((responseData) => {
          return setTrainings(
            responseData.map((data) => ({
              start: new Date(moment(data.date)),
              end: new Date(moment(data.date).add(data.duration, "minutes")),
              title: data.activity,
            }))
          );
        })
    .catch((err) => console.log(err));
  };
  
  return (
      <div className="Body">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={trainings}
          style={{ height:"700px", width: "95%", margin: "20px"} }
        />
      </div>
  );
};

export default SportsCalendar;