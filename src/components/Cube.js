import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { Vector3 } from 'three';

const Cube = (props) => {
  const { pos, rot, send, state } = props;
  const meshRef = useRef();
  var goalPos = pos;
  var goalRot = rot;

  useFrame((self) => {
    if (!meshRef) {
      return;
    }

    if (state.value === 'idle') {
      return;
    }

    const speedFactorP = 0.03;
    const speedFactorR = 0.01;

    const xPDiff = goalPos.x - meshRef.current.position.x;
    const yPDiff = goalPos.y - meshRef.current.position.y;
    const zPDiff = goalPos.z - meshRef.current.position.z;

    const xRDiff = goalRot.x - meshRef.current.rotation.x;
    const yRDiff = goalRot.y - meshRef.current.rotation.y;
    const zRDiff = goalRot.z - meshRef.current.rotation.z;

    console.log('R DIFFS', xRDiff, yRDiff, zRDiff);

    console.log(
      'CURRENT POS',
      meshRef.current.position.x,
      meshRef.current.position.y,
      meshRef.current.position.z,
      'CURRENT ROT',
      meshRef.current.rotation.x,
      meshRef.current.rotation.y,
      meshRef.current.rotation.z
    );

    // If we are within 0.1 units of range of goal, set current position to goalPos and send "finished" trigger to state machine,
    // Not doing this results in the cube oscillating at the goal position
    if (
      Math.abs(xPDiff) < 0.1 &&
      Math.abs(yPDiff) < 0.1 &&
      Math.abs(zPDiff) < 0.1 &&
      Math.abs(xRDiff) < 2 &&
      Math.abs(yRDiff) < 2 &&
      Math.abs(zRDiff) < 2
    ) {
      meshRef.current.position.x = goalPos.x;
      meshRef.current.position.y = goalPos.y;
      meshRef.current.position.z = goalPos.z;
      meshRef.current.rotation.x = goalRot.x;
      meshRef.current.rotation.y = goalRot.y;
      meshRef.current.rotation.z = goalRot.z;

      // Since we are finished with this transformation, set the start pos and rot to the current pos and rot,
      // this means we will be able to reference it in the next transformation
      send({ type: 'SETSTARTPOS', x: goalPos.x, y: goalPos.y, z: goalPos.z });
      send({ type: 'SETSTARTROT', x: goalRot.x, y: goalRot.y, z: goalRot.z });
      send({ type: 'FINISHED' });
      return;
    }

    // ---------------------- calculate the current position

    const normalizedP = new Vector3(xPDiff, yPDiff, zPDiff).normalize();

    meshRef.current.position.x += speedFactorP * normalizedP.x;
    meshRef.current.position.y += speedFactorP * normalizedP.y;
    meshRef.current.position.z += speedFactorP * normalizedP.z;

    send({
      type: 'MOVING',
      x: meshRef.current.position.x,
      y: meshRef.current.position.y,
      z: meshRef.current.position.z,
    });

    //----------------------- calculate the current rotation based on position

    // Using the percentage of completion of the position of the cube, calculate the rotation so that the cube
    // slowly rotates while the cube is translating. The percentage of completion will be the normalized version of
    // the vector containing the distances left to traverse (normalizedP above)

    const normalizedR = new Vector3(xRDiff, yRDiff, zRDiff).normalize();

    meshRef.current.rotation.x += speedFactorR * normalizedR.x;
    meshRef.current.rotation.y += speedFactorR * normalizedR.y;
    meshRef.current.rotation.z += speedFactorR * normalizedR.z;

    send({
      type: 'ROTATING',
      x: meshRef.current.rotation.x,
      y: meshRef.current.rotation.y,
      z: meshRef.current.rotation.z,
    });

    // var currentDist = new Vector3(
    //   meshRef.current.position.x - state.context.startPosition.x,
    //   meshRef.current.position.y - state.context.startPosition.y,
    //   meshRef.current.position.z - state.context.startPosition.z
    // ).length();
    // var total = new Vector3(
    //   goalPos.x - state.context.startPosition.x,
    //   goalPos.y - state.context.startPosition.y,
    //   goalPos.z - state.context.startPosition.z
    // ).length();
    // var progress = currentDist / total;
    // console.log("Progress ", progress);

    // meshRef.current.rotation.x =
    //   (goalRot.x - state.context.startRotation.x) * progress;
    // meshRef.current.rotation.y =
    //   (goalRot.y - state.context.startRotation.y) * progress;
    // meshRef.current.rotation.z =
    //   (goalRot.z - state.context.startRotation.z) * progress;
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
