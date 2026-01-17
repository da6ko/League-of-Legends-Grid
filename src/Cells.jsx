import React from "react";
import "./App.css"; 

export default function Cell({ rowIndex, colIndex, onClick }) {
  return (
    <div
      className="cell"
      onClick={() => onClick(rowIndex, colIndex)}
    />
  );
}
