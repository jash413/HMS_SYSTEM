import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const OperationTheatreForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    availability: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://backendmedisys.webwisesolution.me/operation-theatres",
        formValues
      );

      if (response.status === 201) {
        toast.success("Operation theatre added successfully");
        setFormValues({
          name: "",
          description: "",
          availability: true,
        });
      } else {
        toast.error("Error adding operation theatre");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (

    <div id="ihealth-layout" className="theme-tradewind">
      {/* main body area */}
      <div className="main px-lg-4 px-md-4">
        {/* Body: Body */}
        <div className="body d-flex py-3">
          <div className="container-xxl">
            <div className="row align-items-center">
              <div className="border-0 mb-4">
                <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                  <h3 className="fw-bold mb-0">Operation Theatre</h3>
                </div>
              </div>
            </div>{" "}
            {/* Row end  */}
            <div className="row mb-3">
              <div className="col-sm-12">
                <div className="card mb-3">
                  <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                    <h5 className="mb-0 fw-bold ">
                      Fill in the form below to add a new operation theatre
                    </h5>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="row g-3 align-items-center">
                        <div className="col-md-6">
                          <label className="form-label">Theatre Name</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formValues.name}
                            onChange={handleChange}
                            required
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="admittime" className="form-label">
                            Description
                          </label>
                          <input
                            type="text"
                            id="description"
                            name="description"
                            value={formValues.description}
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>
                        </div>
                      <button type="submit" className="btn btn-primary mt-4">
                        Submit
                      </button>
                    </form>
                    <ToastContainer position="top-right" autoClose={3000} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationTheatreForm;
