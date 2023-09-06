import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import $ from "jquery";
import "datatables.net";
function Patientlist() {
  const tableRef = useRef(null);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Fetch the list of patients from the backend
    fetchPatients();
    setTimeout(() => {
      $(tableRef.current).DataTable();
    }, 500);
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:3100/api/patients");
      setPatients(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container-xxl">
      <div className="row align-items-center">
        <div className="border-0 mb-4">
          <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
            <h3 className="fw-bold mb-0">Patient List</h3>
          </div>
        </div>
      </div>{" "}
      {/* Row end  */}
      <div className="row mb-3">
        <div className="card">
          <div className="card-body">
            <table
              id="patient-table"
              className="table table-hover align-middle mb-0"
              style={{ width: "100%" }}
              ref={tableRef}
            >
              <thead>
                <tr>
                  <th>Patients Id</th>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Email-Address</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Doctor</th>
                  <th>Ward-Num</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr>
                    <td>{patient.patient_id}</td>
                    <td>
                      {patient.firstName} {patient.lastName}
                    </td>
                    <td>{patient.phoneNumber}</td>
                    <td>{patient.emailAddress}</td>
                    <td>{patient.admitDate}</td>
                    <td>{patient.admitTime}</td>
                    <td>{patient.selectedDoctor}</td>
                    <td>{patient.wardNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Patientlist;
