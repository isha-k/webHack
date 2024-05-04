import { useRef, useEffect, useState, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import Loader from "../components/Loader"
import Island from "../models/Island"
import Sky from "../models/Sky"
import { Effects, OrbitControls } from "@react-three/drei"
import { Bloom, EffectComposer } from "@react-three/postprocessing"


const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const controlsRef = useRef(null);

  const adjustIslandForScreenSize = () => {
    let screenScale = null
    let screenPosition = [15, -7, -25];
    let rotation = [0.4, 0.5, 0];

    if(window.innerWidth < 768) {
      screenScale = [9, 9, 9];
    } else {
      screenScale = [8, 8, 8];
    }
    return [screenScale, screenPosition, rotation]
  }

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();

  useEffect(() => {
    if (controlsRef.current) {
      // Set the max and min distance from the center
      controlsRef.current.maxDistance = 0.5; // maximum distance from the center
      controlsRef.current.minDistance = 0.5; // minimum distance from the center
    }
  }, []);

  return (
    <section className="w-full h-screen relative">
        <Canvas
        className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}>
              <Suspense fallback={<Loader />}>

                <ambientLight intensity={0.4} color="#FF3DF3" />
                <directionalLight position={[5,5,5]} intensity={5}/>
                <directionalLight position={[1, 1, 1]} intensity={2} color="#3DBEFF" />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
                <pointLight position={[-10, -10, -10]} intensity={0.75} color="#FF3DF3" />
                <fogExp2 attach="fog" args={["#3DBEFF", 0.015]} />            

                <Island 
                position = {islandPosition}
                scale = {islandScale}
                rotation = {islandRotation}
                isRotating = {isRotating}
                setIsRotating = {setIsRotating}
                />
                
                <OrbitControls ref={controlsRef} target={[0, 0, 0]} enablePan={true} enableZoom={false} enableRotate={true} />
            </Suspense>
        </Canvas>
    </section>
  )
}
export default Home