import React from "react";

function Controls(props) {
  const { send } = props;

  function handleXPositionChange(event) {
    if (!event.target.value) {
      return;
    }
    const newX = parseFloat(event.target.value);
    console.log("X:", newX);
    send({ type: "MOVE", x: newX });
  }

  function handleYPositionChange(event) {
    if (!event.target.value) {
      return;
    }
    const newY = parseFloat(event.target.value);
    console.log("Y:", newY);
    send({ type: "MOVE", y: newY });
  }

  function handleZPositionChange(event) {
    if (!event.target.value) {
      return;
    }
    const newZ = parseFloat(event.target.value);
    console.log("Z:", newZ);
    send({ type: "MOVE", z: newZ });
  }

  function handleXRotationChange(event) {
    if (!event.target.value) {
      return;
    }
    const newX = (parseFloat(event.target.value) * Math.PI) / 180;
    console.log("X:", newX);
    send({ type: "ROTATE", x: newX });
  }

  function handleYRotationChange(event) {
    if (!event.target.value) {
      return;
    }
    const newY = (parseFloat(event.target.value) * Math.PI) / 180;
    console.log("Y:", newY);
    send({ type: "ROTATE", y: newY });
  }

  function handleZRotationChange(event) {
    if (!event.target.value) {
      return;
    }
    const newZ = (parseFloat(event.target.value) * Math.PI) / 180;
    console.log("Z:", newZ);
    send({ type: "ROTATE", z: newZ });
  }

  return (
    <div className="controls">
      <h2>Position Control</h2>
      <div className="positionControlGroup">
        <div className="control">
          <label className="labelX"> X Position </label>
          <input
            type="number"
            min="-100"
            max="100"
            onChange={handleXPositionChange}
            step="any"
            defaultValue={0}
          />
        </div>
        <div className="control">
          <label className="labelY"> Y Position </label>
          <input
            type="number"
            min="-100"
            max="100"
            onChange={handleYPositionChange}
            step="any"
            defaultValue={0}
          />
        </div>
        <div className="control">
          <label className="labelZ"> Z Position </label>
          <input
            type="number"
            min="-100"
            max="100"
            onChange={handleZPositionChange}
            step="any"
            defaultValue={0}
          />
        </div>
      </div>
      <h2>Rotation Control</h2>
      <div className="rotationControlGroup">
        <div className="control">
          <label className="labelX"> X Rotation </label>
          <input
            type="number"
            min="-180"
            max="180"
            onInput={handleXRotationChange}
            step="any"
            defaultValue={0}
          />
        </div>
        <div className="control">
          <label className="labelY"> Y Rotation </label>
          <input
            type="number"
            min="-180"
            max="180"
            onInput={handleYRotationChange}
            step="any"
            defaultValue={0}
          />
        </div>
        <div className="control">
          <label className="labelZ"> Z Rotation </label>
          <input
            type="number"
            min="-180"
            max="180"
            onInput={handleZRotationChange}
            step="any"
            defaultValue={0}
          />
        </div>
      </div>
    </div>
  );
}

export default Controls;
