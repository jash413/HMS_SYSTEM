import React, { useState } from "react";
import { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import moment from "moment";
import axios from "axios";
const renderEventContent = (eventInfo) => {
  const isSurgery = eventInfo.event.classNames.includes('surgery-event');
  const eventStyle = {
    padding: '5px',
    borderRadius: '5px',
    color: 'white',
    fontSize: '12px',
    fontWeight: 'bold',
  };

  if (isSurgery) {
    eventStyle.backgroundColor = 'red';
  } else {
    eventStyle.backgroundColor = 'blue';
  }

  return (
    <div style={eventStyle}>
      {eventInfo.timeText}
      <br />
      {eventInfo.event.title}
    </div>
  );
};

// import Modal from 'react-modal';
function Calendar() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointment data from API
    axios
      .get("http://localhost:3100/api/ap") // Replace with your API endpoint
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }, []);

  return (
    <div className="body d-flex py-lg-3 py-md-2">
      <div className="container-xxl">
        <div className="row align-items-center">
          <div className="col-lg-12 col-md-12">
            <div className="card">
              <div className="card-body">
                {/* <button
                className="btn btn-primary"
                onClick={() => setIsModalOpen(true)}
              >
                Add Event
              </button> */}
                <FullCalendar
  plugins={[dayGridPlugin]}
  initialView="dayGridMonth"
  weekends={true}
  events={appointments.map(appointment => ({
    title: `${appointment.title} (${appointment.admissionTime} - ${appointment.to})`,
    start: moment(appointment.admissionDate + ' ' + appointment.admissionTime, 'YYYY-MM-DD hh:mm ').toDate(),
    end: moment(appointment.admissionDate + ' ' + appointment.endTime, 'YYYY-MM-DD hh:mm ').toDate(),
    classNames: [appointment.title === 'Surgery' ? 'surgery-event' : 'normal-event'],
  }))}
  eventContent={renderEventContent}
/>

              </div>
            </div>
          </div>
        </div>
      </div>
      {/* React Modal */}
    </div>
  );
}

export default Calendar;
