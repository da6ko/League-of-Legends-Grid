import "./App.css";
import Cell from "./Cells";
import React, { useState } from "react";

const columnHeaders = ["Temp1", "Temp2", "Temp3"];
const rowHeaders = ["Temp4", "Temp5", "Temp6"];
const answerList = ["test1", "option2", "what3"];

export default function App() {
  const [cellValues, setCellValues] = useState(Array(9).fill(""));
  const [cellFilled, setCellFilled] = useState(Array(9).fill(false));
  const [activeCell, setActiveCell] = useState(null);
  const [modalValue, setModalValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [tries, setTries] = useState(3);
  const [showOptions, setShowOptions] = useState(false);

  const filteredAnswers = answerList.filter((opt) =>
    opt.toLowerCase().includes(modalValue.toLowerCase())
  );

  const handleCellClick = (rowIndex, colIndex) => {
    if (tries === 0) return;

    const index = (rowIndex - 1) * 3 + (colIndex - 1);

    if (cellFilled[index]) return;

    setActiveCell(index);
    setModalValue("");
    setShowOptions(false);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!answerList.includes(modalValue)) return;

    const newValues = [...cellValues];
    newValues[activeCell] = modalValue;
    setCellValues(newValues);

    const newFilled = [...cellFilled];
    newFilled[activeCell] = true;
    setCellFilled(newFilled);

    setTries((prev) => Math.max(prev - 1, 0));

    setShowOptions(false);
    setShowModal(false);
    setActiveCell(null);
  };

  return (
    <>
      <div className={`container ${showModal ? "blurred" : ""}`}>
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

              {columnHeaders.map((_, colIndex) => {
                const index = rowIndex * 3 + colIndex;

                return (
                  <Cell
                    key={`${rowIndex}-${colIndex}`}
                    value={cellValues[index]}
                    locked={cellFilled[index] || tries === 0}
                    onClick={() =>
                      handleCellClick(rowIndex + 1, colIndex + 1)
                    }
                  />
                );
              })}
            </React.Fragment>
          ))}
        </div>

        <div className="menu">
          {tries === 0 ? "Game over" : `Number of tries: ${tries}`}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Enter value</h3>

            <div className="autocomplete">
              <input
                autoFocus
                value={modalValue}
                onChange={(e) => {
                  setModalValue(e.target.value);
                  setShowOptions(true);
                }}
                onFocus={() => setShowOptions(true)}
                placeholder="Type to search..."
              />

              {showOptions && modalValue && (
                <div className="options-list">
                  {filteredAnswers.length === 0 && (
                    <div className="option disabled">No matches</div>
                  )}

                  {filteredAnswers.map((opt, idx) => (
                    <div
                      key={idx}
                      className="option"
                      onClick={() => {
                        setModalValue(opt);
                        setShowOptions(false);
                      }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="modal-buttons">
              <button
                onClick={handleSave}
                disabled={!answerList.includes(modalValue)}
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowOptions(false);
                  setShowModal(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
