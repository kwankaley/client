import { useAnomalies } from "../AnomalyProvider";
import { AnomalyTable } from "./AnomalyTable";
import { useState } from "react";

export const SnapshotTableView = () => {
  const { filterByName, resetAnomalies } = useAnomalies();
  const [filterName, setFilterName] = useState("");

  return (
    <div>
      <div>
        <label>
          Filter by name:
          <input
            name="myInput"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
        </label>
        <button
          onClick={() => {
            filterByName(filterName);
            setFilterName("");
          }}
        >
          Filter
        </button>
        <button onClick={resetAnomalies}>Reset</button>
      </div>
      <AnomalyTable />
    </div>
  );
};
