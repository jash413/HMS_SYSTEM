import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

// Import pages

// Sign in page
import SignIn from "./SignIn";

// Home page
import Dashboard from "./Dashboard";

// Patient pages
import PatientForm from "./Add-patient";
import Patientlist from "./PatientList";

// Doctor pages
import DoctorAdd from "./DoctorAdd";
import DoctorList from "./DoctorList";
import DoctorAppointment from "./DoctorAppointment";
import Calendar from "./Calendar";

// Admission, Discharge pages
import AdmissionComponent from "./Admission";
import DischargeForm from "./Discharge";

// Operation Theatre pages
import SurgerySchedulingForm from "./ScheduleSurgery";

// Report pages
import PostSurgeryForm from "./PostSurgery";
import PostSurgeryUpdate from "./PostSurgeryUpdate";

// Ward pages
import Ward from "./Ward";

// User pages
import UserRegistration from "./UserRegistration";
import Auth404 from "./Auth-404";
import axios from "axios";
import EMR from "./EMR";
import ViewEHR from "./ViewEHR";
import UpdateEHR from "./UpdateEHR";

// Staff Pages
import Staff from "./Staff";
import StaffList from "./StaffList";

// Billing pages
import PatientInvoices from "./PatientInvoices";
import CreateInvoice from "./CreateInvoice";
import ViewInvoice from "./ViewInvoice";

const myContext = createContext();
const tokenContext = createContext();

