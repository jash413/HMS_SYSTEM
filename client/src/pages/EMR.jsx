import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EMR = () => {
  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
  });
  const [vitalSigns, setVitalSigns] = useState({
    bloodPressure: "",
    heartRate: "",
    respiratoryRate: "",
    temperature: "",
  });
  const [selectedPatientDetails, setSelectedPatientDetails] = useState(null);
  const [doctorData, setDoctorData] = useState({});
  const [patients, setPatients] = useState([]);
  const [medicalHistory, setMedicalHistory] = useState({
    allergies: "",
    chronicConditions: "",
    surgeries: "",
    medications: "",
    familyHistory: "",
    immunizations: [{}],
  });

  const [prescriptions, setPrescriptions] = useState({
    prescribingPhysician: "",
    instructions: "",
    medication: "",
  });
  useEffect(() => {
    if (formData.doctor) {
      axios.get(`http://localhost:3100/api/patients`).then((response) => {
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
  const handleSelectChange = (e) => {
    const selectedOption = e.target.value;
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

  const [clinicalExaminations, setClinicalExaminations] = useState({
    noteDate: "",
    healthcareProvider: "",
    subjectiveNote: "",
    objectiveNote: "",
    assessment: "",
    plan: "",
  });

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3100/doctors").then((response) => {
      setDoctors(response.data);
    });
  }, []);

  const handleVitalSignsChange = (e) => {
    const { name, value } = e.target;
    setVitalSigns({
      ...vitalSigns,
      [name]: value,
    });
  };

  const handleMedicalHistoryChange = (e) => {
    const { name, value } = e.target;
    setMedicalHistory({
      ...medicalHistory,
      [name]: value,
    });
  };

  const handlePrescriptionsChange = (e) => {
    const { name, value } = e.target;
    setPrescriptions({
      ...prescriptions,
      [name]: value,
    });
  };

  const handleClinicalExaminationsChange = (e) => {
    const { name, value } = e.target;
    setClinicalExaminations({
      ...clinicalExaminations,
      [name]: value,
    });
  };

  const handleImmunizationChange = (e, index) => {
    const { name, value } = e.target;
    const updatedImmunizations = [...medicalHistory.immunizations];
    updatedImmunizations[index] = {
      ...updatedImmunizations[index],
      [name]: value,
    };
    setMedicalHistory({
      ...medicalHistory,
      immunizations: updatedImmunizations,
    });
  };

  const handleAddImmunization = () => {
    setMedicalHistory({
      ...medicalHistory,
      immunizations: [...medicalHistory.immunizations, {}],
    });
  };
  const handleRemoveImmunization = (index) => {
    const updatedImmunizations = [...medicalHistory.immunizations];
    updatedImmunizations.splice(index, 1);
    setMedicalHistory((prevData) => ({
      ...prevData,
      immunizations: updatedImmunizations,
    }));
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
      .get(`http://localhost:3100/doctors/${selectedDoctor}`)
      .then((response) => {
        setDoctorData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctor details:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      vitalSigns,
      medicalHistory,
      clinicalExaminations,
      prescriptions,
    };

    // Send formData to your backend API for storage

    // Optionally, you can reset the form fields
    setVitalSigns({
      bloodPressure: "",
      heartRate: "",
      respiratoryRate: "",
      temperature: "",
    });
    setMedicalHistory({
      allergies: "",
      chronicConditions: "",
      surgeries: "",
      medications: "",
      familyHistory: "",
      immunizations: [{}],
    });
    setClinicalExaminations({
      noteDate: "",
      healthcareProvider: "",
      subjectiveNote: "",
      objectiveNote: "",
      assessment: "",
      plan: "",
    });
    setPrescriptions({
      prescribingPhysician: "",
      instructions: "",
      medication: "",
    });
  };

  return (
    <div className="container-xxl">
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
                value={doctor._id}
              >
                {doctor.first_name} {doctor.last_name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <select className="form-control" onChange={handleSelectChange}>
            <option value="">Select patient</option>
            {patients.map((patient) => (
              <option key={patient._id} value={patient._id}>
                {patient.firstName} {patient.lastName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Vital Signs section */}
        <div className="row mb-3">
          <div className="col-sm-12">
            <div className="card mb-3">
              <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                <h6 className="mb-0 fw-bold">Vital Signs of Patient</h6>
              </div>
              <div className="card-body">
                <div className="row g-3 align-items-center">
                  <div className="col-md-6">
                    <label htmlFor="bloodPressure" className="form-label">
                      Blood Pressure
                    </label>
                    <input
                      required
                      type="text"
                      name="bloodPressure"
                      value={vitalSigns.bloodPressure}
                      onChange={handleVitalSignsChange}
                      className="form-control"
                      id="bloodPressure"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="heartRate" className="form-label">
                      Heart Rate
                    </label>
                    <input
                      required
                      type="text"
                      name="heartRate"
                      value={vitalSigns.heartRate}
                      onChange={handleVitalSignsChange}
                      className="form-control"
                      id="heartRate"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="respiratoryRate" className="form-label">
                      Respiratory Rate
                    </label>
                    <input
                      required
                      type="text"
                      name="respiratoryRate"
                      value={vitalSigns.respiratoryRate}
                      onChange={handleVitalSignsChange}
                      className="form-control"
                      id="respiratoryRate"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="temperature" className="form-label">
                      Temperature
                    </label>
                    <input
                      required
                      type="text"
                      name="temperature"
                      value={vitalSigns.temperature}
                      onChange={handleVitalSignsChange}
                      className="form-control"
                      id="temperature"
                    />
                  </div>
                </div>
                <br />
                {/* ... */}
              </div>
            </div>
          </div>
        </div>

        {/* Medical History section */}
        <div className="row mb-3">
          <div className="col-sm-12">
            <div className="card mb-3">
              <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                <h6 className="mb-0 fw-bold">Medical History</h6>
              </div>
              <div className="card-body">
                <div className="row g-3 align-items-center">
                  <div className="col-md-6">
                    <label htmlFor="allergies" className="form-label">
                      Allergies
                    </label>
                    <input
                      required
                      type="text"
                      name="allergies"
                      value={medicalHistory.allergies}
                      onChange={handleMedicalHistoryChange}
                      className="form-control"
                      id="allergies"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="chronicConditions" className="form-label">
                      Chronic Conditions
                    </label>
                    <input
                      required
                      type="text"
                      name="chronicConditions"
                      value={medicalHistory.chronicConditions}
                      onChange={handleMedicalHistoryChange}
                      className="form-control"
                      id="chronicConditions"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="surgeries" className="form-label">
                      Surgeries
                    </label>
                    <input
                      required
                      type="text"
                      name="surgeries"
                      value={medicalHistory.surgeries}
                      onChange={handleMedicalHistoryChange}
                      className="form-control"
                      id="surgeries"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="medications" className="form-label">
                      Medications
                    </label>
                    <input
                      type="text"
                      name="medications"
                      value={medicalHistory.medications}
                      onChange={handleMedicalHistoryChange}
                      className="form-control"
                      id="medications"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="familyHistory" className="form-label">
                      Family History
                    </label>
                    <input
                      type="text"
                      name="familyHistory"
                      value={medicalHistory.familyHistory}
                      onChange={handleMedicalHistoryChange}
                      className="form-control"
                      id="familyHistory"
                    />
                  </div>
                </div>
                {/* Immunizations */}
                <div className="mt-4">
                  <h6>Immunizations</h6>
                  {medicalHistory.immunizations.map((immunization, index) => (
  <div key={index}>
    <div className="row g-3 align-items-center">
      <div className="col-md-4">
        <label className="form-label">Vaccine Name</label>
        <input
          type="text"
          name="vaccineName"
          value={immunization.vaccineName}
          onChange={(e) => handleImmunizationChange(e, index)}
          className="form-control"
        />
      </div>
      <div className="col-md-4">
        <label className="form-label">Vaccine Date</label>
        <input
          type="date"
          name="vaccineDate"
          value={immunization.vaccineDate}
          onChange={(e) => handleImmunizationChange(e, index)}
          className="form-control"
        />
      </div>
      <div className="col-md-3">
        <label className="form-label">Administered By</label>
        <input
          type="text"
          name="administeredBy"
          value={immunization.administeredBy}
          onChange={(e) => handleImmunizationChange(e, index)}
          className="form-control"
        />
      </div>
      {index > 0 && (
        <div className="col-md-1">
          <button
            type="button"
            className="btn btn-danger custom-button"
            onClick={() => handleRemoveImmunization(index)}
          >
            <span aria-hidden="true" style={colo}>×</span>
          </button>
        </div>
      )}
    </div>
    {index === medicalHistory.immunizations.length - 1 && (
      <div className="d-flex justify-content-between mt-2">
        <button
          type="button"
          className="btn btn-primary custom-button"
          onClick={handleAddImmunization}
        >
          Add Another Immunization
        </button>
      </div>
    )}
  </div>
))}

                </div>
                {/* End Immunizations */}
              </div>
            </div>
          </div>
        </div>

        {/* Prescriptions section */}
        <div className="row mb-3">
          <div className="col-sm-12">
            <div className="card mb-3">
              <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                <h6 className="mb-0 fw-bold">Prescriptions</h6>
              </div>
              <div className="card-body">
                <div className="row g-3 align-items-center">
                  <div className="col-md-6">
                    <label
                      htmlFor="prescribingPhysician"
                      className="form-label"
                    >
                      Prescribing Physician
                    </label>
                    <input
                      required
                      type="text"
                      name="prescribingPhysician"
                      value={prescriptions.prescribingPhysician}
                      onChange={handlePrescriptionsChange}
                      className="form-control"
                      id="prescribingPhysician"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="instructions" className="form-label">
                      Instructions
                    </label>
                    <input
                      required
                      type="text"
                      name="instructions"
                      value={prescriptions.instructions}
                      onChange={handlePrescriptionsChange}
                      className="form-control"
                      id="instructions"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="medication" className="form-label">
                      Medication
                    </label>
                    <input
                      required
                      type="text"
                      name="medication"
                      value={prescriptions.medication}
                      onChange={handlePrescriptionsChange}
                      className="form-control"
                      id="medication"
                    />
                  </div>
                  {/* Add more prescription-related fields here */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Examinations section */}
        <div className="row mb-3">
          <div className="col-sm-12">
            <div className="card mb-3">
              <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                <h6 className="mb-0 fw-bold">Clinical Examinations</h6>
              </div>
              <div className="card-body">
                <div className="row g-3 align-items-center">
                  <div className="col-md-6">
                    <label htmlFor="noteDate" className="form-label">
                      Note Date
                    </label>
                    <input
                      required
                      type="date"
                      name="noteDate"
                      value={clinicalExaminations.noteDate}
                      onChange={handleClinicalExaminationsChange}
                      className="form-control"
                      id="noteDate"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="healthcareProvider" className="form-label">
                      Healthcare Provider
                    </label>
                    <input
                      required
                      type="text"
                      name="healthcareProvider"
                      value={clinicalExaminations.healthcareProvider}
                      onChange={handleClinicalExaminationsChange}
                      className="form-control"
                      id="healthcareProvider"
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="subjectiveNote" className="form-label">
                      Subjective Note
                    </label>
                    <textarea
                      required
                      name="subjectiveNote"
                      value={clinicalExaminations.subjectiveNote}
                      onChange={handleClinicalExaminationsChange}
                      className="form-control"
                      id="subjectiveNote"
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <label htmlFor="objectiveNote" className="form-label">
                      Objective Note
                    </label>
                    <textarea
                      required
                      name="objectiveNote"
                      value={clinicalExaminations.objectiveNote}
                      onChange={handleClinicalExaminationsChange}
                      className="form-control"
                      id="objectiveNote"
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <label htmlFor="assessment" className="form-label">
                      Assessment
                    </label>
                    <textarea
                      required
                      name="assessment"
                      value={clinicalExaminations.assessment}
                      onChange={handleClinicalExaminationsChange}
                      className="form-control"
                      id="assessment"
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <label htmlFor="plan" className="form-label">
                      Plan
                    </label>
                    <textarea
                      required
                      name="plan"
                      value={clinicalExaminations.plan}
                      onChange={handleClinicalExaminationsChange}
                      className="form-control"
                      id="plan"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EMR;
