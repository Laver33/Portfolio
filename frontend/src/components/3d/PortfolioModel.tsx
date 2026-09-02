import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";
import { Suspense, useEffect } from "react";
import { useTheme } from "../../hooks/useTheme";

const PortfolioModel = () => {
  const modelCar = "/models/car/porsche.glb";
  const { isThemeOn } = useTheme();

  useEffect(() => {}, [isThemeOn]);

  const theme: boolean = isThemeOn;
  const { scene } = useGLTF(modelCar);
  useGLTF("/models/car/porsche.glb");

  return (
    <div className="w-full h-65">
      <Canvas
        key={theme ? "dark" : "light"}
        className="w-full h-full"
        camera={{
          position: [2, 1.2, 4],
          fov: 60,
        }}
        dpr={[1, 2]}
      >
        {/* Белый фон */}
        <color attach="background" args={[theme ? "#000000" : "#ffffff"]} />

        {/* Свет */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-3, 2, -3]} intensity={0.4} />

        {/* Модель */}
        <Suspense fallback={null}>
          <Center position={[0, 0.8, 0]}>
            <primitive
              object={scene}
              scale={1.5}
              rotation={[0, -Math.PI / 2.5, 0]}
            />
          </Center>
        </Suspense>

        {/* Управление - только влево-вправо */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.5}
          minAzimuthAngle={-Math.PI / 11}
          maxAzimuthAngle={Math.PI / 5}
          target={[0, 0, 0]}
          dampingFactor={0.1}
          enableDamping={true}
        />
      </Canvas>
    </div>
  );
};

export default PortfolioModel;
