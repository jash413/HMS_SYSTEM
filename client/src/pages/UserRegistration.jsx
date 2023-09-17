import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { myContext, tokenContext } from "./Main";

function UserRegistration() {
  const userData = useContext(myContext); // Define myContext and tokenContext appropriately
  const token = useContext(tokenContext);

  const [allowedUsers, setAllowedUsers] = useState(0);
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
    role: "",
    hospital_id: userData.hospital_id,
    permissions: "",
    doctor_id: "",
  });

  // Fetch hospital details and list of users on page load
  useEffect(() => {
    // Fetch hospital details and allowed user count
    axios
      .get(`http://localhost:your-api-endpoint/hospital/${formData.hospital_id}`, {
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

    // Fetch list of users for the hospital
    axios
      .get("http://localhost:your-api-endpoint/users", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const hospitalUsers = response.data.filter(
          (user) => user.hospital_id === userData.hospital_id
        );
        setUsers(hospitalUsers);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [formData.hospital_id, token, userData.hospital_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fetch list of doctors for the hospital
  useEffect(() => {
    axios
      .get(`http://localhost:your-api-endpoint/doctors`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const hospitalDoctors = response.data.filter(
          (doctor) => doctor.hospital_id === userData.hospital_id
        );
        setDoctors(hospitalDoctors);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  }, [formData.hospital_id, token]);

  // Handle user registration
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the user is allowed to register
    if (users.length >= allowedUsers) {
      toast.error("You have exceeded the number of allowed users");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:your-api-endpoint/register",
          formData,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success("User registered successfully");
          // Clear the form upon successful registration
          setFormData({
            name: "",
            username: "",
            password: "",
            email: "",
            role: "",
          });
        }
      } catch (error) {
        console.error("Error registering user:", error);
        toast.error("Error registering user. Please try again.");
      }
    }
  };
  return (
    <div>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="Doctor">Doctor</option>
            <option value="Nurse">Nurse</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default UserRegistration;
