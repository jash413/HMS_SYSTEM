import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { myContext, tokenContext } from "./Main";

// Import any necessary CSS files and context declarations here

function UpdateEHR() {
  const userData = useContext(myContext);
  const token = useContext(tokenContext);
  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
  });

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [ehrSection, setEHRSection] = useState("");
  const [ehrData, setEHRData] = useState({});
  const [selectedPatientDetails, setSelectedPatientDetails] = useState(null);
  const [doctorData, setDoctorData] = useState({});
  // initially fetched data
  const [vitalsigns, setVitalSigns] = useState({
    bloodPressure: "",
    heartRate: "",
    respiratoryRate: "",
    temperature: "",
  });
  const [medicalhistory, setMedicalHistory] = useState({
    allergies: "",
    conditions: "",
    surgeries: "",
    medications: "",
    familyHistory: "",
    immunizations: [{}],
  });
  const [prescriptions, setPrescriptions] = useState({
    medicines: [{}],
  });
  const [clinicalexaminations, setClinicalExaminations] = useState({
    noteDate: "",
    healthcareProvider: "",
    subjectiveNote: "",
    objectiveNote: "",
    assessment: "",
    plan: "",
  });

  const [editedVitalsigns, setEditedVitalsigns] = useState({
    bloodPressure: vitalsigns.bloodPressure,
    heartRate: vitalsigns.heartRate,
    respiratoryRate: vitalsigns.respiratoryRate,
    temperature: vitalsigns.temperature,
  });
  const [editedMedicalhistory, setEditedMedicalhistory] = useState({
    allergies: "",
    conditions: "",
    surgeries: "",
    medications: "",
    familyHistory: "",
    immunizations: [{}],
  });
  const [editedPrescription, setEditedPrescription] = useState({
    medicines: [{}],
  });
  const [editedClinicalExamination, setEditedClinicalExamination] = useState({
    noteDate: "",
    healthcareProvider: "",
    subjectiveNote: "",
    objectiveNote: "",
    assessment: "",
    plan: "",
  });
  const [changedData, setChangedData] = useState({});

  // Function to handle doctor selection
  const handleDoctorChange = (e) => {
    const selectedDoctor = e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      doctor: selectedDoctor,
      patient: "",
    }));
    setSelectedPatientDetails(null);
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

  // Function to handle patient selection
  const handleSelectChange = (e) => {
    const selectedOption = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      patient: selectedOption,
    }));
  };

  // Function to handle EHR section selection
  const handleSectionChange = (e) => {
    const selectedSection = e.target.value;
    setEHRSection(selectedSection);
    fetchEHRData(selectedSection);
  };

  // Fetch doctors on component mount
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
  }, [formData.doctor]);
  
  // Function to fetch EHR data for the selected section
  const fetchEHRData = (section) => {
    axios
      .get(`http://localhost:3100/ehr/${section}/${formData.patient}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEHRData(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching ${section} data:`, error);
      });
  };
  // Fetch patients based on selected doctor
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
          const doctorPatients = allPatients.filter(
            (patient) => patient.doctor === formData.doctor
          );
          setPatients(doctorPatients);
        });
    } else {
      setPatients([]);
    }
  }, [formData.doctor]);

  // Fetch EHR data for the selected patient on component mount
  useEffect(() => {
    if (formData.patient) {
      const vitalsUrl = `http://localhost:3100/ehr/vitalsigns/${formData.patient}`;
      const examinationsUrl = `http://localhost:3100/ehr/ClinicalExaminations/${formData.patient}`;
      const prescriptionsUrl = `http://localhost:3100/ehr/prescriptions/${formData.patient}`;
      const historyUrl = `http://localhost:3100/ehr/medicalhistory/${formData.patient}`;

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
        }
      };

      fetchData(vitalsUrl, setVitalSigns);
      fetchData(examinationsUrl, setClinicalExaminations);
      fetchData(prescriptionsUrl, setPrescriptions);
      fetchData(historyUrl, setMedicalHistory);
    }
  }, [formData.patient]);

  const handleImmunizationsChange = (e, index, field) => {
    const { value } = e.target;

    // Create a copy of the editedMedicalhistory object
    const updatedMedicalhistory = { ...editedMedicalhistory };

    // Ensure the "immunizations" array exists in the copied object
    if (!updatedMedicalhistory.immunizations) {
      updatedMedicalhistory.immunizations = [];
    }

    // Ensure the immunization object at the specified index exists
    if (!updatedMedicalhistory.immunizations[index]) {
      updatedMedicalhistory.immunizations[index] = {};
    }

    // Update the field within the immunization object
    updatedMedicalhistory.immunizations[index][field] = value;

    // Update the state with the edited data
    setEditedMedicalhistory(updatedMedicalhistory);
  };

  const handleMedicationsChange = (e, index, field) => {
    const { value } = e.target;

    // Create a copy of the editedPrescription object
    const updatedPrescription = [...prescriptions.medicines];

    // Ensure the medicine object at the specified index exists
    if (!updatedPrescription[index]) {
      updatedPrescription[index] = {};
    }

    // Update the field within the medicine object
    updatedPrescription[index][field] = value;

    // Update the state with the edited data
    setEditedPrescription((prevPrescriptions) => ({
      ...prevPrescriptions,
      medicines: updatedPrescription,
    }));

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setChangedData((prevChangedData) => ({
      ...prevChangedData,
      [name]: value,
    }));
    // Update the state based on the current ehrSection
    switch (ehrSection) {
      case "vitalsigns":
        setEditedVitalsigns((prevEditedVitalsigns) => ({
          ...prevEditedVitalsigns,
          [name]: value,
        }));
        break;
      case "medicalhistory":
        setEditedMedicalhistory((prevEditedMedicalHistory) => ({
          ...prevEditedMedicalHistory,
          [name]: value,
        }));
        break;
      case "prescriptions":
        setEditedPrescription((prevEditedPrescriptions) => ({
          ...prevEditedPrescriptions,
          [name]: value,
        }));
        break;
      case "clinicalexaminations":
        setEditedClinicalExamination((prevEditedClinicalExaminations) => ({
          ...prevEditedClinicalExaminations,
          [name]: value,
        }));
        break;

      default:
        console.log("data not updated");
        break;
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Define the updated data for the selected component
    const updatedData = {
      vitalsigns: {
        ...vitalsigns,
        ...editedVitalsigns, // Update with edited values
      },
      medicalhistory: editedMedicalhistory,
      ClinicalExaminations: editedClinicalExamination,
      prescriptions: editedPrescription,
    };

    try {
      // Send a PATCH request with the updated data for the selected component
      const response = await axios.patch(
        `http://localhost:3100/api/update/ehr/${ehrSection}/${formData.patient}`,
        changedData // Use the selected component's data
      );
      console.log(`${ehrSection} updated successfully:`, response.data);

      // Clear the form elements by resetting the state to their initial empty state
      switch (ehrSection) {
        case "vitalsigns":
          setEditedVitalsigns({
            bloodPressure: "",
            heartRate: "",
            respiratoryRate: "",
            temperature: "",
          });
          setVitalSigns({
            bloodPressure: "",
            heartRate: "",
            respiratoryRate: "",
            temperature: "",
          });
          fetchEHRData("vitalsigns");
          break;
        case "medicalhistory":
          setEditedMedicalhistory({
            allergies: "",
            surgeries: "",
            familyHistory: "",
            conditions: "",
            medications: "",
            immunizations: Array.from(
              { length: editedMedicalhistory.immunizations.length },
              () => ({
                vaccineName: "",
                vaccineDate: "",
                administeredBy: "",
              })
            ),
          });
          break;
        case "ClinicalExaminations":
          setEditedClinicalExamination(""); // Assuming it's a string, update accordingly
          break;
        case "prescriptions":
          setEditedPrescription("");
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(`Error updating ${ehrSection}:`, error);
    }
  };

  return (
    <div className="container-xxl">
      {/* Patient and Doctor selection */}
      <div className="row mb-3">
        <div className="col-md-6">
          <select
            className="form-control"
            onChange={handleDoctorChange}
            value={formData.doctor}
          >
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.first_name} {doctor.last_name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <select
            className="form-control"
            onChange={handleSelectChange}
            value={formData.patient}
          >
            <option value="">Select Patient</option>
            {patients.map((patient) => (
              <option key={patient._id} value={patient._id}>
                {patient.firstName} {patient.lastName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Dropdown for selecting EHR section */}
      <div className="row mb-3">
        <div className="col-md-6">
          <select
            className="form-control"
            onChange={handleSectionChange}
            value={ehrSection}
          >
            <option value="">Select EHR Section</option>
            <option value="vitalsigns">Vital Signs</option>
            <option value="medicalhistory">Medical History</option>
            <option value="prescriptions">Prescriptions</option>
            <option value="clinicalexaminations">Clinical Examinations</option>
            {/* Add more options as needed */}
          </select>
        </div>
      </div>

      {/* Render input fields based on the selected EHR section */}
      {ehrSection === "vitalsigns" && (
        <div className="card-body">
          <form onSubmit={handleUpdate}>
            <div className="row g-3 align-items-center">
              <div className="col-md-6">
                <label htmlFor="bloodPressure" className="form-label">
                  <strong>Blood Pressure</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="bloodPressure"
                  name="bloodPressure"
                  placeholder={vitalsigns.bloodPressure || ""}
                  value={editedVitalsigns.bloodPressure}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="heartRate" className="form-label">
                  <strong>Heart Rate</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="heartRate"
                  name="heartRate"
                  placeholder={vitalsigns.heartRate || ""}
                  value={editedVitalsigns.heartRate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="respiratoryRate" className="form-label">
                  <strong>Respiratory Rate</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="respiratoryRate"
                  name="respiratoryRate"
                  placeholder={vitalsigns.respiratoryRate || ""}
                  value={editedVitalsigns.respiratoryRate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="temperature" className="form-label">
                  <strong>Temperature</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="temperature"
                  name="temperature"
                  placeholder={vitalsigns.temperature || ""}
                  value={editedVitalsigns.temperature}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <br />
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      )}
      {ehrSection === "medicalhistory" && (
        <div className="card-body">
          <form onSubmit={handleUpdate}>
            <div className="row g-3 align-items-center">
              <div className="col-md-6">
                <label htmlFor="allergies" className="form-label">
                  <strong>Allergies</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="allergies"
                  name="allergies"
                  placeholder={medicalhistory?.allergies || "N/A"}
                  value={editedMedicalhistory.allergies}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="surgeries" className="form-label">
                  <strong>surgeries</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="surgeries"
                  name="surgeries"
                  placeholder={medicalhistory?.surgeries || "N/A"}
                  value={editedMedicalhistory.surgeries}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="familyHistory" className="form-label">
                  <strong>family History</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="familyHistory"
                  name="familyHistory"
                  placeholder={medicalhistory?.familyHistory || "N/A"}
                  value={editedMedicalhistory.familyHistory}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="conditions" className="form-label">
                  <strong>conditions</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="conditions"
                  name="conditions"
                  placeholder={medicalhistory?.conditions || "N/A"}
                  value={editedMedicalhistory.conditions}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="medications" className="form-label">
                  <strong>medications</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="medications"
                  name="medications"
                  placeholder={medicalhistory?.medications || "N/A"}
                  value={editedMedicalhistory.medications}
                  onChange={handleInputChange}
                />
              </div>
              <label htmlFor="immunizations" className="form-label">
                <strong>Immunizations</strong>
              </label>
              <div className="col-md-6">
                {medicalhistory.immunizations.map((immunization, index) => (
                  <div key={index} className="col-md-12">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="col-md-4">
                        <label
                          htmlFor={`vaccineName${index}`}
                          className="form-label"
                        >
                          <strong>Immunization {index + 1}</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id={`vaccineName${index}`}
                          name={`vaccineName${index}`}
                          placeholder={`Vaccine Name ${index + 1}`}
                          value={immunization.vaccineName || ""}
                          onChange={(e) =>
                            handleImmunizationsChange(e, index, "vaccineName")
                          }
                        />
                      </div>
                      <div className="col-md-4">
                        <label
                          htmlFor={`vaccineDate${index}`}
                          className="form-label"
                        >
                          <strong>Vaccine Date</strong>
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id={`vaccineDate${index}`}
                          name={`vaccineDate${index}`}
                          placeholder={`Vaccine Date ${index + 1}`}
                          value={immunization.vaccineDate || ""}
                          onChange={(e) =>
                            handleImmunizationsChange(e, index, "vaccineDate")
                          }
                        />
                      </div>
                      <div className="col-md-4">
                        <label
                          htmlFor={`administeredBy${index}`}
                          className="form-label"
                        >
                          <strong>Administered By</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id={`administeredBy${index}`}
                          name={`administeredBy${index}`}
                          placeholder={`Administered By ${index + 1}`}
                          value={immunization.administeredBy || ""}
                          onChange={(e) =>
                            handleImmunizationsChange(
                              e,
                              index,
                              "administeredBy"
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <br />
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      )}
      {ehrSection === "prescriptions" && (
        <div className="card-body">
          <form onSubmit={handleUpdate}>
            <div className="row g-3 align-items-center">
              <label htmlFor="medication" className="form-label">
                <strong>Medication Name</strong>
              </label>
              <div className="col-md-6">
                {prescriptions.medicines.map((medicine, index) => (
                  <div key={index} className="col-md-12">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="col-md-4">
                        <label
                          htmlFor={`medication${index}`}
                          className="form-label"
                        >
                          <strong>Medication {index + 1}</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id={`medication${index}`}
                          name={`medication${index}`}
                          placeholder={`Medication Name ${index + 1}`}
                          value={medicine.medication || ""}
                          onChange={(e) =>
                            handleMedicationsChange(e, index, "medication")
                          }
                        />
                      </div>
                      <div className="col-md-4">
                        <label
                          htmlFor={`instructions${index}`}
                          className="form-label"
                        >
                          <strong>Instructions</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id={`instructions${index}`}
                          name={`instructions${index}`}
                          placeholder={`Instructions ${index + 1}`}
                          value={medicine.instructions || ""}
                          onChange={(e) =>
                            handleMedicationsChange(e, index, "instructions")
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-md-6"></div>
            </div>
            <br />
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      )}
      {ehrSection === "clinicalexaminations" && (
        <div className="card-body">
          <form onSubmit={handleUpdate}>
            <div className="row g-3 align-items-center">
              <div className="col-md-6">
                <label htmlFor="noteDate" className="form-label">
                  <strong>Note Date</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="noteDate"
                  name="noteDate"
                  placeholder={clinicalexaminations?.noteDate || "N/A"}
                  value={editedClinicalExamination.noteDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                {/* Add similar input fields for other clinical examination data */}
              </div>
            </div>
            <br />
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default UpdateEHR;
