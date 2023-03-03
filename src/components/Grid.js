
const XZplane = ({ size }) => (
    <mesh
        rotation={[1.5*Math.PI, 0, 0]}
        position={[0, 0, 0]}
    >
        <planeBufferGeometry 
            attach="geometry" 
            args={[size, size, size, size]}
        />
        <meshStandardMaterial attach="material" color="blue" wireframe />
    </mesh>
);

const XYplane = ({ size }) => (
    <mesh
        rotation={[0, 0, 0]}
        position={[0, 0, 0]}
    >
        <planeBufferGeometry 
            attach="geometry" 
            args={[size, size, size, size]}
        />
        <meshStandardMaterial attach="material" color="red" wireframe />
    </mesh>
);

const ZYplane = ({ size }) => (
    <mesh
        rotation={[0, Math.PI/2, 0]}
        position={[0, 0, 0]}
    >
        <planeBufferGeometry 
            attach="geometry" 
            args={[size, size, size, size]}
        />
        <meshStandardMaterial attach="material" color="green" wireframe />
    </mesh>
);


export default function Grid({ size }) {
    return (
        <group>
            <XYplane size={size} />
            <XZplane size={size} />
            <ZYplane size={size} />
        </group>
    );
}

