import React, { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";

const Cube = (props) => {
  const { send, machineState } = props;
  const meshRef = useRef();
  const [elapsed, setElapsed] = useState(0);
  const duration = 10;

  const initialState = {
    position: [
      machineState.context.startPosition.x,
      machineState.context.startPosition.y,
      machineState.context.startPosition.z,
    ],
    rotation: [
      machineState.context.startRotation.x,
      machineState.context.startRotation.y,
      machineState.context.startRotation.z,
    ],
  };
  const goalState = {
    position: [
      machineState.context.goalPosition.x,
      machineState.context.goalPosition.y,
      machineState.context.goalPosition.z,
    ],
    rotation: [
      machineState.context.goalRotation.x,
      machineState.context.goalRotation.y,
      machineState.context.goalRotation.z,
    ],
  };

  useFrame((state, delta) => {
    if (!meshRef) {
      return;
    }

    if (machineState.value === "idle" || machineState.value === "waiting") {
      return;
    }

    var newElapsed = elapsed + delta;

    const t = newElapsed / duration;

    // console.log("elapsed ", newElapsed);

    const position = [
      initialState.position[0] +
        (goalState.position[0] - initialState.position[0]) * t,
      initialState.position[1] +
        (goalState.position[1] - initialState.position[1]) * t,
      initialState.position[2] +
        (goalState.position[2] - initialState.position[2]) * t,
    ];

    const rotation = [
      initialState.rotation[0] +
        (goalState.rotation[0] - initialState.rotation[0]) * t,
      initialState.rotation[1] +
        (goalState.rotation[1] - initialState.rotation[1]) * t,
      initialState.rotation[2] +
        (goalState.rotation[2] - initialState.rotation[2]) * t,
    ];

    if (newElapsed >= duration) {
      send({
        type: "SETSTARTPOS",
        x: position[0],
        y: position[1],
        z: position[2],
      });
      send({
        type: "SETSTARTROT",
        x: rotation[0],
        y: rotation[1],
        z: rotation[2],
      });
      setElapsed(0);
      send({ type: "FINISHED" });
      return;
    }

    setElapsed(newElapsed);

    meshRef.current.position.set(position[0], position[1], position[2]);
    meshRef.current.rotation.set(rotation[0], rotation[1], rotation[2]);

    send({
      type: "MOVING",
      x: position[0],
      y: position[1],
      z: position[2],
    });

    send({
      type: "ROTATING",
      x: rotation[0],
      y: rotation[1],
      z: rotation[2],
    });
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="white"
        emissive="turquoise"
        wireframe
        wireframeLinewidth={100}
        wireframeLinejoin="round"
      />
    </mesh>
  );
};

export default Cube;
//<Cube position={[0, 0, 0]} />
