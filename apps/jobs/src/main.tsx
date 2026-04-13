import React from "react";
import { createRoot } from "react-dom/client";

import App from "./app";

import "./styles/tailwind.css";

const element = document.getElementById("root");

if (!element) {
  throw new Error("Could not find root element");
}

createRoot(element).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
