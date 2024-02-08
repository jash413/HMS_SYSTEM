import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { myContext, tokenContext, doctorContext, networkContext } from "./Main";

function UserRegistration() {
  const userData = useContext(myContext);
  const token = useContext(tokenContext);
  const doctorData = useContext(doctorContext);
  const server = useContext(networkContext);

  const [allowedUsers, setAllowedUsers] = useState("");
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [receptionist, setReceptionist] = useState([]);
  const [selectedReceptionist, setSelectedReceptionist] = useState({});
  const [selectedNurse, setSelectedNurse] = useState({});
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
    nurse_id: "",
    receptionist_id: "",
  });

  // Get nurses
  useEffect(() => {
    // Check if formData.hospital_id is defined before making requests
    if (formData.hospital_id && token) {
      axios
        .get(server+`/api/staff`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const hospitalNurses = response.data.filter(
            (staff) =>
              staff.hospital_id === formData.hospital_id &&
              staff.role === "Nurse"
          );
          setNurses(hospitalNurses);
        })
        .catch((error) => {
          console.error("Error fetching nurses:", error);
        });
    }
  }, [formData.hospital_id, token]);

  // Get receptionist
  useEffect(() => {
    // Check if formData.hospital_id is defined before making requests
    if (formData.hospital_id && token) {
      axios
        .get(server+`/api/staff`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const hospitalReceptionist = response.data.filter(
            (staff) =>
              staff.hospital_id === formData.hospital_id &&
              staff.role === "Receptionist"
          );
          setReceptionist(hospitalReceptionist);
        })
        .catch((error) => {
          console.error("Error fetching receptionist:", error);
        });
    }
  }, [formData.hospital_id, token]);

  useEffect(() => {
    // Check if formData.hospital_id is defined before making requests
    if (formData.hospital_id && token) {
      axios
        .get(server+`/api/hospital/${formData.hospital_id}`, {
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
        .get(server+"/users", {
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
        .get(server+`/doctors`, {
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
    if (!value) return setFormData({ ...formData, doctor_id: "", name: "" });
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
          server+"/register",
          formData,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          toast.success("User registered successfully");
          console.log(allowedUsers, users.length);
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
          if (formData.role === "Doctor") {
            await axios.patch(
              server+`/doctors/${selectedDoctor._id}`,
              {
                user_created: true,
              },
              {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            );
          } else if (formData.role === "Nurse") {
            await axios.patch(
              server+`/staff/${selectedNurse._id}`,
              {
                user_created: true,
              },
              {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            );
          } else if (formData.role === "Receptionist") {
            await axios.patch(
              server+`/staff/${selectedReceptionist._id}`,
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

  const handleNurseSelect = (e) => {
    const { value } = e.target;
    if (!value) return setFormData({ ...formData, nurse_id: "", name: "" });
    const selectedNurse = nurses.find((nurse) => nurse._id === value);
    setSelectedNurse(selectedNurse);
    setFormData({
      ...formData,
      nurse_id: selectedNurse._id,
      name: `${selectedNurse.first_name} ${selectedNurse.last_name}`,
    });
  };

  const handleReceptionistSelect = (e) => {
    const { value } = e.target;
    if (!value)
      return setFormData({ ...formData, receptionist_id: "", name: "" });
    const selectedReceptionist = receptionist.find(
      (receptionist) => receptionist._id === value
    );
    setSelectedReceptionist(selectedReceptionist);
    setFormData({
      ...formData,
      receptionist_id: selectedReceptionist._id,
      name: `${selectedReceptionist.first_name} ${selectedReceptionist.last_name}`,
    });
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
                      <option value="Receptionist">Receptionist</option>
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
                  {formData.role === "Nurse" && (
                    <div className="col-md-6">
                      <label htmlFor="admittime" className="form-label">
                        Nurse
                      </label>
                      <select
                        name="nurse_id"
                        value={formData.nurse_id}
                        onChange={handleNurseSelect}
                        required
                        className="form-select"
                      >
                        <option value="">Select Nurse</option>
                        {nurses.map((nurse) => (
                          <option key={nurse._id} value={nurse._id}>
                            {nurse.first_name} {nurse.last_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  {formData.role === "Receptionist" && (
                    <div className="col-md-6">
                      <label htmlFor="admittime" className="form-label">
                        Receptionist
                      </label>
                      <select
                        name="receptionist_id"
                        value={formData.receptionist_id}
                        onChange={handleReceptionistSelect}
                        required
                        className="form-select"
                      >
                        <option value="">Select Receptionist</option>
                        {receptionist.map((receptionist) => (
                          <option
                            key={receptionist._id}
                            value={receptionist._id}
                          >
                            {receptionist.first_name} {receptionist.last_name}
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
                            value="view-ward"
                            checked={formData.permissions.includes("view-ward")}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                          />
                          {" View Ward"}
                        </label>
                      </div>
                    </div>
                    <div className="row g-3 align-items-center">
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
                    </div>
                    <div className="row g-3 align-items-center">
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
                            value="emr-create"
                            checked={formData.permissions.includes(
                              "emr-create"
                            )}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                          />
                          {" Create EHR"}
                        </label>
                      </div>
                      <div className="col-md-4">
                        <label>
                          <input
                            type="checkbox"
                            name="permissions"
                            value="create-invoice"
                            checked={formData.permissions.includes(
                              "create-invoice"
                            )}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                          />
                          {" Create Invoice"}
                        </label>
                      </div>
                    </div>
                    <div className="row g-3 align-items-center">
                      <div className="col-md-4">
                        <label>
                          <input
                            type="checkbox"
                            name="permissions"
                            value="view-invoice"
                            checked={formData.permissions.includes(
                              "view-invoice"
                            )}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                          />
                          {" View Invoice"}
                        </label>
                      </div>
                      <div className="col-md-4">
                        <label>
                          <input
                            type="checkbox"
                            name="permissions"
                            value="update-invoice"
                            checked={formData.permissions.includes(
                              "update-invoice"
                            )}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                          />
                          {" Update Invoice"}
                        </label>
                      </div>
                      <div className="col-md-4">
                        <label>
                          <input
                            type="checkbox"
                            name="permissions"
                            value="patient-invoices"
                            checked={formData.permissions.includes(
                              "patient-invoices"
                            )}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                          />
                          {" Patient Invoices"}
                        </label>
                      </div>
                    </div>
                    <div className="row g-3 align-items-center">
                      <div className="col-md-4">
                        <label>
                          <input
                            type="checkbox"
                            name="permissions"
                            value="add-staff"
                            checked={formData.permissions.includes(
                              "add-staff"
                            )}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                          />
                          {" Add Staff"}
                        </label>
                      </div>
                      <div className="col-md-4">
                        <label>
                          <input
                            type="checkbox"
                            name="permissions"
                            value="staff-list"
                            checked={formData.permissions.includes(
                              "staff-list"
                            )}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                          />
                          {" Staff List"}
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