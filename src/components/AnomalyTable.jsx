import { useState } from "react";
import "../styles/AnomalyTableStyles.css";
import { useAnomalies } from "../AnomalyProvider";

export const AnomalyTable = () => {
  const { filteredAnomalies } = useAnomalies();

  return (
    <div className="table-wrapper">
      <table className="table-container">
        <thead className="header">
          <tr>
            <th className="table-header" style={{ width: "10%" }}>
              Rank
            </th>
            <th className="table-header" style={{ width: "20%" }}>
              Name
            </th>
            <th className="table-header">Description</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {filteredAnomalies.map((val, key) => {
            return (
              <tr key={key} style={{ padding: 20 }}>
                <td
                  className="row-item"
                  style={{
                    borderBottomWidth:
                      key == filteredAnomalies.length - 1 ? 0 : 1,
                    width: "10%",
                  }}
                >
                  {key + 1}
                </td>
                <td
                  className="row-item"
                  style={{
                    borderBottomWidth:
                      key == filteredAnomalies.length - 1 ? 0 : 1,
                    width: "20%",
                  }}
                >
                  {val.name}
                </td>
                <td
                  className="row-item"
                  style={{
                    borderBottomWidth:
                      key == filteredAnomalies.length - 1 ? 0 : 1,
                  }}
                >
                  {val.description}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
