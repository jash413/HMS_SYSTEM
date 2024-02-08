import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import $ from "jquery";
import "datatables.net";
import { myContext, tokenContext } from "./Main";

function PatientInvoices() {
  const userData = useContext(myContext);
  const token = useContext(tokenContext);
  const tableRef = useRef(null);
  const [invoices, setInvoices] = useState([]);
  const [invoiceDetails, setInvoiceDetails] = useState([]);
  const [selectedPatientDetails, setSelectedPatientDetails] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    // Fetch the list of invoices from the backend
    fetchInvoices();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      $(tableRef.current).DataTable();
    }, 1000);
  }, []);

  // Fetch Invoices
  const fetchInvoices = async () => {
    try {
      const response = await axios.get("http://localhost:3100/billing", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const filteredInvoices = response.data.filter(
        (invoice) => invoice.hospital_id === userData.hospital_id
      );
      setInvoices(filteredInvoices);

      // Fetch additional details (patient names, doctor names, ward numbers)
      fetchAdditionalDetails(filteredInvoices);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch additional details for each invoice
  const fetchAdditionalDetails = async (invoices) => {
    for (const invoice of invoices) {
      try {
        const [patientResponse, doctorResponse, wardResponse] =
          await Promise.all([
            axios.get(`http://localhost:3100/api/patients/${invoice.patient}`, {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }),
            axios.get(`http://localhost:3100/doctors/${invoice.doctor}`, {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }),
          ]);

        invoice.patientName =
          patientResponse.data.firstName + " " + patientResponse.data.lastName;
        invoice.doctorName =
          doctorResponse.data.first_name + " " + doctorResponse.data.last_name;

        // Trigger a re-render to update the table with additional details
        setInvoices([...invoices]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  //   badge color
  const badgeColor = (status) => {
    if (status === "Pending") {
      return "bg-danger";
    } else if (status === "Paid") {
      return "bg-success";
    } else {
      return "bg-warning";
    }
  };

  // Handle print for a specific invoice
  const handlePrint = async () => {
    try {
      if (selectedInvoice) {
        setLoading(true);
        const response = await axios.post(
          `http://localhost:3100/billing/printInvoice`,
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
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Handle download for a specific invoice
  const handleDownload = async () => {
    try {
      if (selectedInvoice) {
        const response = await axios.post(
          `http://localhost:3100/billing/generateInvoice`,
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
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Handle click on an invoice row
  const handleInvoiceClick = (invoice) => {
    setSelectedInvoice(invoice);
    handleInvoiceDetails(invoice);
    handlePatientDetails(invoice);
    handleHospitalDetails(invoice);
  };

  // Handle invoice details
  const handleInvoiceDetails = async (invoice) => {
    try {
      const response = await axios.get(
        `http://localhost:3100/billing/${invoice._id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setInvoiceDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle patient details
  const handlePatientDetails = async (invoice) => {
    try {
      const response = await axios.get(
        `http://localhost:3100/api/patients/${invoice.patient}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedPatientDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle hospital details
  const handleHospitalDetails = async (invoice) => {
    try {
      const response = await axios.get(
        `http://localhost:3100/api/hospital/${invoice.hospital_id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setHospitals(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-xxl">
      <div className="row align-items-center">
        <div className="border-0 mb-4">
          <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
            <h3 className="fw-bold mb-0">Patient Invoices</h3>
          </div>
        </div>
      </div>{" "}
      {/* Row end  */}
      <div className="row mb-3">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-body">
              <table
                id="patient-table"
                className="table table-hover align-middle mb-0"
                style={{ width: "100%" }}
                ref={tableRef}
              >
                <thead>
                  <tr>
                    <th>Patients</th>
                    <th>Doctor Name</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr
                      key={invoice._id}
                      onClick={() => handleInvoiceClick(invoice)}
                      style={{ cursor: "pointer" }}
                    >
                      <td>{invoice.patientName}</td>
                      <td>{invoice.doctorName}</td>
                      <td>{invoice.totalCharges}</td>
                      <td>
                        <span
                          className={`badge ${badgeColor(
                            invoice.paymentStatus
                          )}`}
                        >
                          {invoice.paymentStatus}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-white"
                          onClick={handlePrint}
                        >
                          {(loading && selectedInvoice === invoice ) ? (
                           <div
                           class="spinner-border spinner-border-sm"
                           role="status"
                         >
                           <span class="visually-hidden">Loading...</span>
                         </div>
                          ): (
                            <i className="icofont-print fs-5" />
                          )}
                        </button>
                        <button
                          className="btn btn-sm btn-white"
                          onClick={handleDownload}
                        >
                          <i className="icofont-download fs-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientInvoices;
