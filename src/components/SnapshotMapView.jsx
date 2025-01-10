import { useAnomalies } from "../AnomalyProvider";

export const SnapshotMapView = () => {
  const { filteredAnomalies } = useAnomalies();

  return (
    <div>
      <p>This is a map</p>
      {filteredAnomalies.map((anomaly, index) => {
        return (
          <div key={index}>
            <p>{anomaly.name}</p>
          </div>
        );
      })}
    </div>
  );
};
