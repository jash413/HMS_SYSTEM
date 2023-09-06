import React, { useEffect, useState } from "react";
import PopoverComponent from "../components/PopoverComponent";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS

const Ward = () => {
  const [wards, setWards] = useState([]);
  const [patientDetails, setPatientDetails] = useState({});
  const [patient, setPatient] = useState([]);
  const [formData, setFormData] = useState({
    newWard: {
      wardNumber: "",
      type: "",
    },
  });
  const [wardData, setWardData] = useState({
    wardNumber: "",
  });

  useEffect(() => {
    // Fetch ward data from the backend
    axios.get("http://localhost:3100/api/ward").then((response) => {
      setWards(response.data);
    });
  }, []);

  const PatientDetailsComponent = ({ ward }) => {
    const [patientDetails, setPatientDetails] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      if (ward.patient) {
        fetchPatientDetails(ward.patient);
      }
    }, [ward.patient]);

    const fetchPatientDetails = async (patientId) => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3100/api/patients/${patientId}`
        );
        setPatientDetails(response.data);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!ward.patient) {
      return null;
    }

    if (loading) {
      return <p>Loading patient details...</p>;
    }

    return (
      <div>
        <p>
          <b>Patient Name:</b> {patientDetails.firstName}{" "}
          {patientDetails.lastName}
        </p>
        <p>
          <b>Patient Gender:</b> {patientDetails.gender}
        </p>
        <p>
          <b>Patient Doctor:</b> {patientDetails.selectedDoctor}
        </p>
        <p>
          <b>Patient Phone Number:</b> {patientDetails.phoneNumber}
        </p>
        {/* <p><b>Admission Date:</b> {patientDetails.admitDate}</p> */}
        {/* Add more patient details here */}
      </div>
    );
  };

  const handleAddWard = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3100/api/ward",
        formData.newWard
      );
      setWards([...wards, response.data]);
      toast.success("Room added successfully");
    } catch (error) {
      toast.error("Error adding ward");
      console.error(error);
    }

    // After adding, you can call fetchWards to refresh the ward data
    await fetchWards();

    // Clear input fields
    setFormData({
      newWard: {
        wardNumber: "",
        type: "",
      },
    });
  };

  const fetchWards = async () => {
    try {
      const response = await axios.get("http://localhost:3100/api/ward");
      setWards(response.data);
    } catch (error) {
      console.error("Error fetching ward data:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Vacant":
        return "#8dbfb3"; // Green color for vacant wards
      case "Occupied":
        return "#fca903"; // Orange color for occupied wards
      case "Blocked":
        return "#f13c5c"; // Red color for blocked wards
      default:
        return "#000"; // Default color for unknown status
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWardData({ ...wardData, [name]: value });
    console.log(wardData);
  };

  const handleAddWardRemove = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(
        `http://localhost:3100/api/ward?wardNumber=${wardData.wardNumber}`
      );
      fetchWards();
      toast.success("Room removed successfully");
    } catch (error) {
      toast.error("Error removing ward");
      console.error(error);
    }
  };
  return (
    <div className="container-xxl">
      <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
        <h3 className="fw-bold mb-0">Rooms</h3>
      </div>
      <div className="card">
        <div className="card-header py-3 d-flex bg-transparent border-bottom-0">
          <h6 className="mb-0 fw-bold">Hospital Room Booking Status</h6>
        </div>
        <div className="card-body">
          <div className="room_book">
            <div className="row row-cols-2 row-cols-sm-4 row-cols-md-6 row-cols-lg-6 g-3">
              {wards.map((ward) => (
                <div className="room col" key={ward.wardNumber}>
                  <label htmlFor={ward.wardNumber}>
                    <PopoverComponent
                      target={
                        <i
                          style={{
                            color: getStatusColor(ward.status),
                          }}
                          className="icofont-patient-bed fs-2"
                        />
                      }
                      content={
                        <>
                          <p>
                            <b>Room No:</b> {ward.wardNumber}
                          </p>
                          <p>
                            <b>Room Type:</b> {ward.type}
                          </p>
                          <p>
                            <b>Room Status:</b> {ward.status}
                          </p>
                          <PatientDetailsComponent ward={ward} />
                        </>
                      }
                    />
                    <span className="text-muted">{ward.wardNumber}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="card">
        <div className="card-header py-3 d-flex bg-transparent border-bottom-0">
          <h6 className="mb-0 fw-bold">Add Room</h6>
        </div>
        <div className="card-body">
          <form onSubmit={handleAddWard}>
            <div className="row g-3 align-items-center">
              <div className="col-md-4">
                <label className="form-label">Ward Number:</label>
                <input
                  type="text"
                  id="newWardNumber"
                  value={formData.newWard.wardNumber}
                  onChange={(e) =>
                    setFormData({
                      newWard: {
                        ...formData.newWard,
                        wardNumber: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="admittime" className="form-label">
                  Ward Type:
                </label>
                <input
                  type="text"
                  id="newWardType"
                  value={formData.newWard.type}
                  onChange={(e) =>
                    setFormData({
                      newWard: {
                        ...formData.newWard,
                        type: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-4">
              Add
            </button>
          </form>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </div>
      <br />
      <div className="card">
        <div className="card-header py-3 d-flex bg-transparent border-bottom-0">
          <h6 className="mb-0 fw-bold">Remove Room</h6>
        </div>
        <div className="card-body">
          <form onSubmit={handleAddWardRemove}>
            <div className="row g-3 align-items-center">
              <div className="col-md-6">
                <label htmlFor="admittime" className="form-label">
                  Ward Number
                </label>
                <br />
                <select
                  name="wardNumber"
                  value={wardData.wardNumber}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="">Select a ward number</option>
                  {wards.map((ward) =>
                    ward.status === "Vacant" ? (
                      <option key={ward._id} value={ward.wardNumber}>
                        {ward.wardNumber}-{ward.type}
                      </option>
                    ) : null
                  )}
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-4">
              Remove
            </button>
          </form>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </div>
    </div>
  );
};

export default Ward;
