import React, { useState, useEffect, useContext } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import moment from "moment";
import axios from "axios";
import { myContext, tokenContext } from "./Main";

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
  const userData = useContext(myContext);
  const token = useContext(tokenContext);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDoctorData, setSelectedDoctorData] = useState({});
  const [eventForm, setEventForm] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    description: "",
  });
  const [showEventModal, setShowEventModal] = useState(false);

  const handleEventClick = (eventInfo) => {
    const { title, admissionDate, admissionTime, to } = eventInfo.event;
    const message = `Details:\nAdmission Date: ${admissionDate}\nAdmission Time: ${admissionTime}\nTo: ${to}`;
    console.log(message);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventForm({ ...eventForm, [name]: value });
  };

  const toggleEventModal = () => {
    setShowEventModal(!showEventModal);
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if a doctor is selected
      if (!selectedDoctor) {
        alert("Please select a doctor.");
        return;
      }

      // Create a new event object from the form input
      const newEvent = {
        title: eventForm.title,
        date: eventForm.date,
        startTime: eventForm.startTime,
        endTime: eventForm.endTime,
        description: eventForm.description,
      };

      // Update the doctor's bookedSlots with the new event
      const updatedBookedSlots = [
        ...(selectedDoctorData.bookedSlots || []), // Handle initial empty bookedSlots
        newEvent,
      ];

      // Make an API request to update the doctor's bookedSlots
      const response = await axios.patch(
        `http://localhost:3100/doctors/${selectedDoctor}`,
        {
          bookedSlots: updatedBookedSlots,
        }
      );

      console.log("Doctor's booked slots updated:", response.data);
    } catch (error) {
      console.error("Error updating doctor's booked slots:", error);
    }
  };

  const handleDoctorChange = (e) => {
    const selectedDoctorId = e.target.value;
    setSelectedDoctor(selectedDoctorId);
  };

  useEffect(() => {
    axios.get("http://localhost:3100/doctors",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      const doctor = response.data.filter((doctor) => {
        return doctor.hospital_id === userData.hospital_id;
      }
      );
      setDoctors(doctor);
    });
  }, []);

  useEffect(() => {
    if (selectedDoctor) {
      axios
        .get(`http://localhost:3100/doctors/${selectedDoctor}`)
        .then((response) => {
          setSelectedDoctorData(response.data);
        });
    }
  }, [selectedDoctor]);

  useEffect(() => {
    if (userData.role==="Doctor") {
      axios
        .get(`http://localhost:3100/doctors/${userData.doctor_id}`)
        .then((response) => {
          setSelectedDoctorData(response.data);
        });
    }
  }, [userData.role==="Doctor"]);

  return (
    <div className="container-xxl">
      <div className="row align-items-center">
        <div className="border-0 mb-4">
          <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom">
            <h3 className="fw-bold mb-0">Calendar</h3>
            {userData.role === "Admin" && (
            <div className="dropdown">
              <select
                className="btn btn-primary form-control"
                id="dropdownMenuButton2"
                name="doctor"
                onChange={handleDoctorChange}
                value={selectedDoctor}
              >
                <option
                  style={{ backgroundColor: "white", color: "black" }}
                  value=""
                >
                  Select Doctor
                </option>
                {doctors.map((doctor) => (
                  <option
                    style={{ backgroundColor: "white", color: "black" }}
                    key={doctor._id}
                    value={doctor._id}
                  >
                    {doctor.first_name} {doctor.last_name}
                  </option>
                ))}
              </select>
            </div>
            )}
            <div className="col-auto d-flex">
              <button
                type="button"
                className="btn btn-primary"
                onClick={toggleEventModal}
              >
                <i className="icofont-plus-circle me-2 fs-6" />
                Add Event
              </button>
            </div>
          </div>
        </div>

        <div className="col-lg-12 col-md-12">
          <div className="card">
            <div className="card-body" id="my_calendar">
              <div>
                {/* Button to toggle "Add Event" modal */}
                {/* Modal for adding events */}
                <div
                  className={`modal ${showEventModal ? "show" : ""}`}
                  tabIndex="-1"
                  role="dialog"
                  style={{ display: showEventModal ? "block" : "none" }}
                >
                  <div
                    className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title fw-bold">Add Event</h5>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={toggleEventModal}
                          aria-label="Close"
                        ></button>
                      </div>
                      <form onSubmit={handleEventSubmit}>
                        <div className="modal-body">
                          <div className="mb-3">
                            <label
                              htmlFor="event-title"
                              className="form-label"
                            >
                              Event Title
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="event-title"
                              name="title"
                              value={eventForm.title}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="event-date"
                              className="form-label"
                            >
                              Event Date
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              id="event-date"
                              name="date"
                              value={eventForm.date}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="event-start-time"
                              className="form-label"
                            >
                              Start Time
                            </label>
                            <input
                              type="time"
                              className="form-control"
                              id="event-start-time"
                              name="startTime"
                              value={eventForm.startTime}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="event-end-time"
                              className="form-label"
                            >
                              End Time
                            </label>
                            <input
                              type="time"
                              className="form-control"
                              id="event-end-time"
                              name="endTime"
                              value={eventForm.endTime}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="event-description"
                              className="form-label"
                            >
                              Event Description
                            </label>
                            <textarea
                              className="form-control"
                              id="event-description"
                              rows="3"
                              name="description"
                              value={eventForm.description}
                              onChange={handleInputChange}
                              placeholder="Add any extra details about the event"
                            ></textarea>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={toggleEventModal}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="btn btn-primary"
                          >
                            Create Event
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {/* Calendar */}
                <FullCalendar
                  plugins={[dayGridPlugin]}
                  initialView="dayGridMonth"
                  weekends={true}
                  editable={true}
                  selectable={true}
                  events={selectedDoctorData?.bookedSlots?.map((appointment) => ({
                    title: `${appointment.title}`,
                    start: moment(
                      `${appointment.date} ${appointment.startTime}`,
                      "YYYY-MM-DD hh:mm"
                    ).toDate(),
                    end: moment(
                      `${appointment.date} ${appointment.endTime}`,
                      "YYYY-MM-DD hh:mm"
                    ).toDate(),
                  }))}
                  eventClick={handleEventClick}
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
