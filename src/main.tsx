import React from "react";
import ReactDOM from "react-dom/client";
import TurkishInsuranceLanding from "./App";
import "./index.css";
import { Analytics } from "@vercel/analytics/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TurkishInsuranceLanding />
    <Analytics />
  </React.StrictMode>
);


