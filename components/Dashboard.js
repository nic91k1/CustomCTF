import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import Layout from "./Layout"; // Ensure Layout is wrapped around to keep styling consistent

function Dashboard() {
  const [challenges, setChallenges] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch challenges directly without needing a token
    const fetchChallenges = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/dashboard");
        setChallenges(response.data.challenges);
      } catch (err) {
        console.error("Failed to fetch challenges:", err);
        // You can handle the error here (like redirecting or showing a message)
      }
    };

    fetchChallenges();
  }, []);

  return (
    <Layout>
      <Container className="mt-5">
        {challenges.length > 0 ? (
          <>
            <h2 className="text-center mb-4">Available Challenges</h2>
            <Row>
              {challenges.map((challenge) => (
                <Col md={6} key={challenge.id}>
                  <Card className="mb-4">
                    <Card.Body>
                      <Card.Title>{challenge.name}</Card.Title>
                      <Card.Text>{challenge.description}</Card.Text>
                      <Button variant="primary">View Challenge</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        ) : (
          <h2 className="text-center">Loading...</h2>
        )}
      </Container>
    </Layout>
  );
}

export default Dashboard;
