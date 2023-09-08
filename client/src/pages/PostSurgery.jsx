import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS
import moment from "moment";

const PostSurgeryForm = () => {
  const [formData, setFormData] = useState({
    surgery_id: "",
    surgeon_notes: "",
    anaesthetist_notes: "",
    patient_condition: "",
  });

  const [selectedSurgeryDetails, setSelectedSurgeryDetails] = useState({});
  const [selectedPatientDetails, setSelectedPatientDetails] = useState({});
  const [selectedSurgeonDetails, setSelectedSurgeonDetails] = useState({});
  const [selectedAnaesthetistDetails, setSelectedAnaesthetistDetails] =
    useState({});
  const [selectedTheatreDetails, setselectedTheatreDetails] = useState({});

  // Get the selected patient details
  useEffect(() => {
    if (Object.keys(selectedSurgeryDetails).length !== 0) {
      axios
        .get(
          `http://localhost:3100/api/patients/${selectedSurgeryDetails.patient_id}`
        )
        .then((response) => {
          setSelectedPatientDetails(response.data);
        });
    }
  }, [selectedSurgeryDetails]);

  // Get the selected surgeon details
  useEffect(() => {
    if (Object.keys(selectedSurgeryDetails).length !== 0) {
      axios
        .get(
          `http://localhost:3100/doctors/${selectedSurgeryDetails.doctor_id}`
        )
        .then((response) => {
          setSelectedSurgeonDetails(response.data);
        });
    }
  }, [selectedSurgeryDetails]);

  // Get the selected anaesthetist details
  useEffect(() => {
    if (Object.keys(selectedSurgeryDetails).length !== 0) {
      axios
        .get(
          `http://localhost:3100/anaesthetists/${selectedSurgeryDetails.anaesthetist_id}`
        )
        .then((response) => {
          setSelectedAnaesthetistDetails(response.data);
        });
    }
  }, [selectedSurgeryDetails]);

  // Get the selected theatre details
  useEffect(() => {
    if (Object.keys(selectedSurgeryDetails).length !== 0) {
      axios
        .get(
          `http://localhost:3100/operation-theatres/${selectedSurgeryDetails.theatre_id}`
        )
        .then((response) => {
          setselectedTheatreDetails(response.data);
        });
    }
  }, [selectedSurgeryDetails]);

  const loadOptions = (inputValue) => {
    return axios
      .get(`http://localhost:3100/surgeries/search?surgeryID=${inputValue}`)
      .then((response) => {
        const allSurgeries = response.data;
        return allSurgeries.filter((surgery) => (surgery.record_generated === false)).map((surgery) => ({
          value: surgery._id,
          label: `${surgery.surgeryID}`,
        }));
      });
  };

  const handleSelectChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      surgery_id: selectedOption.value,
    }));

    // Get the selected patient's details
    axios
      .get(`http://localhost:3100/surgeries/${selectedOption.value}`)
      .then((response) => {
        const SelectedDate = moment(response.data.date).format("YYYY-MM-DD");
        setSelectedSurgeryDetails({
          surgeryID: response.data.surgeryID,
          patient_id: response.data.patient_id,
          doctor_id: response.data.doctor_id,
          anaesthetist_id: response.data.anaesthetist_id,
          theatre_id: response.data.theatre_id,
          start_time: response.data.start_time,
          end_time: response.data.end_time,
          surgeryType: response.data.surgeryType,
          date: SelectedDate,
        });
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
      console.log(response);
      if (response.status === 201) {
        toast.success("Record created successfully");
      }

      // Update the surgery record_generated field to true
      const updateResponse = await axios.patch(
        `http://localhost:3100/surgeries/${formData.surgery_id}`,
        { record_generated: true }
      );
      console.log(updateResponse);
      

      // Clear form fields
      setFormData({
        surgery_id: "",
        surgeon_notes: "",
        anaesthetist_notes: "",
        patient_condition: "",
      });
      // Clear selection
      setSelectedSurgeryDetails({
        surgeryID: "",
          patient_id: "",
          doctor_id: "",
          anaesthetist_id: "",
          theatre_id: "",
          start_time: "",
          end_time: "",
          surgeryType: "",
          date: "",
      })
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
                      <b>Patient:</b> {selectedPatientDetails.firstName}{" "}
                      {selectedPatientDetails.lastName}
                    </h6>
                  )}
                </div>
                <div className="col-md-4">
                  {selectedSurgeonDetails && (
                    <h6 className="mb-0">
                      <b>Surgeon:</b> {selectedSurgeonDetails.first_name}{" "}
                      {selectedSurgeonDetails.last_name}
                    </h6>
                  )}
                </div>
              </div>
              <br />
              <div className="row g-3 align-items-center">
                <div className="col-md-4">
                  {selectedAnaesthetistDetails && (
                    <h6 className="mb-0">
                      <b>Anaesthetist:</b> {selectedAnaesthetistDetails.name}
                    </h6>
                  )}
                </div>
                <div className="col-md-4">
                  {selectedTheatreDetails && (
                    <h6 className="mb-0">
                      <b>Operation Theatre:</b> {selectedTheatreDetails.name}
                    </h6>
                  )}
                </div>
                <div className="col-md-4">
                  {selectedSurgeryDetails && (
                    <h6 className="mb-0">
                      <b>Surgery Type:</b> {selectedSurgeryDetails.surgeryType}
                    </h6>
                  )}
                </div>
              </div>
              <br />
              <div className="row g-3 align-items-center">
                <div className="col-md-4">
                  {selectedSurgeryDetails && (
                    <h6 className="mb-0">
                      <b>Start Time:</b> {selectedSurgeryDetails.start_time}
                    </h6>
                  )}
                </div>
                <div className="col-md-4">
                  {selectedSurgeryDetails && (
                    <h6 className="mb-0">
                      <b>End Time:</b> {selectedSurgeryDetails.end_time}
                    </h6>
                  )}
                </div>
                <div className="col-md-4">
                  {selectedSurgeryDetails && (
                    <h6 className="mb-0">
                      <b>Surgery Date:</b> {selectedSurgeryDetails.date}
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
                      required
                      value={formData.surgery_id.value}
                      onChange={handleSelectChange}
                      loadOptions={loadOptions}
                      isSearchable
                      placeholder="Search for a surgery..."
                      noOptionsMessage={() => null}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Surgeon Notes</label>
                    <input required className="form-control" type="textarea" name="surgeon_notes" onChange={handleInputChange} value={formData.surgeon_notes} />
                  </div>
                </div><br/>
                <div className="row g-3 align-items-center">
                  <div className="col-md-6">
                    <label className="form-label">Anaesthetist Notes</label>
                    <input required className="form-control" type="textarea" name="anaesthetist_notes" onChange={handleInputChange} value={formData.anaesthetist_notes} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Patient Condition</label>
                    <input required className="form-control" type="textarea" name="patient_condition" onChange={handleInputChange} value={formData.patient_condition} />
                  </div>
                </div>
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
