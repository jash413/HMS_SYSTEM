import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS
import { myContext, tokenContext } from "./Main";
import $ from "jquery";
import "datatables.net";
import PopoverComponent from "../components/PopoverComponent";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';


ChartJS.register(
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

  const [patientData, setPatientData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

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



  // Data for bar chart
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov","Dec"],
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
      {/* <div className="row g-3 mb-3">
        <div className="col-md-12 col-lg-4 col-xl-4 d-none d-lg-block">
          <svg
            id="b142c218-c3ca-487e-979b-dffd11e3a76c"
            className="cal-img "
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="389.35169"
            viewBox="0 0 532.48525 389.35169"
          >
            <path
              d="M657.62709,439.57146a6.51369,6.51369,0,0,1-6.48976-6.0878l-.9666-14.75858a6.51365,6.51365,0,0,1,6.07385-6.92548l115.62688-7.57232a13.90881,13.90881,0,0,1,1.81772,27.75816l-115.62662,7.57183Q657.84421,439.57122,657.62709,439.57146Z"
              transform="translate(-333.75738 -255.32415)"
              fill="var(--secondary-color)"
            />
            <path
              d="M680.427,441.47433a6.52191,6.52191,0,0,1-6.50615-6.2708l-.824-22.04369a6.513,6.513,0,0,1,6.26591-6.75177l95.08311-3.55375a6.51385,6.51385,0,0,1,6.75226,6.26591l.824,22.04369a6.513,6.513,0,0,1-6.2659,6.75177l-95.08311,3.55375C680.59089,441.47286,680.50845,441.47433,680.427,441.47433Z"
              transform="translate(-333.75738 -255.32415)"
              fill="#2f2e41"
            />
            <path
              d="M791.8491,644.67585H777.05871a6.52087,6.52087,0,0,1-6.51349-6.51349V514.893a6.52087,6.52087,0,0,1,6.51349-6.51348H791.8491a6.52087,6.52087,0,0,1,6.51349,6.51348V638.16236A6.52087,6.52087,0,0,1,791.8491,644.67585Z"
              transform="translate(-333.75738 -255.32415)"
              fill="#2f2e41"
            />
            <path
              d="M754.7143,644.67585H739.92391a6.52087,6.52087,0,0,1-6.51349-6.51349V514.893a6.52087,6.52087,0,0,1,6.51349-6.51348H754.7143a6.52087,6.52087,0,0,1,6.51349,6.51348V638.16236A6.52087,6.52087,0,0,1,754.7143,644.67585Z"
              transform="translate(-333.75738 -255.32415)"
              fill="#2f2e41"
            />
            <circle
              cx="435.62828"
              cy="73.30445"
              r="51.10582"
              fill="var(--secondary-color)"
            />
            <path
              d="M741.7224,346.07792a12.12059,12.12059,0,0,1-4.42606-2.59809,8.15037,8.15037,0,0,1-2.38243-6.45236,5.48293,5.48293,0,0,1,2.43759-4.21982c1.82759-1.17234,4.27192-1.1758,6.76064-.079l-.09421-19.951,2.004-.00955.11086,23.4545-1.5442-.97135c-1.79064-1.12447-4.34788-1.916-6.15482-.7566a3.521,3.521,0,0,0-1.5247,2.72455,6.15892,6.15892,0,0,0,1.77145,4.81091c2.213,2.11392,5.44168,2.775,9.12357,3.36575l-.31763,1.97862A33.03108,33.03108,0,0,1,741.7224,346.07792Z"
              transform="translate(-333.75738 -255.32415)"
              fill="#2f2e41"
            />
            <rect
              x="727.57592"
              y="308.07255"
              width="2.0039"
              height="10.79402"
              transform="matrix(0.13093, -0.99139, 0.99139, 0.13093, -11.34164, 739.40982)"
              fill="#2f2e41"
            />
            <rect
              x="761.35331"
              y="312.53222"
              width="2.0039"
              height="10.79402"
              transform="translate(13.59208 776.77223) rotate(-82.4768)"
              fill="#2f2e41"
            />
            <path
              d="M725.88081,547.96632h-.00009a8.52716,8.52716,0,0,1-8.51764-8.51764s13.57921-73.67742,21.339-116.86035a36.37333,36.37333,0,0,1,35.79926-29.94363h.00007a46.07539,46.07539,0,0,1,46.07539,46.07539v14.55024A94.696,94.696,0,0,1,725.88081,547.96632Z"
              transform="translate(-333.75738 -255.32415)"
              fill="#2f2e41"
            />
            <path
              d="M790.35864,540.59071a6.52391,6.52391,0,0,1-5.98009,3.80507l-14.78976-.12843a6.51295,6.51295,0,0,1-6.45648-6.56975l1.00467-115.87a13.90824,13.90824,0,1,1,27.81543.24117l-1.00412,115.87A6.47722,6.47722,0,0,1,790.35864,540.59071Z"
              transform="translate(-333.75738 -255.32415)"
              fill="var(--secondary-color)"
            />
            <path
              d="M796.89226,509.65844a6.52358,6.52358,0,0,1-5.98,3.80485l-25.26174-.21914a6.5209,6.5209,0,0,1-6.45648-6.56976l.82512-95.1459a6.51295,6.51295,0,0,1,6.56963-6.45681l25.2613.21894a6.51295,6.51295,0,0,1,6.45649,6.56975l-.82468,95.14611A6.48519,6.48519,0,0,1,796.89226,509.65844Z"
              transform="translate(-333.75738 -255.32415)"
              fill="#2f2e41"
            />
            <path
              d="M754.6343,298.51405c-7.9642,1.35175-16.85609,2.89733-24.44478-.79571-5.97328-2.9069-10.08009-8.71259-8.62518-15.53409,2.89548-13.57569,18.43743-19.57763,30.92767-18.3664a33.17835,33.17835,0,0,1,19.63021,8.85084,1.81749,1.81749,0,0,0,3.06741-1.27056c-.05315-5.00947,3.69455-9.18969,8.13532-11.0767,5.56-2.36261,12.02054-1.51832,17.73484-.254a78.74679,78.74679,0,0,1,60.83363,65.858,77.868,77.868,0,0,1-2.5009,33.35023c-3.03124,9.95948-8.63018,19.96974-17.84813,25.38834-8.30647,4.8828-20.38476,6.14019-28.04987-.71022-6.13981-5.48723-8.90734-15.74534-3.87-22.84427a14.06282,14.06282,0,0,1,13.23124-5.72048,12.59183,12.59183,0,0,1,10.15717,9.0336,12.34855,12.34855,0,0,1-4.28719,12.17557,11.98985,11.98985,0,0,1-17.08764-3.2621c-1.22071-1.95857-4.331-.15647-3.103,1.8138a15.91988,15.91988,0,0,0,13.08837,7.34165,14.71593,14.71593,0,0,0,12.95418-7.25451A15.35938,15.35938,0,0,0,835.032,359.876a16.45392,16.45392,0,0,0-13.71557-8.21305,17.88422,17.88422,0,0,0-14.795,7.63283,19.00308,19.00308,0,0,0-2.76852,13.93458,23.0561,23.0561,0,0,0,6.77554,12.87447,23.81222,23.81222,0,0,0,15.10181,6.14228c12.18476.69494,23.06255-6.32472,29.78312-16.08243,6.97354-10.125,10.092-22.83033,10.72046-34.97715a82.43531,82.43531,0,0,0-27.72525-66.01717,83.76892,83.76892,0,0,0-30.40919-16.9906c-11.10146-3.40065-26.60128-5.87948-34.098,5.46345a13.81219,13.81219,0,0,0-2.30549,7.755l3.06741-1.27056c-10.84666-10.365-27.89773-12.98409-41.44177-6.61282-6.8027,3.20007-12.70035,9.15063-14.81478,16.48759-2.19389,7.61272.97872,15.08455,7.48524,19.402,8.855,5.87575,19.83684,4.24871,29.6976,2.57506,2.27529-.38618,1.31047-3.84989-.95534-3.46532Z"
              transform="translate(-333.75738 -255.32415)"
              fill="#2f2e41"
            />
            <path
              d="M642.25738,519.40775h-291a17.52,17.52,0,0,1-17.5-17.5v-174a17.52,17.52,0,0,1,17.5-17.5h291a17.52,17.52,0,0,1,17.5,17.5v174A17.52,17.52,0,0,1,642.25738,519.40775Zm-291-206a14.51669,14.51669,0,0,0-14.5,14.5v174a14.51669,14.51669,0,0,0,14.5,14.5h291a14.51669,14.51669,0,0,0,14.5-14.5v-174a14.5167,14.5167,0,0,0-14.5-14.5Z"
              transform="translate(-333.75738 -255.32415)"
              fill="#3f3d56"
            />
            <path
              d="M390.25738,351.40775a12.5,12.5,0,1,1,12.5-12.5A12.51408,12.51408,0,0,1,390.25738,351.40775Zm0-22a9.5,9.5,0,1,0,9.5,9.5A9.5108,9.5108,0,0,0,390.25738,329.40775Z"
              transform="translate(-333.75738 -255.32415)"
              fill="#3f3d56"
            />
            <path
              d="M601.25738,351.40775a12.5,12.5,0,1,1,12.5-12.5A12.51408,12.51408,0,0,1,601.25738,351.40775Zm0-22a9.5,9.5,0,1,0,9.5,9.5A9.5108,9.5108,0,0,0,601.25738,329.40775Z"
              transform="translate(-333.75738 -255.32415)"
              fill="#3f3d56"
            />
            <path
              d="M419.75738,427.40775h-54a8.51012,8.51012,0,0,1-8.5-8.5v-32a8.51013,8.51013,0,0,1,8.5-8.5h54a8.51014,8.51014,0,0,1,8.5,8.5v32A8.51013,8.51013,0,0,1,419.75738,427.40775Z"
              transform="translate(-333.75738 -255.32415)"
              fill="#e6e6e6"
            />
            <path
              d="M523.75738,427.40775h-54a8.51012,8.51012,0,0,1-8.5-8.5v-32a8.51013,8.51013,0,0,1,8.5-8.5h54a8.51014,8.51014,0,0,1,8.5,8.5v32A8.51013,8.51013,0,0,1,523.75738,427.40775Z"
              transform="translate(-333.75738 -255.32415)"
              fill="#e6e6e6"
            />
            <path
              d="M573.75738,379.40775a7.5082,7.5082,0,0,0-7.5,7.5v32a7.50819,7.50819,0,0,0,7.5,7.5h54a7.5082,7.5082,0,0,0,7.5-7.5v-32a7.5082,7.5082,0,0,0-7.5-7.5Z"
              transform="translate(-333.75738 -255.32415)"
              fill="#e6e6e6"
            />
            <path
              d="M420.25738,491.40775h-54a8.51012,8.51012,0,0,1-8.5-8.5v-32a8.51013,8.51013,0,0,1,8.5-8.5h54a8.51014,8.51014,0,0,1,8.5,8.5v32A8.51013,8.51013,0,0,1,420.25738,491.40775Z"
              transform="translate(-333.75738 -255.32415)"
              fill="#e6e6e6"
            />
            <path
              d="M524.25738,491.40775h-54a8.51012,8.51012,0,0,1-8.5-8.5v-32a8.51013,8.51013,0,0,1,8.5-8.5h54a8.51014,8.51014,0,0,1,8.5,8.5v32A8.51013,8.51013,0,0,1,524.25738,491.40775Z"
              transform="translate(-333.75738 -255.32415)"
              fill="#e6e6e6"
            />
            <path
              d="M628.25738,491.40775h-54a8.51012,8.51012,0,0,1-8.5-8.5v-32a8.51013,8.51013,0,0,1,8.5-8.5h54a8.51014,8.51014,0,0,1,8.5,8.5v32A8.51013,8.51013,0,0,1,628.25738,491.40775Z"
              transform="translate(-333.75738 -255.32415)"
              fill="#e6e6e6"
            />
            <path
              d="M390.25738,342.40775a3.50424,3.50424,0,0,1-3.5-3.5v-50a3.5,3.5,0,0,1,7,0v50A3.50425,3.50425,0,0,1,390.25738,342.40775Z"
              transform="translate(-333.75738 -255.32415)"
              fill="#3f3d56"
            />
            <path
              d="M601.25738,342.40775a3.50424,3.50424,0,0,1-3.5-3.5v-50a3.5,3.5,0,0,1,7,0v50A3.50425,3.50425,0,0,1,601.25738,342.40775Z"
              transform="translate(-333.75738 -255.32415)"
              fill="#3f3d56"
            />
            <path
              id="b5e0804e-c461-433c-b77b-73087ef71cb0"
              data-name="Path 395"
              d="M390.71607,415.879a6.78778,6.78778,0,0,1-4.08354-1.35714l-.073-.05479-15.38069-11.76574a6.83507,6.83507,0,0,1,8.31719-10.84883l9.96238,7.63962L413,368.77943a6.83219,6.83219,0,0,1,9.579-1.26526l.002.00148-.1461.20287.15006-.20287a6.84044,6.84044,0,0,1,1.26378,9.581l-27.69011,36.1087a6.83631,6.83631,0,0,1-5.43658,2.66555Z"
              transform="translate(-333.75738 -255.32415)"
              fill="var(--secondary-color)"
            />
            <path
              id="b3a0cc8c-ec19-4bca-9f18-6cf478ced8d1"
              data-name="Path 395"
              d="M497.71607,478.879a6.78778,6.78778,0,0,1-4.08354-1.35714l-.073-.05479-15.38069-11.76574a6.83507,6.83507,0,0,1,8.31719-10.84883l9.96238,7.63962L520,431.77943a6.83219,6.83219,0,0,1,9.579-1.26526l.002.00148-.1461.20287.15006-.20287a6.84044,6.84044,0,0,1,1.26378,9.581l-27.69011,36.1087a6.83631,6.83631,0,0,1-5.43658,2.66555Z"
              transform="translate(-333.75738 -255.32415)"
              fill="var(--secondary-color)"
            />
            <path
              id="b29a902b-cd84-4f58-97ad-17c408cf2b06"
              data-name="Path 395"
              d="M598.71607,415.879a6.78778,6.78778,0,0,1-4.08354-1.35714l-.073-.05479-15.38069-11.76574a6.83507,6.83507,0,0,1,8.31719-10.84883l9.96238,7.63962L621,368.77943a6.83219,6.83219,0,0,1,9.579-1.26526l.002.00148-.1461.20287.15006-.20287a6.84044,6.84044,0,0,1,1.26378,9.581l-27.69011,36.1087a6.83631,6.83631,0,0,1-5.43658,2.66555Z"
              transform="translate(-333.75738 -255.32415)"
              fill="var(--secondary-color)"
            />
          </svg>
          <div className="calandarclock-block">
            <div className="signboard outer">
              <div className="signboard front inner anim04c">
                <ul>
                  <li className="year anim04c">
                    <span />
                  </li>
                  <li>
                    <ul className="calendarMain anim04c">
                      <li className="month anim04c">
                        <span />
                      </li>
                      <li className="date anim04c">
                        <span />
                      </li>
                      <li className="day anim04c">
                        <span />
                      </li>
                    </ul>
                  </li>
                  <li className="clock minute anim04c">
                    <span />
                  </li>
                  <li className="calendarNormal date2 anim04c">
                    <span />
                  </li>
                </ul>
              </div>
              <div className="signboard left inner anim04c">
                <ul>
                  <li className="clock hour anim04c">
                    <span />
                  </li>
                  <li className="calendarNormal day2 anim04c">
                    <span />
                  </li>
                </ul>
              </div>
              <div className="signboard right inner anim04c">
                <ul>
                  <li className="clock second anim04c">
                    <span />
                  </li>
                  <li className="calendarNormal month2 anim04c">
                    <span />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-lg-8 col-xl-8">
          <div className="card">
            <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
              <h6 className="mb-0 fw-bold ">Patient Statistics</h6>
            </div>
            <div className="card-body">
              <div id="apex-stacked-area" />
            </div>
          </div>
        </div>
      </div> */}
      <div className="row g-3 mb-3 row-deck">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
              <h6 className="mb-0 fw-bold ">Patient Statistics</h6>
            </div>
            <div className="card-body">
              <Line data={data} options={options} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
              <h6 className="mb-0 fw-bold ">Patient Statistics</h6>
            </div>
            <div className="card-body">
              <Line data={data} options={options} />
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
