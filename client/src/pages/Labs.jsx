import React from 'react'

function Labs() {
  return (
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
              <h3 className="fw-bold mb-0">Labs Reports</h3>
              <div className="col-auto d-flex">
                <div className="dropdown ">
                  <button className="btn btn-primary dropdown-toggle  " type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                    Patient Name
                  </button>
                  <ul className="dropdown-menu  dropdown-menu-end" aria-labelledby="dropdownMenuButton2">
                    <li><a className="dropdown-item" href="#">Joan Wilson</a></li>
                    <li><a className="dropdown-item" href="#">Alexander</a></li>
                    <li><a className="dropdown-item" href="#">Peter</a></li>
                    <li><a className="dropdown-item" href="#">Mary</a></li>
                    <li><a className="dropdown-item" href="#">Diana</a></li>
                  </ul>
                </div>
                <button type="button" className="btn btn-secondary ms-1 " data-bs-toggle="modal" data-bs-target="#sendfile"><i className="icofont-send-mail me-2 fs-6" />Share Files</button>
              </div>
            </div>
          </div>
        </div> {/* Row end  */}
        <div className="row align-items-center mb-3">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                <h6 className="mb-0 fw-bold ">Full Body Report</h6> 
              </div>
              <div className="card-body">
                <div className="echart" id="whaterleval" style={{height: '400px'}} /> 
              </div>
            </div>
          </div>
        </div>{/* Row end  */}
        <div className="row align-items-center row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-3 row-cols-xxl-4 g-3">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Sodium</span> 
                  <span className="text-muted">140 mma/L</span>
                </div>
                <div id="apexspark-chart1" />
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Potassium</span> 
                  <span className="text-muted">140 mma/L</span>
                </div>
                <div id="apexspark-chart2" />
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Glucose</span> 
                  <span className="text-muted">84 mg/dl</span>
                </div>
                <div id="apexspark-chart3" />
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Calcium</span> 
                  <span className="text-muted">9.5 mg/dL</span>
                </div>
                <div id="apexspark-chart4" />
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Phophatase</span> 
                  <span className="text-muted">66 IU/L</span>
                </div>
                <div id="apexspark-chart5" />
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Bicarbonate</span> 
                  <span className="text-muted">31 mma/L</span>
                </div>
                <div id="apexspark-chart6" />
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Cholesterol</span> 
                  <span className="text-muted">240 mg/L</span>
                </div>
                <div id="apexspark-chart7" />
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Triglycerides</span> 
                  <span className="text-muted">140 mma/L</span>
                </div>
                <div id="apexspark-chart8" />
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <span className="text-muted">White Blood Cell</span> 
                  <span className="text-muted">5.3 k/UL</span>
                </div>
                <div id="apexspark-chart9" />
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Hemoglobin</span> 
                  <span className="text-muted">140 mma/L</span>
                </div>
                <div id="apexspark-chart10" />
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Cretinism</span> 
                  <span className="text-muted">1.8 mma/L</span>
                </div>
                <div id="apexspark-chart11" />
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Thirod</span> 
                  <span className="text-muted">6.3 uq/DL</span>
                </div>
                <div id="apexspark-chart12" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Modal Custom Settings*/}
    <div className="modal fade right" id="Settingmodal" tabIndex={-1} aria-hidden="true">
      <div className="modal-dialog  modal-sm">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Custom Settings</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body custom_setting">
            {/* Settings: Color */}
            <div className="setting-theme pb-3">
              <h6 className="card-title mb-2 fs-6 d-flex align-items-center"><i className="icofont-color-bucket fs-4 me-2 text-primary" />Template Color Settings</h6>
              <ul className="list-unstyled row row-cols-3 g-2 choose-skin mb-2 mt-2">
                <li data-theme="indigo"><div className="indigo" /></li>
                <li data-theme="tradewind" className="active"><div className="tradewind" /></li>
                <li data-theme="monalisa"><div className="monalisa" /></li>
                <li data-theme="blue"><div className="blue" /></li>
                <li data-theme="cyan"><div className="cyan" /></li>
                <li data-theme="green"><div className="green" /></li>
                <li data-theme="orange"><div className="orange" /></li>
                <li data-theme="blush"><div className="blush" /></li>
                <li data-theme="red"><div className="red" /></li>
              </ul>
            </div>
            <div className="sidebar-gradient py-3">
              <h6 className="card-title mb-2 fs-6 d-flex align-items-center"><i className="icofont-paint fs-4 me-2 text-primary" />Sidebar Gradient</h6>
              <div className="form-check form-switch gradient-switch pt-2 mb-2">
                <input className="form-check-input" type="checkbox" id="CheckGradient" />
                <label className="form-check-label" htmlFor="CheckGradient">Enable Gradient! ( Sidebar )</label>
              </div>
            </div>
            {/* Settings: Template dynamics */}
            <div className="dynamic-block py-3">
              <ul className="list-unstyled choose-skin mb-2 mt-1">
                <li data-theme="dynamic"><div className="dynamic"><i className="icofont-paint me-2" /> Click to Dyanmic Setting</div></li>
              </ul>
              <div className="dt-setting">
                <ul className="list-group list-unstyled mt-1">
                  <li className="list-group-item d-flex justify-content-between align-items-center py-1 px-2">
                    <label>Primary Color</label>
                    <button id="primaryColorPicker" className="btn bg-primary avatar xs border-0 rounded-0" />
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center py-1 px-2">
                    <label>Secondary Color</label>
                    <button id="secondaryColorPicker" className="btn bg-secondary avatar xs border-0 rounded-0" />
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center py-1 px-2">
                    <label className="text-muted">Chart Color 1</label>
                    <button id="chartColorPicker1" className="btn chart-color1 avatar xs border-0 rounded-0" />
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center py-1 px-2">
                    <label className="text-muted">Chart Color 2</label>
                    <button id="chartColorPicker2" className="btn chart-color2 avatar xs border-0 rounded-0" />
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center py-1 px-2">
                    <label className="text-muted">Chart Color 3</label>
                    <button id="chartColorPicker3" className="btn chart-color3 avatar xs border-0 rounded-0" />
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center py-1 px-2">
                    <label className="text-muted">Chart Color 4</label>
                    <button id="chartColorPicker4" className="btn chart-color4 avatar xs border-0 rounded-0" />
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center py-1 px-2">
                    <label className="text-muted">Chart Color 5</label>
                    <button id="chartColorPicker5" className="btn chart-color5 avatar xs border-0 rounded-0" />
                  </li>
                </ul>
              </div>
            </div>
            {/* Settings: Font */}
            <div className="setting-font py-3">
              <h6 className="card-title mb-2 fs-6 d-flex align-items-center"><i className="icofont-font fs-4 me-2 text-primary" /> Font Settings</h6>
              <ul className="list-group font_setting mt-1">
                <li className="list-group-item py-1 px-2">
                  <div className="form-check mb-0">
                    <input className="form-check-input" type="radio" name="font" id="font-poppins" defaultValue="font-poppins" />
                    <label className="form-check-label" htmlFor="font-poppins">
                      Poppins Google Font
                    </label>
                  </div>
                </li>
                <li className="list-group-item py-1 px-2">
                  <div className="form-check mb-0">
                    <input className="form-check-input" type="radio" name="font" id="font-opensans" defaultValue="font-opensans" defaultChecked />
                    <label className="form-check-label" htmlFor="font-opensans">
                      Open Sans Google Font
                    </label>
                  </div>
                </li>
                <li className="list-group-item py-1 px-2">
                  <div className="form-check mb-0">
                    <input className="form-check-input" type="radio" name="font" id="font-montserrat" defaultValue="font-montserrat" />
                    <label className="form-check-label" htmlFor="font-montserrat">
                      Montserrat Google Font
                    </label>
                  </div>
                </li>
                <li className="list-group-item py-1 px-2">
                  <div className="form-check mb-0">
                    <input className="form-check-input" type="radio" name="font" id="font-mukta" defaultValue="font-mukta" />
                    <label className="form-check-label" htmlFor="font-mukta">
                      Mukta Google Font
                    </label>
                  </div>
                </li>
              </ul>
            </div>
            {/* Settings: Light/dark */}
            <div className="setting-mode py-3">
              <h6 className="card-title mb-2 fs-6 d-flex align-items-center"><i className="icofont-layout fs-4 me-2 text-primary" />Contrast Layout</h6>
              <ul className="list-group list-unstyled mb-0 mt-1">
                <li className="list-group-item d-flex align-items-center py-1 px-2">
                  <div className="form-check form-switch theme-switch mb-0">
                    <input className="form-check-input" type="checkbox" id="theme-switch" />
                    <label className="form-check-label" htmlFor="theme-switch">Enable Dark Mode!</label>
                  </div>
                </li>
                <li className="list-group-item d-flex align-items-center py-1 px-2">
                  <div className="form-check form-switch theme-high-contrast mb-0">
                    <input className="form-check-input" type="checkbox" id="theme-high-contrast" />
                    <label className="form-check-label" htmlFor="theme-high-contrast">Enable High Contrast</label>
                  </div>
                </li>
                <li className="list-group-item d-flex align-items-center py-1 px-2">
                  <div className="form-check form-switch theme-rtl mb-0">
                    <input className="form-check-input" type="checkbox" id="theme-rtl" />
                    <label className="form-check-label" htmlFor="theme-rtl">Enable RTL Mode!</label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="modal-footer justify-content-start">
            <button type="button" className="btn btn-white border lift" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary lift">Save Changes</button>
          </div>
        </div>
      </div>
    </div> 
    {/* Send sheet*/}
    <div className="modal fade" id="sendfile" tabIndex={-1} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title  fw-bold" id="sendsheetLabel"> Share Files</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Done</button>
            <button type="submit" className="btn btn-primary">sent</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  )
}

export default Labs
