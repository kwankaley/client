import { useState, useEffect } from "react";

export const AnomalyCard = () => {
  const [anomalies, setAnomalies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/anomalies/")
      .then((response) => response.json())
      .then((data) => setAnomalies(data))
      .catch((error) => console.error("Error fetching anomalies:", error));
  }, []);

  return (
    <div>
      {anomalies.map((anomaly) => {
        return (
          <div
            style={{
              backgroundColor: "#f0f0f0",
              padding: 10,
              marginBottom: 10,
            }}
          >
            <p>{anomaly.name}!</p>
            <p>{anomaly.description}</p>
          </div>
        );
      })}
    </div>
  );
};
