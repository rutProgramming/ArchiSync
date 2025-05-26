import "./home-styles.css"
import HeroSection from "./HeroSection"
import FeaturesSection from "./FeaturesSection"
import ShowcaseSection from "./ShowcaseSection"
import TestimonialsSection from "./TestimonialsSection"
import CTASection from "./CTASection "
import "../../App.css"


const HomePage = () => {
  return (<>
    <div className="home-page">
      <HeroSection />
      <FeaturesSection />
      <ShowcaseSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  </>)
}

export default HomePage
// function Model() {
//   const { scene } = useGLTF("/models/modern_house.glb"); // ודא שהקובץ קיים ב-public/models
//   return <primitive object={scene} scale={0.5} />;
// }

// export default function HomePage() {
//   return (
//     <div style={{ height: "100vh", backgroundColor: "#111", color: "#FFD700" }}>
//       <h1 style={{ textAlign: "center", paddingTop: "2rem" }}>Welcome to ArchAI</h1>
//       <div style={{ height: "80vh" }}>
//         <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
//           <ambientLight intensity={0.5} />
//           <Environment preset="city" />
//           <Stage environment="city" intensity={0.6}>
//             <Model />
//           </Stage>
//           <OrbitControls />
//         </Canvas>
//       </div>
//     </div>
//   );
// }