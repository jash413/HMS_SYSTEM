import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import $ from "jquery";
import "datatables.net";
import { myContext, tokenContext } from "./Main";

function DoctorList() {
  const userData = useContext(myContext);
  const token = useContext(tokenContext);
  const tableRef = useRef(null);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch the list of doctors from the backend
    fetchDoctors();
    setTimeout(() => {
      $(tableRef.current).DataTable();
    }, 500);
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("https://backendmedisys.webwisesolution.me/doctors", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const doctor = response.data.filter((doctor) => {
        return doctor.hospital_id === userData.hospital_id;
      }
      );
      setDoctors(doctor);
    } catch (error) {
      console.error(error);
      console.log(token)
    }
  };
  return (
    <div className="container-xxl">
      <div className="row align-items-center">
        <div className="border-0 mb-4">
          <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
            <h3 className="fw-bold mb-0">Doctor List</h3>
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
                  <th>Doctor Id</th>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Email-Address</th>
                  <th>DOJ</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor) => (
                  <tr>
                    <td>{doctor.doctor_id}</td>
                    <td>
                      {doctor.first_name} {doctor.last_name}
                    </td>
                    <td>{doctor.phone}</td>
                    <td>{doctor.email}</td>
                    <td>{doctor.join_date}</td>
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

export default DoctorList;
