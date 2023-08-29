import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SurgerySchedulingForm() {
  const [formData, setFormData] = useState({
    selectedStartTime: "",
    selectedEndTime: "",
    selectedSurgeon: "",
    selectedAnaesthetist: "",
    selectedTheatre: "",
    selectedKit: "",
    selectedPatient: "",
  });

  const [availableSurgeons, setAvailableSurgeons] = useState([]);
  const [availableAnaesthetists, setAvailableAnaesthetists] = useState([]);
  const [availableOperationTheatres, setAvailableOperationTheatres] = useState(
    []
  );
  const [availableKits, setAvailableKits] = useState([]);
  const [selectedSurgeryType, setSelectedSurgeryType] = useState("");
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    if (formData.selectedStartTime && formData.selectedEndTime) {
      fetchAvailableSurgeons(
        formData.selectedStartTime,
        formData.selectedEndTime
      );
      fetchAvailableAnaesthetists(
        formData.selectedStartTime,
        formData.selectedEndTime
      );
      fetchAvailableOperationTheatres(
        formData.selectedStartTime,
        formData.selectedEndTime
      );
      fetchAvailableKits(formData.selectedStartTime, formData.selectedEndTime);
    }
  }, [
    formData.selectedStartTime,
    formData.selectedEndTime,
    selectedSurgeryType,
  ]);

  const fetchAvailableSurgeons = async (startTime, endTime) => {
    try {
      const response = await axios.get(
        `http://localhost:3100/available-resources?startTime=${startTime}&endTime=${endTime}`
      );
      setAvailableSurgeons(response.data.availableSurgeons);
    } catch (error) {
      console.error("Error fetching available surgeons:", error);
    }
  };

  const fetchAvailableAnaesthetists = async (startTime, endTime) => {
    try {
      const response = await axios.get(
        `http://localhost:3100/available-resources?startTime=${startTime}&endTime=${endTime}`
      );
      setAvailableAnaesthetists(response.data.availableAnaesthetists);
    } catch (error) {
      console.error("Error fetching available anaesthetists:", error);
    }
  };

  const fetchAvailableOperationTheatres = async (startTime, endTime) => {
    try {
      const response = await axios.get(
        `http://localhost:3100/available-resources?startTime=${startTime}&endTime=${endTime}`
      );
      setAvailableOperationTheatres(response.data.availableOperationTheatres);
    } catch (error) {
      console.error("Error fetching available operation theatres:", error);
    }
  };

  const fetchAvailableKits = async (startTime, endTime) => {
    try {
      const response = await axios.get(
        `http://localhost:3100/available-resources?startTime=${startTime}&endTime=${endTime}`
      );
      setAvailableKits(response.data.availableKits);
    } catch (error) {
      console.error("Error fetching available kits:", error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:3100/api/patients");
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSurgeryTypeChange = (event) => {
    setSelectedSurgeryType(event.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedSurgeryType: event.target.value,
      selectedSurgeon: "",
      selectedAnaesthetist: "",
      selectedTheatre: "",
      selectedKit: "",
      // selectedPatient: "",
    }));
  };

  const handleConsentForm = async () => {
    try {
      // Perform submission logic here
      const response= await axios.post(
        "http://localhost:3100/generate-consent-form",
        {
          surgeryType: selectedSurgeryType,
          start_time: formData.selectedStartTime,
          end_time: formData.selectedEndTime,
          doctor_id: formData.selectedSurgeon,
          anaesthetist_id: formData.selectedAnaesthetist,
          patient_id: formData.selectedPatient,
        },
        { responseType: "blob" } );
           // Create a Blob object from the response data
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });

      // Create a URL for the Blob and trigger a download
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "consent_form.pdf";
      link.click();
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error generating consent form:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Perform submission logic here
      const response = await axios.post("http://localhost:3100/surgeries", {
        surgeryType: selectedSurgeryType,
        start_time: formData.selectedStartTime,
        end_time: formData.selectedEndTime,
        doctor_id: formData.selectedSurgeon,
        anaesthetist_id: formData.selectedAnaesthetist,
        theatre_id: formData.selectedTheatre,
        kit_id: formData.selectedKit,
        patient_id: formData.selectedPatient,
      });

      console.log("Surgery scheduled successfully:", response.data);

      // Update Surgeon's bookedSlots
      await axios.patch(
        `http://localhost:3100/doctors/${formData.selectedSurgeon}`,
        {
          bookedSlots: [
            {
              startTime: formData.selectedStartTime,
              endTime: formData.selectedEndTime,
            },
          ],
        }
      );

      // Update Anaesthetist's bookedSlots
      await axios.patch(
        `http://localhost:3100/anaesthetists/${formData.selectedAnaesthetist}`,
        {
          bookedSlots: [
            {
              startTime: formData.selectedStartTime,
              endTime: formData.selectedEndTime,
            },
          ],
        }
      );

      // Update Operation Theatre's bookedSlots
      await axios.patch(
        `http://localhost:3100/operation-theatres/${formData.selectedTheatre}`,
        {
          bookedSlots: [
            {
              startTime: formData.selectedStartTime,
              endTime: formData.selectedEndTime,
            },
          ],
        }
      );

      // Update OT-kit schedules
      await axios.patch(
        `http://localhost:3100/ot-kits/${formData.selectedKit}`,
        {
          schedules: [
            {
              startTime: formData.selectedStartTime,
              endTime: formData.selectedEndTime,
            },
          ],
        }
      );
      if (response.status === 201) {
        toast.success(response.data.message);
      }
      // Reset the form after successful submission
      setFormData({
        selectedStartTime: "",
        selectedEndTime: "",
        selectedSurgeon: "",
        selectedAnaesthetist: "",
        selectedTheatre: "",
        selectedKit: "",
        selectedPatient: "",
      });
      setSelectedSurgeryType("");
    } catch (error) {
      // console.log(formData);
      toast.error(error.response.data.message);
      console.error("Error submitting form:", error);
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
                  <h3 className="fw-bold mb-0">Schedule Surgery</h3>
                </div>
              </div>
            </div>{" "}
            {/* Row end  */}
            <div className="row mb-3">
              <div className="col-sm-12">
                <div className="card mb-3">
                  <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                    <h5 className="mb-0 fw-bold ">
                      Fill in the form below to schedule a surgery
                    </h5>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="row g-3 align-items-center">
                        <div className="col-md-6">
                          <label className="form-label">Select Patient</label>
                          <select
                            name="selectedPatient"
                            value={formData.selectedPatient}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                          >
                            <option value="">Select Patient</option>
                            {patients.map((patient) => (
                              <option key={patient._id} value={patient._id}>
                                {patient.firstName} {patient.lastName}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="admittime" className="form-label">
                            Select Surgery Type
                          </label>
                          <select
                            name="selectedSurgeryType"
                            value={selectedSurgeryType}
                            onChange={handleSurgeryTypeChange}
                            className="form-control"
                          >
                            <option value="">Select Surgery Type</option>
                            <option value="Orthopedic">Orthopedic</option>
                            <option value="Neurosurgery">Neurosurgery</option>
                            <option value="Cardiovascular">
                              Cardiovascular
                            </option>
                            <option value="Gynecological">Gynecological</option>
                            <option value="ENT (Ear, Nose, and Throat)">
                              ENT (Ear, Nose, and Throat)
                            </option>
                          </select>
                        </div>
                      </div>
                      <br />
                      <div className="row g-3 align-items-center">
                        <div className="col-md-6">
                          <label className="form-label">Start Time</label>
                          <input
                            type="time"
                            name="selectedStartTime"
                            value={formData.selectedStartTime}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="admittime" className="form-label">
                            End Time
                          </label>
                          <input
                            type="time"
                            name="selectedEndTime"
                            value={formData.selectedEndTime}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                          />
                        </div>
                      </div>
                      <br />
                      <div className="row g-3 align-items-center">
                        <div className="col-md-6">
                          <label className="form-label">Select Surgeon</label>
                          <select
                            name="selectedSurgeon"
                            value={formData.selectedSurgeon}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                          >
                            <option value="">Select Surgeon</option>
                            {availableSurgeons.map((surgeon) => (
                              <option key={surgeon._id} value={surgeon._id}>
                                Dr {surgeon.first_name} {surgeon.last_name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="admittime" className="form-label">
                            Select Anaesthetist
                          </label>
                          <select
                            name="selectedAnaesthetist"
                            value={formData.selectedAnaesthetist}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                          >
                            <option value="">Select Anaesthetist</option>
                            {availableAnaesthetists.map((anaesthetist) => (
                              <option
                                key={anaesthetist._id}
                                value={anaesthetist._id}
                              >
                                {anaesthetist.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <br />
                      <div className="row g-3 align-items-center">
                        <div className="col-md-6">
                          <label className="form-label">
                            Select Operation Theatre
                          </label>
                          <select
                            name="selectedTheatre"
                            value={formData.selectedTheatre}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                          >
                            <option value="">Select Operation Theatre</option>
                            {availableOperationTheatres.map((theatre) => (
                              <option key={theatre._id} value={theatre._id}>
                                {theatre.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="admittime" className="form-label">
                            Select OT-Equipment Kit
                          </label>
                          <select
                            name="selectedKit"
                            value={formData.selectedKit}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                          >
                            <option value="">Select Kit</option>
                            {availableKits.map((kit) => (
                              <option key={kit._id} value={kit._id}>
                                {kit.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <br />
                      <div className="row g-3 align-items-center">
                        <div className="col-md-1">
                          <button
                            type="submit"
                            className="btn btn-primary mt-4"
                          >
                            Submit
                          </button>
                        </div>
                        <div className="col-md-6">
                      <button
                        type="button"
                        onClick={() => {
                          handleConsentForm();
                        }}
                        className="btn btn-primary mt-4"
                      >
                        Generate Consent Form
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
}

export default SurgerySchedulingForm;
