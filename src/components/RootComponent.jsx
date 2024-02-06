import { useState } from "react";
import FlipTimer from "./FlipTimer";
import CommandInput from "./CommandInput";
import App from "../App";

const RootComponent = () => {
  const [useCustomMinutes, setUseCustomMinutes] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(null);

  const inputHandler = (command) => {
    console.log(command);
    // If the command matches, set customMinutes and useCustomMinutes to trigger the countdown
    if (command === "4 8 15 16 23 42") {
      console.log("Abort Sequence");
      setCustomMinutes(108); // Set custom minutes as per your requirement
      setUseCustomMinutes(true); // Enable custom minutes mode
    }
  };

  return (
    <>
      <App />
      <footer className="footer-container">
        <p className="footer-text">Built with ♥ by us</p>
        <div className="footer-widgets">
          <CommandInput onEnter={inputHandler} />
          {useCustomMinutes ? (
            <FlipTimer customMinutes={customMinutes} />
          ) : (
            <FlipTimer targetDate="2024-06-08T16:00:00-07:00" />
          )}
        </div>
      </footer>
    </>
  );
};

export default RootComponent;
