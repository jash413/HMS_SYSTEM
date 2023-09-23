import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS
import { myContext, tokenContext } from "./Main";

const DischargeForm = () => {
  const userData = useContext(myContext);
  const token = useContext(tokenContext);
  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
    dischargeDate: "",
    dischargeTime: "",
    clinicalSummary: "",
    diagnosis: "",
    treatmentGiven: "",
    surgicalNotes: "",
    hospital_id: userData.hospital_id,
  });

  const [selectedPatientDetails, setSelectedPatientDetails] = useState(null);

  const loadOptions = (inputValue) => {
    return axios
      .get(`http://localhost:3100/api/patients/search?name=${inputValue}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const allPatients = response.data;
        const admittedPatients = allPatients.filter(
          (patient) =>
            patient.admitted === true &&
            patient.hospital_id === userData.hospital_id
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
      .get(`http://localhost:3100/api/patients/${selectedOption.value}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSelectedPatientDetails(response.data);
        setFormData((prevData) => ({
          ...prevData,
          doctor: response.data.doctor,
        }));
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
        "http://localhost:3100/discharge",
        formData
      );
      // Update the billing details
      await axios.patch(
        `http://localhost:3100/billing/patient/${formData.patient}`,
        {
          dischargeDate: formData.dischargeDate,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      // Update the patient's admission status & ward number
      await axios.patch(
        `http://localhost:3100/api/patients/${formData.patient}`,
        { admitted: false, ward: "" },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      // Update the selected ward's status to "Occupied" and associate the patient
      await axios.patch(
        `http://localhost:3100/api/ward/${selectedPatientDetails.ward}`,
        { status: "Vacant", patient: null },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.status === 201) {
        toast.success("Patient discharged successfully");
      }
      // Clear form fields
      setFormData({
        patient: "",
        doctor: "",
        dischargeDate: "",
        dischargeTime: "",
        clinicalSummary: "",
        diagnosis: "",
        treatmentGiven: "",
        surgicalNotes: "",
        hospital_id: userData.hospital_id,
      });
      setSelectedPatientDetails(null);
    } catch (error) {
      toast.error(error.response.data.message);
      // console.log(formData);
      console.error(error);
    }
  };
  
  const handleDischargeSummary = async () => {
    try {
      // Perform submission logic here
      const response = await axios.post(
        "http://localhost:3100/discharge/summary",
        {
          patient_id: formData.patient,
          dischargeDate: formData.dischargeDate,
          dischargeTime: formData.dischargeTime,
          clinicalSummary: formData.clinicalSummary,
          diagnosis: formData.diagnosis,
          treatmentGiven: formData.treatmentGiven,
          surgicalNotes: formData.surgicalNotes,
        },
        { responseType: "blob" }
      ,{
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      // Create a Blob object from the response data
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });

      // Create a URL for the Blob and trigger a download
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = `SUMMARY-${selectedPatientDetails.firstName}-${selectedPatientDetails.lastName}.pdf`;
      link.click();
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error generating consent form:", error);
    }
  };

  return (
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
                      <b>Doctor:</b> {selectedPatientDetails.selectedDoctor}
                    </h6>
                  )}
                </div>
                <div className="col-md-4">
                  {selectedPatientDetails && (
                    <h6 className="mb-0">
                      <b>Phone number:</b> {selectedPatientDetails.phoneNumber}
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
                </div>
                <br />
                <div className="row g-3 align-items-center">
                  <div className="col-md-6">
                    <label htmlFor="dischargeDate" className="form-label">
                      Discharge Date
                    </label>
                    <br />
                    <input
                      required
                      type="date"
                      name="dischargeDate"
                      value={formData.dischargeDate}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="dischargeTime" className="form-label">
                      Discharge Time
                    </label>
                    <input
                      required
                      type="time"
                      name="dischargeTime"
                      value={formData.dischargeTime}
                      onChange={handleInputChange}
                      className="form-control"
                      id="dischargeTime"
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="clinicalSummary" className="form-label">
                      Clinical Summary
                    </label>
                    <textarea
                      required
                      className="form-control"
                      name="clinicalSummary"
                      value={formData.clinicalSummary}
                      onChange={handleInputChange}
                      id="clinicalSummary"
                      rows={3}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="diagnosis" className="form-label">
                      Diagnosis
                    </label>
                    <textarea
                      required
                      name="diagnosis"
                      value={formData.diagnosis}
                      onChange={handleInputChange}
                      className="form-control"
                      id="diagnosis"
                      rows={3}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="treatmentGiven" className="form-label">
                      Treatment Given
                    </label>
                    <textarea
                      required
                      className="form-control"
                      name="treatmentGiven"
                      value={formData.treatmentGiven}
                      onChange={handleInputChange}
                      id="treatmentGiven"
                      rows={3}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="surgicalNotes" className="form-label">
                      Surgical Notes
                    </label>
                    <textarea
                      required
                      className="form-control"
                      name="surgicalNotes"
                      value={formData.surgicalNotes}
                      onChange={handleInputChange}
                      id="surgicalNotes"
                      rows={3}
                    />
                  </div>
                </div>
                <br />
                <div className="row g-3 align-items-center">
                  <div className="col-md-1">
                    <button type="submit" className="btn btn-primary mt-4">
                      Submit
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button
                      type="button"
                      className="btn btn-primary mt-4"
                      onClick={handleDischargeSummary}
                    >
                      Generate Discharge Summary
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

export default DischargeForm;
