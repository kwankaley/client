import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { AnomalyCard } from "./components/AnomalyCard";
import { AnomalyTable } from "./components/AnomalyTable";
import { AnomalySnapshot } from "./components/AnomalySnapshot";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AnomalySnapshot />
    </>
  );
}

export default App;
