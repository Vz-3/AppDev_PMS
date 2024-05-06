import React, { useState } from "react";

function MessagePrompt({ onAddMessage }) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [unitNumber, setUnitNumber] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleAddMessage = () => {
    setShowPrompt(true);
  };

  const closeMessage = () => {
    setShowPrompt(false);
  };

  const handleSubmit = () => {
    // Check if any input field is empty
    if (!unitNumber || !title || !message) {
      alert("Please fill in all fields");
      return;
    }

    // Call the onAddMessage function passed from the parent component
    onAddMessage({
      unitNumber: unitNumber,
      title: title,
      message: message
    });

    // Reset input fields
    setUnitNumber("");
    setTitle("");
    setMessage("");
    setShowPrompt(false);
  };


  return (
    <div>
      <button onClick={handleAddMessage} className="addUnit">
        Add Message
      </button>
      {showPrompt && (
        <div className="prompt">
          <h4>ADD MESSAGE</h4>
          <form>
            <input
              type="text"
              placeholder="Unit Number"
              value={unitNumber}
              onChange={(e) => setUnitNumber(e.target.value)}
            />
            <br/>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br/>
            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <br/>
            <div className="promptbutton">
              <button type="button" onClick={handleSubmit}>
                Submit
              </button>
              <button type="button" onClick={closeMessage}>
                Close
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default MessagePrompt;