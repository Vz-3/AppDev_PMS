// DuePaymentPrompt.js
import React, { useState } from "react";

function DuePaymentPrompt({ onAddDuePayment }) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [unitNumber, setUnitNumber] = useState("");
  const [totalPayment, setTotalPayment] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleAddDuePayment = () => {
    setShowPrompt(true);
  };

  const closeDue = () => {
    setShowPrompt(false);
  };

  const handleSubmit = () => {
    // Check if any input field is empty
    if (!unitNumber || !totalPayment || !dueDate) {
      alert("Please fill in all fields");
      return;
    }

    // Call the onAddDuePayment function passed from the parent component
    onAddDuePayment({
      unitNumber: unitNumber,
      totalPayment: totalPayment,
      dueDate: dueDate
    });

    // Reset input fields
    setUnitNumber("");
    setTotalPayment("");
    setDueDate("");
    setShowPrompt(false);
  };

  return (
    <div>
      <button onClick={handleAddDuePayment} className="addUnit">
        Add Due Payment
      </button>
      {showPrompt && (
        <div className="prompt">
            <h4>ADD DUE</h4>
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
              placeholder="Total Payment"
              value={totalPayment}
              onChange={(e) => setTotalPayment(e.target.value)}
            />
            <br/>
            <input
              type="date"
              placeholder="Due Date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <br/>
            <div className="promptbutton">
            <button type="button" onClick={handleSubmit}>
              Submit
            </button>
            <button type="button" onClick={closeDue}>
              Close
            </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default DuePaymentPrompt;