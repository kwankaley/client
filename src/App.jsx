import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { AnomalyCard } from "./components/AnomalyCard";
import { AnomalyTable } from "./components/AnomalyTable";
import { AnomalySnapshot } from "./components/AnomalySnapshot";
import { PushCodeButton } from "./components/PushCodeButton";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AnomalySnapshot />
      <PushCodeButton />
    </>
  );
}

export default App;
