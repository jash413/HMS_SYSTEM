import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    patient: "",
    admissionDate: new Date().toISOString().split("T")[0],
    notes: "",
    admissionTime: "",
    doctor: "",
  });

  const [selectedPatientDetails, setSelectedPatientDetails] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3100/doctors").then((response) => {
      setDoctors(response.data);
    });
  }, []);

  useEffect(() => {
    if (formData.doctor) {
      axios.get(`http://localhost:3100/api/patients`).then((response) => {
        const allPatients = response.data;
        const doctorPatients = allPatients.filter(
          (patient) => patient.selectedDoctor === formData.doctor
        );
        setPatients(doctorPatients);
      });
    } else {
      setPatients([]); // Reset patients when no doctor is selected
    }
  }, [formData.doctor]);

  const handleDoctorChange = (e) => {
    const selectedDoctor = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      doctor: selectedDoctor,
      patient: "", // Clear the selected patient when doctor changes
    }));
    setSelectedPatientDetails(null); // Clear patient details
  };

  const handleSelectChange = (e) => {
    const selectedOption=e.target.value
    setFormData((prevData) => ({
      ...prevData,
      patient: selectedOption,
    }));

    axios
      .get(`http://localhost:3100/api/patients/${selectedOption}`)
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3100/docapc",
        formData
      );
      // // Update the patient's admission status & ward number
      // await axios.patch(
      //   `http://localhost:3100//:id/status${formData.patient}`,
      //   { admitted: true, ward: `${formData.wardNumber}` }
      // );
      // // Update the selected ward's status to "Occupied" and associate the patient
      // await axios.patch(
      //   `http://localhost:3100/api/ward/${formData.wardNumber}`,
      //   { status: "Occupied", patient: formData.patient }
      // );
      console.log(response.data);
      if (response.status === 201) {
        toast.success("Apointment created successfully");
      }
      // Clear form fields
      setFormData({
        patient: "",
        admissionDate: new Date().toISOString().split("T")[0],
        wardNumber: "",
        notes: "",
        admissionTime: "",
      });
      setSelectedPatientDetails(null);
    } catch (error) {
      toast.error(error.response.data.message);
      // console.log(formData);
      console.error(error);
    }
  };

  return (
    <div id="ihealth-layout" className="theme-tradewind">
      <div className="main px-lg-4 px-md-4">
        <div className="body d-flex py-3">
          <div className="container-xxl">
            <div className="row align-items-center">
              <div className="border-0 mb-4">
                <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                  <h3 className="fw-bold mb-0">Appointment</h3>
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
                          value={doctor.doctor_name}
                        >
                          {doctor.first_name} {doctor.last_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              {/* Patient Details Card */}
              <div className="col-sm-12">
                <div className="card mb-3">
                  <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                    <h5 className="mb-0 fw-bold ">Patient Details</h5>
                  </div>
                  <div className="card-body">
                    <div className="row g-3 align-items-center">
                      <div className="col-md-4">
                        {selectedPatientDetails && (
                          <h6 className="mb-0">
                            <b>Name:</b> {selectedPatientDetails.firstName}{" "}
                            {selectedPatientDetails.lastName}
                          </h6>
                        )}
                      </div>
                      <div className="col-md-4">
                        {selectedPatientDetails && (
                          <h6 className="mb-0">
                            <b>Email:</b> {selectedPatientDetails.emailAddress}
                          </h6>
                        )}
                      </div>
                    </div>
                    <br />
                    <div className="row g-3 align-items-center">
                      <div className="col-md-4">
                        {selectedPatientDetails && (
                          <h6 className="mb-0">
                            <b>Doctor:</b>{" "}
                            {selectedPatientDetails.selectedDoctor}
                          </h6>
                        )}
                      </div>
                      <div className="col-md-4">
                        {selectedPatientDetails && (
                          <h6 className="mb-0">
                            <b>Phone number:</b>{" "}
                            {selectedPatientDetails.phoneNumber}
                          </h6>
                        )}
                      </div>
                    </div>
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
                      Fill in the form below to admit a patient
                    </h5>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleFormSubmit}>
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
                            Admit Date
                          </label>
                          <input
                            required
                            type="date"
                            name="admissionDate"
                            value={formData.admissionDate}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                        </div>

                        <div className="col-md-6">
                          <label htmlFor="admittime" className="form-label">
                            Admit Time
                          </label>
                          <input
                            required
                            type="time"
                            name="admissionTime"
                            value={formData.admissionTime}
                            onChange={handleInputChange}
                            className="form-control"
                            id="admittime"
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
                          <button
                            type="submit"
                            className="btn btn-primary mt-4"
                          >
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
        </div>
      </div>
    </div>
  );
};

export default AdmissionForm;