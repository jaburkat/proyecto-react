import React from "react";
import Spinner from "react-bootstrap/Spinner";
import "./CustomSpinner.css";

export const CustomSpinner = () => {
  return (
    <div className="content-spinner">
      <Spinner animation="border" variant="info" />
    </div>
  );
};
