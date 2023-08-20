import React,{useState} from 'react'

function DoctorAdd() {
    const [selectedSpeciality, setSelectedSpeciality] = useState('');

    const handleSpecialityChange = (event) => {
      setSelectedSpeciality(event.target.value);
    };
  return (
    <div>
 
  {/* <div id="ihealth-layout" className="theme-tradewind">
  
    
    </div> */}
    {/* main body area */}
    <div className="main px-lg-4 px-md-4"> 
   
      
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
                        <select value={selectedSpeciality} onChange={handleSpecialityChange} className="form-select" aria-label="Default select example" id="speciality" required>
                            <option value="">Select a field</option>
                            <option value="orthopedic">Orthopedic</option>
                            <option value="neurosurgeon">Neurosurgeon</option>
                            <option value="cardiologist">Cardiologist</option>
                            <option value="gynaecologist">Gynaecologist</option>
                        </select>
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
     
  {/* Jquery Core Js */}
  {/* Jquery Page Js */}
</div>

  )
}

export default DoctorAdd
