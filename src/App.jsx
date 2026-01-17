import "./App.css";
import Cell from "./Cells";
import React from "react";

const columnHeaders = ["Temp1", "Temp2", "Temp3"];
const rowHeaders = ["Temp4", "Temp5", "Temp6"];

export default function App() {
  const handleCellClick = (rowIndex, colIndex) => {
    console.log(`Clicked cell at row ${rowIndex}, column ${colIndex}`);
  };

return (
  <div className="container">
    <div className="grid">
      <div className="corner" />

      {columnHeaders.map((text, index) => (
        <div key={index} className="header column-header">
          {text}
        </div>
      ))}

      {rowHeaders.map((rowText, rowIndex) => (
        <React.Fragment key={rowIndex}>
          <div className="header row-header">{rowText}</div>
          {columnHeaders.map((_, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              rowIndex={rowIndex + 1}
              colIndex={colIndex + 1}
              onClick={handleCellClick}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  </div>
);
}
