import { useEffect, useState } from "react";
import "./App.css";
import Background from "./components/Background";
import Header from "./components/Header";

function App() {
  const [zoom, setZoom] = useState("100%");

  const getZoom = (zoom: string) => {
    setZoom(zoom);
  };
  useEffect(() => {});
  return (
    <div className="App">
      <Header getZoom={getZoom}></Header>
      <Background zoom={zoom} />
    </div>
  );
}

export default App;
