import React, { useState, useContext } from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { myContext, tokenContext } from "./Main";

const UpdateInvoice = () => {
  const userData = useContext(myContext);
  const token = useContext(tokenContext);
  const [formData, setFormData] = useState({
    patient: "",
    paymentStatus: "",
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
        const Patients = allPatients.filter(
          (patient) => patient.hospital_id === userData.hospital_id
        );

        return Patients.map((patient) => ({
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
      })
      .catch((error) => {
        console.error("Error fetching patient details:", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send a PATCH request to create the invoice
    axios
      .patch(`http://localhost:3100/billing/patient/${formData.patient}`, {
        paymentStatus: formData.paymentStatus,
      })
      .then((response) => {
        toast.success("Invoice updated successfully");

        // Reset the form after successful submission
        setFormData({
          patient: "",
          paymentStatus: "",
        });
      })
      .catch((error) => {
        toast.error("Error creating invoice");
        console.error("Error creating invoice:", error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container-xxl">
      <div className="row align-items-center">
        <div className="border-0 mb-4">
          <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
            <h3 className="fw-bold mb-0">Update Invoice</h3>
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
                Fill in the form below to update an invoice
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
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
                  <div className="col-md-6">
                    <label className="form-label">Payment Status</label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="paymentStatus"
                      onChange={handleChange}
                        value={formData.paymentStatus}
                      required
                    >
                      <option value="">Select Payment Status</option>
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                </div>
                <br />
                <button type="submit" className="btn btn-primary mt-4">
                  Update Invoice
                </button>
              </form>
              <ToastContainer position="top-right" autoClose={3000} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateInvoice;
