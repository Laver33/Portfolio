import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Float } from "@react-three/drei";
import { type iCardData } from "../Portfolio";
import { useRef, useState } from "react";

const CardProject = (props: { cardData: iCardData }) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<any>(null);

  return (
    <div className="w-full h-100">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, 5, 5]} intensity={0.3} />

        <Float
          speed={5.5}
          rotationIntensity={hovered ? 0.3 : 0.1}
          floatIntensity={hovered ? 0.5 : 0.2}
        >
          <group
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
          >
            {/* Карточка */}
            <mesh ref={meshRef} scale={hovered ? 1.03 : 1}>
              <planeGeometry args={[4.5, 6]} />
              <meshStandardMaterial
                color={"#1e293b"}
                roughness={0.3}
                metalness={0.1}
                emissive={hovered ? "#3b82f6" : "black"}
                emissiveIntensity={hovered ? 0.1 : 0}
              />
            </mesh>

            {/* Эффект */}
            {hovered && (
              <mesh position={[0, 0, 0.02]}>
                <planeGeometry args={[4.5, 6]} />
                <meshStandardMaterial
                  color="#3b82f6"
                  transparent
                  opacity={0.3}
                  emissive="#3b82f6"
                  emissiveIntensity={0.5}
                />
              </mesh>
            )}

            {/* Название проекта */}
            <Text
              position={[0, 1.6, 0.1]}
              fontSize={0.55}
              color="white"
              anchorX="center"
              anchorY="middle"
              fontWeight="bold"
            >
              {props.cardData?.title || "Название"}
            </Text>

            {/* Описание */}
            <Text
              position={[0, 0.6, 0.1]}
              fontSize={0.28}
              color="#94a3b8"
              anchorX="center"
              anchorY="middle"
              maxWidth={3.8}
              textAlign="center"
            >
              {props.cardData?.description || "Описание проекта"}
            </Text>

            {/* Кнопка  */}
            <group position={[0, -2, 0.1]}>
              {/* Фон */}
              <mesh>
                <planeGeometry args={[2.8, 0.6]} />
                <meshStandardMaterial
                  color={hovered ? "#3b82f6" : "#ffffff"}
                  transparent
                  opacity={hovered ? 1 : 0.1}
                  roughness={0.2}
                  metalness={0.1}
                />
              </mesh>

              {/* Текст кнопки */}
              <Text
                position={[0, 0, 0.01]}
                fontSize={0.22}
                color={hovered ? "white" : "#94a3b8"}
                anchorX="center"
                anchorY="middle"
                onClick={props.cardData.click}
                fontWeight={hovered ? "bold" : "normal"}
              >
                {hovered ? "Перейти →" : "Подробнее"}
              </Text>
            </group>
          </group>
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
};

export default CardProject;
