import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import $ from "jquery";
import "datatables.net";
import { myContext, tokenContext } from "./Main";


function Patientlist() {
  const userData = useContext(myContext);
  const token = useContext(tokenContext);
  const tableRef = useRef(null);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  // useEffect to get all doctors
  useEffect(() => {
    axios
      .get("http://localhost:3100/doctors", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const doctors = res.data.filter((doctor) => {
          return doctor.hospital_id === userData.hospital_id;
        });
        setDoctors(doctors);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // Fetch the list of patients from the backend
    fetchPatients();
  }, []);

  useEffect(() => {
    // Initialize the datatable plugin on the table ref when dom is loaded
    setTimeout(() => {
      $(tableRef.current).DataTable();
    }
    , 1000);
  }, [patients]);

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:3100/api/patients",{
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const patients = response.data.filter((patient)=> {
        return patient.hospital_id === userData.
        hospital_id
      })
      setPatients(patients);
    } catch (error) {
      console.error(error);
    }
  };

   // patient's table doctor name
   const getDoctorName = (doctorId) => {
    const doctor = doctors.find((doc) => doc._id === doctorId);
    if (doctor) {
      return doctor.first_name + " " + doctor.last_name;
    }
    return "";
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
                    <td>{getDoctorName(patient.doctor)}</td>
                    {patient.ward === "" ? (
                        <td>Not Assigned</td>
                      ) : (
                        <td>{patient.ward}</td>
                      )}
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
