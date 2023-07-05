import React, { useState } from "react";
import "./Form.css";

const Form = ({ onFormSubmit }) => {
  const [businessName, setContractAddress] = useState("");
  const [businessType, setContractModule] = useState("");
  const [productPrice, setContractMethod] = useState("");
  const [durationMs, setDurationMs] = useState("");

  const handleContractAddressChange = (e) => {
    setContractAddress(e.target.value);
  };

  const handleContractModuleChange = (e) => {
    setContractModule(e.target.value);
  };

  const handleContractMethodChange = (e) => {
    setContractMethod(e.target.value);
  };

  const handleDurationMsChange = (e) => {
    setDurationMs(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform your logic here using the form input values
    const formData = {
      businessName,
      businessType,
      productPrice,
      durationMs,
    };

    console.log(formData);
    // Call the onFormSubmit function from the prop and pass the form data
    onFormSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        type="text"
        value={businessName}
        onChange={handleContractAddressChange}
        placeholder="Enter Business Name "
        className="input-field"
      />

      <input
        type="text"
        value={businessType}
        onChange={handleContractModuleChange}
        placeholder="Enter Business Type"
        className="input-field"
      />

      <input
        type="text"
        value={productPrice}
        onChange={handleContractMethodChange}
        placeholder="Enter product price"
        className="input-field"
      />

      <input
        type="text"
        value={durationMs}
        onChange={handleDurationMsChange}
        placeholder="Enter duration in milliseconds"
        className="input-field"
      />

      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default Form;
//
//business type
//product price
//duration
