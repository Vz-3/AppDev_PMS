import React, { useState } from 'react';
import { submitMaintenanceRequest } from './api'; // Hypothetical API call

function MaintenanceRequests() {
  const [description, setDescription] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await submitMaintenanceRequest(description);
    setDescription('');
    setStatusMessage(result.message);
  };

  return (
    <div>
      <h2>Submit a Maintenance Request</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your issue"
        />
        <button type="submit">Submit Request</button>
      </form>
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
}

export default MaintenanceRequests;
