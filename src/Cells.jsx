import React from "react";
import "./App.css";

export default function Cell({ value, locked, onClick }) {
  return (
    <div
      className={`cell ${locked ? "locked" : ""}`}
      onClick={locked ? null : onClick}
    >
      {value}
    </div>
  );
}
