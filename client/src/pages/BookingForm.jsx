import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function BookingForm({ surgeryId }) {
    const [surgeons, setSurgeons] = useState([]);
    const [anesthetists, setAnesthetists] = useState([]);
    const [otKits, setOTKits] = useState([]);
    const [selectedSurgeon, setSelectedSurgeon] = useState(null);
    const [selectedAnesthetist, setSelectedAnesthetist] = useState(null);
    const [selectedOTKits, setSelectedOTKits] = useState([]);
    
    useEffect(() => {
      async function fetchStaffAndKits() {
        try {
          const surgeonResponse = await axios.get('/api/surgeons'); // Replace with your API endpoint
          setSurgeons(surgeonResponse.data);
  
          const anesthetistResponse = await axios.get('/api/anesthetists'); // Replace with your API endpoint
          setAnesthetists(anesthetistResponse.data);
  
          const otKitResponse = await axios.get('/api/ot-kits'); // Replace with your API endpoint
          setOTKits(otKitResponse.data);
        } catch (error) {
          console.error('Error fetching staff and kits:', error);
        }
      }
  
      fetchStaffAndKits();
    }, []);
  
    const handleBooking = async () => {
      const bookingData = {
        surgeryId,
        surgeonId: selectedSurgeon.value,
        anesthetistId: selectedAnesthetist.value,
        otKitIds: selectedOTKits.map(kit => kit.value),
      };
  
      try {
        const response = await axios.post('/api/book-surgery', bookingData); // Replace with your API endpoint
        console.log('Surgery booked:', response.data);
        // Reset selections after successful booking
        setSelectedSurgeon(null);
        setSelectedAnesthetist(null);
        setSelectedOTKits([]);
      } catch (error) {
        console.error('Error booking surgery:', error);
      }
    };
  
    const surgeonOptions = surgeons.map(surgeon => ({
      value: surgeon._id,
      label: surgeon.name,
    }));
  
    const anesthetistOptions = anesthetists.map(anesthetist => ({
      value: anesthetist._id,
      label: anesthetist.name,
    }));
  
    const otKitOptions = otKits.map(otKit => ({
      value: otKit._id,
      label: otKit.name,
    }));
  
    return (
      <div>
        <h2>Booking Form</h2>
        <label>Select Surgeon:</label>
        <Select
          options={surgeonOptions}
          value={selectedSurgeon}
          onChange={selectedOption => setSelectedSurgeon(selectedOption)}
          placeholder="Select a surgeon"
        />
        <label>Select Anesthetist:</label>
        <Select
          options={anesthetistOptions}
          value={selectedAnesthetist}
          onChange={selectedOption => setSelectedAnesthetist(selectedOption)}
          placeholder="Select an anesthetist"
        />
        <label>Select OT Kits:</label>
        <Select
          options={otKitOptions}
          value={selectedOTKits}
          onChange={selectedOptions => setSelectedOTKits(selectedOptions)}
          isMulti
          placeholder="Select OT kits"
        />
        <button onClick={handleBooking}>Book Surgery</button>
      </div>
    );
  }
  
  export default BookingForm;