import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import moment from "moment";
import axios from "axios";

// Custom event content renderer
const renderEventContent = (eventInfo) => {
  const isSurgery = eventInfo.event.classNames.includes("surgery-event");
  const eventStyle = {
    padding: "5px",
    borderRadius: "5px",
    color: "white",
    fontSize: "12px",
    fontWeight: "bold",
    backgroundColor: isSurgery ? "red" : "blue",
  };

  return (
    <div style={eventStyle}>
      <br />
      {eventInfo.event.title}
      <br />
    </div>
  );
};

function Calendar() {
  const [appointments, setAppointments] = useState([]);
  const [surgeryAppointments, setSurgeryAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments data from the "Appointment" form API
    axios
      .get("http://localhost:3100/api/appointment") // Replace with the actual endpoint
      .then((response) => {
        const formattedAppointments = response.data.map((appointment) => ({
          ...appointment,
          admissionDate: moment(appointment.appointmentDate).format("YYYY-MM-DD"),
          admissionTime: moment(appointment.startingTime, "HH:mm").format("HH:mm"),
          to: moment(appointment.endingTime, "HH:mm").format("HH:mm"),
          title: "Appointment",
        }));
        setAppointments(formattedAppointments);
      })
      .catch((error) => {
        console.error('Error fetching appointments from "Appointment" form:', error);
      });

    // Fetch surgery data from the "Surgery" API
    axios
      .get("http://localhost:3100/surgeries") // Replace with the actual endpoint
      .then((response) => {
        const surgeryAppointments = response.data.map((surgery) => ({
          ...surgery,
          title: "Surgery",
          admissionDate: surgery.selectedDate,
          admissionTime: surgery.start_time,
          to: surgery.end_time,
        }));
        setSurgeryAppointments(surgeryAppointments);
      })
      .catch((error) => {
        console.error('Error fetching surgeries from "Surgery" API:', error);
      });
  }, []);

  const allAppointments = [...appointments, ...surgeryAppointments];

  const handleEventClick = (eventInfo) => {
    const { title, admissionDate, admissionTime, to } = eventInfo.event;
    const message = `Details:\nTitle: ${title}\nAdmission Date: ${admissionDate}\nAdmission Time: ${admissionTime}\nTo: ${to}`;
    console.log(message);
  };

  return (
    <div className="container-xxl">
      <div className="row align-items-center">
        <div className="col-lg-12 col-md-12">
          <div className="card">
            <div className="card-body" id="my_calendar">
              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                editable={true}
                selectable={true}
                events={allAppointments.map((appointment) => ({
                  title: `${appointment.title} (${appointment.admissionTime} - ${appointment.to})`,
                  start: moment(
                    `${appointment.admissionDate} ${appointment.admissionTime}`,
                    "YYYY-MM-DD hh:mm"
                  ).toDate(),
                  end: moment(
                    `${appointment.admissionDate} ${appointment.to}`,
                    "YYYY-MM-DD hh:mm"
                  ).toDate(),
                }))}
                // eventContent={renderEventContent} // Custom event content renderer
                eventClick={handleEventClick} // Add eventClick prop
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
