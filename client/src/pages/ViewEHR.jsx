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
        console.error('Error fetching data:', error);
        // Handle the error, e.g., show an error message to the user
      }
    };
  
    // Fetch data for each section, handling errors
    fetchData(vitals, setvitalsigns);
    fetchData(examinations, setclinicalexaminations);
    fetchData(precriptions, setPrescriptions);
    fetchData(history, setmedicalhistory);
  }, [formData.patient]);
  
  console.log(formData.patient)
  console.log(patients)
  return (

 <div className="container-xxl">
<div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
  <h3 className="fw-bold mb-0">View-EHR</h3>
  <div className="dropdown">
    <select
      className="btn btn-primary form-control"
      id="dropdownMenuButton2"
      name="doctor"
      onChange={handleDoctorChange}
    >
      <option style={{ backgroundColor: "white", color: "black" }} value="">
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

<div className="row">
  <div className="col-md-4">
    <div className="card mb-3">
      <div className="card-body">
        <h6 className="card-title">Vital Signs</h6>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>Blood Pressure:</strong> {vitalsigns?.bloodPressure || "N/A"}
          </li>
          <li className="list-group-item">
            <strong>Heart Rate:</strong> {vitalsigns?.heartRate || "N/A"}
          </li>
          <li className="list-group-item">
            <strong>Respiratory Rate:</strong> {vitalsigns?.respiratoryRate || "N/A"}
          </li>
          <li className="list-group-item">
            <strong>Temperature:</strong> {vitalsigns?.temperature || "N/A"}
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div className="col-md-4">
    <div className="card mb-3">
      <div className="card-body">
        <h6 className="card-title">Medical History</h6>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>Allergies:</strong> {medicalhistory?.allergies || "N/A"}
          </li>
          <li className="list-group-item">
            <strong>Chronic Conditions:</strong> {medicalhistory?.conditions || "N/A"}
          </li>
          <li className="list-group-item">
            <strong>Surgeries:</strong> {medicalhistory?.surgeries || "N/A"}
          </li>
          <li className="list-group-item">
            <strong>Medications:</strong> {medicalhistory?.medications || "N/A"}
          </li>
          <li className="list-group-item">
            <strong>Family History:</strong> {medicalhistory?.familyHistory || "N/A"}
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div className="col-md-4">
    <div className="card mb-3">
      <div className="card-body">
        <h6 className="card-title">Clinical Examinations</h6>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>Note Date:</strong> {clinicalexaminations?.noteDate || "N/A"}
          </li>
          <li className="list-group-item">
            <strong>Healthcare Provider:</strong> {clinicalexaminations?.healthcareProvider || "N/A"}
          </li>
          <li className="list-group-item">
            <strong>Subjective Note:</strong> {clinicalexaminations?.subjectiveNote || "N/A"}
          </li>
          <li className="list-group-item">
            <strong>Objective Note:</strong> {clinicalexaminations?.objectiveNote || "N/A"}
          </li>
          <li className="list-group-item">
            <strong>Assessment:</strong> {clinicalexaminations?.assessment || "N/A"}
          </li>
          <li className="list-group-item">
            <strong>Plan:</strong> {clinicalexaminations?.plan || "N/A"}
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div className="col-md-4">
  <div className="card mb-3">
    <div className="card-body">
      <h6 className="card-title">Prescriptions</h6>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <strong>Instructions:</strong> {prescriptions?.instructions || "N/A"}
        </li>
        <li className="list-group-item">
          <strong>Medication:</strong> {prescriptions?.medication || "N/A"}
        </li>
      </ul>
    </div>
  </div>
</div>

</div>
</div> 

  );
}

export default ViewEHR;
