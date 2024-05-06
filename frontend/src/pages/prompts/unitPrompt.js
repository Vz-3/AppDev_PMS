import React, { useState } from "react";

function UnitPrompt({ onAddUnit }) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [unitNumber, setUnitNumber] = useState("");
  const [numTenants, setNumTenants] = useState("");
  const [unitType, setUnitType] = useState("");

  const handleAddUnit = () => {
    setShowPrompt(true);
  };

  const closeUnit = () => {
    setShowPrompt(false);
  };

  const handleSubmit = () => {
    // Check if any input field is empty
    if (!unitNumber || !numTenants || !unitType) {
      alert("Please fill in all fields");
      return;
    }

    // Call the onAddUnit function passed from the parent component
    onAddUnit({
      unitNumber: unitNumber,
      numTenants: numTenants,
      unitType: unitType
    });

    // Reset input fields
    setUnitNumber("");
    setNumTenants("");
    setUnitType("");
    setShowPrompt(false);
  };

  return (
    <div>
      <button onClick={handleAddUnit} className="addUnit">
        Add Unit
      </button>
      {showPrompt && (
        <div className="prompt">
            <h4>ADD UNITS</h4>
          <form>
            <input
              type="text"
              placeholder="Unit Number"
              value={unitNumber}
              onChange={(e) => setUnitNumber(e.target.value)}
            />
            <br/>
            <input
              type="number"
              placeholder="Number of Tenants"
              value={numTenants}
              onChange={(e) => setNumTenants(e.target.value)}
            />
            <br/>
            <input
              type="text"
              placeholder="Type of Unit"
              value={unitType}
              onChange={(e) => setUnitType(e.target.value)}
            />
            <br/>
            <div className="promptbutton">
            <button type="button" onClick={handleSubmit}>
              Submit
            </button>
            <button type="button" onClick={closeUnit}>
              Close
            </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default UnitPrompt;
