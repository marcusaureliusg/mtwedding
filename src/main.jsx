import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import CommandInput from "./components/CommandInput";
import FlipTimer from "./components/FlipTimer";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <footer className="footer-container">
      <p className="footer-text">Built with ♥ by us</p>
      <div className="footer-widgets">
        <CommandInput onEnter={(command) => console.log(command)} />
        <FlipTimer targetDate="2024-06-08T16:00:00-07:00" />
      </div>
    </footer>
  </React.StrictMode>
);
