import React from "react";
import ReactDOM from "react-dom/client";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../themes/V3/5ePHB/style.css";
import Creature from "./components/handbook/Creature";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Creature />
  </React.StrictMode>,
);
