import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";


function Challenges() {
  const [challenges, setChallenges] = useState([]);
  const [submittedFlag, setSubmittedFlag] = useState("");

  // Fetch challenges from the backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/challenges")
      .then(response => {
        setChallenges(response.data.challenges);
      })
      .catch(error => {
        console.error("Error fetching challenges:", error);
      });
  }, []);

  // Handle flag submission
  const handleFlagSubmit = (event, challengeId) => {
    event.preventDefault();

    const data = {
      challenge_id: challengeId,
      flag: submittedFlag,
    };

    axios.post("http://localhost:5000/api/submit", data)
      .then(response => {
        alert("Flag submitted successfully!");
        setSubmittedFlag(""); // Clear the flag input
      })
      .catch(error => {
        console.error("Error submitting flag:", error);
        alert("Failed to submit flag!");
      });
  };

  return (
    <div>
      <h2>Challenges</h2>
      <div className="list-group">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="list-group-item">
            <h5>{challenge.name}</h5>
            <p>{challenge.description}</p>
            <form onSubmit={(event) => handleFlagSubmit(event, challenge.id)}>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your flag"
                value={submittedFlag}
                onChange={(e) => setSubmittedFlag(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary mt-2">
                Submit Flag
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Challenges;
