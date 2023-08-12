import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS

function UploadDocument() {
  const [file, setFile] = useState(null);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");

  useEffect(() => {
    // Fetch the list of patients from the backend
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:3100/api/patients");
      setPatients(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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
        "http://localhost:3100/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      if (response.status === 201) {
        toast.success("File uploaded successfully");
      }
      setSelectedPatient("");
    } catch (error) {
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
                  <h3 className="fw-bold mb-0">Upload Documents</h3>
                </div>
              </div>
            </div>{" "}
            {/* Row end  */}
            <div className="row mb-3">
              <div className="col-sm-12">
                <div className="card mb-3">
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
