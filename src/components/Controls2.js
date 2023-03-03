import React, { useState } from "react";

function Controls(props) {
  const { send, state } = props;
  const [PX, setPX] = useState(0);
  const [PY, setPY] = useState(0);
  const [PZ, setPZ] = useState(0);
  const [RX, setRX] = useState(0);
  const [RY, setRY] = useState(0);
  const [RZ, setRZ] = useState(0);

  function handleXPositionChange(event) {
    if (!event.target.value) {
      setPX(0);
    }
    setPX(
      parseFloat(state.context.startPosition.x) + parseFloat(event.target.value)
    );
  }

  function handleYPositionChange(event) {
    if (!event.target.value) {
      setPY(0);
    }
    setPY(
      parseFloat(state.context.startPosition.y) + parseFloat(event.target.value)
    );
  }

  function handleZPositionChange(event) {
    if (!event.target.value) {
      setPZ(0);
    }
    setPZ(
      parseFloat(state.context.startPosition.z) + parseFloat(event.target.value)
    );
  }

  function handleXRotationChange(event) {
    if (!event.target.value) {
      setRX(0);
    }
    setRX(
      (parseFloat(state.context.startRotation.x) * Math.PI) / 180 +
        (parseFloat(event.target.value) * Math.PI) / 180
    );
  }

  function handleYRotationChange(event) {
    if (!event.target.value) {
      setRY(0);
    }
    setRY(
      (parseFloat(state.context.startRotation.y) * Math.PI) / 180 +
        (parseFloat(event.target.value) * Math.PI) / 180
    );
  }

  function handleZRotationChange(event) {
    if (!event.target.value) {
      setRZ(0);
    }
    setRZ(
      (parseFloat(state.context.startRotation.z) * Math.PI) / 180 +
        (parseFloat(event.target.value) * Math.PI) / 180
    );
  }

  const handleExecuteTransformation = () => {
    send({ type: "SETPOS", x: PX, y: PY, z: PZ });
    send({ type: "SETROT", x: RX, y: RY, z: RZ });
    send({ type: "EXECUTE" });
  };

  return (
    <div className="controls">
      <h1>Direct Control</h1>
      <div className="buttons">
        <h1> </h1>
        <button onClick={handleExecuteTransformation}>Execute</button>
      </div>

      <div className="positionControlGroup">
        <h2>Translation</h2>
        <div className="control">
          <label className="labelX"> X Translate </label>
          <input
            type="number"
            min="-100"
            max="100"
            onInput={handleXPositionChange}
            step="any"
          />
        </div>
        <div className="control">
          <label className="labelY"> Y Translate </label>
          <input
            type="number"
            min="-100"
            max="100"
            onInput={handleYPositionChange}
            step="any"
          />
        </div>
        <div className="control">
          <label className="labelZ"> Z Translate </label>
          <input
            type="number"
            min="-100"
            max="100"
            onInput={handleZPositionChange}
            step="any"
          />
        </div>
      </div>

      <div className="rotationControlGroup">
        <h2>Rotation</h2>
        <div className="control">
          <label className="labelX"> X Rotate </label>
          <input
            type="number"
            min="-180"
            max="180"
            onInput={handleXRotationChange}
            step="any"
          />
        </div>
        <div className="control">
          <label className="labelY"> Y Rotate </label>
          <input
            type="number"
            min="-180"
            max="180"
            onInput={handleYRotationChange}
            step="any"
          />
        </div>
        <div className="control">
          <label className="labelZ"> Z Rotate </label>
          <input
            type="number"
            min="-180"
            max="180"
            onInput={handleZRotationChange}
            step="any"
          />
        </div>
      </div>

      <div className="pose">
        <div>
          <h2>Current Pose</h2>
          <label className="labelX">
            X Pos: {state.context.currentPosition.x.toFixed(2)}
          </label>
        </div>
        <div>
          <label className="labelY">
            Y Pos: {state.context.currentPosition.y.toFixed(2)}
          </label>
        </div>
        <div>
          <label className="labelZ">
            Z Pos: {state.context.currentPosition.z.toFixed(2)}
          </label>
        </div>
        <div>
          <label className="labelX">
            X Rot:{" "}
            {((180 * state.context.currentRotation.x) / Math.PI).toFixed(2)}
          </label>
        </div>
        <div>
          <label className="labelY">
            Y Rot:{" "}
            {((180 * state.context.currentRotation.y) / Math.PI).toFixed(2)}
          </label>
        </div>
        <div>
          <label className="labelZ">
            Z Rot:{" "}
            {((180 * state.context.currentRotation.z) / Math.PI).toFixed(2)}
          </label>
        </div>
      </div>
      <h2>Current State: {state.value}</h2>
    </div>
  );
}

export default Controls;
