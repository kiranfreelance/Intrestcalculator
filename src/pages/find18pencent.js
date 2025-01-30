import React, { useState } from "react";
import Modal from "react-modal";

const CalculationComponent = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState(0);

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value) && value.trim() !== "") {
      const numericValue = parseFloat(value);
      const twoPercent = numericValue * 0.025;
      const onePercent = twoPercent * 0.01;
      const eighteenPercentOfOnePercent = onePercent * 0.18;
      const finalResult =
        twoPercent + eighteenPercentOfOnePercent + onePercent + numericValue;
      setResult(finalResult);
    } else {
      setResult(0);
    }
    setInputValue(value);
  };

  return (
    <Modal
      isOpen={props?.modalIsOpen}
      onRequestClose={props?.closePopup}
      contentLabel="Example Modal"
    >
      <div>
        <h1>Calculation Component</h1>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a value"
        />
        <p>{result}</p>
        <button onClick={props.closePopup}>Close</button>
      </div>
    </Modal>
  );
};

export default CalculationComponent;
