import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { myContext, tokenContext } from "./Main";
import moment from "moment";

function ViewInvoice() {
  const userData = useContext(myContext);
  const token = useContext(tokenContext);
  const [loading, setLoading] = useState(false);
  // ID of patient and doctor
  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
  });

  // dropdown
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  // selected resources details
  const [selectedPatientDetails, setSelectedPatientDetails] = useState(null);
  const [doctorData, setDoctorData] = useState({});
  const [hospitals, setHospitals] = useState({});

  // fetch patients
  useEffect(() => {
    if (formData.doctor) {
      axios
        .get(`https://backendmedisys.webwisesolution.me:3100/api/patients`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const allPatients = response.data;
          // Filter patients based on the selected doctor
          const doctorPatients = allPatients.filter(
            (patient) => patient.doctor === formData.doctor
          );
          setPatients(doctorPatients);
        });
    } else {
      setPatients([]); // Reset patients when no doctor is selected
    }
  }, [formData.doctor]);

  const handleSelectChange = (e) => {
    const selectedOption = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      patient: selectedOption,
    }));

    axios
      .get(`https://backendmedisys.webwisesolution.me:3100/api/patients/${selectedOption}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSelectedPatientDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching patient details:", error);
      });
  };

  // fetch doctors
  useEffect(() => {
    if (userData.role === "Admin") {
      axios
        .get("https://backendmedisys.webwisesolution.me:3100/doctors", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const allDoctors = response.data.filter(
            (doctor) => doctor.hospital_id === userData.hospital_id
          );
          setDoctors(allDoctors);
        });
    }
  }, [userData.role === "Admin"]);

  //   loggin in as doctor
  useEffect(() => {
    if (userData.role === "Doctor") {
      setFormData((prevData) => ({
        ...prevData,
        doctor: userData.doctor_id,
      }));
      axios
        .get(`https://backendmedisys.webwisesolution.me:3100/doctors/${userData.doctor_id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const allDoctors = response.data;
          setDoctors(allDoctors);
        });
    }
  }, [userData.role === "Doctor"]);

  const handleDoctorChange = (e) => {
    const selectedDoctor = e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      doctor: selectedDoctor,
      patient: "", // Clear the selected patient when doctor changes
    }));
    setSelectedPatientDetails(null); // Clear patient details
    axios
      .get(`https://backendmedisys.webwisesolution.me:3100/doctors/${selectedDoctor}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDoctorData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctor details:", error);
      });
  };

  // Hospital details
  useEffect(() => {
    axios
      .get(`https://backendmedisys.webwisesolution.me:3100/api/hospital/${userData.hospital_id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setHospitals(response.data);
      });
  }, [userData.hospital_id]);

  // Invoice details
  const [invoiceDetails, setInvoiceDetails] = useState(null);

  useEffect(() => {
    if (formData.patient) {
      axios
        .get(`https://backendmedisys.webwisesolution.me:3100/billing/patient/${formData.patient}`)
        .then((response) => {
          const date = moment(response.data.visitDate).format("DD-MM-YYYY");
          const invoiceData = {
            ...response.data,
            visitDate: date,
          };
          setInvoiceDetails(invoiceData);
        })
        .catch((error) => {
          console.error("Error fetching invoice details:", error);
        });
      console.log(invoiceDetails);
    } else {
      setInvoiceDetails(null); // Reset invoice details when no patient is selected
    }
  }, [formData.patient]);

  //  Handle print
  const handlePrint = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://backendmedisys.webwisesolution.me:3100/billing/printInvoice`,
        {
          invoiceDetails,
          selectedPatientDetails,
          hospitals,
        },
        { responseType: "blob" }
      );
      setLoading(false);
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const iframe = document.createElement("iframe");
      iframe.src = pdfUrl;
      iframe.style.display = "none";
      document.body.appendChild(iframe);
      iframe.contentWindow.print();
    } catch (error) {
      console.error(error);
    }
  };

  //  Handle download
  const handleDownload = async () => {
    try {
      const response = await axios.post(
        `https://backendmedisys.webwisesolution.me:3100/billing/generateInvoice`,
        {
          invoiceDetails,
          selectedPatientDetails,
          hospitals,
        },
        { responseType: "blob" }
      );

      // Create a Blob object from the response data
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });

      // Create a URL for the Blob and trigger a download
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "Invoice.pdf";
      link.click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-xxl">
      <div className="row align-items-center">
        <div className="border-0 mb-4">
          <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
            <h3 className="fw-bold mb-0">Invoice</h3>
            {userData.role === "Admin" && (
              <div className="dropdown">
                <select
                  className="btn btn-primary form-control"
                  id="dropdownMenuButton2"
                  name="doctor"
                  onChange={handleDoctorChange}
                >
                  <option
                    style={{ backgroundColor: "white", color: "black" }}
                    value=""
                  >
                    Select Doctor
                  </option>
                  {doctors.map((doctor) => (
                    <option
                      style={{ backgroundColor: "white", color: "black" }}
                      key={doctor._id}
                      value={doctor._id}
                    >
                      {doctor.first_name} {doctor.last_name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="col-md-4">
              <select className="form-control" onChange={handleSelectChange}>
                <option value="">Select patient</option>
                {patients.map((patient) => (
                  <option key={patient._id} value={patient._id}>
                    {patient.firstName} {patient.lastName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* Row end  */}
      {invoiceDetails && selectedPatientDetails ? (
        <div className="row justify-content-center">
          <div className="col-lg-12 col-md-12">
            <div className="" id="Invoice-Simple">
              <div className="row justify-content-center">
                <div className="col-lg-8 col-md-12">
                  <div className="card p-xl-5 p-lg-4 p-0">
                    <div className="card-body">
                      <div className="mb-3 pb-3 border-bottom">
                        Invoice
                        <strong> {invoiceDetails.visitDate}</strong>
                        <span className="float-end">
                          {" "}
                          <strong>Status:</strong>{" "}
                          {invoiceDetails.paymentStatus}
                        </span>
                      </div>
                      <div className="row mb-4">
                        <div className="col-sm-6">
                          <h6 className="mb-3">From:</h6>
                          <div>
                            <strong>{hospitals.hospital_name}</strong>
                          </div>
                          <div>{hospitals.address}</div>
                          <div>Email: {hospitals.email}</div>
                          <div>Phone: {hospitals.phone}</div>
                        </div>
                        <div className="col-sm-6">
                          <h6 className="mb-3">To:</h6>
                          <div>
                            <strong>
                              {selectedPatientDetails.firstName}{" "}
                              {selectedPatientDetails.lastName}
                            </strong>
                          </div>
                          <div>
                            Email: {selectedPatientDetails.emailAddress}
                          </div>
                          <div>Phone: {selectedPatientDetails.phoneNumber}</div>
                        </div>
                      </div>{" "}
                      {/* Row end  */}
                      <div className="table-responsive-sm">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th className="text-center">#</th>
                              <th>Service</th>
                              <th className="text-end">Service Charge</th>
                              <th className="text-end">Total</th>
                            </tr>
                          </thead>
                          <tbody> 
                            <tr>
                              <td className="text-center">1</td>
                              <td>Registration Fee</td>
                              <td className="text-end">
                                <i class="icofont-rupee" />
                                {invoiceDetails.registrationFee}
                              </td>
                              <td className="text-end">
                                <i class="icofont-rupee" />
                                {invoiceDetails.registrationFee}
                              </td>
                            </tr>
                              <tr>
                                <td className="text-center">2</td>
                                <td>Room Charges</td>
                                <td className="text-end">
                                  <i class="icofont-rupee" />
                                  {invoiceDetails.roomCharges}
                                </td>
                                <td className="text-end">
                                  <i class="icofont-rupee" />
                                  {invoiceDetails.roomCharges}
                                </td>
                              </tr>
                            {invoiceDetails.services.map((service, index) => (
                              <tr key={service._id}>
                                <td className="text-center">{index + 3}</td>
                                <td>{service.serviceName}</td>
                                <td className="text-end">
                                  <i class="icofont-rupee" />
                                  {service.serviceCharge}
                                </td>
                                <td className="text-end">
                                  <i class="icofont-rupee" />
                                  {service.serviceCharge}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="row">
                        <div className="col-lg-4 col-sm-5"></div>
                        <div className="col-lg-4 col-sm-5 ms-auto">
                          <table className="table table-clear">
                            <tbody>
                              <tr>
                                <td>
                                  <strong>Subtotal</strong>
                                </td>
                                <td className="text-end">
                                  <i class="icofont-rupee" />
                                  {invoiceDetails.totalCharges -
                                    invoiceDetails.gst}
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>GST (18%)</strong>
                                </td>
                                <td className="text-end">
                                  <i class="icofont-rupee"></i>
                                  {invoiceDetails.gst}
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Total</strong>
                                </td>
                                <td className="text-end">
                                  <i class="icofont-rupee"></i>
                                  <strong>{invoiceDetails.totalCharges}</strong>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>{" "}
                      {/* Row end  */}
                      <div className="row">
                        <div className="col-lg-12">
                          <h6>Terms &amp; Condition</h6>
                          <p className="text-muted">
                            Contrary to popular belief, Lorem Ipsum is not
                            simply random text. It has roots in a piece of
                            classical Latin literature from 45 BC, making it
                            over
                          </p>
                        </div>
                        <div className="col-lg-12 text-end">
                          <button
                            type="button"
                            className="btn btn-outline-secondary btn-lg my-1"
                            onClick={handlePrint}
                          >
                            {!loading ? (
                              <>
                                <i className="icofont-print" />
                                Print
                              </>
                            ) : (
                              <div
                                class="spinner-border spinner-border-sm"
                                role="status"
                              >
                                <span class="visually-hidden">Loading...</span>
                              </div>
                            )}
                          </button>{" "}
                          <button
                            type="button"
                            className="btn btn-primary btn-lg my-1"
                            onClick={handleDownload}
                          >
                            <i className="icofont-download" /> Download Invoice
                          </button>
                        </div>
                      </div>{" "}
                      {/* Row end  */}
                    </div>
                  </div>
                </div>
              </div>{" "}
              {/* Row end  */}
            </div>
          </div>
        </div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-lg-12 col-md-12">
            <div className="" id="Invoice-Simple">
              <div className="row justify-content-center">
                <div className="col-lg-8 col-md-12">
                  <div className="card p-xl-5 p-lg-4 p-0">
                    <div className="card-body">
                      <div className="mb-3 pb-3 border-bottom">
                        Invoice
                        <strong></strong>
                        <span className="float-end">
                          {" "}
                          <strong>Status:</strong>
                        </span>
                      </div>
                      <div className="row mb-4">
                        <div className="col-sm-6">
                          <h6 className="mb-3">From:</h6>
                          <div>
                            <strong>{hospitals.hospital_name}</strong>
                          </div>
                          <div>{hospitals.address}</div>
                          <div>Email: {hospitals.email}</div>
                          <div>Phone: {hospitals.phone}</div>
                        </div>
                        <div className="col-sm-6">
                          <h6 className="mb-3">To:</h6>
                          <div>
                            <strong></strong>
                          </div>
                          <div>Email: </div>
                          <div>Phone: </div>
                        </div>
                      </div>{" "}
                      {/* Row end  */}
                      <div className="table-responsive-sm">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th className="text-center">#</th>
                              <th>Service</th>
                              <th className="text-end">Service Charge</th>
                              <th className="text-end">Total</th>
                            </tr>
                          </thead>
                          <tbody></tbody>
                        </table>
                      </div>
                      <div className="row">
                        <div className="col-lg-4 col-sm-5"></div>
                        <div className="col-lg-4 col-sm-5 ms-auto">
                          <table className="table table-clear">
                            <tbody>
                              <tr>
                                <td>
                                  <strong>Subtotal</strong>
                                </td>
                                <td className="text-end">
                                  <i class="icofont-rupee" />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>GST (18%)</strong>
                                </td>
                                <td className="text-end">
                                  <i class="icofont-rupee"></i>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Total</strong>
                                </td>
                                <td className="text-end">
                                  <i class="icofont-rupee"></i>
                                  <strong></strong>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>{" "}
                      {/* Row end  */}
                      <div className="row">
                        <div className="col-lg-12">
                          <h6>Terms &amp; Condition</h6>
                          <p className="text-muted">
                            Contrary to popular belief, Lorem Ipsum is not
                            simply random text. It has roots in a piece of
                            classical Latin literature from 45 BC, making it
                            over
                          </p>
                        </div>
                        <div className="col-lg-12 text-end">
                          <button
                            type="button"
                            className="btn btn-outline-secondary btn-lg my-1"
                          >
                            <i className="fa fa-print" /> Print
                          </button>{" "}
                          <button
                            type="button"
                            className="btn btn-primary btn-lg my-1"
                          >
                            <i className="icofont-download" /> Download Invoice
                          </button>
                        </div>
                      </div>{" "}
                      {/* Row end  */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Row end  */}
    </div>
  );
}

export default ViewInvoice;
