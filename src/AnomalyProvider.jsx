import { useState, useEffect, createContext, useContext } from "react";

export const AnomalyContext = createContext({});

export const useAnomalies = () => {
  const { anomalies, filteredAnomalies, filterByName, resetAnomalies } =
    useContext(AnomalyContext);
  return { anomalies, filteredAnomalies, filterByName, resetAnomalies };
};

export const AnomalyProvider = ({ children }) => {
  const [anomalies, setAnomalies] = useState([]);
  const [filteredAnomalies, setFilteredAnomalies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/anomalies/")
      .then((response) => response.json())
      .then((data) => {
        setAnomalies(data);
        setFilteredAnomalies(data);
      })
      .catch((error) => console.error("Error fetching anomalies:", error));
  }, []);

  const filterByName = (name) => {
    setFilteredAnomalies((prev) =>
      anomalies.filter((val) => val.name.includes(name))
    );
  };

  const resetAnomalies = () => {
    setFilteredAnomalies(anomalies);
  };

  const val = { anomalies, filteredAnomalies, filterByName, resetAnomalies };

  return (
    <AnomalyContext.Provider value={val}>{children}</AnomalyContext.Provider>
  );
};
