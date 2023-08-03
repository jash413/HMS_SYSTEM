import React from "react";

function Dashboard() {
  return (
    <div id="ihealth-layout" className="theme-tradewind">
      {/* sidebar */}
      <div className="sidebar px-4 py-4 py-md-5 me-0">
        <div className="d-flex flex-column h-100">
          <a href="index.html" className="mb-0 brand-icon">
            <span className="logo-icon">
              <i className="icofont-heart-beat fs-2" />
            </span>
            <span className="logo-text">I-Health</span>
          </a>
          {/* Menu: main ul */}
          <ul className="menu-list flex-grow-1 mt-3">
            <li className="collapsed">
              <a
                className="m-link active"
                data-bs-toggle="collapse"
                data-bs-target="#dashboard"
                href="#"
              >
                <i className="icofont-ui-home fs-5" /> <span>Dashboard</span>{" "}
                <span className="arrow icofont-rounded-down ms-auto text-end fs-5" />
              </a>
              {/* Menu: Sub menu ul */}
              <ul className="sub-menu collapse show" id="dashboard">
                <li>
                  <a className="ms-link active" href="index.html">
                    Hospital Dashboard
                  </a>
                </li>
                <li>
                  <a className="ms-link" href="coviddashboard.html">
                    {" "}
                    Covid-19 Dashboard
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a className="m-link" href="virtual.html">
                <i className="icofont-ui-video-chat fs-5" />{" "}
                <span>I-Health Virtual</span>
              </a>
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
                  <a className="ms-link" href="doctor-all.html">
                    All Doctors
                  </a>
                </li>
                <li>
                  <a className="ms-link" href="doctor-add.html">
                    Add Doctor
                  </a>
                </li>
                <li>
                  <a className="ms-link" href="appointment.html">
                    Appointment
                  </a>
                </li>
                <li>
                  <a className="ms-link" href="doctor-profile.html">
                    Doctors Profile
                  </a>
                </li>
                <li>
                  <a className="ms-link" href="doctor-schedule.html">
                    Doctor Schedule
                  </a>
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
                  <a className="ms-link" href="patient-list.html">
                    Patient List
                  </a>
                </li>
                <li>
                  <a className="ms-link" href="patient-add.html">
                    Add Patient
                  </a>
                </li>
                <li>
                  <a className="ms-link" href="patient-profile.html">
                    Patient Profile
                  </a>
                </li>
                <li>
                  <a className="ms-link" href="patient-invoices.html">
                    Patient Invoices
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a className="m-link" href="accidents.html">
                <i className="icofont-stretcher fs-5" /> <span>Accidents</span>
              </a>
            </li>
            <li>
              <a className="m-link" href="labs.html">
                <i className="icofont-blood-test fs-5" /> <span>Labs</span>
              </a>
            </li>
            <li>
              <a className="m-link" href="department.html">
                <i className="icofont-hospital fs-5" /> <span>Department</span>
              </a>
            </li>
            <li className="collapsed">
              <a
                className="m-link"
                data-bs-toggle="collapse"
                data-bs-target="#menu-Componentsone"
                href="#"
              >
                <i className="icofont-ui-calculator" /> <span>Accounts</span>{" "}
                <span className="arrow icofont-rounded-down ms-auto text-end fs-5" />
              </a>
              {/* Menu: Sub menu ul */}
              <ul className="sub-menu collapse" id="menu-Componentsone">
                <li>
                  <a className="ms-link" href="invoices.html">
                    <span>Invoices</span>{" "}
                  </a>
                </li>
                <li>
                  <a className="ms-link" href="payments.html">
                    <span>Payments</span>{" "}
                  </a>
                </li>
                <li>
                  <a className="ms-link" href="expenses.html">
                    <span>Expenses</span>{" "}
                  </a>
                </li>
              </ul>
            </li>
            <li className="collapsed">
              <a
                className="m-link"
                data-bs-toggle="collapse"
                data-bs-target="#app"
                href="#"
              >
                <i className="icofont-code-alt fs-5" /> <span>App</span>{" "}
                <span className="arrow icofont-rounded-down ms-auto text-end fs-5" />
              </a>
              {/* Menu: Sub menu ul */}
              <ul className="sub-menu collapse" id="app">
                <li>
                  <a className="ms-link" href="calendar.html">
                    Calandar
                  </a>
                </li>
                <li>
                  <a className="ms-link" href="chat.html">
                    {" "}
                    Communication
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a className="m-link" href="ui-elements/ui-alerts.html">
                <i className="icofont-paint fs-5" /> <span>UI Components</span>
              </a>
            </li>
            <li className="collapsed">
              <a
                className="m-link"
                data-bs-toggle="collapse"
                data-bs-target="#page"
                href="#"
              >
                <i className="icofont-page fs-5" /> <span>Pages Example</span>{" "}
                <span className="arrow icofont-rounded-down ms-auto text-end fs-5" />
              </a>
              {/* Menu: Sub menu ul */}
              <ul className="sub-menu collapse" id="page">
                <li>
                  <a className="ms-link" href="table.html">
                    Table Example
                  </a>
                </li>
                <li>
                  <a className="ms-link" href="forms.html">
                    {" "}
                    Forms Example
                  </a>
                </li>
                <li>
                  <a className="ms-link" href="icon.html">
                    {" "}
                    Icons Example
                  </a>
                </li>
                <li>
                  <a className="ms-link" href="contact.html">
                    {" "}
                    Contact Example
                  </a>
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
                <div className="d-flex">
                  <a
                    className="nav-link text-primary collapsed"
                    href="help.html"
                    title="Get Help"
                  >
                    <i className="icofont-info-square fs-5" />
                  </a>
                </div>
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
                              <a href="javascript:void(0);" className="d-flex">
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
                              <a href="javascript:void(0);" className="d-flex">
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
                              <a href="javascript:void(0);" className="d-flex">
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
                              <a href="javascript:void(0);" className="d-flex">
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
                              <a href="javascript:void(0);" className="d-flex">
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
                              <a href="javascript:void(0);" className="d-flex">
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
                <div className="setting ms-2">
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#Settingmodal"
                  >
                    <i className="icofont-gear-alt fs-5" />
                  </a>
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
          <div className="container-xxl">
            <div className="row g-3 mb-3">
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
                            <span className="text-muted">400</span>
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
                            <span className="text-muted">117</span>
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
                            <span className="text-muted">16</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-6">
                        <div className="card">
                          <div className="card-body ">
                            <i className="icofont-king-monster fs-3 color-careys-pink" />
                            <h6 className="mt-3 mb-0 fw-bold small-14">
                              Covid Patients{" "}
                            </h6>
                            <span className="text-muted">144</span>
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
                            <span className="text-muted">200</span>
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
                            <span className="text-muted">84</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 col-xl-6">
                <div className="card">
                  <div className="card-header py-3 d-flex  bg-transparent border-bottom-0">
                    <h6 className="mb-0 fw-bold ">
                      Hospital Room Booking Status
                    </h6>
                  </div>
                  <div className="card-body">
                    <div className="room_book">
                      <div className="row row-cols-2 row-cols-sm-4 row-cols-md-6 row-cols-lg-6 g-3">
                        <div className="room col">
                          <input type="checkbox" id="1A" defaultChecked="" />
                          <label htmlFor="1A">
                            <i className="icofont-patient-bed fs-2" />
                            <span className="text-muted">Room A-101</span>
                          </label>
                        </div>
                        <div className="room col">
                          <input type="checkbox" id="1B" />
                          <label htmlFor="1B">
                            <i className="icofont-patient-bed fs-2" />
                            <span className="text-muted">Room B-102</span>
                          </label>
                        </div>
                        <div className="room col">
                          <input type="checkbox" id="1C" />
                          <label htmlFor="1C">
                            <i className="icofont-patient-bed fs-2" />
                            <span className="text-muted">Room C-103</span>
                          </label>
                        </div>
                        <div className="room col">
                          <input type="checkbox" disabled id="1D" />
                          <label htmlFor="1D">
                            <i className="icofont-patient-bed fs-2" />
                            <span className="text-muted">Occupied</span>
                          </label>
                        </div>
                        <div className="room col">
                          <input type="checkbox" id="1E" />
                          <label htmlFor="1E">
                            <i className="icofont-patient-bed fs-2" />
                            <span className="text-muted">Room D-104</span>
                          </label>
                        </div>
                        <div className="room col">
                          <input type="checkbox" id="1F" defaultChecked="" />
                          <label htmlFor="1F">
                            <i className="icofont-patient-bed fs-2" />
                            <span className="text-muted">Room E-105</span>
                          </label>
                        </div>
                        <div className="room col">
                          <input type="checkbox" id="2A" />
                          <label htmlFor="2A">
                            <i className="icofont-patient-bed fs-2" />
                            <span className="text-muted">Room F-106</span>
                          </label>
                        </div>
                        <div className="room col">
                          <input type="checkbox" id="2B" />
                          <label htmlFor="2B">
                            <i className="icofont-patient-bed fs-2" />
                            <span className="text-muted">Room G-107</span>
                          </label>
                        </div>
                        <div className="room col">
                          <input type="checkbox" id="2C" defaultChecked="" />
                          <label htmlFor="2C">
                            <i className="icofont-patient-bed fs-2" />
                            <span className="text-muted">Room H-108</span>
                          </label>
                        </div>
                        <div className="room col">
                          <input type="checkbox" id="2D" />
                          <label htmlFor="2D">
                            <i className="icofont-patient-bed fs-2" />
                            <span className="text-muted">Room I-109</span>
                          </label>
                        </div>
                        <div className="room col">
                          <input type="checkbox" id="2E" defaultChecked="" />
                          <label htmlFor="2E">
                            <i className="icofont-patient-bed fs-2" />
                            <span className="text-muted">Room J-110</span>
                          </label>
                        </div>
                        <div className="room col">
                          <input type="checkbox" id="2F" />
                          <label htmlFor="2F">
                            <i className="icofont-patient-bed fs-2" />
                            <span className="text-muted">Room K-111</span>
                          </label>
                        </div>
                        <div className="room col">
                          <input type="checkbox" id="3A" defaultChecked="" />
                          <label htmlFor="3A">
                            <i className="icofont-patient-bed fs-2" />
                            <span className="text-muted">Room L-112</span>
                          </label>
                        </div>
                        <div className="room col">
                          <input type="checkbox" id="3B" />
                          <label htmlFor="3B">
                            <i className="icofont-patient-bed fs-2" />
                            <span className="text-muted">Room M-113</span>
                          </label>
                        </div>
                        <div className="room col">
                          <input type="checkbox" id="3C" />
                          <label htmlFor="3C">
                            <i className="icofont-patient-bed fs-2" />
                            <span className="text-muted">Room N-114</span>
                          </label>
                        </div>
                        <div className="room col">
                          <input type="checkbox" id="3D" />
                          <label htmlFor="3D">
                            <i className="icofont-patient-bed fs-2" />
                            <span className="text-muted">Room O-115</span>
                          </label>
                        </div>
                        <div className="room col">
                          <input type="checkbox" id="3E" defaultChecked="" />
                          <label htmlFor="3E">
                            <i className="icofont-patient-bed fs-2" />
                            <span className="text-muted">Room P-116</span>
                          </label>
                        </div>
                        <div className="room col">
                          <input type="checkbox" id="3F" />
                          <label htmlFor="3F">
                            <i className="icofont-patient-bed fs-2" />
                            <span className="text-muted">Room Q-117</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row g-3 mb-3">
              <div className="col-xl-8 col-lg-12 flex-column">
                <div className="card mb-3">
                  <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                    <h6 className="mb-0 fw-bold ">Addmission by Division</h6>
                  </div>
                  <div className="card-body">
                    <div id="hiringsources" />
                  </div>
                </div>
                <div className="card">
                  <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                    <h6 className="mb-0 fw-bold ">Patients Information</h6>
                  </div>
                  <div className="card-body">
                    <table
                      id="myDataTable"
                      className="table table-hover align-middle mb-0"
                      style={{ width: "100%" }}
                    >
                      <thead>
                        <tr>
                          <th>Patients</th>
                          <th>Adress</th>
                          <th>Admited</th>
                          <th>Discharge</th>
                          <th>Progress</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <img
                              src="assets/images/xs/avatar3.jpg"
                              className="avatar sm rounded-circle me-2"
                              alt="profile-image"
                            />
                            <span>Molly </span>
                          </td>
                          <td>70 Bowman St. South Windsor, CT 06074</td>
                          <td>May 13, 2021</td>
                          <td>May 16, 2021</td>
                          <td>
                            <div className="progress" style={{ height: "3px" }}>
                              <div
                                className="progress-bar progress-bar-warning"
                                role="progressbar"
                                aria-valuenow={40}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                style={{ width: "40%" }}
                              >
                                {" "}
                                <span className="sr-only">
                                  40% Complete
                                </span>{" "}
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-info">Admit</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img
                              src="assets/images/xs/avatar1.jpg"
                              className="avatar sm rounded-circle me-2"
                              alt="profile-image"
                            />
                            <span>Brian</span>
                          </td>
                          <td>123 6th St. Melbourne, FL 32904</td>
                          <td>May 13, 2021</td>
                          <td>May 22, 2021</td>
                          <td>
                            <div className="progress" style={{ height: "3px" }}>
                              <div
                                className="progress-bar bg-success"
                                role="progressbar"
                                aria-valuenow={100}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                style={{ width: "100%" }}
                              >
                                {" "}
                                <span className="sr-only">
                                  100% Complete
                                </span>{" "}
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-success">Discharge</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img
                              src="assets/images/xs/avatar2.jpg"
                              className="avatar sm rounded-circle me-2"
                              alt="profile-image"
                            />
                            <span>Julia</span>
                          </td>
                          <td>4 Shirley Ave. West Chicago, IL 60185</td>
                          <td>May 17, 2021</td>
                          <td>May 16, 2021</td>
                          <td>
                            <div className="progress" style={{ height: "3px" }}>
                              <div
                                className="progress-bar bg-success"
                                role="progressbar"
                                aria-valuenow={100}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                style={{ width: "100%" }}
                              >
                                {" "}
                                <span className="sr-only">
                                  100% Complete
                                </span>{" "}
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-success">Discharge</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img
                              src="assets/images/xs/avatar4.jpg"
                              className="avatar sm rounded-circle me-2"
                              alt="profile-image"
                            />
                            <span>Sonia</span>
                          </td>
                          <td>123 6th St. Melbourne, FL 32904</td>
                          <td>May 13, 2021</td>
                          <td>May 23, 2021</td>
                          <td>
                            <div className="progress" style={{ height: "3px" }}>
                              <div
                                className="progress-bar bg-info"
                                role="progressbar"
                                aria-valuenow={15}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                style={{ width: "15%" }}
                              >
                                {" "}
                                <span className="sr-only">
                                  15% Complete
                                </span>{" "}
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-info">Admit</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img
                              src="assets/images/xs/avatar5.jpg"
                              className="avatar sm rounded-circle me-2"
                              alt="profile-image"
                            />
                            <span>Adam H</span>
                          </td>
                          <td>4 Shirley Ave. West Chicago, IL 60185</td>
                          <td>May 18, 2021</td>
                          <td>May 18, 2021</td>
                          <td>
                            <div className="progress" style={{ height: "3px" }}>
                              <div
                                className="progress-bar bg-danger"
                                role="progressbar"
                                aria-valuenow={85}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                style={{ width: "85%" }}
                              >
                                {" "}
                                <span className="sr-only">
                                  85% Complete
                                </span>{" "}
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-info">Admit</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img
                              src="assets/images/xs/avatar9.jpg"
                              className="avatar sm rounded-circle me-2"
                              alt="profile-image"
                            />
                            <span>Alexander</span>
                          </td>
                          <td>123 6th St. Melbourne, FL 32904</td>
                          <td>May 13, 2021</td>
                          <td>May 22, 2021</td>
                          <td>
                            <div className="progress" style={{ height: "3px" }}>
                              <div
                                className="progress-bar bg-success"
                                role="progressbar"
                                aria-valuenow={100}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                style={{ width: "100%" }}
                              >
                                {" "}
                                <span className="sr-only">
                                  100% Complete
                                </span>{" "}
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-success">Discharge</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img
                              src="assets/images/xs/avatar11.jpg"
                              className="avatar sm rounded-circle me-2"
                              alt="profile-image"
                            />
                            <span>Gabrielle</span>
                          </td>
                          <td>4 Shirley Ave. West Chicago, IL 60185</td>
                          <td>May 17, 2021</td>
                          <td>May 16, 2021</td>
                          <td>
                            <div className="progress" style={{ height: "3px" }}>
                              <div
                                className="progress-bar bg-success"
                                role="progressbar"
                                aria-valuenow={100}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                style={{ width: "100%" }}
                              >
                                {" "}
                                <span className="sr-only">
                                  100% Complete
                                </span>{" "}
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-success">Discharge</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img
                              src="assets/images/xs/avatar12.jpg"
                              className="avatar sm rounded-circle me-2"
                              alt="profile-image"
                            />
                            <span>Grace</span>
                          </td>
                          <td>4 Shirley Ave. West Chicago, IL 60185</td>
                          <td>May 17, 2021</td>
                          <td>May 16, 2021</td>
                          <td>
                            <div className="progress" style={{ height: "3px" }}>
                              <div
                                className="progress-bar bg-success"
                                role="progressbar"
                                aria-valuenow={100}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                style={{ width: "100%" }}
                              >
                                {" "}
                                <span className="sr-only">
                                  100% Complete
                                </span>{" "}
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-success">Discharge</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img
                              src="assets/images/xs/avatar8.jpg"
                              className="avatar sm rounded-circle me-2"
                              alt="profile-image"
                            />
                            <span>Ryan </span>
                          </td>
                          <td>70 Bowman St. South Windsor, CT 06074</td>
                          <td>May 13, 2021</td>
                          <td>May 16, 2021</td>
                          <td>
                            <div className="progress" style={{ height: "3px" }}>
                              <div
                                className="progress-bar progress-bar-warning"
                                role="progressbar"
                                aria-valuenow={40}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                style={{ width: "40%" }}
                              >
                                {" "}
                                <span className="sr-only">
                                  40% Complete
                                </span>{" "}
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-info">Admit</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img
                              src="assets/images/xs/avatar7.jpg"
                              className="avatar sm rounded-circle me-2"
                              alt="profile-image"
                            />
                            <span>Christian</span>
                          </td>
                          <td>123 6th St. Melbourne, FL 32904</td>
                          <td>May 13, 2021</td>
                          <td>May 22, 2021</td>
                          <td>
                            <div className="progress" style={{ height: "3px" }}>
                              <div
                                className="progress-bar bg-success"
                                role="progressbar"
                                aria-valuenow={100}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                style={{ width: "100%" }}
                              >
                                {" "}
                                <span className="sr-only">
                                  100% Complete
                                </span>{" "}
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-success">Discharge</span>
                          </td>
                        </tr>
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
                <div className="card bg-secondary position-relative">
                  <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                    <h6 className="mb-0 fw-bold text-white ">
                      Doctor Of the Month
                    </h6>
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
                </div>
              </div>
            </div>
            {/* .row end */}
          </div>
        </div>
        {/* Modal Custom Settings*/}
        <div
          className="modal fade right"
          id="Settingmodal"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Custom Settings</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body custom_setting">
                {/* Settings: Color */}
                <div className="setting-theme pb-3">
                  <h6 className="card-title mb-2 fs-6 d-flex align-items-center">
                    <i className="icofont-color-bucket fs-4 me-2 text-primary" />
                    Template Color Settings
                  </h6>
                  <ul className="list-unstyled row row-cols-3 g-2 choose-skin mb-2 mt-2">
                    <li data-theme="indigo">
                      <div className="indigo" />
                    </li>
                    <li data-theme="tradewind" className="active">
                      <div className="tradewind" />
                    </li>
                    <li data-theme="monalisa">
                      <div className="monalisa" />
                    </li>
                    <li data-theme="blue">
                      <div className="blue" />
                    </li>
                    <li data-theme="cyan">
                      <div className="cyan" />
                    </li>
                    <li data-theme="green">
                      <div className="green" />
                    </li>
                    <li data-theme="orange">
                      <div className="orange" />
                    </li>
                    <li data-theme="blush">
                      <div className="blush" />
                    </li>
                    <li data-theme="red">
                      <div className="red" />
                    </li>
                  </ul>
                </div>
                <div className="sidebar-gradient py-3">
                  <h6 className="card-title mb-2 fs-6 d-flex align-items-center">
                    <i className="icofont-paint fs-4 me-2 text-primary" />
                    Sidebar Gradient
                  </h6>
                  <div className="form-check form-switch gradient-switch pt-2 mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="CheckGradient"
                    />
                    <label className="form-check-label" htmlFor="CheckGradient">
                      Enable Gradient! ( Sidebar )
                    </label>
                  </div>
                </div>
                {/* Settings: Template dynamics */}
                <div className="dynamic-block py-3">
                  <ul className="list-unstyled choose-skin mb-2 mt-1">
                    <li data-theme="dynamic">
                      <div className="dynamic">
                        <i className="icofont-paint me-2" /> Click to Dyanmic
                        Setting
                      </div>
                    </li>
                  </ul>
                  <div className="dt-setting">
                    <ul className="list-group list-unstyled mt-1">
                      <li className="list-group-item d-flex justify-content-between align-items-center py-1 px-2">
                        <label>Primary Color</label>
                        <button
                          id="primaryColorPicker"
                          className="btn bg-primary avatar xs border-0 rounded-0"
                        />
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center py-1 px-2">
                        <label>Secondary Color</label>
                        <button
                          id="secondaryColorPicker"
                          className="btn bg-secondary avatar xs border-0 rounded-0"
                        />
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center py-1 px-2">
                        <label className="text-muted">Chart Color 1</label>
                        <button
                          id="chartColorPicker1"
                          className="btn chart-color1 avatar xs border-0 rounded-0"
                        />
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center py-1 px-2">
                        <label className="text-muted">Chart Color 2</label>
                        <button
                          id="chartColorPicker2"
                          className="btn chart-color2 avatar xs border-0 rounded-0"
                        />
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center py-1 px-2">
                        <label className="text-muted">Chart Color 3</label>
                        <button
                          id="chartColorPicker3"
                          className="btn chart-color3 avatar xs border-0 rounded-0"
                        />
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center py-1 px-2">
                        <label className="text-muted">Chart Color 4</label>
                        <button
                          id="chartColorPicker4"
                          className="btn chart-color4 avatar xs border-0 rounded-0"
                        />
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center py-1 px-2">
                        <label className="text-muted">Chart Color 5</label>
                        <button
                          id="chartColorPicker5"
                          className="btn chart-color5 avatar xs border-0 rounded-0"
                        />
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Settings: Font */}
                <div className="setting-font py-3">
                  <h6 className="card-title mb-2 fs-6 d-flex align-items-center">
                    <i className="icofont-font fs-4 me-2 text-primary" /> Font
                    Settings
                  </h6>
                  <ul className="list-group font_setting mt-1">
                    <li className="list-group-item py-1 px-2">
                      <div className="form-check mb-0">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="font"
                          id="font-poppins"
                          defaultValue="font-poppins"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="font-poppins"
                        >
                          Poppins Google Font
                        </label>
                      </div>
                    </li>
                    <li className="list-group-item py-1 px-2">
                      <div className="form-check mb-0">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="font"
                          id="font-opensans"
                          defaultValue="font-opensans"
                          defaultChecked
                        />
                        <label
                          className="form-check-label"
                          htmlFor="font-opensans"
                        >
                          Open Sans Google Font
                        </label>
                      </div>
                    </li>
                    <li className="list-group-item py-1 px-2">
                      <div className="form-check mb-0">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="font"
                          id="font-montserrat"
                          defaultValue="font-montserrat"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="font-montserrat"
                        >
                          Montserrat Google Font
                        </label>
                      </div>
                    </li>
                    <li className="list-group-item py-1 px-2">
                      <div className="form-check mb-0">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="font"
                          id="font-mukta"
                          defaultValue="font-mukta"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="font-mukta"
                        >
                          Mukta Google Font
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* Settings: Light/dark */}
                <div className="setting-mode py-3">
                  <h6 className="card-title mb-2 fs-6 d-flex align-items-center">
                    <i className="icofont-layout fs-4 me-2 text-primary" />
                    Contrast Layout
                  </h6>
                  <ul className="list-group list-unstyled mb-0 mt-1">
                    <li className="list-group-item d-flex align-items-center py-1 px-2">
                      <div className="form-check form-switch theme-switch mb-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="theme-switch"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="theme-switch"
                        >
                          Enable Dark Mode!
                        </label>
                      </div>
                    </li>
                    <li className="list-group-item d-flex align-items-center py-1 px-2">
                      <div className="form-check form-switch theme-high-contrast mb-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="theme-high-contrast"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="theme-high-contrast"
                        >
                          Enable High Contrast
                        </label>
                      </div>
                    </li>
                    <li className="list-group-item d-flex align-items-center py-1 px-2">
                      <div className="form-check form-switch theme-rtl mb-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="theme-rtl"
                        />
                        <label className="form-check-label" htmlFor="theme-rtl">
                          Enable RTL Mode!
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="modal-footer justify-content-start">
                <button
                  type="button"
                  className="btn btn-white border lift"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary lift">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
