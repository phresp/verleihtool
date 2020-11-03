import React from "react";
import spinner from "./Spinner.gif";

const MyComponent = () => {
  return (
    <div>
      <img
        src={spinner}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </div>
  );
};

export default MyComponent;
