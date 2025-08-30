import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, MeshDistortMaterial, Sphere, OrbitControls, Stars } from '@react-three/drei';

const AnimatedBackground = () => {
  const meshRef = useRef();
  const particlesRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <>
      <Stars ref={particlesRef} radius={100} depth={50} count={5000} factor={4} />
      <Float speed={1} rotationIntensity={1} floatIntensity={2}>
        <Sphere ref={meshRef} args={[1, 64, 64]} position={[2, 0, -5]}>
          <MeshDistortMaterial
            color="#4338ca"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.4}
          />
        </Sphere>
      </Float>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[0.5, 32, 32]} position={[-3, 2, -8]}>
          <MeshDistortMaterial
            color="#7c3aed"
            attach="material"
            distort={0.4}
            speed={3}
            roughness={0.2}
          />
        </Sphere>
      </Float>
    </>
  );
};

const Hero3DText = ({ text, position, size = 1 }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Text
        ref={meshRef}
        position={position}
        fontSize={size}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwJYtWqZPAA.woff"
      >
        {text}
      </Text>
    </Float>
  );
};

const SkillOrb = ({ position, color, label, description, onClick }) => {
  const meshRef = useRef();
  const glowRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.scale.setScalar(hovered ? 1.3 : 1);
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(hovered ? 2 : 1.5);
      glowRef.current.material.opacity = hovered ? 0.3 : 0.1;
    }
  });

  return (
    <Float speed={1 + Math.random()} rotationIntensity={0.7} floatIntensity={0.8}>
      <group position={position}>
        {/* Glow effect */}
        <Sphere
          ref={glowRef}
          args={[0.8, 32, 32]}
        >
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.1}
          />
        </Sphere>
        
        {/* Main orb */}
        <Sphere
          ref={meshRef}
          args={[0.6, 64, 64]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={onClick}
        >
          <MeshDistortMaterial
            color={color}
            attach="material"
            distort={0.3}
            speed={3}
            roughness={0.1}
            metalness={0.9}
            emissive={color}
            emissiveIntensity={hovered ? 0.3 : 0.1}
          />
        </Sphere>
        
        {/* Label */}
        <Text
          position={[0, -1.2, 0]}
          fontSize={0.25}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/orbitron/v9/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nyGy6BoWgz.woff"
        >
          {label}
        </Text>
        
        {hovered && (
          <Text
            position={[0, -1.6, 0]}
            fontSize={0.15}
            color="#c4b5fd"
            anchorX="center"
            anchorY="middle"
            maxWidth={3}
          >
            {description}
          </Text>
        )}
      </group>
    </Float>
  );
};

