import React, { useState } from "react";

function Card(props) {
  const { px, py, pz, rx, ry, rz, onInput, state } = props;
  const [cardPX, setCardPX] = useState(px);
  const [cardPY, setCardPY] = useState(py);
  const [cardPZ, setCardPZ] = useState(pz);
  const [cardRX, setCardRX] = useState(rx);
  const [cardRY, setCardRY] = useState(ry);
  const [cardRZ, setCardRZ] = useState(rz);

  const handleXPositionChange = (event) => {
    if (!event.target.value) {
      setCardPX(0);
    }
    setCardPX(parseFloat(event.target.value));
    onInput({ px: parseFloat(event.target.value) });
  };

  const handleYPositionChange = (event) => {
    if (!event.target.value) {
      setCardPY(0);
    }
    setCardPY(parseFloat(event.target.value));
    onInput({ py: parseFloat(event.target.value) });
  };

  const handleZPositionChange = (event) => {
    if (!event.target.value) {
      setCardPZ(0);
    }
    setCardPZ(parseFloat(event.target.value));
    onInput({ pz: parseFloat(event.target.value) });
  };

  const handleXRotationChange = (event) => {
    if (!event.target.value) {
      setCardRX(0);
    }
    onInput({ rx: (parseFloat(event.target.value) * Math.PI) / 180 });
  };

  const handleYRotationChange = (event) => {
    if (!event.target.value) {
      setCardRY(0);
    }
    setCardRY(parseFloat(event.target.value));
    onInput({ ry: (parseFloat(event.target.value) * Math.PI) / 180 });
  };

  const handleZRotationChange = (event) => {
    if (!event.target.value) {
      setCardRZ(0);
    }
    setCardRZ(parseFloat(event.target.value));
    onInput({ rz: (parseFloat(event.target.value) * Math.PI) / 180 });
  };

  return (
    <div className="card">
      <div className="control">
        <h2>Translate</h2>
        <label className="labelX">
          X:{" "}
          <input
            type="number"
            onInput={handleXPositionChange}
            min="-100"
            max="100"
          />
        </label>
        <label className="labelY">
          Y:{" "}
          <input
            type="number"
            onInput={handleYPositionChange}
            min="-100"
            max="100"
          />
        </label>
        <label className="labelZ">
          Z:{" "}
          <input
            type="number"
            onInput={handleZPositionChange}
            min="-100"
            max="100"
          />
        </label>
      </div>
      <div className="control">
        <h2>Rotate</h2>
        <label className="labelX">
          X:{" "}
          <input
            type="number"
            onInput={handleXRotationChange}
            min="-180"
            max="180"
          />
        </label>
        <label className="labelY">
          Y:{" "}
          <input
            type="number"
            onInput={handleYRotationChange}
            min="-180"
            max="180"
          />
        </label>
        <label className="labelZ">
          Z:{" "}
          <input
            type="number"
            onInput={handleZRotationChange}
            min="-180"
            max="180"
          />
        </label>
      </div>
    </div>
  );
}

export default Card;
