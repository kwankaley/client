import { useState } from "react";
import { AnomalyProvider } from "../AnomalyProvider";
import { SnapshotMapView } from "./SnapshotMapView";
import { SnapshotTableView } from "./SnapshotTableView";

export const AnomalySnapshot = () => {
  const [tableOpen, setTableOpen] = useState(true);
  return (
    <AnomalyProvider>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 20,
          borderWidth: 1,
          borderStyle: "solid",
          padding: 20,
        }}
      >
        {tableOpen && <SnapshotTableView />}
        <button onClick={() => setTableOpen((prev) => !prev)}>
          {tableOpen ? "Close Table View" : "Open Table View"}
        </button>
        <SnapshotMapView />
      </div>
    </AnomalyProvider>
  );
};
