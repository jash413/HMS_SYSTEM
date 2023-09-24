import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS
import { myContext, tokenContext } from "./Main";
import "datatables.net";
import PopoverComponent from "../components/PopoverComponent";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function Dashboard() {
  const userData = useContext(myContext);
  const token = useContext(tokenContext);

  const [hospitalityData, setHospitalityData] = useState({
    totalAppointment: "",
    totalPatients: "",
    patientsPerDoctor: "",
    totalDoctor: "",
    totalNurse: "",
  });
  const [wards, setWards] = useState([]);
  const tableRef = useRef(null);
  const [patients, setPatients] = useState([]);
  const [billings, setBillings] = useState([]);
  const [pendingBills, setPendingBills] = useState("");
  const [paidBills, setPaidBills] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [pendingBillsList, setPendingBillsList] = useState([]);
  const [doctorWisePendingBillsData, setDoctorWisePendingBillsData] = useState([]);

  const [patientData, setPatientData] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [billData, setBillData] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

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

  // useEffect to calculate patient counts
  useEffect(() => {
    // Initialize an array to store counts for each month
    const monthlyCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    // Loop through the patients and count them by month
    patients.forEach((patient) => {
      const admitDate = new Date(patient.admitDate);
      const month = admitDate.getMonth();
      monthlyCounts[month]++;
    });

    // Update the state with the counts
    setPatientData(monthlyCounts);
  }, [patients]);

  // get all bills
  useEffect(() => {
    axios
      .get("http://localhost:3100/billing", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const bills = res.data.filter((bill) => {
          return bill.hospital_id === userData.hospital_id;
        });
        setBillings(bills);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect to calculate revenue
  useEffect(() => {
    // Initialize an array to store counts for each month
    const monthlyRevenue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    // Loop through the bills and count them by month
    billings.forEach((bill) => {
      const billDate = new Date(bill.visitDate);
      const month = billDate.getMonth();
      monthlyRevenue[month] += bill.totalCharges;
    });

    // Update the state with the counts
    setBillData(monthlyRevenue);
  }, [billings]);

  // useEffect to calculate pending bills
  useEffect(() => {
    // To calculate pending bills
    const pendingBills = billings.filter((bill) => {
      return bill.paymentStatus === "Pending";
    });
    setPendingBills(pendingBills.length);
    setPendingBillsList(pendingBills);
  }, [billings]);

  // useEffect to calculate paid bills
  useEffect(() => {
    // To calculate paid bills
    const paidBills = billings.filter((bill) => {
      return bill.paymentStatus === "Paid";
    });
    setPaidBills(paidBills.length);
  }, [billings]);

  // Data for Patients chart
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Patients",
        data: patientData,
        fill: true,
        backgroundColor: [
          "#8dbfb3",
          // "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: ["#8dbfb3"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "x",
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  // Data for Revenue chart
  const dataR = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Revenue",
        data: billData,
        fill: true,
        backgroundColor: [
          "#8dbfb3",
          // "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: ["#8dbfb3"],
        borderWidth: 1,
      },
    ],
  };

  const optionsR = {
    indexAxis: "x",
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  // Data for pending bill chart
  const dataS = {
    labels: ["Pending", "Paid"],
    datasets: [
      {
        label: "Bills",
        data: [pendingBills, paidBills],
        fill: true,
        backgroundColor: ["#FFAA8A", "#A0D9B4"],
        // borderColor: ["#8dbfb3"],
        borderWidth: 1,
      },
    ],
  };

  const optionsS = {
    // Set the radius to control the size of the doughnut chart
    elements: {
      arc: {
        borderWidth: 0, // Set border width to 0 to remove border
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    radius: "100%",
    plugins: {},
  };

  useEffect(() => {
    // Function to group pending bills by doctors and calculate total pending amount
    const getDoctorWisePendingBills = () => {
      const doctorWisePendingBills = {};

      // Group pending bills by doctors
      pendingBillsList.forEach((bill) => {
        const doctorId = bill.doctor;
        const doctor = doctors.find((doc) => doc._id === doctorId);

        if (doctor) {
          if (!doctorWisePendingBills[doctorId]) {
            doctorWisePendingBills[doctorId] = {
              doctorName: "Dr"+" "+doctor.first_name, // Use the doctor's first name for now
              totalPendingAmount: 0,
            };
          }
          doctorWisePendingBills[doctorId].totalPendingAmount += bill.totalCharges;
        }
      });

      return Object.values(doctorWisePendingBills); // Convert the object to an array
    };

    // Get the doctor-wise pending bills data
    const data = getDoctorWisePendingBills();
    setDoctorWisePendingBillsData(data);
  }, [pendingBillsList, doctors]);

  // Data for PENDING BILL chart doctor wise
  const dataD = {
    labels: doctorWisePendingBillsData.map((doctorData) => doctorData.doctorName),
    datasets: [
      {
        label: "Amount",
        data: doctorWisePendingBillsData.map((doctorData) => doctorData.totalPendingAmount),
        backgroundColor: [
          "#8dbfb3",
          "#33FF57",
          "#5733FF",
          // Add more colors as needed
        ],
        borderWidth: 1,
      },
    ],
  };

  const optionsD = {
    indexAxis: "x",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };


  useEffect(() => {
    // Fetch the list of patients from the backend
    fetchPatients();
    // setTimeout(() => {
    //   $(tableRef.current).DataTable();
    // }, 500);
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:3100/api/patients", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const patients = response.data.filter((patient) => {
        return patient.hospital_id === userData.hospital_id;
      });
      setPatients(patients);
    } catch (error) {
      console.error(error);
    }
  };

  // Get hospitality status data
  useEffect(() => {
    axios
      .post("http://localhost:3100/dashboard/hospitalityStatus", {
        hospital_id: userData.hospital_id,
      })
      .then((res) => {
        setHospitalityData({
          totalAppointment: res.data.appointments,
          totalPatients: res.data.patients,
          patientsPerDoctor: res.data.patientPerDoctor,
          totalDoctor: res.data.doctors,
          totalNurse: res.data.nurse,
        });
      })
      .catch((err) => {
        console.log(err);
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
          `http://localhost:3100/api/patients/${patientId}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
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

  useEffect(() => {
    // Fetch ward data from the backend
    axios
      .get("http://localhost:3100/api/ward", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const wards = response.data.filter((ward) => {
          return ward.hospital_id === userData.hospital_id;
        });
        setWards(wards);
      });
  }, []);

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

  return (
    <div className="container-xxl">
      <div className="row g-3 mb-3 row-deck">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
              <h6 className="mb-0 fw-bold ">New Patient Statistics</h6>
            </div>
            <div className="card-body">
              <Line data={data} options={options} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
              <h6 className="mb-0 fw-bold ">Revenue Statistics</h6>
            </div>
            <div className="card-body">
              <Bar data={dataR} options={optionsR} />
            </div>
          </div>
        </div>
      </div>
      <div className="row g-3 mb-3 row-deck">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
              <h6 className="mb-0 fw-bold ">Billing Status</h6>
            </div>
            <div className="card-body ">
              <Doughnut data={dataS} options={optionsS} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
              <h6 className="mb-0 fw-bold ">Doctor-wise Pending Bills</h6>
            </div>
            <div className="card-body">
              <Bar data={dataD} options={optionsD} />
            </div>
          </div>
        </div>
      </div>
      <div className="row g-3 mb-3 row-deck">
        <div className="col-lg-12 col-xl-6">
          <div className="card">
            <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
              <h6 className="mb-0 fw-bold ">Hospitality Status</h6>
            </div>
            <div className="card-body">
              <div className="row g-3 row-deck">
                <div className="col-md-4 col-sm-6">
                  <div className="card">
                    <div className="card-body ">
                      <i className="icofont-patient-file fs-3 text-secondary" />
                      <h6 className="mt-3 mb-0 fw-bold small-14">
                        Total Appointment
                      </h6>
                      <span className="text-muted">
                        {hospitalityData.totalAppointment}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6">
                  <div className="card">
                    <div className="card-body ">
                      <i className="icofont-crutch fs-3 color-lightblue" />
                      <h6 className="mt-3 mb-0 fw-bold small-14">
                        Total Patients
                      </h6>
                      <span className="text-muted">
                        {hospitalityData.totalPatients}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6">
                  <div className="card">
                    <div className="card-body ">
                      <i className="icofont-doctor fs-3 color-light-orange" />
                      <h6 className="mt-3 mb-0 fw-bold small-14">
                        Patients per Doctor
                      </h6>
                      <span className="text-muted">
                        {hospitalityData.patientsPerDoctor}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6">
                  <div className="card">
                    <div className="card-body ">
                      <i className="icofont-doctor-alt fs-3 color-lavender-purple" />
                      <h6 className="mt-3 mb-0 fw-bold small-14">
                        Total Doctor
                      </h6>
                      <span className="text-muted">
                        {hospitalityData.totalDoctor}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6">
                  <div className="card">
                    <div className="card-body ">
                      <i className="icofont-nurse-alt fs-3 color-light-success" />
                      <h6 className="mt-3 mb-0 fw-bold small-14">
                        Total Nurse{" "}
                      </h6>
                      <span className="text-muted">
                        {hospitalityData.totalNurse}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12 col-xl-6">
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
        </div>
      </div>
      <div className="row g-3 mb-3">
        <div className="col-xl-8 col-lg-12 flex-column">
          {/* <div className="card mb-3">
            <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
              <h6 className="mb-0 fw-bold ">Addmission by Division</h6>
            </div>
            <div className="card-body">
              <div id="hiringsources" />
            </div>
          </div> */}
          <div className="card">
            <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
              <h6 className="mb-0 fw-bold ">Patients Information</h6>
            </div>
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
                      <td>{patient.selectedDoctor}</td>
                      <td>{patient.ward}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-12 flex-column">
          <div className="card mb-3">
            <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
              <h6 className="mb-0 fw-bold ">Make appointment</h6>
            </div>
            <div className="card-body">
              <div className="wrapper">
                <div id="calendar">
                  <div className="monthChange" />
                  <div className="timepicker">
                    <div className="owl">
                      <div>06:00</div>
                      <div>07:00</div>
                      <div>08:00</div>
                      <div>09:00</div>
                      <div>10:00</div>
                      <div>11:00</div>
                      <div>12:00</div>
                      <div>13:00</div>
                      <div>14:00</div>
                      <div>15:00</div>
                      <div>16:00</div>
                      <div>17:00</div>
                      <div>18:00</div>
                      <div>19:00</div>
                      <div>20:00</div>
                    </div>
                    <div className="fade-l" />
                    <div className="fade-r" />
                  </div>
                </div>
                <div className="inner-wrap">
                  <form>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="ps-name"
                        placeholder="Enter Name"
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="ps-email"
                        placeholder="Enter Email"
                      />
                    </div>
                    <select
                      className="form-select mb-3"
                      aria-label="Default select example"
                    >
                      <option selected>Select Doctor</option>
                      <option value={1}>One</option>
                      <option value={2}>Two</option>
                      <option value={3}>Three</option>
                    </select>
                    <button
                      type="submit"
                      className="btn btn-primary disabled request"
                    >
                      {" "}
                      Request appointment <span>On</span>
                      <span className="day fw-bold text-dark" />
                      <span>At</span>
                      <span className="time fw-bold text-dark" />
                      <i className="icofont-dotted-right fs-3" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="card bg-secondary position-relative">
            <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
              <h6 className="mb-0 fw-bold text-white ">Doctor Of the Month</h6>
            </div>
            <div className="card-body text-center p-4 text-white">
              <img
                src="assets/images/profile_av.png"
                alt=""
                className="rounded-circle mb-3 img-thumbnail avatar xl shadow-sm"
              />
              <div className="d-flex align-items-center justify-content-center">
                <span className="mb-2 me-3">
                  <a href="#" className="rating-link active">
                    <i className="bi bi-star-fill text-primary" />
                  </a>
                  <a href="#" className="rating-link active">
                    <i className="bi bi-star-fill text-primary" />
                  </a>
                  <a href="#" className="rating-link active">
                    <i className="bi bi-star-fill text-primary" />
                  </a>
                  <a href="#" className="rating-link active">
                    <i className="bi bi-star-fill text-primary" />
                  </a>
                  <a href="#" className="rating-link active">
                    <i className="bi bi-star-half text-primary" />
                  </a>
                </span>
              </div>
              <h5 className="mb-0">Manuella Nevoresky</h5>
              <span className="small">Cardiologists</span>
              <div className="d-flex justify-content-center pt-3">
                <div className="opration d-flex justify-content-start align-content-center p-3">
                  <i className="icofont-operation-theater fs-1" />
                  <div className="opt_ineer text-start ps-3">
                    <span className="d-block">12</span>
                    <span className="d-block">Oprations</span>
                  </div>
                </div>
                <div className="pations-visit d-flex justify-content-start align-content-center p-3 border-start">
                  <i className="icofont-crutch fs-1" />
                  <div className="opt_ineer text-start ps-3">
                    <span className="d-block">35</span>
                    <span className="d-block">Patient</span>
                  </div>
                </div>
              </div>
              <div className="cup">
                <i className="icofont-award" />
              </div>
            </div>
          </div> */}
        </div>
      </div>
      {/* .row end */}
    </div>
  );
}

export default Dashboard;
