import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { myContext, tokenContext } from "./Main";

function UserRegistration() {
  const userData = useContext(myContext);
  const token = useContext(tokenContext);

  const [allowedUsers, setAllowedUsers] = useState("");
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
    role: "",
    hospital_id: userData ? userData.hospital_id : "", // Handle userData being undefined
    permissions: [],
    doctor_id: "",
  });

  useEffect(() => {
    // Check if formData.hospital_id is defined before making requests
    if (formData.hospital_id && token) {
      axios
        .get(`http://localhost:3100/api/hospital/${formData.hospital_id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Hospital details:", response.data);
          setAllowedUsers(response.data.users);
        })
        .catch((error) => {
          console.error("Error fetching hospital details:", error);
        });

      axios
        .get("http://localhost:3100/users", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUsers(response.data.users);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }
  }, [formData.hospital_id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    // Check if formData.hospital_id is defined before making requests
    if (formData.hospital_id && token) {
      axios
        .get(`http://localhost:3100/doctors`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const hospitalDoctors = response.data.filter(
            (doctor) =>
              doctor.hospital_id === formData.hospital_id &&
              doctor.user_created === false
          );
          setDoctors(hospitalDoctors);
        })
        .catch((error) => {
          console.error("Error fetching doctors:", error);
        });
    }
  }, [formData.hospital_id, token]);

  const handleDoctorSelect = (e) => {
    const { value } = e.target;
    const selectedDoctor = doctors.find((doctor) => doctor._id === value);
    setSelectedDoctor(selectedDoctor);
    setFormData({
      ...formData,
      doctor_id: selectedDoctor._id,
      name: `${selectedDoctor.first_name} ${selectedDoctor.last_name}`,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parseInt(users.length) >= parseInt(allowedUsers)) {
      toast.error("You have exceeded the number of allowed users");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3100/register",
          formData,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          toast.success("User registered successfully");
          console.log(allowedUsers, users.length)
          setFormData({
            name: "",
            username: "",
            password: "",
            email: "",
            role: "",
            permissions: [],
            doctor_id: "",
            hospital_id: userData ? userData.hospital_id : "",
          });

          await axios.patch(
            `http://localhost:3100/doctors/${selectedDoctor._id}`,
            {
              user_created: true,
            },
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
        }
      } catch (error) {
        console.error("Error registering user:", error);
        toast.error("Error registering user. Please try again.");
      }
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, value } = e.target;
    if (e.target.checked) {
      // If the checkbox is checked, add the value to permissions
      setFormData({
        ...formData,
        permissions: [...formData.permissions, value],
      });
    } else {
      // If the checkbox is unchecked, remove the value from permissions
      setFormData({
        ...formData,
        permissions: formData.permissions.filter((perm) => perm !== value),
      });
    }
  };
  return (
    <div className="container-xxl">
      <div className="row align-items-center">
        <div className="border-0 mb-4">
          <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
            <h3 className="fw-bold mb-0">User Registration</h3>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        {/* Admission Form Card */}
        <div className="col-sm-12">
          <div className="card mb-3">
            <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
              <h5 className="mb-0 fw-bold">
                Fill in the form below to register a user
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3 align-items-center ">
                  <div className="col-md-6">
                    <label htmlFor="admittime" className="form-label">
                      Role
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      className="form-select"
                    >
                      <option value="">Select Role</option>
                      <option value="Doctor">Doctor</option>
                      <option value="Nurse">Nurse</option>
                    </select>
                  </div>
                  {formData.role === "Doctor" && (
                    <div className="col-md-6">
                      <label htmlFor="admittime" className="form-label">
                        Doctor
                      </label>
                      <select
                        name="doctor_id"
                        value={formData.doctor_id}
                        onChange={handleDoctorSelect}
                        required
                        className="form-select"
                      >
                        <option value="">Select Doctor</option>
                        {doctors.map((doctor) => (
                          <option key={doctor._id} value={doctor._id}>
                            {doctor.first_name} {doctor.last_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                <br />
                <div className="row g-3 align-items-center">
                  <div className="col-md-6">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="admitdate" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="admittime" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-6">
                    <label>Permissions</label>
                    <div className="row g-3 align-items-center">
                      <div className="col-md-4">
                        <label>
                          <input
                            type="checkbox"
                            name="permissions"
                            value="view-doctorlist"
                            checked={formData.permissions.includes(
                              "view-doctorlist"
                            )}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                          />
                          {" View Doctor-List"}
                        </label>
                      </div>
                      <div className="col-md-4">
                        <label>
                          <input
                            type="checkbox"
                            name="permissions"
                            value="add-doctor"
                            checked={formData.permissions.includes(
                              "add-doctor"
                            )}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                          />
                          {" Add Doctor"}
                        </label>
                      </div>
                      <div className="col-md-4">
                        <label>
                          <input
                            type="checkbox"
                            name="permissions"
                            value="add-appointment"
                            checked={formData.permissions.includes(
                              "add-appointment"
                            )}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                          />
                          {" Add Appointment"}
                        </label>
                      </div>
                    </div>
                    <div className="row g-3 align-items-center">
                      <div className="col-md-4">
                        <label>
                          <input
                            type="checkbox"
                            name="permissions"
                            value="view-calendar"
                            checked={formData.permissions.includes(
                              "view-calendar"
                            )}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                          />
                          {" View Calendar"}
                        </label>
                      </div>
                      <div className="col-md-4">
                        <label>
                          <input
                            type="checkbox"
                            name="permissions"
                            value="view-patientlist"
                            checked={formData.permissions.includes(
                              "view-patientlist"
                            )}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                          />
                          {" View Patient-List"}
                        </label>
                      </div>
                      <div className="col-md-4">
                        <label>
                          <input
                            type="checkbox"
                            name="permissions"
                            value="add-patient"
                            checked={formData.permissions.includes(
                              "add-patient"
                            )}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                          />
                          {" Add Patient"}
                        </label>
                      </div>
                    </div>
                    <div className="row g-3 align-items-center">
                      <div className="col-md-4">
                        <label>
                          <input
                            type="checkbox"
                            name="permissions"
                            value="admission"
                            checked={formData.permissions.includes("admission")}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                          />
                          {" Admission"}
                        </label>
                      </div>
                      <div className="col-md-4">
                        <label>
                          <input
                            type="checkbox"
                            name="permissions"
                            value="discharge"
                            checked={formData.permissions.includes("discharge")}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                          />
                          {" Discharge"}
                        </label>
                      </div>
                      <div className="col-md-4">
                        <label>
                          <input
                            type="checkbox"
                            name="permissions"
                            value="transfer"
                            checked={formData.permissions.includes("transfer")}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                          />
                          {" Transfer"}
                        </label>
                      </div>
                    </div>
                    <div className="row g-3 align-items-center">
                      <div className="col-md-4">
                        <label>
                          <input
                            type="checkbox"
                            name="permissions"
                            value="view-ward"
                            checked={formData.permissions.includes("view-ward")}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                          />
                          {" View Ward"}
                        </label>
                      </div>
                      <div className="col-md-4">
                        <label>
                          <input
                            type="checkbox"
                            name="permissions"
                            value="view-surgerylist"
                            checked={formData.permissions.includes(
                              "view-surgerylist"
                            )}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                          />
                          {" View Surgery-List"}
                        </label>
                      </div>
                      <div className="col-md-4">
                        <label>
                          <input
                            type="checkbox"
                            name="permissions"
                            value="schedule-surgery"
                            checked={formData.permissions.includes(
                              "schedule-surgery"
                            )}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                          />
                          {" Schedule Surgery"}
                        </label>
                      </div>
                    </div>
                    <div className="row g-3 align-items-center">
                      <div className="col-md-4">
                        <label>
                          <input
                            type="checkbox"
                            name="permissions"
                            value="create-report"
                            checked={formData.permissions.includes(
                              "create-report"
                            )}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                          />
                          {" Create Report"}
                        </label>
                      </div>
                      <div className="col-md-4">
                        <label>
                          <input
                            type="checkbox"
                            name="permissions"
                            value="update-report"
                            checked={formData.permissions.includes(
                              "update-report"
                            )}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                          />
                          {" Update Report"}
                        </label>
                      </div>
                      <div className="col-md-4">
                        <label>
                          <input
                            type="checkbox"
                            name="permissions"
                            value="create-ehr"
                            checked={formData.permissions.includes(
                              "create-ehr"
                            )}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                          />
                          {" Create EHR"}
                        </label>
                      </div>
                    </div>
                    <div className="row g-3 align-items-center">
                      <div className="col-md-4">
                        <label>
                          <input
                            type="checkbox"
                            name="permissions"
                            value="update-ehr"
                            checked={formData.permissions.includes(
                              "update-ehr"
                            )}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                          />
                          {" Update EHR"}
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <button type="submit" className="btn btn-primary mt-4">
                      Register
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
  );
}

export default UserRegistration;
