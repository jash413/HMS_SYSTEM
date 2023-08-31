import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import moment from 'moment';
import axios from 'axios';

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

function Calendar() {
  const [appointments, setAppointments] = useState([]);
  const [appointmentsFromSurgerySection, setAppointmentsFromSurgerySection] = useState([]);
  useEffect(() => {
    // Fetch appointments data from the "Appointment" form API
    axios.get('http://localhost:3100/api/ap') // Replace with the actual endpoint
      .then(response => {
        setAppointments(response.data);
      })
      .catch(error => {
        console.error('Error fetching appointments from "Appointment" form:', error);
      });

    // Fetch surgery data from the "Surgery" API
    axios.get('http://localhost:3100/surgeries') // Replace with the actual endpoint
    .then(response => {
      // Map surgery appointments
      const surgeryAppointments = response.data.map(surgery => ({
        ...surgery,
        title: 'Surgery',
        admissionDate: surgery.start_time, // Use start_time as admissionDate
        admissionTime: moment(surgery.start_time).format('HH:mm'), // Extract time from start_time
        to: moment(surgery.end_time).format('HH:mm'), // Extract time from end_time
      }));
      setAppointmentsFromSurgerySection(surgeryAppointments);
    })
      .catch(error => {
        console.error('Error fetching surgeries from "Surgery" API:', error);
      });
  }, []);

  const allAppointments = [...appointments, ...appointmentsFromSurgerySection];
  console.log(allAppointments)

  return (
    <div className="body d-flex py-lg-3 py-md-2">
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
    </div>
  );
}

export default Calendar;