function Index() {
  // Get user data from local storage
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Initially not authenticated
  const [user, setUser] = useState(null); // Initially no user
  const [userPermissions, setUserPermissions] = useState([]); // Initially no permissions
  const [token, setToken] = useState(null); // Initially no token
  const [hospitalData, setHospitalData] = useState(null);

  // Check if the user is already authenticated
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUserPermissions(JSON.parse(localStorage.getItem("permissions")));
      setToken(localStorage.getItem("token"));
      setIsAuthenticated(true);
      setUser(JSON.parse(localStorage.getItem("user")));
      if (window.location.pathname === "/") {
        window.location.href = "/dashboard";
      }
    } else {
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }
  }, []);

  // Get hospital data
  useEffect(() => {
    if (token && user) {
      axios
        .get(`http://localhost:3100/api/hospital/${user.hospital_id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setHospitalData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token, user]);

  // check jwt token expiry
  useEffect(() => {
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        handleSignOut();
      }
    }
  }, [token]);

// forced logout after 55 minutes
  useEffect(() => {
      setTimeout(() => {
        handleSignOut();
      }, 3300000);
  }, []);

  // Handle sign in
  const handleSignIn = () => {
    setUserPermissions(JSON.parse(localStorage.getItem("permissions")));
    setToken(localStorage.getItem("token"));
    setIsAuthenticated(true);
    setUser(JSON.parse(localStorage.getItem("user")));
  };

  // Handle sign out
  const handleSignOut = () => {
    // Clear user authentication state
    setIsAuthenticated(false);
    setUser(null);

    // Clear user data from local storage
    localStorage.removeItem("user");
    localStorage.removeItem("permissions");
    localStorage.removeItem("token");

    // Redirect to the sign-in page (replace '/signin' with your sign-in route)
    window.location.href = "/";
  };

  // Handle Sidebar
  useEffect(() => {
    if (isAuthenticated) {
      // Function to toggle the sidebar
      const toggleSidebar = () => {
        const sidebar = document.querySelector(".sidebar");
        sidebar.classList.toggle("open");
        sidebar.classList.remove("sidebar-mini");
      };

      // Function to toggle sidebar mini version
      const toggleSidebarMini = () => {
        const sidebar = document.querySelector(".sidebar");
        sidebar.classList.toggle("sidebar-mini");
        sidebar.classList.remove("open");
      };

      // Attach event listeners
      const menuToggle = document.querySelector(".menu-toggle");
      const sidebarMiniBtn = document.querySelector(".sidebar-mini-btn");

      menuToggle.addEventListener("click", toggleSidebar);
      sidebarMiniBtn.addEventListener("click", toggleSidebarMini);

      // Cleanup the event handlers when the component unmounts
      return () => {
        menuToggle.removeEventListener("click", toggleSidebar);
        sidebarMiniBtn.removeEventListener("click", toggleSidebarMini);
      };
    }
  }, [isAuthenticated]);

  return (
    <myContext.Provider value={user}>
      <tokenContext.Provider value={token}>
        <Router>
          <div id="ihealth-layout" className="theme-tradewind">
            {!isAuthenticated && (
              <Routes>
                <Route path="/" element={<SignIn onSignIn={handleSignIn} />} />
              </Routes>
            )}
            {isAuthenticated && (
              <>
                {/* sidebar */}
                <div className="sidebar px-4 py-4 py-md-5 me-0">
                  <div className="d-flex flex-column h-100">
                    <Link to="/dashboard" className="mb-0 brand-icon">
                      <a className="mb-0 brand-icon">
                        <span className="logo-icon">
                          <i className="icofont-heart-beat fs-2" />
                        </span>
                        <span className="logo-text">Medisys</span>
                      </a>
                    </Link>
                    {/* Menu: main ul */}
                    <ul className="menu-list flex-grow-1 mt-3">
                      <li>
                        <Link to="/dashboard">
                          <a className="m-link">
                            <i className="icofont-ui-home fs-5" />{" "}
                            <span>Dashboard</span>{" "}
                          </a>
                        </Link>
                      </li>
                      {userPermissions.includes("create-user") && (
                        <li className="collapsed">
                          <a
                            className="m-link"
                            data-bs-toggle="collapse"
                            data-bs-target="#menu-User"
                            href="#"
                          >
                            <i className="icofont-users fs-5" />{" "}
                            <span>User Management</span>{" "}
                            <span className="arrow icofont-rounded-down ms-auto text-end fs-5" />
                          </a>
                          {/* Menu: Sub menu ul */}
                          <ul className="sub-menu collapse" id="menu-User">
                            {userPermissions.includes("create-user") && (
                              <li>
                                <Link to="/create-user">
                                  <a className="ms-link">Create User</a>
                                </Link>
                              </li>
                            )}
                          </ul>
                        </li>
                      )}
                      {(userPermissions.includes("view-doctorlist") ||
                        userPermissions.includes("add-doctor") ||
                        userPermissions.includes("add-appointment") ||
                        userPermissions.includes("view-calendar")) && (
                        <li className="collapsed">
                          <a
                            className="m-link"
                            data-bs-toggle="collapse"
                            data-bs-target="#menu-Doctor"
                            href="#"
                          >
                            <i className="icofont-doctor-alt fs-5" />{" "}
                            <span>Doctor</span>{" "}
                            <span className="arrow icofont-rounded-down ms-auto text-end fs-5" />
                          </a>
                          {/* Menu: Sub menu ul */}
                          <ul className="sub-menu collapse" id="menu-Doctor">
                            {userPermissions.includes("view-doctorlist") && (
                              <li>
                                <Link to="/doctor-list">
                                  <a className="ms-link">All Doctors</a>
                                </Link>
                              </li>
                            )}
                            {userPermissions.includes("add-doctor") && (
                              <li>
                                <Link to="/doctor-add">
                                  <a className="ms-link">Add Doctor</a>
                                </Link>
                              </li>
                            )}
                            {userPermissions.includes("add-appointment") && (
                              <li>
                                <Link to="/doctor-appointment">
                                  <a className="ms-link">Appointment</a>
                                </Link>
                              </li>
                            )}
                            {userPermissions.includes("view-calendar") && (
                              <li>
                                <Link to="/calendar">
                                  <a className="ms-link">Doctor Schedule</a>
                                </Link>
                              </li>
                            )}
                          </ul>
                        </li>
                      )}
                      {(userPermissions.includes("view-patientlist") ||
                        userPermissions.includes("add-patient")) && (
                        <li className="collapsed">
                          <a
                            className="m-link"
                            data-bs-toggle="collapse"
                            data-bs-target="#menu-Patient"
                            href="#"
                          >
                            <i className="icofont-users-alt-4 fs-5" />{" "}
                            <span>Patient</span>{" "}
                            <span className="arrow icofont-rounded-down ms-auto text-end fs-5" />
                          </a>
                          {/* Menu: Sub menu ul */}
                          <ul className="sub-menu collapse" id="menu-Patient">
                            {userPermissions.includes("view-patientlist") && (
                              <li>
                                <Link to="/patient-list">
                                  <a className="ms-link">Patient List</a>
                                </Link>
                              </li>
                            )}
                            {userPermissions.includes("add-patient") && (
                              <li>
                                <Link to="/patient-add">
                                  <a className="ms-link">Add Patient</a>
                                </Link>
                              </li>
                            )}
                          </ul>
                        </li>
                      )}
                      {(userPermissions.includes("admission") ||
                        userPermissions.includes("discharge") ||
                        userPermissions.includes("transfer") ||
                        userPermissions.includes("view-ward")) && (
                        <li className="collapsed">
                          <a
                            className="m-link"
                            data-bs-toggle="collapse"
                            data-bs-target="#menu-ADT"
                            href="#"
                          >
                            <i className="icofont-hospital fs-5" />{" "}
                            <span>A/D/T</span>{" "}
                            <span className="arrow icofont-rounded-down ms-auto text-end fs-5" />
                          </a>
                          {/* Menu: Sub menu ul */}
                          <ul className="sub-menu collapse" id="menu-ADT">
                            {userPermissions.includes("admission") && (
                              <li>
                                <Link to="/admission">
                                  <a className="ms-link">Admission</a>
                                </Link>
                              </li>
                            )}
                            {userPermissions.includes("discharge") && (
                              <li>
                                <Link to="/discharge">
                                  <a className="ms-link">Discharge</a>
                                </Link>
                              </li>
                            )}
                            {userPermissions.includes("transfer") && (
                              <li>
                                <Link to="/transfer">
                                  <a className="ms-link">Transfer</a>
                                </Link>
                              </li>
                            )}
                            {userPermissions.includes("view-ward") && (
                              <li>
                                <Link to="/room-status">
                                  <a className="ms-link">Room Status</a>
                                </Link>
                              </li>
                            )}
                          </ul>
                        </li>
                      )}
                      {(userPermissions.includes("view-surgerylist") ||
                        userPermissions.includes("schedule-surgery")) && (
                        <li className="collapsed">
                          <a
                            className="m-link"
                            data-bs-toggle="collapse"
                            data-bs-target="#menu-OT"
                            href="#"
                          >
                            <i className="icofont-operation-theater fs-5" />{" "}
                            <span>Operation Theatre</span>{" "}
                            <span className="arrow icofont-rounded-down ms-auto text-end fs-5" />
                          </a>
                          {/* Menu: Sub menu ul */}
                          <ul className="sub-menu collapse" id="menu-OT">
                            {userPermissions.includes("view-surgerylist") && (
                              <li>
                                <Link to="/surgery-list">
                                  <a className="ms-link">Surgery List</a>
                                </Link>
                              </li>
                            )}
                            {userPermissions.includes("schedule-surgery") && (
                              <li>
                                <Link to="/schedule-surgery">
                                  <a className="ms-link">Schedule Surgery</a>
                                </Link>
                              </li>
                            )}
                          </ul>
                        </li>
                      )}
                      {(userPermissions.includes("create-report") ||
                        userPermissions.includes("update-report")) && (
                        <li className="collapsed">
                          <a
                            className="m-link"
                            data-bs-toggle="collapse"
                            data-bs-target="#menu-SR"
                            href="#"
                          >
                            <i className="icofont-patient-file fs-5" />{" "}
                            <span>Surgery Report</span>{" "}
                            <span className="arrow icofont-rounded-down ms-auto text-end fs-5" />
                          </a>
                          {/* Menu: Sub menu ul */}
                          <ul className="sub-menu collapse" id="menu-SR">
                            {userPermissions.includes("create-report") && (
                              <li>
                                <Link to="/create-report">
                                  <a className="ms-link">Create Report</a>
                                </Link>
                              </li>
                            )}
                            {userPermissions.includes("update-report") && (
                              <li>
                                <Link to="/update-report">
                                  <a className="ms-link">Update Report</a>
                                </Link>
                              </li>
                            )}
                          </ul>
                        </li>
                      )}
                      {(userPermissions.includes("create-ehr") ||
                      userPermissions.includes("view-ehr") ||
                        userPermissions.includes("update-ehr") )  && (
                        <li className="collapsed">
                          <a
                            className="m-link"
                            data-bs-toggle="collapse"
                            data-bs-target="#menu-SR1"
                            href="#"
                          >
                            <i className="icofont-papers fs-5" />{" "}
                            <span>EHR</span>{" "}
                            <span className="arrow icofont-rounded-down ms-auto text-end fs-5" />
                          </a>
                          {/* Menu: Sub menu ul */}
                          <ul className="sub-menu collapse" id="menu-SR1">
                            {userPermissions.includes("create-ehr") && (
                              <li>
                                <Link to="/create-ehr">
                                  <a className="ms-link">Create EHR</a>
                                </Link>
                              </li>
                            )}
                            {userPermissions.includes("view-ehr") && (
                              <li>
                                <Link to="/view-ehr">
                                  <a className="ms-link">View EHR</a>
                                </Link>
                              </li>
                            )}
                            {userPermissions.includes("update-ehr") && (
                              <li>
                                <Link to="/update-ehr">
                                  <a className="ms-link">Update EHR</a>
                                </Link>
                              </li>
                            )}
                          </ul>
                        </li>
                      )}
                      {(userPermissions.includes("add-staff") ||
                        userPermissions.includes("staff-list")) && (
                        <li className="collapsed">
                          <a
                            className="m-link"
                            data-bs-toggle="collapse"
                            data-bs-target="#menu-SR2"
                            href="#"
                          >
                            <i className="icofont-users-alt-5 fs-5" />{" "}
                            <span>Staff Management</span>{" "}
                            <span className="arrow icofont-rounded-down ms-auto text-end fs-5" />
                          </a>
                          {/* Menu: Sub menu ul */}
                          <ul className="sub-menu collapse" id="menu-SR2">
                            {userPermissions.includes("add-staff") && (
                              <li>
                                <Link to="/add-staff">
                                  <a className="ms-link">Add Staff</a>
                                </Link>
                              </li>
                            )}
                            {userPermissions.includes("staff-list") && (
                              <li>
                                <Link to="/staff-list">
                                  <a className="ms-link">Staff Members</a>
                                </Link>
                              </li>
                            )}
                          </ul>
                        </li>
                      )}
                      {(userPermissions.includes("create-invoice") ||
                        userPermissions.includes("update-invoice") ||
                        userPermissions.includes("view-invoice")) && (
                        <li className="collapsed">
                          <a
                            className="m-link"
                            data-bs-toggle="collapse"
                            data-bs-target="#menu-invoice"
                            href="#"
                          >
                            <i className="icofont-rupee fs-5" />{" "}
                            <span>Invoice Management</span>{" "}
                            <span className="arrow icofont-rounded-down ms-auto text-end fs-5" />
                          </a>
                          {/* Menu: Sub menu ul */}
                          <ul className="sub-menu collapse" id="menu-invoice">
                            {userPermissions.includes("patient-invoices") && (
                              <li>
                                <Link to="/patient-invoices">
                                  <a className="ms-link">Patient Invoices</a>
                                </Link>
                              </li>
                            )}
                            {userPermissions.includes("create-invoice") && (
                              <li>
                                <Link to="/create-invoice">
                                  <a className="ms-link">Create Invoice</a>
                                </Link>
                              </li>
                            )}
                            {userPermissions.includes("view-invoice") && (
                              <li>
                                <Link to="/view-invoice">
                                  <a className="ms-link">View Invoice</a>
                                </Link>
                              </li>
                            )}
                            {userPermissions.includes("update-invoice") && (
                              <li>
                                <Link to="/update-invoice">
                                  <a className="ms-link">Update Invoice</a>
                                </Link>
                              </li>
                            )}
                          </ul>
                        </li>
                      )}
                    </ul>
                    {/* Menu: menu collepce btn */}
                    <button
                      type="button"
                      className="btn btn-link sidebar-mini-btn text-light"
                    >
                      <span className="ms-2">
                        <i className="icofont-bubble-right" />
                      </span>
                    </button>
                  </div>
                </div>
                {/* main body area */}
                <div className="main px-lg-4 px-md-4">
                  {/* Body: Header */}
                  <div className="header">
                    <nav className="navbar py-4">
                      <div className="container-xxl">
                        {/* header rightbar icon */}
                        <div className="h-right d-flex align-items-center mr-5 mr-lg-0 order-1">
                          <div className="dropdown notifications zindex-popover">
                            <a
                              className="nav-link dropdown-toggle pulse"
                              href="#"
                              role="button"
                              data-bs-toggle="dropdown"
                            >
                              <i className="icofont-alarm fs-5" />
                              <span className="pulse-ring" />
                            </a>
                            <div
                              id="NotificationsDiv"
                              className="dropdown-menu rounded-lg shadow border-0 dropdown-animation dropdown-menu-sm-end p-0 m-0"
                            >
                              <div className="card border-0 w380">
                                <div className="card-header border-0 p-3">
                                  <h5 className="mb-0 font-weight-light d-flex justify-content-between">
                                    <span>Notifications</span>
                                    <span className="badge text-white">06</span>
                                  </h5>
                                </div>
                                <div className="tab-content card-body">
                                  <div className="tab-pane fade show active">
                                    <ul className="list-unstyled list mb-0">
                                      <li className="py-2 mb-1 border-bottom">
                                        <a
                                          href="javascript:void(0);"
                                          className="d-flex"
                                        >
                                          <img
                                            className="avatar rounded-circle"
                                            src="assets/images/xs/avatar1.jpg"
                                            alt=""
                                          />
                                          <div className="flex-fill ms-2">
                                            <p className="d-flex justify-content-between mb-0 ">
                                              <span className="font-weight-bold">
                                                Chloe Walkerr
                                              </span>{" "}
                                              <small>2MIN</small>
                                            </p>
                                            <span className>
                                              Added Appointment 2021-06-19{" "}
                                              <span className="badge bg-success">
                                                Book
                                              </span>
                                            </span>
                                          </div>
                                        </a>
                                      </li>
                                      <li className="py-2 mb-1 border-bottom">
                                        <a
                                          href="javascript:void(0);"
                                          className="d-flex"
                                        >
                                          <div className="avatar rounded-circle no-thumbnail">
                                            AH
                                          </div>
                                          <div className="flex-fill ms-2">
                                            <p className="d-flex justify-content-between mb-0 ">
                                              <span className="font-weight-bold">
                                                Alan Hill
                                              </span>{" "}
                                              <small>13MIN</small>
                                            </p>
                                            <span className>
                                              Lab sample collection
                                            </span>
                                          </div>
                                        </a>
                                      </li>
                                      <li className="py-2 mb-1 border-bottom">
                                        <a
                                          href="javascript:void(0);"
                                          className="d-flex"
                                        >
                                          <img
                                            className="avatar rounded-circle"
                                            src="assets/images/xs/avatar3.jpg"
                                            alt=""
                                          />
                                          <div className="flex-fill ms-2">
                                            <p className="d-flex justify-content-between mb-0 ">
                                              <span className="font-weight-bold">
                                                Melanie Oliver
                                              </span>{" "}
                                              <small>1HR</small>
                                            </p>
                                            <span className>
                                              Invoice Create Patient Room A-803
                                            </span>
                                          </div>
                                        </a>
                                      </li>
                                      <li className="py-2 mb-1 border-bottom">
                                        <a
                                          href="javascript:void(0);"
                                          className="d-flex"
                                        >
                                          <img
                                            className="avatar rounded-circle"
                                            src="assets/images/xs/avatar5.jpg"
                                            alt=""
                                          />
                                          <div className="flex-fill ms-2">
                                            <p className="d-flex justify-content-between mb-0 ">
                                              <span className="font-weight-bold">
                                                Boris Hart
                                              </span>{" "}
                                              <small>13MIN</small>
                                            </p>
                                            <span className>
                                              Medicine Order to Medical
                                            </span>
                                          </div>
                                        </a>
                                      </li>
                                      <li className="py-2 mb-1 border-bottom">
                                        <a
                                          href="javascript:void(0);"
                                          className="d-flex"
                                        >
                                          <img
                                            className="avatar rounded-circle"
                                            src="assets/images/xs/avatar6.jpg"
                                            alt=""
                                          />
                                          <div className="flex-fill ms-2">
                                            <p className="d-flex justify-content-between mb-0 ">
                                              <span className="font-weight-bold">
                                                Alan Lambert
                                              </span>{" "}
                                              <small>1HR</small>
                                            </p>
                                            <span className>Leave Apply</span>
                                          </div>
                                        </a>
                                      </li>
                                      <li className="py-2">
                                        <a
                                          href="javascript:void(0);"
                                          className="d-flex"
                                        >
                                          <img
                                            className="avatar rounded-circle"
                                            src="assets/images/xs/avatar7.jpg"
                                            alt=""
                                          />
                                          <div className="flex-fill ms-2">
                                            <p className="d-flex justify-content-between mb-0 ">
                                              <span className="font-weight-bold">
                                                Zoe Wright
                                              </span>{" "}
                                              <small className>1DAY</small>
                                            </p>
                                            <span className>
                                              Patient Food Order Room A-809
                                            </span>
                                          </div>
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <a
                                  className="card-footer text-center border-top-0"
                                  href="#"
                                >
                                  {" "}
                                  View all notifications
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="dropdown user-profile ml-2 ml-sm-3 d-flex align-items-center zindex-popover">
                            <a
                              className="dropdown-toggle pulse p-0"
                              href="#"
                              role="button"
                              data-bs-toggle="dropdown"
                              data-bs-display="static"
                            >
                              {/* <img
                              className="avatar lg rounded-circle img-thumbnail"
                              src="assets/images/profile_av.png"
                              alt="profile"
                            /> */}
                              {/* <div className="avatar lg rounded-circle img-thumbnail text-center">
                              <h1>{user.name.charAt(0)}</h1>
                            </div> */}
                              <div className="u-info me-2">
                                <p className="mb-0 text-end line-height-sm ">
                                  <span className="font-weight-bold">
                                    {user.name}
                                  </span>
                                </p>
                                <small>{user.role} Profile</small>
                              </div>
                            </a>
                            <div className="dropdown-menu rounded-lg shadow border-0 dropdown-animation dropdown-menu-end p-0 m-0">
                              <div className="card border-0 w280">
                                <div className="card-body pb-0">
                                  <div className="d-flex py-1">
                                    {/* <img
                                    className="avatar rounded-circle"
                                    src="assets/images/profile_av.png"
                                    alt="profile"
                                  /> */}
                                    <div className="flex-fill ms-3">
                                      <p className="mb-0">
                                        <span className="font-weight-bold">
                                          {user.name}
                                        </span>
                                      </p>
                                      <small className>{user.email}</small>
                                    </div>
                                  </div>
                                  <div>
                                    <hr className="dropdown-divider border-dark" />
                                  </div>
                                </div>
                                <div className="list-group m-2 ">
                                  {userPermissions.includes("patient-invoices") && (
                                    <Link to="/patient-invoices">
                                      <a className="list-group-item list-group-item-action border-0 ">
                                        <i className="icofont-dollar fs-5 me-3" />
                                        Patient Invoices
                                      </a>
                                    </Link>
                                  )}
                                  <Link to="/">
                                    <a
                                      onClick={handleSignOut}
                                      className="list-group-item list-group-item-action border-0 "
                                    >
                                      <i className="icofont-logout fs-6 me-3" />
                                      Signout
                                    </a>
                                  </Link>
                                  <div>
                                    <hr className="dropdown-divider border-dark" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* menu toggler */}
                        <button
                          className="navbar-toggler p-0 border-0 menu-toggle order-3"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#mainHeader"
                        >
                          <span className="fa fa-bars" />
                        </button>
                        {/* main menu Search*/}
                        <div className="order-0 col-lg-4 col-md-4 col-sm-12 col-12 mb-3 mb-md-0 ">
                          {hospitalData && (
                            <div className=" py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-betweenflex-wrap">
                              <h4 className=" mb-0">
                                Welcome,{" "}
                                <strong>{hospitalData.hospital_name}</strong>
                              </h4>
                            </div>
                          )}
                        </div>
                      </div>
                    </nav>
                  </div>
                  {/* Body: Body */}
                  <div className="body d-flex py-3">
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      {userPermissions.includes("view-doctorlist") ? (
                        <Route path="/doctor-list" element={<DoctorList />} />
                      ) : (
                        <Route path="/doctor-list" element={<Auth404 />} />
                      )}
                      {userPermissions.includes("add-doctor") ? (
                        <Route path="/doctor-add" element={<DoctorAdd />} />
                      ) : (
                        <Route path="/doctor-add" element={<Auth404 />} />
                      )}
                      {userPermissions.includes("add-appointment") ? (
                        <Route
                          path="/doctor-appointment"
                          element={<DoctorAppointment />}
                        />
                      ) : (
                        <Route
                          path="/doctor-appointment"
                          element={<Auth404 />}
                        />
                      )}
                      {userPermissions.includes("view-calendar") ? (
                        <Route path="/calendar" element={<Calendar />} />
                      ) : (
                        <Route path="/view-calendar" element={<Auth404 />} />
                      )}
                      {userPermissions.includes("view-patientlist") ? (
                        <Route path="/patient-list" element={<Patientlist />} />
                      ) : (
                        <Route path="/view-patientlist" element={<Auth404 />} />
                      )}
                      {userPermissions.includes("add-patient") ? (
                        <Route path="/patient-add" element={<PatientForm />} />
                      ) : (
                        <Route path="/add-patient" element={<Auth404 />} />
                      )}
                      {userPermissions.includes("admission") ? (
                        <Route
                          path="/admission"
                          element={<AdmissionComponent />}
                        />
                      ) : (
                        <Route path="/admission" element={<Auth404 />} />
                      )}
                      {userPermissions.includes("schedule-surgery") ? (
                        <Route
                          path="/schedule-surgery"
                          element={<SurgerySchedulingForm />}
                        />
                      ) : (
                        <Route path="/schedule-surgery" element={<Auth404 />} />
                      )}
                      {userPermissions.includes("create-report") ? (
                        <Route
                          path="/create-report"
                          element={<PostSurgeryForm />}
                        />
                      ) : (
                        <Route path="/create-report" element={<Auth404 />} />
                      )}
                      {userPermissions.includes("update-report") ? (
                        <Route
                          path="/update-report"
                          element={<PostSurgeryUpdate />}
                        />
                      ) : (
                        <Route path="/update-report" element={<Auth404 />} />
                      )}
                      {userPermissions.includes("view-ward") ? (
                        <Route path="/room-status" element={<Ward />} />
                      ) : (
                        <Route path="/room-status" element={<Auth404 />} />
                      )}
                      {userPermissions.includes("create-user") ? (
                        <Route
                          path="/create-user"
                          element={<UserRegistration />}
                        />
                      ) : (
                        <Route path="/create-user" element={<Auth404 />} />
                      )}
                    <Route path="/create-ehr" element={<EMR />} />
                    <Route path="/update-ehr" element={<UpdateEHR/>}  />
                    <Route path="/create-invoice" element={<CreateInvoice />} />
                    <Route path="/view-invoice" element={<ViewInvoice />} />
                    <Route path="/view-ehr" element={<ViewEHR />} />
                    <Route path="/add-staff" element={<Staff />} />
                    <Route path="/staff-list" element={<StaffList />} />
                    <Route path="/discharge" element={<DischargeForm />} />
                    <Route path="/patient-invoices" element={<PatientInvoices />} />
                    </Routes>
                  </div>
                </div>
              </>
            )}
          </div>
        </Router>
      </tokenContext.Provider>
    </myContext.Provider>
  );
}

export default Index;
export { myContext, tokenContext };
