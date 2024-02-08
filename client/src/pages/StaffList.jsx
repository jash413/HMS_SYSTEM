import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import $ from "jquery";
import "datatables.net";
import { myContext, tokenContext } from "./Main";


function StaffList() {
  const userData = useContext(myContext);
  const token = useContext(tokenContext);
    const tableRef = useRef(null);
    const [staffMembers, setStaffMembers] = useState([]);
    useEffect(() => {
        // Fetch the list of staff members from the backend
        fetchStaffMembers();
        setTimeout(() => {
          $(tableRef.current).DataTable();
        }, 500);
      }, []);
    
      const fetchStaffMembers = async () => {
        try {
          const response = await axios.get("https://backendmedisys.webwisesolution.me/api/staff",{
            headers: {
              authorization: `Bearer ${token}`,
            },
          });
          const data = response.data.filter((staff) => {
            return staff.hospital_id === userData.hospital_id;
          }
          );
          setStaffMembers(data);
        } catch (error) {
          console.error(error);
        }
      };
  return (
    <div className="container-xxl">
  <div className="row align-items-center">
    <div className="border-0 mb-4">
      <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
        <h3 className="fw-bold mb-0">Staff Members List</h3>
      </div>
    </div>
  </div>
  <div className="row mb-3">
    <div className="card">
      <div className="card-body">
        <table
          id="staff-table"
          className="table table-hover align-middle mb-0"
          style={{ width: "100%" }}
          ref={tableRef}
        >
          <thead>
            <tr>
              <th>Staff Id</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email Address</th>
              <th>Join Date</th>
              <th>Gender</th>
              <th>Role</th>
              <th>Working Hours</th>
            </tr>
          </thead>
          <tbody>
            {staffMembers.map((staff) => (
              <tr key={staff.staff_id}>
                <td>{staff.staff_id}</td>
                <td>
                  {staff.first_name} {staff.last_name}
                </td>
                <td>{staff.phone}</td>
                <td>{staff.email}</td>
                <td>{staff.hire_date}</td>
                <td>{staff.gender}</td>
                <td>{staff.role}</td>
                <td>
                   {staff.workingHours.startTime} To:{" "}
                  {staff.workingHours.endTime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

  )
}

export default StaffList
