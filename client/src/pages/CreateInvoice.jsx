import React, { useState, useContext } from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { myContext, tokenContext } from "./Main";

const CreateInvoice = () => {
  const userData = useContext(myContext);
  const token = useContext(tokenContext);
  const [formData, setFormData] = useState({
    patient: ""
  });
  const [servicesCount, setServicesCount] = useState(1);
  const [serviceInputs, setServiceInputs] = useState([
    {
      serviceName: "",
      serviceCharge: "",
    },
  ]);

  const [selectedPatientDetails, setSelectedPatientDetails] = useState(null);

  const loadOptions = (inputValue) => {
    return axios
      .get(`https://backendmedisys.webwisesolution.me/api/patients/search?name=${inputValue}`, {
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
      .get(`https://backendmedisys.webwisesolution.me/api/patients/${selectedOption.value}`, {
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

  const handleAddServices = () => {
    // Increment the services count
    setServicesCount(servicesCount + 1);

    // Add a new service input field
    setServiceInputs([
      ...serviceInputs,
      { serviceName: "", serviceCharge: "" },
    ]);
  };

  const handleRemoveServices = (index) => {
    if (servicesCount > 1) {
      // Decrement the services count
      setServicesCount(servicesCount - 1);

      // Remove the service input field at the specified index
      const updatedServiceInputs = [...serviceInputs];
      updatedServiceInputs.splice(index, 1);
      setServiceInputs(updatedServiceInputs);
    }
  };

  const handleServiceInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedServiceInputs = [...serviceInputs];
    updatedServiceInputs[index][name] = value;
    setServiceInputs(updatedServiceInputs);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Combine service inputs into an array
    const services = serviceInputs.map((input) => ({
      serviceName: input.serviceName,
      serviceCharge: input.serviceCharge,
    }));

    // Send a PATCH request to create the invoice
    axios
      .patch(`https://backendmedisys.webwisesolution.me/billing/patient/${formData.patient}`, {
        services: services,
      })
      .then((response) => {
        toast.success("Invoice created successfully");

        // Reset the form after successful submission
        setFormData({
          patient: "",
        });

        setServiceInputs([
          {
            serviceName: "",
            serviceCharge: "",
          },
        ]);

        setServicesCount(1);
      })
      .catch((error) => {
        toast.error("Error creating invoice");
        console.error("Error creating invoice:", error);
      });
  };

  return (
    <div className="container-xxl">
      <div className="row align-items-center">
        <div className="border-0 mb-4">
          <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
            <h3 className="fw-bold mb-0">Create Invoice</h3>
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
                Fill in the form below to create an invoice
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
                </div>
                <br />
                {serviceInputs.map((input, index) => (
  <div className="row g-3 align-items-center" key={index}>
    <div className="col-md-5">
      <label className="form-label">Service Name</label>
      <input
        type="text"
        className="form-control"
        name="serviceName"
        value={input.serviceName}
        onChange={(e) => handleServiceInputChange(index, e)}
      />
    </div>
    <div className="col-md-5">
      <label className="form-label">Service Charge</label>
      <input
        type="text"
        className="form-control"
        name="serviceCharge"
        value={input.serviceCharge}
        onChange={(e) => handleServiceInputChange(index, e)}
      />
    </div>
    <div className="col-md-2">
      {index === serviceInputs.length - 1 ? (
        // Show the "plus" button on the last field
        <button
          type="button"
          className="btn btn-primary mt-4"
          onClick={handleAddServices}
        >
          <i className="icofont-plus"></i>
        </button>
      ) : index === serviceInputs.length - 2 ? (
        // Show the "minus" button on the second-to-last field
        <button
          type="button"
          className="btn btn-danger mt-4"
          onClick={() => handleRemoveServices(index)}
        >
          <i className="icofont-minus"></i>
        </button>
      ) : null}
    </div>
  </div>
))}

                <button type="submit" className="btn btn-primary mt-4">
                  Create Invoice
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

export default CreateInvoice;
