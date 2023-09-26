import React, { useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { myContext, tokenContext } from "./Main";
function StaffForm() {
  const userData = useContext(myContext);
  const token = useContext(tokenContext);

  const [staffData, setStaffData] = useState({
    first_name: "",
    last_name: "",
    gender: "Male",
    role: "",
    email: "",
    phone: "",
    hire_date: "",
    workingHours: "",
    hospital_id: userData.hospital_id,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStaffData({
      ...staffData,
      [name]: value,
    });
  };

  const handleSpecialityChange = (e) => {
    // Handle the change for the Role/Position field
    const { name, value } = e.target;
    setStaffData({
      ...staffData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3100/api/staff", // Update the API endpoint
        staffData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Staff member created successfully");
      }

      console.log("Staff member created:", response.data);
      // Reset the form after successful submission
      setStaffData({
        first_name: "",
        last_name: "",
        gender: "",
        role: "",
        email: "",
        phone: "",
        hire_date: "",
        workingHours: "",
        hospital_id: userData.hospital_id,
      });
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error creating staff member:", error.response.data);
      console.log(staffData);
    }
  };

  return (
    <div className="container-xxl">
      <div className="row align-items-center">
        <div className="border-0 mb-4">
          <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
            <h3 className="fw-bold mb-0">Add Staff Member</h3>
          </div>
        </div>
      </div>{" "}
      {/* Row end */}
      <div className="row mb-3">
        <div className="col-sm-12">
          <div className="card mb-3">
            <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
              <h6 className="mb-0 fw-bold">Basic Information</h6>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3 align-items-center">
                  <div className="col-md-6">
                    <label htmlFor="firstname" className="form-label">
                      First Name
                    </label>
                    <input
                      name="first_name"
                      type="text"
                      className="form-control"
                      id="firstname"
                      value={staffData.first_name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="lastname" className="form-label">
                      Last Name
                    </label>
                    <input
                      name="last_name"
                      type="text"
                      className="form-control"
                      id="lastname"
                      value={staffData.last_name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="phonenumber" className="form-label">
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      type="text"
                      className="form-control"
                      id="phonenumber"
                      value={staffData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="emailaddress" className="form-label">
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      id="emailaddress"
                      value={staffData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="hiredate" className="form-label">
                      Hire Date
                    </label>
                    <input
                      name="hire_date"
                      type="date"
                      className="form-control"
                      id="hiredate"
                      value={staffData.hire_date}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Gender</label>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={staffData.gender === "Male"}
                            onChange={handleInputChange}
                            id="gender-male"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="gender-male"
                          >
                            Male
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-check">
                          <input
                            name="gender"
                            value="Female"
                            className="form-check-input"
                            type="radio"
                            id="gender-female"
                            checked={staffData.gender === "Female"}
                            onChange={handleInputChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="gender-female"
                          >
                            Female
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-md-6">
                    <label htmlFor="formFileMultiple" className="form-label">
                      Document Upload
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      id="formFileMultiple"
                      multiple
                    />
                  </div> */}
                </div> <br />
                <div className="row g-3 align-items-center">
                  <div className="col-md-6">
                    <label htmlFor="position" className="form-label">
                      Role/Position
                    </label>
                    <select
                      name="role"
                      value={staffData.role}
                      onChange={handleSpecialityChange}
                      className="form-select"
                      aria-label="Default select example"
                      id="position"
                    >
                      <option value="">Select role/position</option>
                      <option value="Nurse">Nurse</option>
                      <option value="Receptionist">Receptionist</option>
                    </select>
                  </div>
                  <div className="col-md-4"></div>
                  <div className="card-header py-3  d-flex justify-content-between bg-transparent border-bottom-0">
                    <h6 className="mb-0 fw-bold ">Working Hours</h6>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="form-label">From</label>
                      <input
                        required
                        type="time" // Set the type attribute to "time"
                        name="workingHours.startTime" // Ensure the name attribute is correct
                        value={staffData.workingHours.startTime}
                        onChange={handleInputChange}
                        className="form-control"
                        id="starttime"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">To</label>
                      <input
                        type="time"
                        name="workingHours.endTime"
                        value={staffData.workingHours.endTime}
                        onChange={handleInputChange}
                        className="form-control"
                        id="endtime"
                      />
                    </div>
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
}

export default StaffForm;
