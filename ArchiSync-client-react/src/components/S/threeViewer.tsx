import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';

export default function ThreeViewer() {
  return (
    <div className="w-full h-64 bg-background">
      <Canvas>
        <ambientLight />
        <pointLight position={[5, 5, 5]} />
        <Sphere args={[1, 32, 32]}>
          <meshStandardMaterial color="#c79248" />
        </Sphere>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
