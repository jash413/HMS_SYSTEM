import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AsyncSelect from "react-select/async";

const SurgerySchedulingForm = () => {
  const [formValues, setFormValues] = useState({
    surgeon: "",
    patient: "",
    theatre: "",
    date: "",
    time: "",
  });

  const handleTheatreChange = (selectedOption) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      theatre: selectedOption ? selectedOption.value : "",
    }));
  };

  const checkOTAvailability = async () => {
    try {
      const response = await axios.get("/api/check-ot-availability", {
        params: {
          theatreId: formValues.theatre,
          surgeryTime: formValues.time,
        },
      });

      return response.data.available;
    } catch (error) {
      console.error("Error checking OT availability:", error);
      return false;
    }
  };

  const handleSurgeryScheduling = async (e) => {
    e.preventDefault();

    const isOTAvailable = await checkOTAvailability();

    if (isOTAvailable) {
      try {
        const response = await axios.post("/api/schedule-surgery", formValues);

        if (response.status === 201) {
          toast.success("Surgery scheduled successfully");
          await updateTheatreAvailability(formValues.theatre, false);
          setFormValues({
            surgeon: "",
            patient: "",
            theatre: "",
            date: "",
            time: "",
          });
        } else {
          toast.error("Error scheduling surgery");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred. Please try again later.");
      }
    } else {
      toast.error(
        "Selected operation theatre is not available at the specified time."
      );
    }
  };

  const loadTheatres = async (inputValue) => {
    try {
      const response = await axios.get(`/api/theatres?search=${inputValue}`);
      return response.data.map((theatre) => ({
        value: theatre._id,
        label: theatre.name,
      }));
    } catch (error) {
      console.error("Error fetching theatres:", error);
      return [];
    }
  };

  const updateTheatreAvailability = async (theatreId, availability) => {
    try {
      const response = await axios.patch(
        `/api/operation-theatres/${theatreId}`,
        {
          availability: availability,
        }
      );

      if (response.status === 200) {
        console.log("Operation theatre availability updated successfully");
      } else {
        console.error("Error updating operation theatre availability");
      }
    } catch (error) {
      console.error("Error updating operation theatre availability:", error);
    }
  };

  const loadSurgeons = async (inputValue) => {
    try {
      const response = await axios.get(`/api/surgeons?search=${inputValue}`);
      return response.data.map((surgeon) => ({
        value: surgeon._id,
        label: surgeon.name,
      }));
    } catch (error) {
      console.error("Error fetching surgeons:", error);
      return [];
    }
  };

  const loadPatients = async (inputValue) => {
    try {
      const response = await axios.get(`/api/patients?search=${inputValue}`);
      return response.data.map((patient) => ({
        value: patient._id,
        label: patient.name,
      }));
    } catch (error) {
      console.error("Error fetching patients:", error);
      return [];
    }
  };

  return (
    <div className="container">
      <h1>Schedule Surgery</h1>
      <form onSubmit={handleSurgeryScheduling}>
        <label>Operation Theatre:</label>
        <AsyncSelect
          cacheOptions
          defaultOptions
          loadOptions={loadTheatres}
          onChange={handleTheatreChange}
        />

        <label>Surgeon:</label>
        <AsyncSelect
          cacheOptions
          defaultOptions
          loadOptions={loadSurgeons}
          onChange={handleSurgeonChange}
        />

        <label>Patient:</label>
        <AsyncSelect
          cacheOptions
          defaultOptions
          loadOptions={loadPatients}
          onChange={handlePatientChange}
        />

        <button type="submit">Schedule Surgery</button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SurgerySchedulingForm;
