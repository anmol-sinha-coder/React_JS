import React from "react";
import "./styles.css";

export default function Loading() {
  return (
    <h1>
      <body bgcolor="yellow">
      Loading{" "}
      <span role="img" aria-label="Spinning emoji" className="spin">
        🌀
      </span>
      </body>
    </h1>
  );
}
