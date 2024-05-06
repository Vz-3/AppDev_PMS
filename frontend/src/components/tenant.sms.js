import React, { useState } from "react";

function TenantSMS() {
  const [unitNumber, setUnitNumber] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");

  const sendMessage = async () => {
    try {
      const response = await fetch("https://api.httpsms.com/v1/messages/send", {
        method: "POST",
        headers: {
          "x-api-key":
            "RC6Uy8twYjkBaZ8icGfd-TQSIPoUSPBuVw4cTR-tUB_ufn1vyDL_9IdGBVZfqkTM", // Replace with your actual API key
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: message,
          from: "+639996736800",
          to: recipient,
        }),
      });

      const data = await response.json();
      console.log(data); // Log the response for debugging purposes
      // Handle the response as needed

      // Call the onAddMessage function passed from the parent component

      // Reset input fields
      setUnitNumber("");
      setTitle("");
      setRecipient("");
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      // Handle errors appropriately
    }
  };

  return (
    <div>
      <div className="prompt">
        <form>
          <input
            type="text"
            placeholder="Unit Number"
            value={unitNumber}
            onChange={(e) => setUnitNumber(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="Recipient (e.g., +18005550100)"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
          <br />
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <br />
          <div className="promptbutton">
            <button type="button" onClick={sendMessage}>
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TenantSMS;
