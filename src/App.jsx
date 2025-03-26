
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Text3D, 
  Center, 
  Float, 
  Environment, 
  Sparkles 
} from '@react-three/drei';
import * as THREE from 'three';
import resumeData from './resumeData';

// Floating component for section title
function FloatingTitle({ text, position, onClick, isActive }) {
  const ref = useRef();
  
  useFrame((state) => {
    ref.current.material.opacity = THREE.MathUtils.lerp(
      ref.current.material.opacity,
      isActive ? 1 : 0.7,
      0.1
    );
  });
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Text3D
        ref={ref}
        font="/fonts/Orbitron_Regular.json"
        position={position}
        size={0.5}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        onClick={onClick}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'auto'}
      >
        {text}
        <meshStandardMaterial 
          color={isActive ? "#00ffff" : "#0088ff"} 
          emissive={isActive ? "#00ffff" : "#004488"}
          emissiveIntensity={isActive ? 2 : 1}
          transparent
          opacity={0.8}
        />
      </Text3D>
    </Float>
  );
}

// HoloProjector - base disc
function HoloProjector() {
  return (
    <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[3, 3, 0.1, 32]} />
      <meshStandardMaterial 
        color="#003366" 
        emissive="#004488"
        roughness={0.5}
        metalness={0.8}
      />
      <Sparkles count={50} scale={6} size={0.4} speed={0.2} opacity={0.5} color="#00ffff" />
    </mesh>
  );
}

// Hologram beam
function HoloBeam() {
  const ref = useRef();
  
  useFrame((state) => {
    ref.current.rotation.y += 0.003;
    ref.current.material.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
  });
  
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <cylinderGeometry args={[0.5, 2, 4, 32, 1, true]} />
      <meshBasicMaterial 
        color="#00ffff" 
        transparent 
        opacity={0.15} 
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Main Scene component
function Scene() {
  const [activeSection, setActiveSection] = useState(null);
  
  const sections = [
    { id: 'profile', title: 'Profile', position: [-3, 1, 0] },
    { id: 'education', title: 'Education', position: [-1, 1, 0] },
    { id: 'skills', title: 'Skills', position: [1, 1, 0] },
    { id: 'experience', title: 'Experience', position: [3, 1, 0] },
  ];
  
  useEffect(() => {
    // Hide all content panels initially
    document.querySelectorAll('.content-panel').forEach(panel => {
      panel.classList.remove('active');
    });
    
    // Show active panel if there is one
    if (activeSection) {
      const panel = document.getElementById(`${activeSection}-panel`);
      if (panel) panel.classList.add('active');
    }
  }, [activeSection]);
  
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#00ffff" />
      <spotLight position={[0, 8, 0]} intensity={0.5} angle={0.4} penumbra={0.5} color="#00ffff" />
      
      <HoloProjector />
      <HoloBeam />
      
      {/* Main Title */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <Center position={[0, 3, 0]}>
          <Text3D
            font="/fonts/Orbitron_Regular.json"
            size={0.8}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
          >
            Aadhitiya M
            <meshStandardMaterial 
              color="#00ffff" 
              emissive="#00ffff"
              emissiveIntensity={1.5}
            />
          </Text3D>
        </Center>
      </Float>
      
      {/* Section Titles */}
      {sections.map((section) => (
        <FloatingTitle 
          key={section.id}
          text={section.title}
          position={section.position}
          onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
          isActive={activeSection === section.id}
        />
      ))}
      
      {/* Environment reflections */}
      <Environment preset="night" />
    </>
  );
}

export default function App() {
  return (
    <>
      <div className="hologram-container">
        <Canvas camera={{ position: [0, 2, 8] }}>
          <Scene />
          <OrbitControls 
            enableZoom={true}
            enablePan={false}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2}
            minDistance={4}
            maxDistance={12}
          />
        </Canvas>
      </div>
      
      {/* Hologram effects */}
      <div className="hologram-glow"></div>
      <div className="scan-lines"></div>
      
      {/* UI Overlay */}
      <div className="ui-overlay">
        HOLOGRAPHIC INTERFACE v1.0
      </div>
      
      <div className="instructions">
        ROTATE: Click and drag | ZOOM: Scroll | SELECT: Click on sections
      </div>
      
      {/* Content panels */}
      <div id="profile-panel" className="content-panel">
        <h2 className="section-title">PROFILE</h2>
        <p>{resumeData.profile}</p>
      </div>
      
      <div id="education-panel" className="content-panel">
        <h2 className="section-title">EDUCATION</h2>
        {resumeData.education.map((edu, index) => (
          <div key={index} style={{ marginBottom: '15px' }}>
            <h3>{edu.degree}</h3>
            <p>{edu.institution} | {edu.year}</p>
            {edu.details && <p>{edu.details}</p>}
          </div>
        ))}
      </div>
      
      <div id="skills-panel" className="content-panel">
        <h2 className="section-title">SKILLS</h2>
        {Object.entries(resumeData.skills).map(([category, skills]) => (
          <div key={category} style={{ marginBottom: '15px' }}>
            <h3>{category}</h3>
            <p>{skills.join(', ')}</p>
          </div>
        ))}
      </div>
      
      <div id="experience-panel" className="content-panel">
        <h2 className="section-title">EXPERIENCE</h2>
        {resumeData.experience.map((exp, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <h3>{exp.position}</h3>
            <p>{exp.company} | {exp.duration}</p>
            <ul>
              {exp.responsibilities.map((resp, i) => (
                <li key={i}>{resp}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
