import { useState } from "react";
import "./CommandInput.css";

const CommandInput = ({ onEnter }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onEnter(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="input-prompt" tabIndex={0}>
      <span>&gt;:</span>
      <div className="blinking-cursor"></div>
      <input
        type="text"
        pattern="/^[0-9\s]*$/"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default CommandInput;
