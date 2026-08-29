import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Float, Image } from "@react-three/drei";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import useSound from "use-sound";
import navClick from "../../sounds/navBtnClick.mp3";

const CardProject = (props: { cardData: any }) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<any>(null);

  const navigate = useNavigate();

  const [click] = useSound(navClick, {
    volume: 0.03,
  });

  const handleSubmit = () => {
    navigate(`/projects/${props.cardData.id}`);
    click();
  };

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
            {/* Изображение */}
            <Image
              url={props.cardData?.imageUrl || "/placeholder.png"}
              position={[0, 1.2, 0.1]}
              scale={[3.2, 2.2]}
              transparent
              opacity={1}
              radius={0.1}
            />

            {/* Название проекта */}
            <Text
              position={[0, -0.5, 0.1]}
              fontSize={0.35}
              color="white"
              anchorX="center"
              anchorY="middle"
              fontWeight="bold"
            >
              {props.cardData?.title || "Название"}
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
                onClick={handleSubmit}
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
