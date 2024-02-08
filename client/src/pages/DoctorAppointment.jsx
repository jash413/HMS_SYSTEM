import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { myContext, tokenContext } from "./Main";


const AppointmentForm = () => {
  const userData = useContext(myContext);
  const token = useContext(tokenContext);
  const [formData, setFormData] = useState({
    patient: "",
    appointmentDate: new Date().toISOString().split("T")[0],
    notes: "",
    startingTime: "",
    doctor: "",
    title: "",
    endingTime: "",
    selectedDate: "",
  });

  const [selectedPatientDetails, setSelectedPatientDetails] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctorData, setDoctorData] = useState({});
  const [availableSlots, setAvailableSlots] = useState([]); // State to store available slots

  useEffect(() => {
    axios.get("http://15.207.55.158:3100/doctors",{
      headers: {
        authorization: `Bearer ${token}`,
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
    if (formData.doctor) {
      axios.get(`http://15.207.55.158:3100/api/patients`,{
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        const allPatients = response.data;
        // Filter patients based on the selected doctor
        const doctorPatients = allPatients.filter(
          (patient) => patient.doctor === formData.doctor
        );
        setPatients(doctorPatients);
      });
    } else {
      setPatients([]); // Reset patients when no doctor is selected
    }
  }, [formData.doctor]);
  

  useEffect(() => {
    if (formData.doctor) {
      fetchAvailableSlots(formData.doctor);
    } else {
      setAvailableSlots([]); // Reset available slots when no doctor is selected
    }
  }, [formData.selectedDate]);

  const fetchAvailableSlots = async (doctorId) => {
    try {
      const response = await axios.get(
        `http://15.207.55.158:3100/api/doctor?selectedDate=${formData.selectedDate}&id=${formData.doctor}`,{
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data.availableSlots);
        // Set the available slots in the state
        setAvailableSlots(response.data.availableSlots);
      } else {
        console.error("Failed to fetch available slots.");
      }
    } catch (error) {
      console.error("Error fetching available slots:", error);
    }
  };

  const handleDoctorChange = (e) => {
    const selectedDoctor = e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      doctor: selectedDoctor,
      patient: "", // Clear the selected patient when doctor changes
    }));
    setSelectedPatientDetails(null); // Clear patient details
    axios
      .get(`http://15.207.55.158:3100/doctors/${selectedDoctor}`,{
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDoctorData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctor details:", error);
      });
  };

  useEffect(() => {
    if(userData.role==="Doctor"){
      setFormData((prevData) => ({
        ...prevData,
        doctor: userData.doctor_id,
      }));
      setSelectedPatientDetails(null); // Clear patient details
      axios
        .get(`http://15.207.55.158:3100/doctors/${userData.doctor_id}`,{
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setDoctorData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching doctor details:", error);
        });
    }
  }, [userData.role==="Doctor"]);

  const handleSelectChange = (e) => {
    const selectedOption = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      patient: selectedOption,
    }));

    axios
      .get(`http://15.207.55.158:3100/api/patients/${selectedOption}`,{
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSelectedPatientDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching patient details:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://15.207.55.158:3100/api/appointment",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(formData)

      if (response.status === 201) {
        toast.success("Appointment Scheduled successfully");
        await axios.patch(`http://15.207.55.158:3100/doctors/${formData.doctor}`, {
          bookedSlots: [
            ...doctorData.bookedSlots,
            {
              title:formData.title,
              date: formData.appointmentDate,
              startTime: formData.startingTime,
              endTime: formData.endingTime,
            },
          ],
        },{
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
      }

      console.log("Doctor created:", response.data);
      // Reset the form after successful submission
      setFormData({
        patient: "",
        doctor: "",
        appointmentDate: new Date().toISOString().split("T")[0],
        wardNumber: "",
        notes: "",
        startingTime: "",
        title: "",
        // from: "",
        endingTime: "",
      });
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error scheduling appointment:", error.response.data);
      console.log(formData);
    }
  };

  return (
    <div className="container-xxl">
      <div className="row align-items-center">
        <div className="border-0 mb-4">
          <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
            <h3 className="fw-bold mb-0">Appointment</h3>
            {userData.role==="Admin" && (
            <div className="dropdown">
              <select
                className="btn btn-primary form-control"
                id="dropdownMenuButton2"
                name="doctor"
                onChange={handleDoctorChange}
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
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-12">
          <div className="card mb-3">
            <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
              <h5 className="mb-0 fw-bold ">Available Slots</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3 align-items-center">
                  <div className="col-md-4">
                    <label className="form-label">Select Date</label>
                    <input
                      type="date"
                      name="selectedDate"
                      value={formData.selectedDate}
                      onChange={(e) => {
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          selectedDate: e.target.value,
                        }));
                      }}
                      className="form-control"
                    />
                  </div>
                </div>
                <br />
              </form>
              <br />
              <div className="row g-3 align-items-center">
                <div className="col-md-12">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Start Time</th>
                        <th scope="col">End Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {availableSlots.map((slot) => (
                        <tr key={slot._id}>
                          <td>{slot.startTime}</td>
                          <td>{slot.endTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <ToastContainer position="top-right" autoClose={3000} />
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        {/* Admission Form Card */}
        <div className="col-sm-12">
          <div className="card mb-3">
            <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
              <h5 className="mb-0 fw-bold">
                Fill in the form below to book an Appointment
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3 align-items-center">
                  <div className="col-md-6">
                    <label className="form-label">Select Patient</label>
                    <select
                      className="form-control"
                      onChange={handleSelectChange}
                    >
                      <option value="">Select patient</option>
                      {patients.map((patient) => (
                        <option key={patient._id} value={patient._id}>
                          {patient.firstName} {patient.lastName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="admitdate" className="form-label">
                      Appointment Date
                    </label>
                    <input
                      required
                      type="date"
                      name="appointmentDate"
                      value={formData.appointmentDate}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="admittime" className="form-label">
                      Appointment Start Time
                    </label>
                    <input
                      required
                      type="time"
                      name="startingTime"
                      value={formData.startingTime}
                      onChange={handleInputChange}
                      className="form-control"
                      id="title"
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="admittime" className="form-label">
                      Appointment End Time
                    </label>
                    <input
                      required
                      type="time"
                      name="endingTime"
                      value={formData.endingTime}
                      onChange={handleInputChange}
                      className="form-control"
                      id="title"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="admittime" className="form-label">
                      Title
                    </label>
                    <input
                      required
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="form-control"
                      id="firstname"
                    />
                  </div>

                  <div className="col-md-12">
                    <label htmlFor="addnote" className="form-label">
                      Add Note
                    </label>
                    <textarea
                      required
                      className="form-control"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      id="addnote"
                      rows={3}
                    />
                  </div>

                  <div className="col-md-12">
                    <button type="submit" className="btn btn-primary mt-4">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
              <ToastContainer position="top-right" autoClose={3000} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
