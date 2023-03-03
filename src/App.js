import "./App.css";
import React from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls, Stars, Sphere } from "@react-three/drei";
import "./styles.css";

import Cube from "./components/Cube2";
import Axis from "./components/Axis";
import Controls from "./components/Controls2";
import cubeMachine from "./components/CubeStateMachine";
import List from "./components/List";

import { useMachine } from "@xstate/react";

const machine = cubeMachine;

function App() {
  const [state, sendMethod, service] = useMachine(machine);
  console.log(
    "Current State:",
    state,
    " SCHEDULE RUNNING:",
    state.context.scheduleRunning
  );

  return (
    <>
      <Canvas camera={{ position: [10, 10, 10] }}>
        {/* Canvas Controls */}
        <OrbitControls
          target={[
            state.context.currentPosition.x,
            state.context.currentPosition.y,
            state.context.currentPosition.z,
          ]}
          screenSpacePanning
        />
        {/* Lighting */}
        <directionalLight intensity={0.5} position={[6, 2, 1]} />
        <ambientLight intensity={0.05} />
        <Stars count={3000} depth={100} speed={0.1} saturation={100000} />
        {/* View Components */}
        <Cube
          pos={{
            x: state.context.goalPosition.x,
            y: state.context.goalPosition.y,
            z: state.context.goalPosition.z,
          }}
          rot={{
            x: state.context.goalRotation.x,
            y: state.context.goalRotation.y,
            z: state.context.goalRotation.z,
          }}
          send={sendMethod}
          machineState={state}
        />
        <Sphere args={[0.4, 32, 16]}>
          <meshStandardMaterial color="yellow" emissive="yellow" />
        </Sphere>

        <Sphere
          args={[0.4, 32, 16]}
          position={[
            state.context.goalPosition.x,
            state.context.goalPosition.y,
            state.context.goalPosition.z,
          ]}
        >
          <meshStandardMaterial color="lightblue" emissive="lightblue" />
        </Sphere>

        {/*Line from origin to cube*/}
        <Axis
          start={{
            x: 0,
            y: 0,
            z: 0,
          }}
          end={{
            x: state.context.currentPosition.x,
            y: state.context.currentPosition.y,
            z: state.context.currentPosition.z,
          }}
        />
        <Axis
          start={{
            x: 0,
            y: 0,
            z: 0,
          }}
          end={{
            x: state.context.currentPosition.x,
            y: 0,
            z: 0,
          }}
          type="x"
        />
        <Axis
          start={{
            x: state.context.currentPosition.x,
            y: 0,
            z: 0,
          }}
          end={{
            x: state.context.currentPosition.x,
            y: state.context.currentPosition.y,
            z: 0,
          }}
          type="y"
        />
        <Axis
          start={{
            x: state.context.currentPosition.x,
            y: state.context.currentPosition.y,
            z: 0,
          }}
          end={{
            x: state.context.currentPosition.x,
            y: state.context.currentPosition.y,
            z: state.context.currentPosition.z,
          }}
          type="z"
        />
        <Axis
          start={{
            x: state.context.currentPosition.x,
            y: state.context.currentPosition.y,
            z: state.context.currentPosition.z,
          }}
          end={{
            x: state.context.goalPosition.x,
            y: state.context.goalPosition.y,
            z: state.context.goalPosition.z,
          }}
          type="d"
        />
      </Canvas>
      <div className="controls">
        <Controls send={sendMethod} state={state} />
        <List send={sendMethod} state={state} service={service} />
      </div>
    </>
  );
}

export default App;
