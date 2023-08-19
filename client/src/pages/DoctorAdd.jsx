import React from 'react'

function DoctorAdd() {
  return (
    <div>
  <meta charSet="utf-8" />
  <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <title>:: I-Health::  Doctor Add </title>
  <link rel="icon" href="favicon.ico" type="image/x-icon" /> {/* Favicon*/}
  {/* project css file  */}
  <link rel="stylesheet" href="assets/css/ihealth.style.min.css" />
  {/* Google Code  */}
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
            <a className="m-link" data-bs-toggle="collapse" data-bs-target="#dashboard" href="#">
              <i className="icofont-ui-home fs-5" /> <span>Dashboard</span> <span className="arrow icofont-rounded-down ms-auto text-end fs-5" /></a>
            {/* Menu: Sub menu ul */}
            <ul className="sub-menu collapse" id="dashboard">
              <li><a className="ms-link" href="index.html">Hospital Dashboard</a></li>
              
            </ul>
          </li>
         
          <li className="collapsed">
            <a className="m-link active" data-bs-toggle="collapse" data-bs-target="#menu-Doctor" href="#">
              <i className="icofont-doctor-alt fs-5" />  <span>Doctor</span> <span className="arrow icofont-rounded-down ms-auto text-end fs-5" /></a>
            {/* Menu: Sub menu ul */}
            <ul className="sub-menu collapse show" id="menu-Doctor">
              <li><a className="ms-link" href="doctor-all.html">All Doctors</a></li>
              <li><a className="ms-link active" href="doctor-add.html">Add Doctor</a></li>
              <li><a className="ms-link" href="appointment.html">Appointment</a></li>
              <li><a className="ms-link" href="doctor-profile.html">Doctors Profile</a></li>
              <li><a className="ms-link" href="doctor-schedule.html">Doctor Schedule</a></li>
            </ul>
          </li>
          <li className="collapsed">
            <a className="m-link" data-bs-toggle="collapse" data-bs-target="#menu-Patient" href="#">
              <i className="icofont-blind fs-5" /> <span>Patient</span> <span className="arrow icofont-rounded-down ms-auto text-end fs-5" /></a>
            {/* Menu: Sub menu ul */}
            <ul className="sub-menu collapse" id="menu-Patient">
              <li><a className="ms-link" href="patient-list.html">Patient List</a></li>
              <li><a className="ms-link" href="patient-add.html">Add Patient</a></li>
              <li><a className="ms-link" href="patient-profile.html">Patient Profile</a></li>
              <li><a className="ms-link" href="patient-invoices.html">Patient Invoices</a></li>
            </ul>
          </li>
          <li><a className="m-link" href="accidents.html"><i className="icofont-stretcher fs-5" /> <span>Accidents</span></a></li>
          <li><a className="m-link" href="labs.html"><i className="icofont-blood-test fs-5" /> <span>Labs</span></a></li>
          <li><a className="m-link" href="department.html"><i className="icofont-hospital fs-5" /> <span>Department</span></a></li>
          <li className="collapsed">
            <a className="m-link" data-bs-toggle="collapse" data-bs-target="#menu-Componentsone" href="#"><i className="icofont-ui-calculator" /> <span>Accounts</span> <span className="arrow icofont-rounded-down ms-auto text-end fs-5" /></a>
            {/* Menu: Sub menu ul */}
            <ul className="sub-menu collapse" id="menu-Componentsone">
              <li><a className="ms-link" href="invoices.html"><span>Invoices</span> </a></li>
              <li><a className="ms-link" href="payments.html"><span>Payments</span> </a></li>
              <li><a className="ms-link" href="expenses.html"><span>Expenses</span> </a></li>
            </ul>
          </li>
          <li className="collapsed">
            <a className="m-link" data-bs-toggle="collapse" data-bs-target="#app" href="#">
              <i className="icofont-code-alt fs-5" /> <span>App</span> <span className="arrow icofont-rounded-down ms-auto text-end fs-5" /></a>
            {/* Menu: Sub menu ul */}
            <ul className="sub-menu collapse" id="app">
              <li><a className="ms-link" href="calendar.html">Calandar</a></li>
              <li><a className="ms-link" href="chat.html"> Communication</a></li>
            </ul>
          </li>
          <li><a className="m-link" href="ui-elements/ui-alerts.html"><i className="icofont-paint fs-5" /> <span>UI Components</span></a></li>
          <li className="collapsed">
            <a className="m-link" data-bs-toggle="collapse" data-bs-target="#page" href="#">
              <i className="icofont-page fs-5" /> <span>Pages Example</span> <span className="arrow icofont-rounded-down ms-auto text-end fs-5" /></a>
            {/* Menu: Sub menu ul */}
            <ul className="sub-menu collapse" id="page">
              <li><a className="ms-link" href="table.html">Table Example</a></li>
              <li><a className="ms-link" href="forms.html"> Forms Example</a></li>
              <li><a className="ms-link" href="icon.html"> Icons Example</a></li>
              <li><a className="ms-link" href="contact.html"> Contact Example</a></li>
            </ul>
          </li>
        </ul>
        {/* Menu: menu collepce btn */}
        <button type="button" className="btn btn-link sidebar-mini-btn text-light">
          <span className="ms-2"><i className="icofont-bubble-right" /></span>
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
                <a className="nav-link text-primary collapsed" href="help.html" title="Get Help">
                  <i className="icofont-info-square fs-5" />
                </a>
              </div>
              <div className="dropdown notifications zindex-popover">
                <a className="nav-link dropdown-toggle pulse" href="#" role="button" data-bs-toggle="dropdown">
                  <i className="icofont-alarm fs-5" />
                  <span className="pulse-ring" />
                </a>
                <div id="NotificationsDiv" className="dropdown-menu rounded-lg shadow border-0 dropdown-animation dropdown-menu-sm-end p-0 m-0">
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
                              <img className="avatar rounded-circle" src="assets/images/xs/avatar1.jpg" alt="" />
                              <div className="flex-fill ms-2">
                                <p className="d-flex justify-content-between mb-0 "><span className="font-weight-bold">Chloe Walkerr</span> <small>2MIN</small></p>
                                <span className>Added Appointment 2021-06-19 <span className="badge bg-success">Book</span></span>
                              </div>
                            </a>
                          </li>
                          <li className="py-2 mb-1 border-bottom">
                            <a href="javascript:void(0);" className="d-flex">
                              <div className="avatar rounded-circle no-thumbnail">AH</div>
                              <div className="flex-fill ms-2">
                                <p className="d-flex justify-content-between mb-0 "><span className="font-weight-bold">Alan	Hill</span> <small>13MIN</small></p>
                                <span className>Lab sample collection</span>
                              </div>
                            </a>
                          </li>
                          <li className="py-2 mb-1 border-bottom">
                            <a href="javascript:void(0);" className="d-flex">
                              <img className="avatar rounded-circle" src="assets/images/xs/avatar3.jpg" alt="" />
                              <div className="flex-fill ms-2">
                                <p className="d-flex justify-content-between mb-0 "><span className="font-weight-bold">Melanie	Oliver</span> <small>1HR</small></p>
                                <span className>Invoice Create Patient Room A-803</span>
                              </div>
                            </a>
                          </li>
                          <li className="py-2 mb-1 border-bottom">
                            <a href="javascript:void(0);" className="d-flex">
                              <img className="avatar rounded-circle" src="assets/images/xs/avatar5.jpg" alt="" />
                              <div className="flex-fill ms-2">
                                <p className="d-flex justify-content-between mb-0 "><span className="font-weight-bold">Boris Hart</span> <small>13MIN</small></p>
                                <span className>Medicine Order to Medical</span>
                              </div>
                            </a>
                          </li>
                          <li className="py-2 mb-1 border-bottom">
                            <a href="javascript:void(0);" className="d-flex">
                              <img className="avatar rounded-circle" src="assets/images/xs/avatar6.jpg" alt="" />
                              <div className="flex-fill ms-2">
                                <p className="d-flex justify-content-between mb-0 "><span className="font-weight-bold">Alan	Lambert</span> <small>1HR</small></p>
                                <span className>Leave Apply</span>
                              </div>
                            </a>
                          </li>
                          <li className="py-2">
                            <a href="javascript:void(0);" className="d-flex">
                              <img className="avatar rounded-circle" src="assets/images/xs/avatar7.jpg" alt="" />
                              <div className="flex-fill ms-2">
                                <p className="d-flex justify-content-between mb-0 "><span className="font-weight-bold">Zoe Wright</span> <small className>1DAY</small></p>
                                <span className>Patient Food Order Room A-809</span>
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <a className="card-footer text-center border-top-0" href="#"> View all notifications</a>
                  </div>
                </div>
              </div>
              <div className="dropdown user-profile ml-2 ml-sm-3 d-flex align-items-center zindex-popover">
                <div className="u-info me-2">
                  <p className="mb-0 text-end line-height-sm "><span className="font-weight-bold">John Quinn</span></p>
                  <small>Admin Profile</small>
                </div>
                <a className="nav-link dropdown-toggle pulse p-0" href="#" role="button" data-bs-toggle="dropdown" data-bs-display="static">
                  <img className="avatar lg rounded-circle img-thumbnail" src="assets/images/profile_av.png" alt="profile" />
                </a>
                <div className="dropdown-menu rounded-lg shadow border-0 dropdown-animation dropdown-menu-end p-0 m-0">
                  <div className="card border-0 w280">
                    <div className="card-body pb-0">
                      <div className="d-flex py-1">
                        <img className="avatar rounded-circle" src="assets/images/profile_av.png" alt="profile" />
                        <div className="flex-fill ms-3">
                          <p className="mb-0"><span className="font-weight-bold">John	Quinn</span></p>
                          <small className>Johnquinn@gmail.com</small>
                        </div>
                      </div>
                      <div><hr className="dropdown-divider border-dark" /></div>
                    </div>
                    <div className="list-group m-2 ">
                      <a href="virtual.html" className="list-group-item list-group-item-action border-0 "><i className="icofont-ui-video-chat fs-5 me-3" />I-Health Virtual</a>
                      <a href="patient-invoices.html" className="list-group-item list-group-item-action border-0 "><i className="icofont-dollar fs-5 me-3" />Patient Invoices</a>
                      <a href="ui-elements/auth-signin.html" className="list-group-item list-group-item-action border-0 "><i className="icofont-logout fs-6 me-3" />Signout</a>
                      <div><hr className="dropdown-divider border-dark" /></div>
                      <a href="ui-elements/auth-signup.html" className="list-group-item list-group-item-action border-0 "><i className="icofont-contact-add fs-5 me-3" />Add personal account</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="setting ms-2">
                <a href="#" data-bs-toggle="modal" data-bs-target="#Settingmodal"><i className="icofont-gear-alt fs-5" /></a>
              </div>
            </div>
            {/* menu toggler */}
            <button className="navbar-toggler p-0 border-0 menu-toggle order-3" type="button" data-bs-toggle="collapse" data-bs-target="#mainHeader">
              <span className="fa fa-bars" />
            </button>
            {/* main menu Search*/}
            <div className="order-0 col-lg-4 col-md-4 col-sm-12 col-12 mb-3 mb-md-0 ">
              <div className="input-group flex-nowrap input-group-lg">
                <input type="search" className="form-control" placeholder="Search" aria-label="search" aria-describedby="addon-wrapping" />
                <button type="button" className="input-group-text" id="addon-wrapping"><i className="fa fa-search" /></button>
              </div>
            </div>
          </div>
        </nav>
      </div>
      {/* Body: Body */}
      <div className="body d-flex py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="border-0 mb-4">
              <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                <h3 className="fw-bold mb-0">Add Doctor</h3>
              </div>
            </div>
          </div> {/* Row end  */}
          <div className="row mb-3">
            <div className="col-sm-12">
              <div className="card mb-3">
                <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                  <h6 className="mb-0 fw-bold ">Doctor Basic Inforamtion</h6>
                </div>
                <div className="card-body">
                  <form>
                    <div className="row g-3 align-items-center">
                      <div className="col-md-6">
                        <label htmlFor="firstname" className="form-label">First Name</label>
                        <input type="text" className="form-control" id="firstname" required />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="lastname" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="lastname" required />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="phonenumber" className="form-label">Phone Number</label>
                        <input type="text" className="form-control" id="phonenumber" required />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="emailaddress" className="form-label">Email Address</label>
                        <input type="email" className="form-control" id="emailaddress" required />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="admitdate" className="form-label">Join Date</label>
                        <input type="date" className="form-control" id="admitdate" required />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="admittime" className="form-label">Join Time</label>
                        <input type="time" className="form-control" id="admittime" required />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="formFileMultiple" className="form-label"> Document Upload</label>
                        <input className="form-control" type="file" id="formFileMultiple" multiple required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Gender</label>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-check">
                              <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios11" defaultValue="option1" defaultChecked />
                              <label className="form-check-label" htmlFor="exampleRadios11">
                                Male
                              </label>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-check">
                              <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios22" defaultValue="option2" />
                              <label className="form-check-label" htmlFor="exampleRadios22">
                                Female
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h6 className="mb-0 fw-bold">Payment Information</h6></div>
                      <div className="row g-3 align-items-center">
                      <div className="col-md-6">
                        
                     <div>
                        <label className="form-label">Doctor Payment Option</label>
                        <select className="form-select" aria-label="Default select example">
                          <option selected>Payment Option</option>
                          <option value={1}>Credit Card</option>
                          <option value={2}>Debit Card</option>
                          <option value={3}>Case Money</option>
                        </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="roominfo" className="form-label">Cabin Number</label>
                        <input type="text" className="form-control" id="roominfo" required />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="speciality" className="form-label">Speciality</label>
                        <input type="text" className="form-control" id="speciality" required />
                      </div>
                      <div className="col-md-6">
                       
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-check">
                              
                              
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-check">
                             
                             
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h6 className="mb-0 fw-bold ">Authentication Information</h6>
                        </div>
                      <div className="row g-3 align-items-center">
                      <div className="col-md-6">
                       
                       
                        <label htmlFor="user" className="form-label">User Name</label>
                        <input type="text" className="form-control" id="user" required />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" required />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="cnpassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="cnpassword" required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Login Permission </label>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-check">
                              <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios07" defaultValue="option1" defaultChecked />
                              <label className="form-check-label" htmlFor="exampleRadios07">
                                Hospital Only
                              </label>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-check">
                              <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios08" defaultValue="option2" />
                              <label className="form-check-label" htmlFor="exampleRadios08">
                                Any where
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                    </div>
                    <button type="submit" className="btn btn-primary mt-4">Submit</button>
                  </form>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
     
    </div>
  </div>       
  {/* Jquery Core Js */}
  {/* Jquery Page Js */}
</div>

  )
}

export default DoctorAdd
