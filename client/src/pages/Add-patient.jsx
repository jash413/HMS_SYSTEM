import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS

const PatientForm = () => {
  const [patientData, setPatientData] = useState({
    // Initialize state for patient data fields
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    admitDate: "",
    admitTime: "",
    gender: "Male",
    addNote: "",
    paymentOption: "",
    insuranceInformation: "false",
    insuranceNumber: "",
    wardNumber: "",
    doctor: "",
    advanceAmount: ""
  });

  const [insurance, setInsurance] = useState(true);
  const [doctors, setDoctors] = useState([]);

    useEffect(() => {
    axios.get("http://localhost:3100/doctors").then((response) => {
      setDoctors(response.data);
    });
  }, []);

  const handleInsurance = (event) => {
    if (event.target.value === "true") {
      setInsurance(false);
    } else {
      setInsurance(true);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setPatientData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      for (const key in patientData) {
        formData.append(key, patientData[key]);
      }

      const response = await axios.post(
        "http://localhost:3100/api/patients",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        toast.success("Patient created successfully");
      }

      console.log("Patient created:", response.data);
      // Reset the form after successful submission
      setPatientData({
        // Reset patient data fields
        firstName: "",
        lastName: "",
        phoneNumber: "",
        emailAddress: "",
        admitDate: "",
        admitTime: "",
        gender: "",
        addNote: "",
        paymentOption: "",
        insuranceInformation: "false",
        insuranceNumber: "",
        wardNumber: "",
        doctor: "",
        advanceAmount: ""
      });
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error creating patient:", error.response.data);
      console.log(patientData);
    }
  };

  return (
    <div id="ihealth-layout" className="theme-tradewind">
      
      {/* main body area */}
      <div className="main px-lg-4 px-md-4">
        {/* Body: Header */}
        <div className="header">
          
        </div>
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
                    <form onSubmit={handleSubmit}>
                      <div className="row g-3 align-items-center">
                        <div className="col-md-6">
                          <label htmlFor="firstname" className="form-label">
                            First Name
                          </label>
                          <input
                            required
                            type="text"
                            name="firstName"
                            value={patientData.firstName}
                            onChange={handleInputChange}
                            className="form-control"
                            id="firstname"
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="lastname" className="form-label">
                            Last Name
                          </label>
                          <input
                            required
                            type="text"
                            name="lastName"
                            value={patientData.lastName}
                            onChange={handleInputChange}
                            className="form-control"
                            id="lastname"
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="phonenumber" className="form-label">
                            Phone Number
                          </label>
                          <input
                            required
                            type="text"
                            name="phoneNumber"
                            value={patientData.phoneNumber}
                            onChange={handleInputChange}
                            className="form-control"
                            id="phonenumber"
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="emailaddress" className="form-label">
                            Email Address
                          </label>
                          <input
                            required
                            type="email"
                            name="emailAddress"
                            value={patientData.emailAddress}
                            onChange={handleInputChange}
                            className="form-control"
                            id="emailaddress"
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="admitdate" className="form-label">
                            Admit Date
                          </label>
                          <input
                            required
                            type="date"
                            name="admitDate"
                            value={patientData.admitDate}
                            onChange={handleInputChange}
                            className="form-control"
                            id="admitdate"
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="admittime" className="form-label">
                            Admit Time
                          </label>
                          <input
                            required
                            type="time"
                            name="admitTime"
                            value={patientData.admitTime}
                            onChange={handleInputChange}
                            className="form-control"
                            id="admittime"
                          />
                        </div>
                        {/* <div className="col-md-6">
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
                        </div> */}
                        <div className="col-md-6">
                          <label className="form-label">Gender</label>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-check">
                                <input
                                  required
                                  className="form-check-input"
                                  type="radio"
                                  name="gender"
                                  value="Male"
                                  checked={patientData.gender === "Male"}
                                  onChange={handleInputChange}
                                  id="exampleRadios11"
                                  defaultChecked
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="exampleRadios11"
                                >
                                  Male
                                </label>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-check">
                                <input
                                  required
                                  className="form-check-input"
                                  type="radio"
                                  name="gender"
                                  value="female"
                                  checked={patientData.gender === "Female"}
                                  onChange={handleInputChange}
                                  id="exampleRadios22"
                                  defaultValue="option2"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="exampleRadios22"
                                >
                                  Female
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <br />
                      <div className="row g-3 align-items-center">
                        <div className="col-md-6">
                          <label className="form-label">
                            Select Payment Option
                          </label>
                          <select
                            required    
                            className="form-select"
                            aria-label="Default select example"
                            name="paymentOption"
                            value={patientData.paymentOption}
                            onChange={handleInputChange}
                          >
                            <option>Payment Option</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="Debit Card">Debit Card</option>
                            <option value="Upi">Upi</option>
                            <option value="Cash">Cash</option>
                            <option disabled={insurance} value="Cashless">
                              Cashless(Insurance)
                            </option>
                          </select>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">
                            Insurance Information
                          </label>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-check">
                                <input
                                  required    
                                  onClick={handleInsurance}
                                  className="form-check-input"
                                  type="radio"
                                  name="insuranceInformation"
                                  value="true"
                                  checked={
                                    patientData.insuranceInformation === "true"
                                  }
                                  onChange={handleInputChange}
                                  id="exampleRadios1"
                                  defaultValue="true"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="exampleRadios1"
                                >
                                  Yes I have Insurance
                                </label>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-check">
                                <input
                                  onClick={handleInsurance}
                                  className="form-check-input"
                                  type="radio"
                                  name="insuranceInformation"
                                  value="false"
                                  checked={
                                    patientData.insuranceInformation === "false"
                                  }
                                  onChange={handleInputChange}
                                  id="exampleRadios2"
                                  defaultValue="false"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="exampleRadios2"
                                >
                                  No I don't have Insurance
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="insinfo" className="form-label">
                            Insurance Number
                          </label>
                          <input
                            disabled={insurance}
                            type="text"
                            name="insuranceNumber"
                            value={patientData.insuranceNumber}
                            onChange={handleInputChange}
                            className="form-control"
                            id="insinfo"
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="roominfo" className="form-label">
                            Ward Number
                          </label>
                          <input
                            required
                            type="text"
                            name="wardNumber"
                            value={patientData.wardNumber}
                            onChange={handleInputChange}
                            className="form-control"
                            id="roominfo"
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Select Doctor</label>
                          <select
                            required
                            type="text"
                            name="doctor"
                            value={patientData.doctor}
                            onChange={handleInputChange}
                            className="form-select"
                            aria-label="Default select example"
                          >
                        <option value="">Select Doctor</option>    
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
                        <div className="col-md-6">
                          <label
                            htmlFor="advancepayment"
                            className="form-label"
                          >
                            Advance Amount
                          </label>
                          <input
                            required
                            type="text"
                            name="advanceAmount"
                            value={patientData.advanceAmount}
                            onChange={handleInputChange}
                            className="form-control"
                            id="advancepayment"
                          />
                        </div>
                      </div>
                      <br />
                      <div className="col-md-12">
                        <label htmlFor="addnote" className="form-label">
                          Add Note
                        </label>
                        <textarea
                          required
                          className="form-control"
                          name="addNote"
                          value={patientData.addNote}
                          onChange={handleInputChange}
                          id="addnote"
                          rows={3}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary mt-4">
                        Submit
                      </button>
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

export default PatientForm;
