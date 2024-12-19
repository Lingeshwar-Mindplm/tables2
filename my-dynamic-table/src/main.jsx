// src/main.jsx or src/index.jsx (depending on your Vite setup)
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Import the Tailwind CSS file
import App from "./App";
import "./app.css"; // Tailwind styles
import "./custom.css"; // Custom styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
