import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS 
import { myContext, tokenContext } from "./Main";

const PostSurgeryUpdate = () => {
  const userData = useContext(myContext);
  const token = useContext(tokenContext);
  const [formData, setFormData] = useState({
    surgeon_notes: "",
    anaesthetist_notes: "",
    patient_condition: "",
  });

  const [selectedFormDetails, setSelectedFormDetails] = useState({});
    const [selectedSurgeryDetails, setSelectedSurgeryDetails] = useState({});




    const loadOptions = (inputValue) => {
      return axios
        .get(`http://localhost:3100/surgeries/search?surgeryID=${inputValue}`,{
          headers: {
            authorization: `Bearer ${token}`,
          }, 
        })
        .then((response) => {
          const allSurgeries = response.data;
          return allSurgeries.filter((surgery) => (surgery.record_generated === true)).map((surgery) => ({
            value: surgery._id,
            label: `${surgery.surgeryID}`,
          }));
        });
    };

  const handleSelectChange = (selectedOption) => {

    setSelectedSurgeryDetails({
        surgeryID: selectedOption.value,
    });

    // Get the selected patient's details
    axios
      .get(`http://localhost:3100/surgery-records/search?surgeryId=${selectedOption.value}`,{
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSelectedFormDetails(response.data[0]);
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
      const response = await axios.patch(
        `http://localhost:3100/surgery-records/update?surgeryId=${selectedSurgeryDetails.surgeryID}`,{
            surgeon_notes: formData.surgeon_notes,
            anaesthetist_notes: formData.anaesthetist_notes,
            patient_condition: formData.patient_condition,
        }
      ,{
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      if (response.status === 200) {
        toast.success("Record updated successfully");
      }
      // Clear form fields
      setFormData({
        surgery_id: "",
        surgeon_notes: "",
        anaesthetist_notes: "",
        patient_condition: "",
      });

    setSelectedSurgeryDetails({});
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
            <h3 className="fw-bold mb-0">Update Post Surgery Record</h3>
          </div>
        </div>
      </div>{" "}
      {/* Row end  */}
      <div className="row mb-3">
        <div className="col-sm-12">
          <div className="card mb-3">
            <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
              <h5 className="mb-0 fw-bold ">Record Details</h5>
            </div>
            <div className="card-body">
              <div className="row g-3 align-items-center">
                <div className="col-md-12">
                  {selectedFormDetails && (
                    <h6 className="mb-0">
                      <b>Surgeon Notes:</b> {selectedFormDetails.surgeon_notes}
                    </h6>
                  )}
                </div>
              </div>
              <br />
              <div className="row g-3 align-items-center">
                <div className="col-md-12">
                  {selectedFormDetails && (
                    <h6 className="mb-0">
                      <b>Anaesthetist Notes:</b> {selectedFormDetails.anaesthetist_notes}
                    </h6>
                  )}
                </div>
              </div>
              <br />
              <div className="row g-3 align-items-center">
                <div className="col-md-12">
                  {selectedFormDetails && (
                    <h6 className="mb-0">
                      <b>Patient Condition:</b> {selectedFormDetails.patient_condition}
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

export default PostSurgeryUpdate;