const Portfolio = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showParticles, setShowParticles] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (sectionId) => {
    setCurrentSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const researchProjects = [
    {
      title: "Graspable Memories: AI-Powered Projected Reality",
      type: "HCI Research",
      description: "Submitted to TEI 2026. Developed a projected reality system using AI hand tracking to enable seamless on-hand interaction with images, leveraging natural occlusion as a core interaction mechanism rather than avoiding it.",
      tech: ["Computer Vision", "AI Hand Tracking", "Projected Reality", "HCI"],
      status: "Under Review",
      collaboration: "Dr. de Siqueira",
      links: { paper: "#", demo: "#" }
    },
    {
      title: "Flood Risk Digital Twins in VR/AR",
      type: "AI & Simulation",
      description: "Working with Karla Saldana Ochoa to create flood risk simulations using AI and digital twins in virtual/augmented reality environments for climate resilience planning.",
      tech: ["AI", "Digital Twins", "VR/AR", "Climate Modeling", "Unity"],
      status: "In Progress",
      collaboration: "Karla Saldana Ochoa",
      links: { github: "#", demo: "#" }
    },
    {
      title: "VR Blender with Quad-Dominant Mesh Optimization",
      type: "Graphics Research", 
      description: "Building a VR recreation of Blender utilizing optimized polyhedral net splines (PNS) algorithm for quad-dominant mesh smoothing, enabling intuitive 3D modeling interaction in virtual reality.",
      tech: ["VR", "Computer Graphics", "PNS Algorithm", "3D Modeling", "Unity"],
      status: "In Progress",
      collaboration: "Building on Dr. Peters' work",
      links: { github: "#", demo: "#" }
    },
    {
      title: "Conversational AI Agents in VR",
      type: "AI & VR",
      description: "Developed VR conversational AI with speech-to-text using Whisper, LLM integration with Gemini, ElevenLabs TTS, and real-time lip-sync using NeuroSync with LiveLink in Unreal Engine.",
      tech: ["VR", "Whisper", "Gemini API", "ElevenLabs", "NeuroSync", "Unreal Engine"],
      status: "Completed",
      links: { github: "#", demo: "#" }
    },
    {
      title: "EASAL CUDA Parallelization",
      type: "HPC Research",
      description: "Developed CUDA and OpenCL parallelization strategies for molecular assembly landscape analysis, achieving 4x performance improvements in vertex localizations and matrix transformations.",
      tech: ["CUDA", "OpenCL", "C++", "Parallel Computing", "Computational Geometry"],
      status: "Ongoing",
      collaboration: "EASAL Lab",
      links: { github: "#", paper: "#" }
    },
    {
      title: "Tangible Memory & Authorship Interfaces",
      type: "HCI Research",
      description: "Investigating how physical traces can become computational interfaces, exploring tangible interaction design for memory and authorship with Dr. de Siqueira.",
      tech: ["Tangible Interfaces", "HCI", "Physical Computing", "Interface Design"],
      status: "In Progress",
      collaboration: "Dr. de Siqueira",
      links: { paper: "#" }
    }
  ];

  const personalProjects = [
    {
      title: "Stock Price Prediction with Twitter Sentiment",
      type: "Data Science",
      description: "Built machine learning models combining Twitter sentiment analysis with historical stock data, featuring interactive Streamlit visualizations for investment insights.",
      tech: ["Python", "NLP", "Machine Learning", "Streamlit", "Twitter API"],
      links: { github: "#", demo: "#", live: "#" }
    },
    {
      title: "Echo Journal: AI-Powered Journaling",
      type: "Mobile App",
      description: "iOS app using CoreML and custom NLP models to analyze emotions from journal entries, providing personalized recommendations and mood tracking.",
      tech: ["Swift", "CoreML", "NLP", "iOS", "Core Data"],
      links: { github: "#", appstore: "#" }
    },
    {
      title: "Everglades VR Experience",
      type: "VR/Unity",
      description: "Immersive VR adventure exploring the Everglades with realistic flora/fauna animations, designed to enhance conservation awareness through interactive education.",
      tech: ["Unity", "C#", "VR", "3D Modeling", "Environmental Design"],
      links: { github: "#", demo: "#" }
    }
  ];

  const skillAreas = [
    { 
      name: "AI/ML", 
      color: "#ff6b6b", 
      position: [0, 2, 0],
      description: "Deep Learning, NLP, Computer Vision, TensorFlow"
    },
    { 
      name: "CUDA/HPC", 
      color: "#76b900", 
      position: [2.5, 1, 0],
      description: "Parallel Computing, GPU Optimization, OpenCL"
    },
    { 
      name: "VR/AR", 
      color: "#4ecdc4", 
      position: [2.5, -1, 0],
      description: "Unity XR, Unreal Engine, Spatial Computing"
    },
    { 
      name: "Research", 
      color: "#45b7d1", 
      position: [0, -2, 0],
      description: "HCI, Computer Graphics, Scientific Computing"
    },
    { 
      name: "Mobile Dev", 
      color: "#fa7343", 
      position: [-2.5, -1, 0],
      description: "Swift, iOS, CoreML, Cross-platform"
    },
    { 
      name: "Systems", 
      color: "#a78bfa", 
      position: [-2.5, 1, 0],
      description: "C++, Python, Distributed Systems, Performance"
    }
  ];

  const workExperience = [
    {
      title: "Teaching Assistant - Intro to Virtual Reality",
      company: "University of Florida",
      period: "Aug 2025 - Present",
      location: "Gainesville, FL",
      description: "Supporting instruction for undergraduate Virtual Reality course, facilitating hands-on learning with Unity XR development and spatial computing concepts.",
      achievements: [
        "Assist students with VR development projects using Unity and XR Toolkit",
        "Grade assignments and provide detailed feedback on 3D programming concepts",
        "Hold office hours to help students debug VR applications and spatial interaction code",
        "Support lab sessions covering VR hardware setup, tracking systems, and user experience design"
      ],
      tech: ["Unity XR", "C#", "VR Development", "Spatial Computing", "Teaching"]
    },
    {
      title: "Research Assistant",
      company: "University of Florida - HCI Lab",
      period: "May 2025 - Present",
      location: "Gainesville, FL",
      description: "Leading multiple research projects in projected reality interfaces and AI-powered systems. Developing novel interaction techniques for hand-based computing with natural occlusion handling.",
      achievements: [
        "Submitted paper to TEI 2026 on Graspable Memories projected reality system",
        "Developed AI hand tracking algorithms for seamless on-hand interaction",
        "Collaborated with Dr. de Siqueira on tangible interface research",
        "Implemented VR conversational AI with real-time lip-sync technology"
      ],
      tech: ["Computer Vision", "AI Hand Tracking", "Unity", "Unreal Engine", "Python", "C#"]
    },
    {
    title: "Research Assistant",
    company: "University of Florida - EASAL Lab",
    period: "Mar 2025 - Present", 
    location: "Gainesville, FL",
    description: "Conducted research to identify computational bottlenecks in EASAL software for analyzing molecular assembly landscapes. Built and implemented CUDA-based parallelization strategies for molecular computations.",
    achievements: [
      "Achieved over 4x speedups in vertex localizations and matrix transformations for larger molecular assemblies",
      "Implemented CUDA parallelization strategies for edge length calculations and computational geometry",
      "Collaborated with interdisciplinary team to extend algorithms to multi-body systems",
      "Ensured mathematical consistency between optimizations and theoretical advancements in active constraint graphs"
    ],
    tech: ["CUDA", "OpenCL", "C++", "Parallel Computing", "Computational Geometry", "Mathematical Modeling"]
  },
  {
    title: "Real Estate Web Developer Intern",
    company: "Aquarelle Realty",
    period: "Feb 2023 - Jan 2025",
    location: "Orlando, FL",
    description: "Developed and maintained full-stack web functionalities for real estate platform. Integrated various API features and optimized user experience for real estate agents and clients.",
    achievements: [
      "Built front-end and back-end functionalities using CSS, JavaScript, PHP, and MySQL",
      "Integrated self-updating property listings, mortgage calculators, and geolocation services",
      "Engineered user-friendly features specifically designed for real estate agent workflows",
      "Optimized website visibility and search rankings through SEO implementation techniques"
    ],
    tech: ["JavaScript", "PHP", "MySQL", "CSS", "API Integration", "SEO"]
  }
  ];

  const clubsAndOrganizations = [
  { name: "Tau Sigma National Honor Society", role: "Executive Board - Webmaster", description: "Leading digital presence and web development initiatives for the national honor society chapter." },
  { name: "Hispanic-Latino Cultural Club", role: "Member", description: "Promoting cultural awareness and community engagement within the university." },
  { name: "FinTech Club", role: "Member", description: "Exploring financial technology innovations and industry trends." },
  { name: "Computer Science Club", role: "Member", description: "Participating in programming competitions and technical discussions." },
  { name: "UF Society of Information Technology (UFSIT)", role: "Member", description: "Engaging with IT professionals and learning about emerging technologies." },
  { name: "UF Association for Computing Machinery (ACM)", role: "Member", description: "Contributing to computing research discussions and networking events." }
];

const certifications = [
  { title: "Microsoft Office Specialist", areas: ["Excel", "Word", "PowerPoint"], issuer: "Microsoft", icon: "📊" },
  { title: "Microsoft Technology Associate", areas: ["Programming using JavaScript"], issuer: "Microsoft", icon: "💻" },
  { title: "Adobe Certified Professional", areas: ["Photoshop CC"], issuer: "Adobe", icon: "🎨" }
];

  const styles = {
    container: {
      fontFamily: "'Inter', 'system-ui', -apple-system, sans-serif",
      margin: 0,
      padding: 0,
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)',
      color: 'white',
      overflowX: 'hidden',
      position: 'relative'
    },
    cursor: {
      position: 'fixed',
      width: '20px',
      height: '20px',
      background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)',
      borderRadius: '50%',
      pointerEvents: 'none',
      zIndex: 9999,
      mixBlendMode: 'screen',
      transition: 'transform 0.1s ease-out',
      left: `${(mousePosition.x + 1) * 50}%`,
      top: `${(-mousePosition.y + 1) * 50}%`,
      transform: 'translate(-50%, -50%)',
      boxShadow: '0 0 20px #a855f7'
    },
    nav: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 40,
      background: 'rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '1rem 0'
    },
    navContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #a78bfa, #f472b6, #06b6d4)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
      fontFamily: "'Orbitron', monospace"
    },
    navLinks: {
      display: 'flex',
      gap: '2rem',
      listStyle: 'none',
      margin: 0,
      padding: 0
    },
    navButton: {
      background: 'none',
      border: 'none',
      color: 'rgba(255, 255, 255, 0.8)',
      cursor: 'pointer',
      textTransform: 'capitalize',
      transition: 'all 0.3s ease',
      fontSize: '1rem',
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      position: 'relative'
    },
    controlButtons: {
      display: 'flex',
      gap: '1rem'
    },
    controlButton: {
      background: 'rgba(124, 58, 237, 0.2)',
      color: 'white',
      border: '1px solid rgba(124, 58, 237, 0.3)',
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '0.9rem',
      backdropFilter: 'blur(10px)'
    },
    hero: {
      position: 'relative',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    canvasContainer: {
      position: 'absolute',
      inset: 0
    },
    heroContent: {
      position: 'relative',
      zIndex: 10,
      textAlign: 'center',
      maxWidth: '900px',
      margin: '0 auto',
      padding: '0 2rem'
    },
    heroText: {
      fontSize: '1.3rem',
      color: '#c4b5fd',
      maxWidth: '700px',
      margin: '0 auto 2rem auto',
      lineHeight: 1.7,
      fontWeight: '300'
    },
    socialLinks: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '1rem',
      marginBottom: '2rem'
    },
    socialLink: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      padding: '0.75rem 1.5rem',
      borderRadius: '25px',
      color: 'white',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.95rem'
    },
    exploreButton: {
      background: 'linear-gradient(45deg, #7c3aed, #ec4899, #06b6d4)',
      backgroundSize: '200% 200%',
      animation: 'gradientShift 3s ease infinite',
      color: 'white',
      border: 'none',
      padding: '1.2rem 2.5rem',
      borderRadius: '30px',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 15px 35px rgba(124, 58, 237, 0.4)',
      position: 'relative',
      overflow: 'hidden'
    },
    section: {
      padding: '6rem 2rem',
      position: 'relative'
    },
    sectionTitle: {
      fontSize: '3.5rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '3rem',
      background: 'linear-gradient(45deg, #a78bfa, #f472b6, #06b6d4)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
      fontFamily: "'Orbitron', monospace"
    },
    aboutGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '4rem',
      alignItems: 'center',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    aboutText: {
      fontSize: '1.15rem',
      color: '#e2e8f0',
      lineHeight: 1.8,
      marginBottom: '1.5rem',
      fontWeight: '300'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1.5rem',
      marginTop: '2rem'
    },
    statCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '2rem',
      borderRadius: '20px',
      textAlign: 'center',
      transition: 'all 0.3s ease'
    },
    statValue: {
      fontSize: '2rem',
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #a78bfa, #f472b6)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent'
    },
    statLabel: {
      fontSize: '0.9rem',
      color: '#9ca3af',
      marginTop: '0.5rem'
    },
    profileContainer: {
      position: 'relative',
      textAlign: 'center'
    },
    profileImage: {
      width: '320px',
      height: '320px',
      margin: '0 auto',
      background: 'linear-gradient(45deg, #7c3aed, #ec4899, #06b6d4)',
      borderRadius: '50%',
      padding: '6px',
      position: 'relative',
      boxShadow: '0 20px 40px rgba(124, 58, 237, 0.3)'
    },
    profileImageInner: {
      width: '100%',
      height: '100%',
      background: '#0a0a0a',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '5rem'
    },
    skillsContainer: {
      height: '0px',
      position: 'relative',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    projectsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '2.5rem',
      maxWidth: '1400px',
      margin: '0 auto'
    },
    projectCard: {
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '24px',
      overflow: 'hidden',
      transition: 'all 0.4s ease',
      position: 'relative'
    },
    projectHeader: {
      height: '220px',
      background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
      position: 'relative',
      display: 'flex',
      alignItems: 'flex-end',
      padding: '2rem'
    },
    projectType: {
      position: 'absolute',
      top: '1.5rem',
      right: '1.5rem',
      background: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      fontSize: '0.85rem',
      fontWeight: '600'
    },
    projectStatus: {
      position: 'absolute',
      top: '1.5rem',
      left: '1.5rem',
      background: 'rgba(34, 197, 94, 0.2)',
      border: '1px solid rgba(34, 197, 94, 0.3)',
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: '500',
      color: '#86efac'
    },
    projectTitle: {
      fontSize: '1.4rem',
      fontWeight: 'bold',
      color: 'white',
      margin: 0,
      lineHeight: 1.3
    },
    projectContent: {
      padding: '2rem'
    },
    projectDescription: {
      color: '#e2e8f0',
      marginBottom: '1.5rem',
      lineHeight: 1.7,
      fontSize: '1rem'
    },
    collaboration: {
      color: '#a78bfa',
      fontSize: '0.9rem',
      marginBottom: '1.5rem',
      fontStyle: 'italic'
    },
    techTags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.75rem',
      marginBottom: '2rem'
    },
    techTag: {
      background: 'rgba(124, 58, 237, 0.2)',
      border: '1px solid rgba(124, 58, 237, 0.3)',
      padding: '0.6rem 1.2rem',
      borderRadius: '20px',
      fontSize: '0.85rem',
      color: '#c4b5fd',
      fontWeight: '500'
    },
    projectLinks: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap'
    },
    projectLink: {
      background: 'linear-gradient(45deg, #7c3aed, #ec4899)',
      color: 'white',
      textDecoration: 'none',
      padding: '0.8rem 1.8rem',
      borderRadius: '12px',
      fontSize: '0.9rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      border: 'none'
    },
    experienceGrid: {
      display: 'grid',
      gap: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    experienceCard: {
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '24px',
      padding: '2.5rem',
      transition: 'all 0.3s ease'
    },
    experienceHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '2rem',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    jobTitle: {
      fontSize: '1.6rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '0.5rem'
    },
    company: {
      color: '#a78bfa',
      fontSize: '1.2rem',
      fontWeight: '600',
      marginBottom: '0.5rem'
    },
    location: {
      color: '#9ca3af',
      fontSize: '1rem'
    },
    jobDescription: {
      color: '#e2e8f0',
      marginBottom: '1.5rem',
      lineHeight: 1.7,
      fontSize: '1rem'
    },
    achievements: {
      marginBottom: '2rem'
    },
    achievementItem: {
      color: '#c4b5fd',
      marginBottom: '0.5rem',
      paddingLeft: '1rem',
      position: 'relative'
    },
    educationGrid: {
      display: 'grid',
      gap: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    educationCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '24px',
      padding: '2.5rem',
      transition: 'all 0.3s ease'
    },
    degreeTitle: {
      fontSize: '1.6rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '0.5rem'
    },
    institution: {
      color: '#a78bfa',
      fontSize: '1.2rem',
      fontWeight: '600',
      marginBottom: '0.5rem'
    },
    educationDetails: {
      color: '#9ca3af',
      fontSize: '1rem'
    },
    periodBadge: {
      background: 'linear-gradient(45deg, #7c3aed, #ec4899)',
      padding: '0.75rem 1.5rem',
      borderRadius: '25px',
      fontSize: '0.9rem',
      fontWeight: '600'
    },
    courseworkTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      color: 'white',
      marginBottom: '1.5rem'
    },
    courseworkGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '0.75rem'
    },
    courseItem: {
      background: 'rgba(124, 58, 237, 0.1)',
      border: '1px solid rgba(124, 58, 237, 0.2)',
      padding: '1rem',
      borderRadius: '12px',
      fontSize: '0.9rem',
      color: '#c4b5fd',
      transition: 'all 0.3s ease'
    },
    contactGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '2rem',
      maxWidth: '900px',
      margin: '2rem auto 0 auto'
    },
    contactCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '2.5rem',
      borderRadius: '24px',
      textAlign: 'center',
      textDecoration: 'none',
      color: 'white',
      transition: 'all 0.3s ease'
    },
    contactIcon: {
      fontSize: '3rem',
      marginBottom: '1rem',
      display: 'block'
    },
    contactTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem'
    },
    contactValue: {
      color: '#c4b5fd'
    },
    loading: {
      position: 'fixed',
      inset: 0,
      background: 'linear-gradient(135deg, #0a0a0a, #1a1a2e, #533483)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      zIndex: 9999
    },
    spinner: {
      width: '80px',
      height: '80px',
      border: '4px solid rgba(124, 58, 237, 0.3)',
      borderTop: '4px solid #7c3aed',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '1rem'
    },
    loadingText: {
      color: 'white',
      fontSize: '1.25rem',
      fontWeight: '300'
    },
    skillCategory: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '24px',
      padding: '2.5rem',
      transition: 'all 0.4s ease',
      cursor: 'pointer'
    },
    skillCategoryTitle: {
      fontSize: '1.3rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '0.5rem'
    },
    skillTags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.75rem',
      justifyContent: 'center'
    },
    skillTag: {
      background: 'rgba(124, 58, 237, 0.2)',
      border: '1px solid rgba(124, 58, 237, 0.3)',
      padding: '0.7rem 1.4rem',
      borderRadius: '25px',
      fontSize: '0.9rem',
      color: '#c4b5fd',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      animation: 'fadeInUp 0.6s ease forwards',
      opacity: 0,
      transform: 'translateY(20px)'
    }
  };

  if (isLoading) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Initializing Portfolio...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.cursor} />

      <nav style={styles.nav}>
        <div style={styles.navContainer}>
          <div style={styles.logo}>Reggie Segovia</div>
          <div style={styles.navLinks}>
            {['home', 'about', 'research-interests', 'skills', 'research', 'projects', 'experience', 'education', 'clubs', 'certifications', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                style={{
                  ...styles.navButton,
                  background: currentSection === item ? 'rgba(167, 139, 250, 0.2)' : 'transparent',
                  color: currentSection === item ? '#a78bfa' : 'rgba(255, 255, 255, 0.8)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(167, 139, 250, 0.2)';
                  e.target.style.color = '#a78bfa';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = currentSection === item ? 'rgba(167, 139, 250, 0.2)' : 'transparent';
                  e.target.style.color = currentSection === item ? '#a78bfa' : 'rgba(255, 255, 255, 0.8)';
                }}
              >
                {item.replace('-', ' ')}
              </button>
            ))}
          </div>
          <div style={styles.controlButtons}>
            <button
              onClick={() => setShowParticles(!showParticles)}
              style={{
                ...styles.controlButton,
                background: showParticles ? 'rgba(124, 58, 237, 0.3)' : 'rgba(55, 65, 81, 0.3)'
              }}
            >
              {showParticles ? '🌟 3D' : '✨ 3D'}
            </button>
          </div>
        </div>
      </nav>

      <section id="home" style={styles.hero}>
        <div style={styles.canvasContainer}>
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1.2} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ec4899" />
            <Suspense fallback={null}>
              {showParticles && <AnimatedBackground />}
              <Hero3DText text="Reggie Segovia" position={[0, 1, 0]} size={2.2} />
              <Hero3DText text="HCI Researcher & Computational Scientist" position={[0, 0, 0]} size={0.9} />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>
        
        <div style={styles.heroContent}>
          <p style={styles.heroText}>
            PhD-bound researcher specializing in Human-Computer Interaction, AI-powered systems, and high-performance computing. 
            Currently pursuing groundbreaking research in projected reality interfaces, VR experiences, and CUDA optimization 
            while preparing for graduate studies in top-tier Computer Science programs.
          </p>
          
          <div style={styles.socialLinks}>
            {[
              { icon: "📧", label: "Email", href: "mailto:rdavidsegovia@gmail.com" },
              { icon: "🎓", label: "Scholar", href: "#" },
              { icon: "💼", label: "LinkedIn", href: "#" },
              { icon: "🐙", label: "GitHub", href: "https://github.com/rs-dkd" },
              { icon: "📄", label: "CV", href: "#" }
            ].map((link, index) => (
              <a
                key={index}
                href={link.href}
                style={styles.socialLink}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.transform = 'scale(1.05) translateY(-2px)';
                  e.target.style.boxShadow = '0 10px 25px rgba(124, 58, 237, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.target.style.transform = 'scale(1) translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <span>{link.icon}</span>
                {link.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => scrollToSection('research-interests')}
            style={styles.exploreButton}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05) translateY(-2px)';
              e.target.style.boxShadow = '0 20px 40px rgba(124, 58, 237, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1) translateY(0)';
              e.target.style.boxShadow = '0 15px 35px rgba(124, 58, 237, 0.4)';
            }}
          >
            Explore Research & Projects ↓
          </button>
        </div>
      </section>

      <section id="about" style={styles.section}>
        <div>
          <h2 style={styles.sectionTitle}>About Me</h2>
          
          <div style={styles.aboutGrid}>
            <div>
              <p style={styles.aboutText}>
                I'm a Computer Science student at the University of Florida with a passion for pushing the boundaries of 
                human-computer interaction and computational efficiency. My research spans from AI-powered projected reality 
                systems to high-performance CUDA optimization, with publications submitted to top-tier venues like TEI 2026.
              </p>
              <p style={styles.aboutText}>
                Currently working on multiple cutting-edge projects including Graspable Memories (a revolutionary projected 
                reality interface), flood risk digital twins in VR/AR, and conversational AI agents in virtual environments. 
                I'm preparing for PhD applications with a focus on HCI programs at top research universities.
              </p>
              <p style={styles.aboutText}>
                My technical expertise combines deep learning, computer graphics, parallel computing, and spatial interaction 
                design. I believe in creating technology that not only performs efficiently but also enhances human creativity 
                and understanding.
              </p>
              
              <div style={styles.statsGrid}>
                {[
                  { label: "Overall GPA", value: "3.81" },
                  { label: "Research Projects", value: "6+" },
                  { label: "Publications", value: "1 Submitted" },
                  { label: "Performance Gains", value: "4x CUDA" }
                ].map((stat, index) => (
                  <div 
                    key={index} 
                    style={styles.statCard}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.transform = 'translateY(-5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={styles.statValue}>{stat.value}</div>
                    <div style={styles.statLabel}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div style={styles.profileContainer}>
              <div style={styles.profileImage}>
                <div style={styles.profileImageInner}>
                  <span>🧠</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="research-interests" style={styles.section}>
        <div>
          <h2 style={styles.sectionTitle}>Research Interests</h2>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '3rem',
            textAlign: 'center',
            maxWidth: '1200px',
            margin: '0 auto',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, rgba(124, 58, 237, 0.1), rgba(236, 72, 153, 0.1), rgba(6, 182, 212, 0.1))',
              animation: 'gradientShift 6s ease-in-out infinite',
              zIndex: 0
            }} />
            
            <div style={{position: 'relative', zIndex: 1}}>
              <p style={{
                fontSize: '1.2rem',
                color: '#e2e8f0',
                maxWidth: '800px',
                margin: '0 auto 3rem auto',
                lineHeight: 1.7,
                fontWeight: '300'
              }}>
                My research focuses on creating intuitive and efficient interfaces that bridge the gap between 
                human creativity and computational power. I'm particularly interested in how emerging technologies 
                can enhance human capabilities while remaining accessible and natural to use.
              </p>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem',
                marginTop: '2rem'
              }}>
                {[
                  { 
                    icon: "🤝", 
                    title: "Human-Computer Interaction", 
                    desc: "Projected Reality, Tangible Interfaces, Natural User Interfaces" 
                  },
                  { 
                    icon: "🧠", 
                    title: "AI-Augmented Systems", 
                    desc: "LLMs in Creative Contexts, Conversational AI, Intelligent Interfaces" 
                  },
                  { 
                    icon: "🎮", 
                    title: "Immersive Technologies", 
                    desc: "VR/AR for Scientific Visualization, Spatial Computing, Mixed Reality" 
                  },
                  { 
                    icon: "⚡", 
                    title: "High-Performance Computing", 
                    desc: "GPU Optimization, Parallel Algorithms, Computational Efficiency" 
                  }
                ].map((interest, index) => (
                  <div
                    key={index}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '15px',
                      padding: '2rem',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      border: '2px solid transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                      e.currentTarget.style.background = 'rgba(124, 58, 237, 0.1)';
                      e.currentTarget.style.borderColor = '#7c3aed';
                      e.currentTarget.style.boxShadow = '0 15px 35px rgba(124, 58, 237, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.borderColor = 'transparent';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{fontSize: '2.5rem', marginBottom: '1rem'}}>{interest.icon}</div>
                    <h4 style={{fontSize: '1.2rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem'}}>
                      {interest.title}
                    </h4>
                    <p style={{color: '#9ca3af', fontSize: '0.95rem', lineHeight: 1.6}}>{interest.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" style={styles.section}>
        <div>
          <h2 style={{...styles.sectionTitle, marginBottom: '0 auto'}}>Technical Skills</h2>
          <div style={styles.skillsContainer}>
            <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ec4899" />
              <Suspense fallback={null}>
                {skillAreas.map((skill, index) => (
                  <SkillOrb
                    key={index}
                    position={skill.position}
                    color={skill.color}
                    label={skill.name}
                    description={skill.description}
                    onClick={() => console.log(`Clicked ${skill.name}`)}
                  />
                ))}
              </Suspense>
              <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
          </div>
          
          <div style={{maxWidth: '1200px', margin: '0 auto'}}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              <div 
                style={styles.skillCategory}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(124, 58, 237, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = 'rgba(124, 58, 237, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                  <div style={{fontSize: '3.5rem', marginBottom: '1rem'}}>🚀</div>
                  <h3 style={styles.skillCategoryTitle}>High-Performance Computing</h3>
                </div>
                <div style={styles.skillTags}>
                  {["CUDA", "OpenCL", "C++", "Parallel Algorithms", "GPU Optimization", "Mathematical Computing"].map((skill, index) => (
                    <span 
                      key={index} 
                      style={{
                        ...styles.skillTag,
                        animationDelay: `${index * 0.1}s`
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, #7c3aed, #ec4899)';
                        e.target.style.color = 'white';
                        e.target.style.transform = 'scale(1.1) rotate(2deg)';
                        e.target.style.boxShadow = '0 8px 25px rgba(124, 58, 237, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(124, 58, 237, 0.2)';
                        e.target.style.color = '#c4b5fd';
                        e.target.style.transform = 'scale(1) rotate(0deg)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div 
                style={styles.skillCategory}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(34, 197, 94, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                  <div style={{fontSize: '3.5rem', marginBottom: '1rem'}}>🤖</div>
                  <h3 style={styles.skillCategoryTitle}>AI & Machine Learning</h3>
                </div>
                <div style={styles.skillTags}>
                  {["Computer Vision", "NLP", "Deep Learning", "TensorFlow", "PyTorch", "Neural Networks"].map((skill, index) => (
                    <span 
                      key={index} 
                      style={{
                        ...styles.skillTag,
                        background: 'rgba(34, 197, 94, 0.2)',
                        borderColor: 'rgba(34, 197, 94, 0.3)',
                        color: '#86efac',
                        animationDelay: `${index * 0.1}s`
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, #059669, #06b6d4)';
                        e.target.style.color = 'white';
                        e.target.style.transform = 'scale(1.1) rotate(-2deg)';
                        e.target.style.boxShadow = '0 8px 25px rgba(34, 197, 94, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(34, 197, 94, 0.2)';
                        e.target.style.color = '#86efac';
                        e.target.style.transform = 'scale(1) rotate(0deg)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div 
                style={styles.skillCategory}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(6, 182, 212, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                  <div style={{fontSize: '3.5rem', marginBottom: '1rem'}}>🥽</div>
                  <h3 style={styles.skillCategoryTitle}>Immersive Technologies</h3>
                </div>
                <div style={styles.skillTags}>
                  {["Unity XR", "Unreal Engine", "Projected Reality", "Spatial Computing", "Hand Tracking", "LiveLink"].map((skill, index) => (
                    <span 
                      key={index} 
                      style={{
                        ...styles.skillTag,
                        background: 'rgba(6, 182, 212, 0.2)',
                        borderColor: 'rgba(6, 182, 212, 0.3)',
                        color: '#67e8f9',
                        animationDelay: `${index * 0.1}s`
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, #0891b2, #7c3aed)';
                        e.target.style.color = 'white';
                        e.target.style.transform = 'scale(1.1) rotate(1deg)';
                        e.target.style.boxShadow = '0 8px 25px rgba(6, 182, 212, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(6, 182, 212, 0.2)';
                        e.target.style.color = '#67e8f9';
                        e.target.style.transform = 'scale(1) rotate(0deg)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div 
                style={styles.skillCategory}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(251, 146, 60, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = 'rgba(251, 146, 60, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                  <div style={{fontSize: '3.5rem', marginBottom: '1rem'}}>💻</div>
                  <h3 style={styles.skillCategoryTitle}>Programming Languages</h3>
                </div>
                <div style={styles.skillTags}>
                  {["Python", "C++", "C#", "Swift", "JavaScript", "Java", "PHP"].map((skill, index) => (
                    <span 
                      key={index} 
                      style={{
                        ...styles.skillTag,
                        background: 'rgba(251, 146, 60, 0.2)',
                        borderColor: 'rgba(251, 146, 60, 0.3)',
                        color: '#fed7aa',
                        animationDelay: `${index * 0.1}s`
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, #ea580c, #f59e0b)';
                        e.target.style.color = 'white';
                        e.target.style.transform = 'scale(1.1) rotate(-1deg)';
                        e.target.style.boxShadow = '0 8px 25px rgba(251, 146, 60, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(251, 146, 60, 0.2)';
                        e.target.style.color = '#fed7aa';
                        e.target.style.transform = 'scale(1) rotate(0deg)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="research" style={styles.section}>
        <div>
          <h2 style={styles.sectionTitle}>Research Projects</h2>
          
          <div style={styles.projectsGrid}>
            {researchProjects.map((project, index) => (
              <div
                key={index}
                style={styles.projectCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.03) translateY(-5px)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(124, 58, 237, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  ...styles.projectHeader,
                  background: index === 0 ? 'linear-gradient(135deg, #7c3aed, #ec4899)' :
                             index === 1 ? 'linear-gradient(135deg, #059669, #06b6d4)' :
                             index === 2 ? 'linear-gradient(135deg, #dc2626, #f59e0b)' :
                             index === 3 ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' :
                             index === 4 ? 'linear-gradient(135deg, #065f46, #047857)' :
                             'linear-gradient(135deg, #7c2d12, #ea580c)'
                }}>
                  <div style={styles.projectType}>{project.type}</div>
                  {project.status && (
                    <div style={{
                      ...styles.projectStatus,
                      background: project.status === 'Under Review' ? 'rgba(251, 146, 60, 0.2)' :
                                 project.status === 'Completed' ? 'rgba(34, 197, 94, 0.2)' :
                                 'rgba(59, 130, 246, 0.2)',
                      color: project.status === 'Under Review' ? '#fed7aa' :
                             project.status === 'Completed' ? '#86efac' :
                             '#93c5fd'
                    }}>
                      {project.status}
                    </div>
                  )}
                  <h3 style={styles.projectTitle}>{project.title}</h3>
                </div>
                
                <div style={styles.projectContent}>
                  <p style={styles.projectDescription}>{project.description}</p>
                  
                  {project.collaboration && (
                    <p style={styles.collaboration}>
                      👥 Collaboration: {project.collaboration}
                    </p>
                  )}
                  
                  <div style={styles.techTags}>
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} style={styles.techTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div style={styles.projectLinks}>
                    {Object.entries(project.links).map(([type, url], linkIndex) => (
                      <a
                        key={linkIndex}
                        href={url}
                        style={styles.projectLink}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'linear-gradient(45deg, #6d28d9, #db2777)';
                          e.target.style.transform = 'scale(1.05) translateY(-2px)';
                          e.target.style.boxShadow = '0 10px 25px rgba(124, 58, 237, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'linear-gradient(45deg, #7c3aed, #ec4899)';
                          e.target.style.transform = 'scale(1) translateY(0)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" style={styles.section}>
        <div>
          <h2 style={styles.sectionTitle}>Personal Projects</h2>
          
          <div style={styles.projectsGrid}>
            {personalProjects.map((project, index) => (
              <div
                key={index}
                style={styles.projectCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.03) translateY(-5px)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(124, 58, 237, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  ...styles.projectHeader,
                  background: index === 0 ? 'linear-gradient(135deg, #059669, #06b6d4)' :
                             index === 1 ? 'linear-gradient(135deg, #7c3aed, #ec4899)' :
                             'linear-gradient(135deg, #dc2626, #f59e0b)'
                }}>
                  <div style={styles.projectType}>{project.type}</div>
                  <h3 style={styles.projectTitle}>{project.title}</h3>
                </div>
                
                <div style={styles.projectContent}>
                  <p style={styles.projectDescription}>{project.description}</p>
                  
                  <div style={styles.techTags}>
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} style={styles.techTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div style={styles.projectLinks}>
                    {Object.entries(project.links).map(([type, url], linkIndex) => (
                      <a
                        key={linkIndex}
                        href={url}
                        style={styles.projectLink}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'linear-gradient(45deg, #6d28d9, #db2777)';
                          e.target.style.transform = 'scale(1.05) translateY(-2px)';
                          e.target.style.boxShadow = '0 10px 25px rgba(124, 58, 237, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'linear-gradient(45deg, #7c3aed, #ec4899)';
                          e.target.style.transform = 'scale(1) translateY(0)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" style={styles.section}>
        <div>
          <h2 style={styles.sectionTitle}>Work Experience</h2>
          
          <div style={styles.experienceGrid}>
            {workExperience.map((job, index) => (
              <div
                key={index}
                style={styles.experienceCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(124, 58, 237, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={styles.experienceHeader}>
                  <div>
                    <h3 style={styles.jobTitle}>{job.title}</h3>
                    <p style={styles.company}>{job.company}</p>
                    <p style={styles.location}>{job.location}</p>
                  </div>
                  <span style={styles.periodBadge}>{job.period}</span>
                </div>
                
                <p style={styles.jobDescription}>{job.description}</p>
                
                <div style={styles.achievements}>
                  <h4 style={{fontSize: '1.1rem', fontWeight: '600', color: 'white', marginBottom: '1rem'}}>
                    Key Achievements
                  </h4>
                  {job.achievements.map((achievement, achievementIndex) => (
                    <div 
                      key={achievementIndex} 
                      style={{
                        ...styles.achievementItem,
                        '::before': {
                          content: '"•"',
                          position: 'absolute',
                          left: 0,
                          color: '#a78bfa'
                        }
                      }}
                    >
                      • {achievement}
                    </div>
                  ))}
                </div>
                
                <div style={styles.techTags}>
                  {job.tech.map((tech, techIndex) => (
                    <span key={techIndex} style={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="education" style={styles.section}>
        <div>
          <h2 style={styles.sectionTitle}>Education</h2>
          
          <div style={styles.educationGrid}>
            {[
              {
                degree: "Bachelor of Science in Computer Science",
                school: "University of Florida",
                period: "Jan 2024 - Dec 2025",
                focus: "Research Focus: HCI, Computer Graphics, High-Performance Computing",
                gpa: "3.81/4.0",
                courses: [
                  "Computational Linear Algebra",
                  "Data Structures & Algorithms", 
                  "Algorithm Abstraction and Design",
                  "Operating Systems",
                  "Programming Language Concepts",
                  "Computer Organization",
                  "Software Engineering",
                  "Database Systems",
                  "Virtual Reality",
                  "Computational Media",
                  "Data Science",
                  "Cryptology",
                  "Security in Computing",
                  "Penetration Testing",
                  "Engineering Research",
                  "Statistics for Engineers",
                  "Physics II + Lab",
                  "Calculus I, II, III",
                  "Discrete Structures",
                  "Object Oriented Programming"
                ]
              }
            ].map((edu, index) => (
              <div
                key={index}
                style={styles.educationCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={styles.experienceHeader}>
                  <div>
                    <h3 style={styles.degreeTitle}>{edu.degree}</h3>
                    <p style={styles.institution}>{edu.school}</p>
                    <p style={styles.educationDetails}>{edu.focus}</p>
                    <p style={styles.educationDetails}>GPA: {edu.gpa}</p>
                  </div>
                  <span style={styles.periodBadge}>{edu.period}</span>
                </div>
                
                <div>
                  <h4 style={styles.courseworkTitle}>Relevant Coursework</h4>
                  <div style={styles.courseworkGrid}>
                    {edu.courses.map((course, courseIndex) => (
                      <div 
                        key={courseIndex} 
                        style={styles.courseItem}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'rgba(124, 58, 237, 0.2)';
                          e.target.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'rgba(124, 58, 237, 0.1)';
                          e.target.style.transform = 'scale(1)';
                        }}
                      >
                        {course}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="clubs" style={styles.section}>
  <div>
    <h2 style={styles.sectionTitle}>Clubs & Organizations</h2>
    <div style={styles.educationGrid}>
      {clubsAndOrganizations.map((club, index) => (
        <div key={index} style={styles.educationCard} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.transform = 'translateY(-5px)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem'}}>
            <div>
              <h3 style={styles.degreeTitle}>{club.name}</h3>
              <p style={styles.institution}>{club.role}</p>
            </div>
            <div style={{background: 'linear-gradient(45deg, #7c3aed, #ec4899)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600'}}>Active</div>
          </div>
          <p style={styles.educationDetails}>{club.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>

<section id="certifications" style={styles.section}>
  <div>
    <h2 style={styles.sectionTitle}>Certifications</h2>
    <div style={styles.contactGrid}>
      {certifications.map((cert, index) => (
        <div key={index} style={styles.contactCard} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.transform = 'scale(1.05) translateY(-5px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(124, 58, 237, 0.3)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; e.currentTarget.style.transform = 'scale(1) translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
          <div style={{...styles.contactIcon, transition: 'transform 0.3s ease'}}>{cert.icon}</div>
          <h3 style={styles.contactTitle}>{cert.title}</h3>
          <p style={styles.contactValue}>{cert.areas.join(' • ')}</p>
          <p style={{color: '#9ca3af', fontSize: '0.9rem', marginTop: '0.5rem'}}>{cert.issuer}</p>
        </div>
      ))}
    </div>
  </div>
</section>

      <section id="contact" style={styles.section}>
        <div>
          <h2 style={styles.sectionTitle}>Let's Collaborate</h2>
          <p style={{...styles.heroText, textAlign: 'center', marginBottom: '3rem'}}>
            Ready to push the boundaries of human-computer interaction? Let's discuss research opportunities, 
            collaborations, or exciting projects in AI, VR, and computational science.
          </p>
          
          <div style={styles.contactGrid}>
            {[
              { 
                icon: "📧", 
                title: "Email", 
                value: "rdavidsegovia@gmail.com", 
                href: "mailto:rdavidsegovia@gmail.com" 
              },
              { 
                icon: "🎓", 
                title: "Research", 
                value: "HCI • AI • Graphics", 
                href: "#research" 
              },
              { 
                icon: "💼", 
                title: "LinkedIn", 
                value: "Professional Network", 
                href: "#" 
              },
              { 
                icon: "🐙", 
                title: "GitHub", 
                value: "github.com/rs-dkd", 
                href: "https://github.com/rs-dkd" 
              },
              { 
                icon: "📍", 
                title: "Location", 
                value: "Gainesville, FL", 
                href: "#" 
              },
              { 
                icon: "🎯", 
                title: "Seeking", 
                value: "PhD Opportunities 2026", 
                href: "#" 
              }
            ].map((contact, index) => (
              <a
                key={index}
                href={contact.href}
                style={styles.contactCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'scale(1.05) translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(124, 58, 237, 0.3)';
                  e.currentTarget.querySelector('.contact-icon').style.transform = 'scale(1.2) rotate(10deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.querySelector('.contact-icon').style.transform = 'scale(1) rotate(0deg)';
                }}
              >
                <div 
                  className="contact-icon"
                  style={{...styles.contactIcon, transition: 'transform 0.3s ease'}}
                >
                  {contact.icon}
                </div>
                <h3 style={styles.contactTitle}>{contact.title}</h3>
                <p style={styles.contactValue}>{contact.value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        /* Responsive design */
        @media (max-width: 768px) {
          .hero-content {
            padding: 0 1rem;
          }
          
          .section {
            padding: 4rem 1rem;
          }
          
          .section-title {
            font-size: 2.5rem;
          }
          
          .nav-links {
            display: none;
          }
          
          .skills-container {
            height: 400px;
          }
          
          .projects-grid {
            grid-template-columns: 1fr;
          }
          
          .about-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .profile-image {
            width: 250px;
            height: 250px;
          }
          
          .profile-image-inner {
            font-size: 4rem;
          }
          
          .contact-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }
          
          .coursework-grid {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 480px) {
          .hero-text {
            font-size: 1.1rem;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .social-links {
            flex-direction: column;
            align-items: center;
          }
          
          .control-buttons {
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .skill-tags {
            justify-content: center;
          }
          
          .tech-tags {
            justify-content: center;
          }
          
          .project-links {
            flex-direction: column;
            align-items: center;
          }
        }
        
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #7c3aed, #ec4899);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #6d28d9, #db2777);
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        ::selection {
          background: rgba(167, 139, 250, 0.3);
          color: white;
        }
        
        button:focus,
        a:focus {
          outline: 2px solid #a78bfa;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;