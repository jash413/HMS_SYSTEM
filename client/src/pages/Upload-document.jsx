import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS

function UploadDocument() {
  const [file, setFile] = useState(null);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");



  const fetchPatients = async () => {
    try {
      const response = await axios.get("https://backendmedisys.webwisesolution.me/api/patients");
      setPatients(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch the list of patients from the backend
    fetchPatients();
  }, []);

  const handlePatientChange = (event) => {
    setSelectedPatient(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedPatient) {
      alert("Please select a patient.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("patientId", selectedPatient);

    try {
      const response = await axios.post(
        "https://backendmedisys.webwisesolution.me/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
            if (response.status === 201) {
        toast.success("File uploaded successfully");
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="ihealth-layout" className="theme-tradewind">
      {/* sidebar */}
      <div className="sidebar px-4 py-4 py-md-5 me-0">
        <div className="d-flex flex-column h-100">
          <a href="index.html" className="mb-0 brand-icon">
            <span className="logo-icon">
              <i className="icofont-heart-beat fs-2" />
            </span>
            <span className="logo-text">I-Health</span>
          </a>
          {/* Menu: main ul */}
          <ul className="menu-list flex-grow-1 mt-3">
            <li className="collapsed">
              <a
                className="m-link"
                data-bs-toggle="collapse"
                data-bs-target="#dashboard"
                href="#"
              >
                <i className="icofont-ui-home fs-5" /> <span>Dashboard</span>{" "}
                <span className="arrow icofont-rounded-down ms-auto text-end fs-5" />
              </a>
              {/* Menu: Sub menu ul */}
              <ul className="sub-menu collapse" id="dashboard">
                <li>
                  <a className="ms-link" href="index.html">
                    Hospital Dashboard
                  </a>
                </li>
                <li>
                  <a className="ms-link" href="coviddashboard.html">
                    {" "}
                    Covid-19 Dashboard
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a className="m-link" href="virtual.html">
                <i className="icofont-ui-video-chat fs-5" />{" "}
                <span>I-Health Virtual</span>
              </a>
            </li>
            <li className="collapsed">
              <a
                className="m-link"
                data-bs-toggle="collapse"
                data-bs-target="#menu-Doctor"
                href="#"
              >
                <i className="icofont-doctor-alt fs-5" /> <span>Doctor</span>{" "}
                <span className="arrow icofont-rounded-down ms-auto text-end fs-5" />
              </a>
              {/* Menu: Sub menu ul */}
              <ul className="sub-menu collapse" id="menu-Doctor">
                <li>
                  <a className="ms-link" href="doctor-all.html">
                    All Doctors
                  </a>
                </li>
                <li>
                  <a className="ms-link" href="doctor-add.html">
                    Add Doctor
                  </a>
                </li>
                <li>
                  <a className="ms-link" href="appointment.html">
                    Appointment
                  </a>
                </li>
                <li>
                  <a className="ms-link" href="doctor-profile.html">
                    Doctors Profile
                  </a>
                </li>
                <li>
                  <a className="ms-link" href="doctor-schedule.html">
                    Doctor Schedule
                  </a>
                </li>
              </ul>
            </li>
            <li className="collapsed">
              <a
                className="m-link active"
                data-bs-toggle="collapse"
                data-bs-target="#menu-Patient"
                href="#"
              >
                <i className="icofont-blind fs-5" /> <span>Patient</span>{" "}
                <span className="arrow icofont-rounded-down ms-auto text-end fs-5" />
              </a>
              {/* Menu: Sub menu ul */}
              <ul className="sub-menu collapse show" id="menu-Patient">
                <li>
                  <a className="ms-link" href="patient-list.html">
                    Patient List
                  </a>
                </li>
                <li>
                  <a className="ms-link active" href="patient-add.html">
                    Add Patient
                  </a>
                </li>
                <li>
                  <a className="ms-link" href="patient-profile.html">
                    Patient Profile
                  </a>
                </li>
                <li>
                  <a className="ms-link" href="patient-invoices.html">
                    Patient Invoices
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a className="m-link" href="accidents.html">
                <i className="icofont-stretcher fs-5" /> <span>Accidents</span>
              </a>
            </li>
            <li>
              <a className="m-link" href="labs.html">
                <i className="icofont-blood-test fs-5" /> <span>Labs</span>
              </a>
            </li>
            <li>
              <a className="m-link" href="department.html">
                <i className="icofont-hospital fs-5" /> <span>Department</span>
              </a>
            </li>
            <li className="collapsed">
              <a
                className="m-link"
                data-bs-toggle="collapse"
                data-bs-target="#menu-Componentsone"
                href="#"
              >
                <i className="icofont-ui-calculator" /> <span>Accounts</span>{" "}
                <span className="arrow icofont-rounded-down ms-auto text-end fs-5" />
              </a>
              {/* Menu: Sub menu ul */}
              <ul className="sub-menu collapse" id="menu-Componentsone">
                <li>
                  <a className="ms-link" href="invoices.html">
                    <span>Invoices</span>{" "}
                  </a>
                </li>
                <li>
                  <a className="ms-link" href="payments.html">
                    <span>Payments</span>{" "}
                  </a>
                </li>
                <li>
                  <a className="ms-link" href="expenses.html">
                    <span>Expenses</span>{" "}
                  </a>
                </li>
              </ul>
            </li>
            <li className="collapsed">
              <a
                className="m-link"
                data-bs-toggle="collapse"
                data-bs-target="#app"
                href="#"
              >
                <i className="icofont-code-alt fs-5" /> <span>App</span>{" "}
                <span className="arrow icofont-rounded-down ms-auto text-end fs-5" />
              </a>
              {/* Menu: Sub menu ul */}
              <ul className="sub-menu collapse" id="app">
                <li>
                  <a className="ms-link" href="calendar.html">
                    Calandar
                  </a>
                </li>
                <li>
                  <a className="ms-link" href="chat.html">
                    {" "}
                    Communication
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a className="m-link" href="ui-elements/ui-alerts.html">
                <i className="icofont-paint fs-5" /> <span>UI Components</span>
              </a>
            </li>
            <li className="collapsed">
              <a
                className="m-link"
                data-bs-toggle="collapse"
                data-bs-target="#page"
                href="#"
              >
                <i className="icofont-page fs-5" /> <span>Pages Example</span>{" "}
                <span className="arrow icofont-rounded-down ms-auto text-end fs-5" />
              </a>
              {/* Menu: Sub menu ul */}
              <ul className="sub-menu collapse" id="page">
                <li>
                  <a className="ms-link" href="table.html">
                    Table Example
                  </a>
                </li>
                <li>
                  <a className="ms-link" href="forms.html">
                    {" "}
                    Forms Example
                  </a>
                </li>
                <li>
                  <a className="ms-link" href="icon.html">
                    {" "}
                    Icons Example
                  </a>
                </li>
                <li>
                  <a className="ms-link" href="contact.html">
                    {" "}
                    Contact Example
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          {/* Menu: menu collepce btn */}
          <button
            type="button"
            className="btn btn-link sidebar-mini-btn text-light"
          >
            <span className="ms-2">
              <i className="icofont-bubble-right" />
            </span>
          </button>
        </div>
      </div>
      {/* main body area */}
      <div className="main px-lg-4 px-md-4">
        {/* Body: Header */}

        {/* Body: Body */}
        <div className="body d-flex py-3">
          <div className="container-xxl">
            <div className="row align-items-center">
              <div className="border-0 mb-4">
                <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                  <h3 className="fw-bold mb-0">Add Patients</h3>
                </div>
              </div>
            </div>{" "}
            {/* Row end  */}
            <div className="row mb-3">
              <div className="col-sm-12">
                <div className="card mb-3">
                  <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                    <h6 className="mb-0 fw-bold ">
                      Patients Basic Inforamtion
                    </h6>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleFileUpload}>
                      <div className="row g-3 align-items-center">
                        <div className="col-md-6">
                          <label className="form-label">Select Patient</label>
                          <select
                            required
                            className="form-select"
                            aria-label="Default select example"
                            name="patientOption"
                            value={selectedPatient}
                            onChange={handlePatientChange}
                          >
                            <option value="">Select a patient</option>
                            {patients.map((patient) => (
                              <option key={patient._id} value={patient._id}>
                                {patient.firstName} {patient.lastName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {/* <br /> */}
                      {/* <div className="row g-3 align-items-center">
  <div className="col-md-6">
    <label className="form-label">
      Select Document
    </label>
    <select
      required    
      className="form-select"
      aria-label="Default select example"
      name="paymentOption"
    >
      <option>Document Option</option>
      <option value="Credit Card">Credit Card</option>
      <option value="Debit Card">Debit Card</option>
      <option value="Upi">Upi</option>
      <option value="Cash">Cash</option>
    </select>
  </div>
</div> */}
                      <br />
                      <div className="row g-3 align-items-center">
                        <div className="col-md-6">
                          <label
                            htmlFor="formFileMultiple"
                            className="form-label"
                          >
                            Files Document Upload
                          </label>
                          <input
                            className="form-control"
                            type="file"
                            name="filesDocumentUpload"
                            multiple
                            onChange={handleFileChange}
                            id="formFileMultiple"
                          />
                        </div>
                      </div>

                      <button type="submit" className="btn btn-primary mt-4">
                        Submit
                      </button>
                    </form>
                    <ToastContainer position="top-right" autoClose={4000} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadDocument;
