import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Modal from 'react-modal';

function Calendar() {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');

  const handleDateClick = (arg) => {
    setEventDate(arg.dateStr);
    setIsModalOpen(true);
  };

  const handleAddEvent = () => {
    if (eventTitle && eventDate && eventTime) {
      const newEvent = { title: eventTitle, start: eventDate + 'T' + eventTime, end: eventDate + 'T' + eventTime };
      setEvents([...events, newEvent]);
      setIsModalOpen(false);
      setEventTitle('');
      setEventDate('');
      setEventTime('');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEventTitle('');
    setEventDate('');
    setEventTime('');
  };

  return (
    <div className="body d-flex py-lg-3 py-md-2">
      <div className="container-xxl">
        <div className="row align-items-center">
          <div className="col-lg-12 col-md-12">
            <div className="card">
              <div className="card-body">
                <button
                  className="btn btn-primary"
                  onClick={() => setIsModalOpen(true)}
                >
                  <i className="icofont-plus-circle me-2 fs-6"></i>Add Event
                </button>
                <FullCalendar
                  plugins={[dayGridPlugin]}
                  initialView="dayGridMonth"
                  weekends={false}
                  events={events}
                  dateClick={handleDateClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* React Modal */}
      <Modal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  contentLabel="Add Event"
>
  {/* <h2>Add Event</h2>
  <input
    type="text"
    placeholder="Event Title"
    value={eventTitle}
    onChange={(e) => setEventTitle(e.target.value)}
  />
  <input
    type="date"
    value={eventDate}
    onChange={(e) => setEventDate(e.target.value)}
  />
  <input
    type="time"
    value={eventTime}
    onChange={(e) => setEventTime(e.target.value)}
  />
  <button onClick={handleAddEvent}>Save Event</button>
  <button onClick={closeModal}>Cancel</button> */}

<div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold" id="eventaddLabel">
                                Add Event
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={closeModal}
                            />
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput99" className="form-label">
                                    Event Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleFormControlInput99"
                                    value={eventTitle}
                                    onChange={(e) => setEventTitle(e.target.value)}
                                />
                            </div>
  
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                Done
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleAddEvent}>
                                Create
                            </button>
                        </div>
                    </div>
                </div>

</Modal>

    </div>
  );
}

export default Calendar;
