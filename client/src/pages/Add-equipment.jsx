import React, { useState } from "react";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EquipmentForm() {
  const [equipmentData, setEquipmentData] = useState({
    name: "",
    type: "",
    quantity: 0,
    lastMaintenanceDate: "",
    expiryDate: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEquipmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3100/ot-equipments",
        equipmentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Equipment added successfully!");
      }

        
        // Reset the form after successful submission
        setEquipmentData({
          name: "",
          type: "",
          quantity: 0,
          lastMaintenanceDate: "",
          expiryDate: "",
        });
    } catch (error) {
        toast.error(error.response.data.message);
      console.error("Error adding equipment:", error.response.data);
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
                  <h3 className="fw-bold mb-0">Operation Theatre</h3>
                </div>
              </div>
            </div>{" "}
            {/* Row end  */}
            <div className="row mb-3">
              <div className="col-sm-12">
                <div className="card mb-3">
                  <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                    <h5 className="mb-0 fw-bold ">
                      Fill in the form below to add a new OT Equipment
                    </h5>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="row g-3 align-items-center">
                        <div className="col-md-6">
                          <label className="form-label">Name</label>
                          <input
                            type="text"
                            name="name"
                            value={equipmentData.name}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="admittime" className="form-label">
                            Type
                          </label>
                          <select
                            name="type"
                            value={equipmentData.type}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                          >
                            <option value="">Select Type</option>
                            <option value="General">General</option>
                            <option value="Basic Surgical">
                              Basic Surgical
                            </option>
                            <option value="Anesthesia">Anesthesia</option>
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
                      </div><br/>
                      <div className="row g-3 align-items-center">
                        <div className="col-md-6">
                          <label className="form-label">Quantity</label>
                          <input
                            type="number"
                            name="quantity"
                            value={equipmentData.quantity}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="admittime" className="form-label">
                            Last Maintenance Date
                          </label>
                          <input
                            type="date"
                            name="lastMaintenanceDate"
                            value={equipmentData.lastMaintenanceDate}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                        </div>
                      </div><br/>
                      <div className="row g-3 align-items-center">
                        <div className="col-md-6">
                          <label className="form-label">Expiry Date</label>
                          <input
                            type="date"
                            name="expiryDate"
                            value={equipmentData.expiryDate}
                            onChange={handleInputChange}
                            className="form-control"
                          />
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
        </div>
      </div>
    </div>
  );
}

export default EquipmentForm;
