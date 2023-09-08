import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

// Import pages

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

// Admission pages
import AdmissionComponent from "./Admission";

// Operation Theatre pages
import SurgerySchedulingForm from "./ScheduleSurgery";

// Report pages
import PostSurgeryForm from "./PostSurgery";
import PostSurgeryUpdate from "./PostSurgeryUpdate";

// Ward pages
import Ward from "./Ward";

function Index() {
  return (
    <Router>
      <div id="ihealth-layout" className="theme-tradewind">
        {/* sidebar */}
        <div className="sidebar px-4 py-4 py-md-5 me-0">
          <div className="d-flex flex-column h-100">
            <Link to="/" className="mb-0 brand-icon">
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
                <Link to="/">
                  <a className="m-link">
                    <i className="icofont-ui-home fs-5" />{" "}
                    <span>Dashboard</span>{" "}
                  </a>
                </Link>
              </li>
              <li className="collapsed">
                <a
                  className="m-link"
                  data-bs-toggle="collapse"
                  data-bs-target="#menu-Doctor"
                  href="#"
                >
                  <i className="icofont-doctor-alt fs-5" /> <span>Doctor</span>{" "}
                  <span className="arrow icofont-rounded-down ms-auto text-end fs-5" />
                </a>
                {/* Menu: Sub menu ul */}
                <ul className="sub-menu collapse" id="menu-Doctor">
                  <li>
                    <Link to="/doctor-list">
                      <a className="ms-link">All Doctors</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/doctor-add">
                      <a className="ms-link">Add Doctor</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/doctor-appointment">
                      <a className="ms-link">Appointment</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/calendar">
                      <a className="ms-link">Doctor Schedule</a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="collapsed">
                <a
                  className="m-link"
                  data-bs-toggle="collapse"
                  data-bs-target="#menu-Patient"
                  href="#"
                >
                  <i className="icofont-blind fs-5" /> <span>Patient</span>{" "}
                  <span className="arrow icofont-rounded-down ms-auto text-end fs-5" />
                </a>
                {/* Menu: Sub menu ul */}
                <ul className="sub-menu collapse" id="menu-Patient">
                  <li>
                    <Link to="/patient-list">
                      <a className="ms-link">Patient List</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/patient-add">
                      <a className="ms-link">Add Patient</a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="collapsed">
                <a
                  className="m-link"
                  data-bs-toggle="collapse"
                  data-bs-target="#menu-ADT"
                  href="#"
                >
                  <i className="icofont-blind fs-5" /> <span>A/D/T</span>{" "}
                  <span className="arrow icofont-rounded-down ms-auto text-end fs-5" />
                </a>
                {/* Menu: Sub menu ul */}
                <ul className="sub-menu collapse" id="menu-ADT">
                  <li>
                    <Link to="/admission">
                      <a className="ms-link">Admission</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/discharge">
                      <a className="ms-link">Discharge</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/transfer">
                      <a className="ms-link">Transfer</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/room-status">
                      <a className="ms-link">Room Status</a>
                    </Link>
                  </li>

                </ul>
              </li>
              <li className="collapsed">
                <a
                  className="m-link"
                  data-bs-toggle="collapse"
                  data-bs-target="#menu-OT"
                  href="#"
                >
                  <i className="icofont-blind fs-5" />{" "}
                  <span>Operation Theatre</span>{" "}
                  <span className="arrow icofont-rounded-down ms-auto text-end fs-5" />
                </a>
                {/* Menu: Sub menu ul */}
                <ul className="sub-menu collapse" id="menu-OT">
                  <li>
                    <Link to="/surgery-list">
                      <a className="ms-link">Surgery List</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/schedule-surgery">
                      <a className="ms-link">Schedule Surgery</a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="collapsed">
                <a
                  className="m-link"
                  data-bs-toggle="collapse"
                  data-bs-target="#menu-SR"
                  href="#"
                >
                  <i className="icofont-blind fs-5" />{" "}
                  <span>Surgery Report</span>{" "}
                  <span className="arrow icofont-rounded-down ms-auto text-end fs-5" />
                </a>
                {/* Menu: Sub menu ul */}
                <ul className="sub-menu collapse" id="menu-SR">
                  <li>
                    <Link to="/create-report">
                      <a className="ms-link">Create Report</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/update-report">
                      <a className="ms-link">Update Report</a>
                    </Link>
                  </li>
                </ul>
              </li>
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
                                    <span className>Lab sample collection</span>
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
                    <div className="u-info me-2">
                      <p className="mb-0 text-end line-height-sm ">
                        <span className="font-weight-bold">John Quinn</span>
                      </p>
                      <small>Admin Profile</small>
                    </div>
                    <a
                      className="nav-link dropdown-toggle pulse p-0"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      data-bs-display="static"
                    >
                      <img
                        className="avatar lg rounded-circle img-thumbnail"
                        src="assets/images/profile_av.png"
                        alt="profile"
                      />
                    </a>
                    <div className="dropdown-menu rounded-lg shadow border-0 dropdown-animation dropdown-menu-end p-0 m-0">
                      <div className="card border-0 w280">
                        <div className="card-body pb-0">
                          <div className="d-flex py-1">
                            <img
                              className="avatar rounded-circle"
                              src="assets/images/profile_av.png"
                              alt="profile"
                            />
                            <div className="flex-fill ms-3">
                              <p className="mb-0">
                                <span className="font-weight-bold">
                                  John Quinn
                                </span>
                              </p>
                              <small className>Johnquinn@gmail.com</small>
                            </div>
                          </div>
                          <div>
                            <hr className="dropdown-divider border-dark" />
                          </div>
                        </div>
                        <div className="list-group m-2 ">
                          <a
                            href="virtual.html"
                            className="list-group-item list-group-item-action border-0 "
                          >
                            <i className="icofont-ui-video-chat fs-5 me-3" />
                            I-Health Virtual
                          </a>
                          <a
                            href="patient-invoices.html"
                            className="list-group-item list-group-item-action border-0 "
                          >
                            <i className="icofont-dollar fs-5 me-3" />
                            Patient Invoices
                          </a>
                          <a
                            href="ui-elements/auth-signin.html"
                            className="list-group-item list-group-item-action border-0 "
                          >
                            <i className="icofont-logout fs-6 me-3" />
                            Signout
                          </a>
                          <div>
                            <hr className="dropdown-divider border-dark" />
                          </div>
                          <a
                            href="ui-elements/auth-signup.html"
                            className="list-group-item list-group-item-action border-0 "
                          >
                            <i className="icofont-contact-add fs-5 me-3" />
                            Add personal account
                          </a>
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
                  <div className="input-group flex-nowrap input-group-lg">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search"
                      aria-label="search"
                      aria-describedby="addon-wrapping"
                    />
                    <button
                      type="button"
                      className="input-group-text"
                      id="addon-wrapping"
                    >
                      <i className="fa fa-search" />
                    </button>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          {/* Body: Body */}
          <div className="body d-flex py-3">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/doctor-list" element={<DoctorList />} />
              <Route path="/doctor-add" element={<DoctorAdd />} />
              <Route
                path="/doctor-appointment"
                element={<DoctorAppointment />}
              />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/patient-list" element={<Patientlist />} />
              <Route path="/patient-add" element={<PatientForm />} />
              <Route path="/admission" element={<AdmissionComponent />} />
              <Route
                path="/schedule-surgery"
                element={<SurgerySchedulingForm />}
              />
              <Route path="/create-report" element={<PostSurgeryForm />} />
              <Route path="/update-report" element={<PostSurgeryUpdate />} />
              <Route path="/room-status" element={<Ward />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default Index;
