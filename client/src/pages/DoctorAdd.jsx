import React from 'react'
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DoctorAdd() {
    const [doctorData, setDoctorData] = useState({
        first_name:"",
        last_name:"",
        gender:"Male",
        specialization: "",
        email: "",
        phone: "",
        join_date:"",
        username:"",
        pass:"",
        confirmpass:"",
        cabin:"",
        access:""
      });
    
      const handleInputChange = (event) => {

        const { name, value } = event.target;
        setDoctorData((prevData) => ({
          ...prevData,
          [name]: value,
          specialization:selectedSpeciality

        }));
    console.log(doctorData)  
    };
      const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const response = await axios.post(
            "http://localhost:3100/doctors",
            doctorData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
    
          if (response.status === 201) {
            toast.success("Doctor created successfully");
          }
    
          console.log("Doctor created:", response.data);
          // Reset the form after successful submission
          setDoctorData({
            doctor_id: "",
            department_id: "", // Replace with the actual department ID
            last_name:"",
            first_name:"",
            specialization: "",
            gender:"",
            email: "",
            phone: "",
            join_date:"",
            username:"",
            pass:"",
            confirmpass:"",
            cabin:"",
            payment:""
          });
        } catch (error) {
          toast.error(error.response.data.message);
          console.error("Error creating doctor:", error.response.data);
          console.log(doctorData);
        }
      };
      const [selectedSpeciality, setSelectedSpeciality] = useState('');

      const handleSpecialityChange = (event) => {
        setSelectedSpeciality(event.target.value);
      };

    
  return (
    <div>
        
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
                  <form  onSubmit={handleSubmit}>
                    <div className="row g-3 align-items-center">
                      <div className="col-md-6">
                        <label htmlFor="firstname" className="form-label">First Name</label>
                        <input name="first_name" type="text" className="form-control" id="firstname" required value={doctorData.first_name} onChange={handleInputChange} />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="lastname" className="form-label">Last Name</label>
                        <input name="last_name" type="text" className="form-control" id="lastname" required value={doctorData.last_name} onChange={handleInputChange}/>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="phonenumber" className="form-label">Phone Number</label>
                        <input name="phone"  type="text" className="form-control" id="phonenumber" required value={doctorData.phone} onChange={handleInputChange}/>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="emailaddress" className="form-label">Email Address</label>
                        <input name="email" type="email" className="form-control" id="emailaddress" required value={doctorData.email} onChange={handleInputChange}/>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="admitdate" className="form-label">Join Date</label>
                        <input name="join_date" type="date" className="form-control" id="admitdate" required value={doctorData.join_date} onChange={handleInputChange}/>  
                      </div>
                      <div className="col-md-6">
                      <label className="form-label">Gender</label>
                      <div className="row">
                          <div className="col-md-6">
                            <div className="form-check">
                              <input  required className="form-check-input" type="radio" name="gender" value="Male" checked={doctorData.gender === "Male"} onChange={handleInputChange} id="exampleRadios1" defaultChecked/>
                              <label className="form-check-label" htmlFor="exampleRadios11">
                                Male
                              </label>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-check">
                              <input name="gender" value="Female" className="form-check-input" type="radio"  id="exampleRad"  checked={doctorData.gender === "Female"}
                                  onChange={handleInputChange} />
                              <label className="form-check-label" htmlFor="exampleRadios22">
                                Female
                              </label>
                            </div>
                          </div>
                        </div>                    
                      
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="formFileMultiple" className="form-label"> Document Upload</label>
                        <input className="form-control" type="file" id="formFileMultiple" multiple />
                      </div>
                      <div className="col-md-6">
                      <label htmlFor="roominfo" className="form-label">Cabin Number</label>
                        <input name="cabin" type="text" className="form-control" id="roominfo" required value={doctorData.cabin} onChange={handleInputChange}/>
                        
                      </div>
                      <div>
                        </div>
                      <div className="row g-3 align-items-center">
                      <div className="col-md-6">
                        <label htmlFor="speciality" className="form-label">Speciality</label>
                        <select name='specialization' value={selectedSpeciality} onChange={handleSpecialityChange} className="form-select" aria-label="Default select example" id="speciality" required>
                            <option value=""></option>
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
                        <input name="username" type="text" className="form-control" id="user" required value={doctorData.username} onChange={handleInputChange}/>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input name="pass" type="password" className="form-control" id="password" required value={doctorData.pass} onChange={handleInputChange}/>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="cnpassword" className="form-label">Confirm Password</label>
                        <input name="confirmpass" type="password" className="form-control" id="cnpassword" required value={doctorData.confirmpass} onChange={handleInputChange}/>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Login Permission </label>
                        <div className="row">
                        
                          <div className="col-md-6">
                            <div className="form-check">
                              <input className="form-check-input" type="radio" name="access" value="hospital only" id="exampleRadios07" checked={doctorData.access === "Hospital only"} onChange={handleInputChange} defaultChecked />
                              <label className="form-check-label" htmlFor="exampleRadios07">
                                Hospital Only
                              </label>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-check">
                              <input className="form-check-input" type="radio" name="access" value="anywhere" id="exampleRadios08" checked={doctorData.access === "Anywhere"} onChange={handleInputChange} />
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
                  <ToastContainer position="top-right" autoClose={3000} />
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