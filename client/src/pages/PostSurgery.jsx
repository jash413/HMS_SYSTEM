import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS

const PostSurgeryForm = () => {
  const [formData, setFormData] = useState({
    surgery_id: "",
    surgeon_notes: "",
    anaesthetist_notes: "",
    patient_condition: "",
  });

  const [selectedSurgeryDetails, setSelectedSurgeryDetails] = useState(null);
  const [selectedPatientDetails, setSelectedPatientDetails] = useState({});
  const [selectedSurgeonDetails, setSelectedSurgeonDetails] = useState({});

  // Get the selected patient details
  useEffect(() => {
    if (selectedSurgeryDetails) {
      axios.get(`http://localhost:3100/api/patients/${selectedSurgeryDetails.patient_id}`).then((response) => {
        setSelectedPatientDetails(response.data);
      });
    }
  }, [selectedSurgeryDetails]);

  // Get the selected surgeon details
  useEffect(() => {
    if (selectedSurgeryDetails) {
      axios.get(`http://localhost:3100/doctors/${selectedSurgeryDetails.surgeon_id}`).then((response) => {
        setSelectedSurgeonDetails(response.data);
      });
    }
  }, [selectedSurgeryDetails]);


  const loadOptions = (inputValue) => {
    return axios
      .get(`http://localhost:3100/surgeries/search?surgeryID=${inputValue}`)
      .then((response) => {
        const allSurgeries = response.data;
        return allSurgeries.map((surgery) => ({
          value: surgery._id,
          label: `${surgery.surgeryID}`,
        }));
      });
  };

  // 

  const handleSelectChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      surgery_id: selectedOption.value,
    }));

     // Get the selected patient's details
     axios
     .get(`http://localhost:3100/surgeries/${selectedOption.value}`)
     .then((response) => {
       setSelectedSurgeryDetails(response.data);
       console.log(selectedSurgeryDetails);
     })
     .catch((error) => {
       console.error("Error fetching surgery details:", error);
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
        "http://localhost:3100/surgery-records",
        formData
      );
      console.log(response.data);
      if (response.status === 201) {
        toast.success("Record created successfully");
      }
      // Clear form fields
      setFormData({
        surgery_id: null,
        surgeon_notes: "",
        anaesthetist_notes: "",
        patient_condition: "",
      });
    } catch (error) {
      toast.error(error.response.data.message);
      // console.log(formData);
      console.error(error);
    }
  };

  return (
    <div className="container-xxl">
      <div className="row align-items-center">
        <div className="border-0 mb-4">
          <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
            <h3 className="fw-bold mb-0">Post Surgery Record</h3>
          </div>
        </div>
      </div>{" "}
      {/* Row end  */}
      <div className="row mb-3">
        <div className="col-sm-12">
          <div className="card mb-3">
            <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
              <h5 className="mb-0 fw-bold ">Surgery Details</h5>
            </div>
            <div className="card-body">
            <div className="row g-3 align-items-center">
              <div className="col-md-4">
                {selectedSurgeryDetails && (
                  <h6 className="mb-0">
                    <b>Surgery ID:</b> {selectedSurgeryDetails.surgeryID}
                  </h6>
                )}
              </div>
              <div className="col-md-4">
                {selectedPatientDetails && (
                  <h6 className="mb-0">
                    <b>Patient:</b> {selectedPatientDetails.firstName} {selectedPatientDetails.lastName}
                  </h6>
                )}
              </div>
            </div>
            <br />
            <div className="row g-3 align-items-center">
              <div className="col-md-4">
                {selectedSurgeryDetails && (
                  <h6 className="mb-0">
                    <b>Surgeon:</b> {selectedSurgeonDetails.first_name} {selectedSurgeonDetails.last_name}
                  </h6>
                )}
              </div>
            </div>
          </div>
          </div>
          <div className="card mb-3">
            <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
              <h5 className="mb-0 fw-bold ">
                Fill in the form below to create a new record
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleFormSubmit}>
                <div className="row g-3 align-items-center">
                  <div className="col-md-6">
                    <label className="form-label">Select Surgery</label>
                    <AsyncSelect
                      value={formData.surgery_id.value}
                      onChange={handleSelectChange}
                      loadOptions={loadOptions}
                      isSearchable
                      placeholder="Search for a surgery..."
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
                </div>
                <div className="col-md-6">
                  <label htmlFor="admitdate" className="form-label">
                    Admit Date
                  </label>
                  <br />
                  <input
                    required
                    type="date"
                    name="admissionDate"
                    value={formData.admissionDate}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="admittime" className="form-label">
                    Admit Time
                  </label>
                  <input
                    required
                    type="time"
                    name="admissionTime"
                    value={formData.admissionTime}
                    onChange={handleInputChange}
                    className="form-control"
                    id="admittime"
                  />
                </div> */}
                </div>
                <br />
                {/* <div className="col-md-12">
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
              </div> */}
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
  );
};

export default PostSurgeryForm;
