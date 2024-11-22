import React, { useState } from "react";
import axios from "axios";
import Layout from "./Layout";


function SubmitFlag() {
  const [flag, setFlag] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:5000/api/submit", { flag })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error("Error submitting flag:", error);
        setMessage("Error submitting flag.");
      });
  };

  return (
    <div>
      <h2>Submit Flag</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={flag}
          onChange={(e) => setFlag(e.target.value)}
          placeholder="Enter flag"
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default SubmitFlag;
