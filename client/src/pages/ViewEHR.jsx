import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { myContext, tokenContext } from "./Main";

function ViewEHR() {
  const userData = useContext(myContext);
  const token = useContext(tokenContext);

  // ID of patient and doctor
  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
  });

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  // Form data
  const [vitalsigns, setvitalsigns] = useState({
    patient: "",
    bloodPressure: "",
    heartRate: "",
    respiratoryRate: "",
    temperature: "",
  });

  const [medicalhistory, setmedicalhistory] = useState({
    patient: "",
    allergies: "",
    conditions: "",
    surgeries: "",
    medications: "",
    familyHistory: "",
    immunizations: [{}],
  });

  const [prescriptions, setPrescriptions] = useState({
    patient: "",
    doctor: "",
    medicines: [{}],
  });

  const [clinicalexaminations, setclinicalexaminations] = useState({
    patient: "",
    noteDate: "",
    healthcareProvider: "",
    subjectiveNote: "",
    objectiveNote: "",
    assessment: "",
    plan: "",
  });
  // selected resources details
  const [selectedPatientDetails, setSelectedPatientDetails] = useState(null);
  const [doctorData, setDoctorData] = useState({});
  const handleSelectChange = (e) => {
    const selectedOption = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      patient: selectedOption,
    }));

    axios
      .get(`http://localhost:3100/api/patients/${selectedOption}`, {
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

  // fetch doctors
  useEffect(() => {
    axios
      .get("http://localhost:3100/doctors", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDoctors(response.data);
      });
  }, []);
  useEffect(() => {
    if (formData.doctor) {
      axios
        .get(`http://localhost:3100/api/patients`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
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
  const handleDoctorChange = (e) => {
    const selectedDoctor = e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      doctor: selectedDoctor,
      patient: "", // Clear the selected patient when doctor changes
    }));
    setSelectedPatientDetails(null); // Clear patient details
    axios
      .get(`http://localhost:3100/doctors/${selectedDoctor}`, {
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

  // fetch records
  useEffect(() => {
    const vitals = `http://localhost:3100/ehr/vitalsigns/${formData.patient}`;
    const examinations = `http://localhost:3100/ehr/ClinicalExaminations/${formData.patient}`;
    const precriptions = `http://localhost:3100/ehr/prescriptions/${formData.patient}`;
    const history = `http://localhost:3100/ehr/medicalhistory/${formData.patient}`;

    // Helper function to handle API requests and set state
    const fetchData = async (url, setStateFunction) => {
      try {
        const response = await axios.get(url, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setStateFunction(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error, e.g., show an error message to the user
      }
    };

    // Fetch data for each section, handling errors
    fetchData(vitals, setvitalsigns);
    fetchData(examinations, setclinicalexaminations);
    fetchData(precriptions, setPrescriptions);
    fetchData(history, setmedicalhistory);
  }, [formData.patient]);

  console.log(formData.patient);
  console.log(patients);
  return (
    <div className="container-xxl">
      <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
        <h3 className="fw-bold mb-0">
          <strong>View-EHR</strong>
        </h3>
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
              <strong>Select Doctor</strong>
            </option>
            {doctors.map((doctor) => (
              <option
                style={{ backgroundColor: "white", color: "black" }}
                key={doctor._id}
                value={doctor._id}
              >
                <strong>
                  {doctor.first_name} {doctor.last_name}
                </strong>
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <select className="form-control" onChange={handleSelectChange}>
            <option value="">
              <strong>Select patient</strong>
            </option>
            {patients.map((patient) => (
              <option key={patient._id} value={patient._id}>
                <strong>
                  {patient.firstName} {patient.lastName}
                </strong>
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Vital Signs section */}
      <div className="row mb-3">
        <div className="col-sm-12">
          <div className="card mb-3">
            <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
              <h6 className="mb-0 fw-bold">
                <strong>Vital Signs of Patient</strong>
              </h6>
            </div>
            <div className="card-body">
              <div className="row g-3 align-items-center">
                <div className="col-md-6">
                  <label htmlFor="bloodPressure" className="form-label">
                    <strong>Blood Pressure</strong>
                  </label>
                  <div>{vitalsigns?.bloodPressure || "N/A"}</div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="heartRate" className="form-label">
                    <strong>Heart Rate</strong>
                  </label>
                  <div>{vitalsigns?.heartRate || "N/A"}</div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="respiratoryRate" className="form-label">
                    <strong>Respiratory Rate</strong>
                  </label>
                  <div>{vitalsigns?.respiratoryRate || "N/A"}</div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="temperature" className="form-label">
                    <strong>Temperature</strong>
                  </label>
                  <div>{vitalsigns?.temperature || "N/A"}</div>
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
              <h6 className="mb-0 fw-bold">
                <strong>Medical History</strong>
              </h6>
            </div>
            <div className="card-body">
              <div className="row g-3 align-items-center">
                <div className="col-md-6">
                  <label htmlFor="allergies" className="form-label">
                    <strong>Allergies</strong>
                  </label>
                  <div>{medicalhistory?.allergies || "N/A"}</div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="chronicConditions" className="form-label">
                    <strong>Chronic Conditions</strong>
                  </label>
                  <div>{medicalhistory?.conditions || "N/A"}</div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="surgeries" className="form-label">
                    <strong>Surgeries</strong>
                  </label>
                  <div>{medicalhistory?.surgeries || "N/A"}</div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="medications" className="form-label">
                    <strong>Medications</strong>
                  </label>
                  <div>{medicalhistory?.medications || "N/A"}</div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="familyHistory" className="form-label">
                    <strong>Family History</strong>
                  </label>
                  <div>{medicalhistory?.familyHistory || "N/A"}</div>
                </div>
              </div>
              {/* Immunizations */}
              <div className="mt-4">
                <h6 className="mb-0 fw-bold">
                  <strong>Immunizations</strong>
                </h6>
                {medicalhistory?.immunizations?.map((immunization, index) => (
                  <div key={index}>
                    <strong>Vaccine Name:</strong>{" "}
                    {immunization.vaccineName || "N/A"}
                    <br />
                    <strong>Vaccine Date:</strong>{" "}
                    {immunization.vaccineDate || "N/A"}
                    <br />
                    <strong>Administered By:</strong>{" "}
                    {immunization.administeredBy || "N/A"}
                    <br />
                    <br />
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
              <h6 className="mb-0 fw-bold">
                <strong>Prescriptions</strong>
              </h6>
            </div>
            <div className="card-body">
              <div className="row g-3 align-items-center">
                <div className="col-md-6">
                  <div className="mt-4">
                    {prescriptions?.medicines?.map((medicine, index) => (
                      <div key={index}>
                        <strong>Medication Name:</strong>{" "}
                        {medicine.medication || "N/A"}
                        <br />
                        <strong>Instructions:</strong>{" "}
                        {medicine.instructions || "N/A"}
                        <br />
                        {/* Add other prescription properties as needed */}
                        <br />
                      </div>
                    ))}
                  </div>
                </div>
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
              <h6 className="mb-0 fw-bold">
                <strong>Clinical Examinations</strong>
              </h6>
            </div>
            <div className="card-body">
              <div className="row g-3 align-items-center">
                <div className="col-md-6">
                  <label htmlFor="noteDate" className="form-label">
                    <strong>Note Date</strong>
                  </label>
                  <div>{clinicalexaminations?.noteDate || "N/A"}</div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="healthcareProvider" className="form-label">
                    <strong>Healthcare Provider</strong>
                  </label>
                  <div>{clinicalexaminations?.healthcareProvider || "N/A"}</div>
                </div>
                <div className="col-12">
                  <label htmlFor="subjectiveNote" className="form-label">
                    <strong>Subjective Note</strong>
                  </label>
                  <div>{clinicalexaminations?.subjectiveNote || "N/A"}</div>
                </div>
                <div className="col-12">
                  <label htmlFor="objectiveNote" className="form-label">
                    <strong>Objective Note</strong>
                  </label>
                  <div>{clinicalexaminations?.objectiveNote || "N/A"}</div>
                </div>
                <div className="col-12">
                  <label htmlFor="assessment" className="form-label">
                    <strong>Assessment</strong>
                  </label>
                  <div>{clinicalexaminations?.assessment || "N/A"}</div>
                </div>
                <div className="col-12">
                  <label htmlFor="plan" className="form-label">
                    <strong>Plan</strong>
                  </label>
                  <div>{clinicalexaminations?.plan || "N/A"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewEHR;
