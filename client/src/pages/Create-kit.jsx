import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function KitForm() {
  const [equipmentOptions, setEquipmentOptions] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [kitData, setKitData] = useState({
    name: "",
    description: "",
    equipment: [],
  });

  useEffect(() => {
    fetchEquipmentOptions();
  }, []);

  const fetchEquipmentOptions = async () => {
    try {
      const response = await axios.get("https://backendmedisys.webwisesolution.me:3100/ot-equipments");
      setEquipmentOptions(response.data);
    } catch (error) {
      console.error("Error fetching equipment options:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setKitData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEquipmentSelection = (selectedIds) => {
    const selectedEquipmentItems = equipmentOptions.filter((equipment) =>
      selectedIds.includes(equipment._id)
    );
    setSelectedEquipment(selectedEquipmentItems);
    setKitData((prevData) => ({
      ...prevData,
      equipment: selectedEquipmentItems,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make POST request to create kit with kitData
      // Replace the URL and other parts with actual API endpoint and logic
     const response= await axios.post("https://backendmedisys.webwisesolution.me:3100/ot-kits", kitData);

      // Reset form data after successful submission
      setKitData({
        name: "",
        description: "",
        equipment: [],
      });
      if (response.status === 201) {
        toast.success("Kit added successfully!");
      }

      // Clear selected equipment
      setSelectedEquipment([]);
    } catch (error) {
        toast.error(error.response.data.message);
      console.error("Error creating kit:", error);
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
                      Fill in the form below to create a new OT Kit
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
                            value={kitData.name}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Equipment</label>
                          <select
                            multiple
                            value={selectedEquipment.map(
                              (equipment) => equipment._id
                            )}
                            onChange={(e) =>
                              handleEquipmentSelection(
                                Array.from(
                                  e.target.selectedOptions,
                                  (option) => option.value
                                )
                              )
                            }
                            required
                            className="form-control"
                          >
                            {equipmentOptions.map((equipment) => (
                              <option key={equipment._id} value={equipment._id}>
                                {equipment.name} - {equipment.type}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                      </div>
                      <br />
                      <div className="row g-3 align-items-center">
                      <div className="col-md-6">
                          <label htmlFor="admittime" className="form-label">
                            Kit Description
                          </label>
                          <textarea
                            name="description"
                            value={kitData.description}
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

export default KitForm;
