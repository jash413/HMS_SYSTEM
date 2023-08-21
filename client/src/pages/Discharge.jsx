import React, { useState } from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS

const DischargeForm = () => {
  const [formData, setFormData] = useState({
    patient: "",
    dischargeDate: new Date().toISOString().split("T")[0],
    ward: "",
    notes: "",
    dischargeTime: "",
  });

  const [selectedPatientDetails, setSelectedPatientDetails] = useState(null);

  const loadOptions = (inputValue) => {
    return axios
      .get(`http://localhost:3100/api/patients/search?name=${inputValue}`)
      .then((response) => {
        const allPatients = response.data;
        const admittedPatients = allPatients.filter(
          (patient) => patient.admitted === true
        );
        console.log(admittedPatients);
        return admittedPatients.map((patient) => ({
          value: patient._id,
          label: `${patient.firstName} ${patient.lastName}- ${patient.patient_id}`,
        }));
      });
  };

  const handleSelectChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      patient: selectedOption.value,
    }));

    // Get the selected patient's details
    axios
      .get(`http://localhost:3100/api/patients/${selectedOption.value}`)
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
      ward: selectedPatientDetails.ward,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update the patient's admission status & ward number
      const response = await axios.patch(
        `http://localhost:3100/api/patients/${formData.patient}`,
        {
          admitted: false,
          ward: null,
          dischargeDate: formData.dischargeDate,
          dischargeTime: formData.dischargeTime,
        }
      );
      // Update the selected ward's status to "Occupied" and associate the patient
      await axios.patch(
        `http://localhost:3100/api/ward/${selectedPatientDetails.ward}`,
        { status: "Vacant", patient: null }
      );
      console.log(selectedPatientDetails.ward);
      if (response.status === 201) {
        toast.success("Patient discharged successfully");
      }
      // Clear form fields
      setFormData({
        patient: "",
        dischargeDate: new Date().toISOString().split("T")[0],
        ward: "",
        notes: "",
        dischargeTime: "",
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
      {/* main body area */}
      <div className="main px-lg-4 px-md-4">
        {/* Body: Body */}
        <div className="body d-flex py-3">
          <div className="container-xxl">
            <div className="row align-items-center">
              <div className="border-0 mb-4">
                <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                  <h3 className="fw-bold mb-0">Discharge</h3>
                </div>
              </div>
            </div>{" "}
            {/* Row end  */}
            <div className="row mb-3">
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
                <div className="card mb-3">
                  <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                    <h5 className="mb-0 fw-bold ">
                      Fill in the form below to discharge a patient
                    </h5>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleFormSubmit}>
                      <div className="row g-3 align-items-center">
                        <div className="col-md-6">
                          <label className="form-label">Select Patient</label>
                          <AsyncSelect
                            value={formData.patient.value}
                            onChange={handleSelectChange}
                            loadOptions={loadOptions}
                            isSearchable
                            placeholder="Search for a patient..."
                            noOptionsMessage={() => null}
                          />
                        </div>
                        {/* <div className="col-md-6">
                          <label htmlFor="admittime" className="form-label">
                            Ward Number
                          </label>
                          <br />
                          <select
                            name="wardNumber"
                            value={formData.wardNumber}
                            onChange={handleInputChange}
                            className="form-select"
                          >
                            <option value="">Select a ward number</option>
                            {vacantWards.map((ward) => (
                              <option key={ward._id} value={ward.wardNumber}>
                                {ward.wardNumber}-{ward.type}
                              </option>
                            ))}
                          </select>
                        </div> */}
                        <div className="col-md-6">
                          <label htmlFor="admitdate" className="form-label">
                            Discharge Date
                          </label>
                          <br />
                          <input
                            required
                            type="date"
                            name="dischargeDate"
                            value={formData.admissionDate}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                        </div>

                        <div className="col-md-6">
                          <label htmlFor="admittime" className="form-label">
                            Discharge Time
                          </label>
                          <input
                            required
                            type="time"
                            name="dischargeTime"
                            value={formData.dischargeTime}
                            onChange={handleInputChange}
                            className="form-control"
                            id="admittime"
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
                          name="notes"
                          value={formData.notes}
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

export default DischargeForm;
