import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import moment from "moment";
import axios from "axios";

const renderEventContent = (eventInfo) => {
  const isSurgery = eventInfo.event.classNames.includes("surgery-event");
  const eventStyle = {
    padding: "5px",
    borderRadius: "5px",
    color: "white",
    fontSize: "12px",
    fontWeight: "bold",
  };

  if (isSurgery) {
    eventStyle.backgroundColor = "red";
  } else {
    eventStyle.backgroundColor = "blue";
  }

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
  const [appointmentsFromSurgerySection, setAppointmentsFromSurgerySection] =
    useState([]);
  useEffect(() => {
    // Fetch appointments data from the "Appointment" form API
   // Fetch appointments data from the "Appointment" form API
axios
.get("http://localhost:3100/api/appointment") // Replace with the actual endpoint
.then((response) => {
  setAppointments(response.data.map((appointment) => ({
    ...appointment,
    admissionDate: moment(appointment.appointmentDate).format("YYYY-MM-DD"), // Extract date from appointmentDate
    admissionTime: moment(appointment.startingTime, "HH:mm").format("HH:mm"), // Format startingTime as HH:mm
    to: moment(appointment.endingTime, "HH:mm").format("HH:mm"), // Format endingTime as HH:mm
  })));
})
.catch((error) => {
  console.error(
    'Error fetching appointments from "Appointment" form:',
    error
  );
});
    // Fetch surgery data from the "Surgery" API
    axios
      .get("http://localhost:3100/surgeries") // Replace with the actual endpoint
      .then((response) => {
        // Map surgery appointments
        const surgeryAppointments = response.data.map((surgery) => ({
          ...surgery,
          title: "Surgery",
          admissionDate: surgery.selectedDate, // Use start_time as admissionDate
          admissionTime:surgery.start_time, // Extract time from start_time
          to: surgery.end_time// Extract time from end_time
        }));
        setAppointmentsFromSurgerySection(surgeryAppointments);
      })
      .catch((error) => {
        console.error('Error fetching surgeries from "Surgery" API:', error);
      });
  }, []);

  const allAppointments = [...appointments, ...appointmentsFromSurgerySection];
  console.log(allAppointments);
const handleEventClick = (eventInfo) => {
  console.log(eventInfo);

  const { title, admissionDate, admissionTime, to } = eventInfo.event.extendedProps;
  const message = `Details:\nTitle: ${title}\nAdmission Date: ${admissionDate}\nAdmission Time: ${admissionTime}\nTo: ${to}`;
  console.log(message);
};

  return (
    <div className="container-xxl">
      <div className="row align-items-center">
        <div className="col-lg-12 col-md-12">
          <div className="card">
            <div className="card-body">
              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                events={allAppointments.map(appointment => ({
                  title: `${appointment.title} (${appointment.admissionTime} - ${appointment.to})`,
                  start: moment(`${appointment.admissionDate} ${appointment.admissionTime}`, "YYYY-MM-DD hh:mm").toDate(),
                  end: moment(`${appointment.admissionDate} ${appointment.to}`, "YYYY-MM-DD hh:mm").toDate(),
                  classNames: [
                    appointment.title === "Surgery" ? "surgery-event" : "normal-event",
                  ],
                }))}
                eventContent={renderEventContent} 
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
