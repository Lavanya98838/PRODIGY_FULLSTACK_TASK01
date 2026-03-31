import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// Ping backend every 14 minutes to prevent Render from sleeping
const keepAlive = () => {
  fetch(`${import.meta.env.VITE_API_URL}`)
    .then(() => console.log("Server kept alive"))
    .catch(() => console.log("Keep alive ping failed"));
};

// Start pinging after app loads
setInterval(keepAlive, 14 * 60 * 1000);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);