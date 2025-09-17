import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, MeshDistortMaterial, Sphere, OrbitControls, Stars } from '@react-three/drei';
import profilePic from './reggie-pic.png';
import resumePDF from './segovia_resume.pdf';
import cvPDF from './segovia_cv.pdf';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);

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
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('rdavidsegovia@gmail.com').then(() => {
      alert('Email copied to clipboard!');
    });
  };

  const researchProjects = [
    {
      title: "AI-Powered Projected Reality",
      type: "HCI Research",
      description: "Submitted to a top-tier conference (under review). Developed a projected reality system using AI hand tracking to enable seamless on-hand interaction with images, leveraging natural occlusion as a core interaction mechanism rather than avoiding it.",
      tech: ["Computer Vision", "AI Hand Tracking", "Projected Reality", "HCI"],
      status: "Under Review",
      collaboration: "Dr. Alexandre Gomes de Siqueira",
      links: { },
      images: [
      ]
    },
    {
      title: "BlendReality: VR Blender with PNS Optimization",
      type: "Graphics Research", 
      description: "Building a VR recreation of Blender utilizing optimized polyhedral net splines (PNS) algorithm for quad-dominant mesh smoothing, enabling intuitive 3D modeling interaction in virtual reality.",
      tech: ["VR", "Computer Graphics", "PNS Algorithm", "3D Modeling", "Unity"],
      status: "In Progress",
      collaboration: "Dr. Jorg Peters",
      links: { github: "https://github.com/rs-dkd/BlendReality" },
      images: [
      "/path",
      "/path",
      "/path"
      ]
    },
    {
      title: "Flood Risk Digital Twins in VR/AR",
      type: "AI & Simulation",
      description: "Working with Karla Saldana Ochoa to create flood risk simulations using AI and digital twins in virtual/augmented reality environments for climate resilience planning.",
      tech: ["AI", "Digital Twins", "VR/AR", "Climate Modeling", "Unity"],
      status: "In Progress",
      collaboration: "Dr. Karla Saldaña Ochoa",
      links: { },
      images: [
      "/path",
      "/path",
      "/path"
      ]
    },
    {
      title: "VirtualHuman 2.0: Conversational AI in VR",
      type: "AI & VR",
      description: "Developed VR conversational AI with speech-to-text using Whisper, LLM integration with Gemini, ElevenLabs TTS, and real-time lip-sync using NeuroSync with LiveLink in Unreal Engine.",
      tech: ["VR", "Whisper", "Gemini API", "ElevenLabs", "NeuroSync", "Unreal Engine", "LLM"],
      status: "In Progress",
      collaboration: "Dr. Alexandre Gomes de Siqueira",
      links: {},
      images: [
      "/path",
      "/path",
      "/path"
      ]
    },
    {
      title: "AR-Guided Neonatal Physical Therapy",
      type: "Medical AR",
      description: "Developing an augmented reality application to guide parents of infants with brain injuries through prescribed physical therapy exercises at home, creating interactive AR visualization of therapeutic movements.",
      tech: ["AR", "Computer Vision", "Medical Visualization", "Unity", "Interactive Guidance"],
      status: "In Progress",
      collaboration: "Dr. Jorg Peters & Dr. Weiss, Shands Hospital",
      links: {},
      images: [
      "/path",
      "/path",
      "/path"
      ]
    },
    {
      title: "EASAL CUDA Parallelization",
      type: "HPC Research",
      description: "Developed CUDA and OpenCL parallelization strategies for molecular assembly landscape analysis, achieving 4x performance improvements in vertex localizations and matrix transformations.",
      tech: ["CUDA", "OpenCL", "C++", "Parallel Computing", "Computational Geometry"],
      status: "Completed",
      collaboration: "EASAL Lab",
      links: {},
      images: [
      "/path",
      "/path",
      "/path"
      ]
    }
  ];

  const personalProjects = [
    {
      title: "Stock Price Prediction with Twitter Sentiment",
      type: "Data Science",
      description: "Built machine learning models combining Twitter sentiment analysis with historical stock data, featuring interactive Streamlit visualizations for investment insights.",
      tech: ["Python", "NLP", "Machine Learning", "Streamlit", "Twitter API"],
      links: { github: "https://github.com/rs-dkd/SentimentStockAnalysis"},
      images: [
      "/path",
      "/path",
      "/path"
      ]
    },
    {
      title: "Echo Journal: AI-Powered Journaling",
      type: "Mobile App",
      description: "iOS app using CoreML and custom NLP models to analyze emotions from journal entries, providing personalized recommendations and mood tracking.",
      tech: ["Swift", "CoreML", "NLP", "iOS", "Core Data"],
      links: { github: "https://github.com/rs-dkd/EchoJournal" },
      images: [
      "/path",
      "/path",
      "/path"
      ]
    },
    {
      title: "Everglades VR Experience",
      type: "VR/Unity",
      description: "Immersive VR adventure exploring the Everglades with realistic flora/fauna animations, designed to enhance conservation awareness through interactive education.",
      tech: ["Unity", "C#", "VR", "3D Modeling", "Environmental Design"],
      links: { github: "https://github.com/rs-dkd/EvergladesVR" },
      images: [
      "/path",
      "/path",
      "/path"
      ]
    },
    {
      title: "College Football Statistics Analysis",
      type: "Full-Stack",
      description: "Comprehensive trend analysis system for college football data spanning 2004-2024 with 500,000+ tuples. Built React frontend with C#/.NET backend and Oracle database.",
      tech: ["C#/.NET", "React", "Oracle Database", "D3.js", "Chart.js"],
      links: { github: "https://github.com/rs-dkd/CollegeFootballStats" },
      images: [
      "/path",
      "/path",
      "/path"
      ]
    },
    {
      title: "Programming Language Interpreter",
      type: "Compiler Design",
      description: "Architected a complete language processing pipeline with Lexer, Parser, Analyzer, and custom programming language supporting variables, control structures, and functions.",
      tech: ["Java", "Compiler Design", "Abstract Syntax Trees", "Symbol Tables"],
      links: { github: "https://github.com/rs-dkd/Programming_Language_Interpreter" },
      images: [
      "/path",
      "/path",
      "/path"
      ]
    },
    {
      title: "Route Optimization Visualization",
      type: "Algorithms",
      description: "Developed and compared A* and Dijkstra's pathfinding algorithms for real-world city navigation with interactive visualization using Bridges API.",
      tech: ["C++", "Bridges API", "Pathfinding Algorithms", "Data Structures"],
      links: { github: "https://github.com/rs-dkd/RouteOptimization" },
      images: [
      "/path",
      "/path",
      "/path"
      ]
    }
  ];

    const skillCategories = [
    {
      icon: "🤖",
      title: "AI & Machine Learning",
      skills: ["TensorFlow", "PyTorch", "Computer Vision", "NLP", "Deep Learning", "MediaPipe"],
      style: {
        background: 'rgba(34, 197, 94, 0.1)',
        borderColor: 'rgba(34, 197, 94, 0.4)',
        tagBackground: 'rgba(34, 197, 94, 0.2)',
        tagBorderColor: 'rgba(34, 197, 94, 0.3)',
        tagColor: '#86efac',
        tagHoverBackground: 'linear-gradient(135deg, #059669, #06b6d4)',
        tagHoverShadow: '0 8px 25px rgba(34, 197, 94, 0.4)',
      }
    },
    {
      icon: "🚀",
      title: "High-Performance Computing",
      skills: ["CUDA", "OpenCL", "Parallel Computing", "C++", "GPU Optimization", "Mathematical Computing"],
      style: {
        background: 'rgba(124, 58, 237, 0.1)',
        borderColor: 'rgba(124, 58, 237, 0.4)',
        tagBackground: 'rgba(124, 58, 237, 0.2)',
        tagBorderColor: 'rgba(124, 58, 237, 0.3)',
        tagColor: '#c4b5fd',
        tagHoverBackground: 'linear-gradient(135deg, #7c3aed, #ec4899)',
        tagHoverShadow: '0 8px 25px rgba(124, 58, 237, 0.4)',
      }
    },
    {
      icon: "🥽",
      title: "Immersive Technologies (VR/AR)",
      skills: ["Unity XR", "Unreal Engine", "Spatial Computing", "Projected Reality", "Hand Tracking", "LiveLink"],
      style: {
        background: 'rgba(6, 182, 212, 0.1)',
        borderColor: 'rgba(6, 182, 212, 0.4)',
        tagBackground: 'rgba(6, 182, 212, 0.2)',
        tagBorderColor: 'rgba(6, 182, 212, 0.3)',
        tagColor: '#67e8f9',
        tagHoverBackground: 'linear-gradient(135deg, #0891b2, #7c3aed)',
        tagHoverShadow: '0 8px 25px rgba(6, 182, 212, 0.4)',
      }
    },
    {
      icon: "📱",
      title: "Web & Mobile Development",
      skills: ["React", "JavaScript", "Swift (iOS)", "C#/.NET", "PHP", "Web Development", "API Integration"],
      style: {
        background: 'rgba(251, 146, 60, 0.1)',
        borderColor: 'rgba(251, 146, 60, 0.4)',
        tagBackground: 'rgba(251, 146, 60, 0.2)',
        tagBorderColor: 'rgba(251, 146, 60, 0.3)',
        tagColor: '#fed7aa',
        tagHoverBackground: 'linear-gradient(135deg, #ea580c, #f59e0b)',
        tagHoverShadow: '0 8px 25px rgba(251, 146, 60, 0.4)',
      }
    },
    {
      icon: "⚙️",
      title: "Systems & Compilers",
      skills: ["C++", "Java", "C", "Operating Systems", "Compiler Design", "Linux", "Git"],
      style: {
        background: 'rgba(236, 72, 153, 0.1)',
        borderColor: 'rgba(236, 72, 153, 0.4)',
        tagBackground: 'rgba(236, 72, 153, 0.2)',
        tagBorderColor: 'rgba(236, 72, 153, 0.3)',
        tagColor: '#f9a8d4',
        tagHoverBackground: 'linear-gradient(135deg, #db2777, #f472b6)',
        tagHoverShadow: '0 8px 25px rgba(236, 72, 153, 0.4)',
      }
    },
    {
      icon: "📊",
      title: "Databases & Data Science",
      skills: ["Oracle Database", "MySQL", "Data Science", "Python", "Streamlit", "D3.js"],
      style: {
        background: 'rgba(59, 130, 246, 0.1)',
        borderColor: 'rgba(59, 130, 246, 0.4)',
        tagBackground: 'rgba(59, 130, 246, 0.2)',
        tagBorderColor: 'rgba(59, 130, 246, 0.3)',
        tagColor: '#93c5fd',
        tagHoverBackground: 'linear-gradient(135deg, #2563eb, #3b82f6)',
        tagHoverShadow: '0 8px 25px rgba(59, 130, 246, 0.4)',
      }
    }
  ];

  const skillAreas = [
    { 
      name: "AI/ML", 
      color: "#ff6b6b", 
      position: [0, 2, 0],
      description: "Deep Learning, NLP, Computer Vision"
    },
    { 
      name: "HPC", 
      color: "#76b900", 
      position: [2.5, 1, 0],
      description: "CUDA, Parallel Computing, Optimization"
    },
    { 
      name: "VR/AR", 
      color: "#4ecdc4", 
      position: [2.5, -1, 0],
      description: "Unity XR, Unreal Engine, Spatial Computing"
    },
    { 
      name: "Web/Mobile", 
      color: "#45b7d1", 
      position: [0, -2, 0],
      description: "React, JavaScript, Swift (iOS)"
    },
    { 
      name: "Systems", 
      color: "#fa7343", 
      position: [-2.5, -1, 0],
      description: "C++, Java, Compilers, Linux"
    },
    { 
      name: "Databases", 
      color: "#a78bfa", 
      position: [-2.5, 1, 0],
      description: "Oracle, MySQL, Data Science"
    }
  ];

  const workExperience = [
    {
      title: "Research Assistant - HCI Lab",
      company: "University of Florida",
      period: "Apr 2025 - Present",
      location: "Gainesville, FL",
      description: "Leading development of an AI-powered projected reality system enabling on-hand interaction with images using natural occlusion as the core interaction mechanism.",
      achievements: [
        "Engineered AI hand tracking algorithms for real-time gesture recognition and spatial interaction",
        "Submitted research paper to top-tier conference on projected reality interfaces",
        "Architected VR conversational AI in Unreal Engine with full-stack speech pipeline",
        "Integrated Whisper (STT), Gemini (LLM), ElevenLabs (TTS), and NeuroSync for realistic lip-syncing"
      ],
      tech: ["Computer Vision", "AI Hand Tracking", "Unity", "Unreal Engine", "Python", "C#"]
    },
    {
      title: "Research Assistant - AI-Share Lab",
      company: "University of Florida",
      period: "Jun 2025 - Present",
      location: "Gainesville, FL", 
      description: "Developing digital twin simulations in VR/AR for flood risk analysis and climate resilience planning with Dr. Karla Saldaña Ochoa.",
      achievements: [
        "Evaluated 3D modeling workflows (ArcGIS Pro, BlenderGIS) to generate realistic building models from geospatial data",
        "Authored Blender scripts to automate data filtering and mesh optimization for large-scale urban environments",
        "Integrated AI models for flood pattern prediction using HiperGator high-performance computing cluster",
        "Created AI-powered flood risk simulations using digital twins in virtual/augmented reality environments"
      ],
      tech: ["AI", "Digital Twins", "VR/AR", "ArcGIS Pro", "Blender", "Unity", "Python"]
    },
    {
      title: "Research Assistant - SurfLab",
      company: "University of Florida",
      period: "May 2025 - Present",
      location: "Gainesville, FL",
      description: "Developing VR version of Blender using optimized polyhedral-net splines (PNS) for real-time mesh smoothing and intuitive 3D modeling with Dr. Jorg Peters.",
      achievements: [
        "Implemented intuitive spatial interaction paradigms for 3D modeling workflows in VR",
        "Optimized PNS computational performance for real-time VR rendering",
        "Collaborated on AR-guided therapy application with Shands Hospital for neonatal physical therapy",
        "Created interactive AR visualizations with real-time feedback for therapeutic exercises"
      ],
      tech: ["VR", "Computer Graphics", "PNS Algorithm", "Unity", "AR", "Medical Visualization"]
    },
    {
      title: "Teaching Assistant - Introduction to Virtual Reality",
      company: "University of Florida",
      period: "Aug 2025 - Present",
      location: "Gainesville, FL",
      description: "Supporting instruction for undergraduate Virtual Reality course, facilitating hands-on learning with Unity XR development and spatial computing concepts.",
      achievements: [
        "Mentor and support 150+ undergraduate students in hands-on Unity XR development course",
        "Lead lab sessions covering VR hardware setup, tracking systems, and spatial interaction design",
        "Provide detailed feedback on 3D programming concepts and C# programming",
        "Assist students in debugging complex VR applications, improving overall project quality"
      ],
      tech: ["Unity XR", "C#", "VR Development", "Spatial Computing", "Teaching"]
    },
    {
      title: "Research Assistant - EASAL Lab",
      company: "University of Florida",
      period: "Mar 2025 - Aug 2025", 
      location: "Gainesville, FL",
      description: "Conducted research to identify computational bottlenecks in EASAL software for analyzing molecular assembly landscapes and implemented CUDA-based parallelization strategies.",
      achievements: [
        "Achieved over 4x speedups in vertex localizations and matrix transformations for molecular assemblies",
        "Developed CUDA and OpenCL parallelization strategies for edge length calculations",
        "Extended algorithms to multi-body systems while maintaining mathematical consistency",
        "Collaborated with interdisciplinary team on active constraint graphs and Cayley parametrization"
      ],
      tech: ["CUDA", "OpenCL", "C++", "Parallel Computing", "Computational Geometry", "Mathematical Modeling"]
    },
    {
      title: "Web Development Intern",
      company: "Aquarelle Realty",
      period: "Feb 2023 - Jan 2025",
      location: "Orlando, FL",
      description: "Developed and maintained full-stack web functionalities for real estate platform, integrating various API features for high-traffic platform.",
      achievements: [
        "Developed full-stack web functionalities using PHP, JavaScript, CSS, and MySQL",
        "Integrated third-party APIs for self-updating property listings, mortgage calculations, and geolocation services",
        "Optimized website performance and search rankings through targeted SEO implementation",
        "Enhanced user experience for real estate agents and clients through intuitive interface design"
      ],
      tech: ["JavaScript", "PHP", "MySQL", "CSS", "API Integration", "SEO"]
    }
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
      display: mousePosition.x > 0.98 ? 'none' : 'block',
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
      gap: '1.5rem',
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
      fontSize: '0.95rem',
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      position: 'relative'
    },
    mobileMenuButton: {
      display: 'none',
      background: 'none',
      border: 'none',
      color: 'white',
      fontSize: '1.5rem',
      cursor: 'pointer',
      padding: '0.5rem'
    },
    mobileMenu: {
      position: 'fixed',
      top: '80px',
      left: 0,
      right: 0,
      background: 'rgba(0, 0, 0, 0.95)',
      backdropFilter: 'blur(20px)',
      padding: '2rem',
      display: mobileMenuOpen ? 'flex' : 'none',
      flexDirection: 'column',
      gap: '1rem',
      zIndex: 39
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
      borderRadius: '50%',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#1a1a2e'
    },
    profileImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '50%',
      objectPosition: '50% 30%'
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
    projectImage: {
      width: '100%',
      height: '220px',
      objectFit: 'cover',
      borderRadius: '24px 24px 0 0'
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
    },
      modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '2rem'
    },
    modalContent: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '20px',
      padding: '2rem',
      maxWidth: '90vw',
      maxHeight: '90vh',
      overflow: 'auto'
    },
    imageGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginTop: '1rem'
    },
    modalImage: {
      width: '100%',
      height: '150px',
      objectFit: 'cover',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'transform 0.3s ease'
    },
    closeButton: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      background: 'none',
      border: 'none',
      color: 'white',
      fontSize: '2rem',
      cursor: 'pointer'
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
            {['home', 'about', 'skills', 'research', 'projects', 'experience', 'education', 'contact'].map((item) => (
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
          <button
            style={styles.mobileMenuButton}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
          <div style={styles.controlButtons}>
          </div>
        </div>
        
        <div style={styles.mobileMenu}>
          {['home', 'about', 'skills', 'research', 'projects', 'experience', 'education', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              style={{
                ...styles.navButton,
                width: '100%',
                textAlign: 'left',
                fontSize: '1.2rem',
                padding: '1rem'
              }}
            >
              {item.replace('-', ' ')}
            </button>
          ))}
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
            Researcher specializing in Human-Computer Interaction, AI-powered systems, and high-performance computing. 
            Currently developing cutting-edge research in projected reality interfaces, AI/ML integration, VR experiences, and CUDA optimization 
            for both academic research and industry applications.
          </p>
          
          <div style={styles.socialLinks}>
            {[
              { icon: "📧", label: "Email", isEmail: true },
              { icon: "💼", label: "LinkedIn", href: "https://www.linkedin.com/in/reggie-segovia/" },
              { icon: "🐙", label: "GitHub", href: "https://github.com/rs-dkd" },
              { icon: "📄", label: "Resume", href: resumePDF },
              { icon: "📄", label: "CV", href: cvPDF },
              { icon: "🌐", label: "Portfolio", href: "https://rs-dkd.github.io/my-portfolio/" }
            ].map((link, index) => (
              link.isEmail ? (
                <div
                  key={index}
                  onClick={copyEmailToClipboard}
                  style={{...styles.socialLink, cursor: 'pointer'}}
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
                </div>
              ) : (
                <a
                  key={index}
                  href={link.href}
                  style={styles.socialLink}
                  target="_blank" 
                  rel="noopener noreferrer"
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
              )
            ))}
          </div>

          <button
            onClick={() => scrollToSection('about')}
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
                systems to high-performance CUDA optimization, with publications submitted to top-tier venues.
              </p>
              <p style={styles.aboutText}>
                Currently working on multiple cutting-edge projects including a revolutionary projected 
                reality interface, flood risk digital twins in VR/AR, and conversational AI agents in virtual environments. 
                My work focuses on creating technology that enhances human creativity and understanding.
              </p>
              <p style={styles.aboutText}>
                My technical expertise combines deep learning, computer graphics, parallel computing, and spatial interaction 
                design. I believe in creating technology that not only performs efficiently but also remains accessible and 
                natural to use.
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
                  <img 
                    src={profilePic}
                    alt="Reggie Segovia" 
                    style={styles.profileImg}
                  />
                </div>
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
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {skillCategories.map((category, catIndex) => (
              <div
                key={catIndex}
                style={styles.skillCategory}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = category.style.background;
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = category.style.borderColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>{category.icon}</div>
                  <h3 style={styles.skillCategoryTitle}>{category.title}</h3>
                </div>
                <div style={styles.skillTags}>
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      style={{
                        ...styles.skillTag,
                        background: category.style.tagBackground,
                        borderColor: category.style.tagBorderColor,
                        color: category.style.tagColor,
                        animationDelay: `${skillIndex * 0.1}s`
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = category.style.tagHoverBackground;
                        e.target.style.color = 'white';
                        e.target.style.transform = 'scale(1.1)';
                        e.target.style.boxShadow = category.style.tagHoverShadow;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = category.style.tagBackground;
                        e.target.style.color = category.style.tagColor;
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
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
                {project.image ? (
                  <img src={project.image} alt={project.title} style={styles.projectImage} />
                ) : (
                  <div style={{
                    ...styles.projectHeader,
                    background: index === 0 ? 'linear-gradient(135deg, #7c3aed, #ec4899)' :
                               index === 1 ? 'linear-gradient(135deg, #dc2626, #f59e0b)' :
                               index === 2 ? 'linear-gradient(135deg, #059669, #06b6d4)' :
                               index === 3 ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' :
                               index === 4 ? 'linear-gradient(135deg, #ea580c, #f59e0b)' :
                               'linear-gradient(135deg, #065f46, #047857)'
                  }} />
                )}
                
                <button
                  onClick={() => {
                    setSelectedProject(project);
                    setShowImageModal(true);
                  }}
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '50%',
                    width: '45px',
                    height: '45px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '1.2rem',
                    color: 'white',
                    zIndex: 3
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                    e.target.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  🖼️
                </button>
                <div style={{position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 2}}>
                  <div style={styles.projectType}>{project.type}</div>
                </div>
                
                {project.status && (
                  <div style={{position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 2}}>
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
                  </div>
                )}
                
                <div style={styles.projectContent}>
                  <h3 style={styles.projectTitle}>{project.title}</h3>
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
                {project.image ? (
                  <img src={project.image} alt={project.title} style={styles.projectImage} />
                ) : (
                  <div style={{
                    ...styles.projectHeader,
                    background: index === 0 ? 'linear-gradient(135deg, #059669, #06b6d4)' :
                               index === 1 ? 'linear-gradient(135deg, #7c3aed, #ec4899)' :
                               index === 2 ? 'linear-gradient(135deg, #dc2626, #f59e0b)' :
                               index === 3 ? 'linear-gradient(135deg, #f59e0b, #eab308)' :
                               index === 4 ? 'linear-gradient(135deg, #8b5cf6, #a855f7)' :
                               'linear-gradient(135deg, #06b6d4, #0891b2)'
                  }} />
                )}
                
                <button
                  onClick={() => {
                    setSelectedProject(project);
                    setShowImageModal(true);
                  }}
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '50%',
                    width: '45px',
                    height: '45px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '1.2rem',
                    color: 'white',
                    zIndex: 3
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                    e.target.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  🖼️
                </button>
                <div style={{position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 2}}>
                  <div style={styles.projectType}>{project.type}</div>
                </div>
                
                <div style={styles.projectContent}>
                  <h3 style={styles.projectTitle}>{project.title}</h3>
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
                honors: "Bright Futures Florida Academic Scholars Award, Dean's List Spring 2025",
                courses: [
                  "Data Structures & Algorithms",
                  "Algorithm Abstraction and Design", 
                  "Artificial Intelligence",
                  "Virtual Reality",
                  "Computational Linear Algebra",
                  "Operating Systems",
                  "Programming Language Concepts",
                  "Computer Organization",
                  "Software Engineering",
                  "Database Systems",
                  "Computational Media",
                  "Data Science",
                  "Cryptology",
                  "Security in Computing",
                  "Penetration Testing",
                  "Engineering Research",
                  "Statistics for Engineers",
                  "Physics I & II + Laboratory",
                  "Calculus I, II, III",
                  "Discrete Structures"
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
                    <p style={styles.educationDetails}>Honors: {edu.honors}</p>
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

      <section id="contact" style={styles.section}>
        <div>
          <h2 style={styles.sectionTitle}>Let's Collaborate</h2>
          <p style={{...styles.heroText, textAlign: 'center', marginBottom: '3rem'}}>
            Ready to push the boundaries of human-computer interaction? Let's discuss research opportunities, 
            collaborations, work opportunities or exciting projects in AI, VR, and computational science.
          </p>
          
          <div style={styles.contactGrid}>
            {[
              { 
                icon: "📧", 
                title: "Email", 
                value: "rdavidsegovia@gmail.com",
                isEmail: true 
              },
              { 
                icon: "🎓", 
                title: "Research", 
                value: "HCI • AI • VR • Graphics", 
                href: "#research" 
              },
              { 
                icon: "💼", 
                title: "LinkedIn", 
                value: "Professional Network", 
                href: "https://www.linkedin.com/in/reggie-segovia/" 
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
                href: "https://www.google.com/maps/place/Gainesville,+FL" 
              },
              { 
                icon: "🎯", 
                title: "Focus", 
                value: "Research & Development", 
                href: "#research" 
              }
            ].map((contact, index) => {
              const commonProps = {
                key: index,
                style: { ...styles.contactCard, cursor: 'pointer' },
                onMouseEnter: (e) => {
                  const target = e.currentTarget;
                  target.style.background = 'rgba(255, 255, 255, 0.1)';
                  target.style.transform = 'scale(1.05) translateY(-5px)';
                  target.style.boxShadow = '0 20px 40px rgba(124, 58, 237, 0.3)';
                  const icon = target.querySelector('.contact-icon');
                  if (icon) icon.style.transform = 'scale(1.2) rotate(10deg)';
                },
                onMouseLeave: (e) => {
                  const target = e.currentTarget;
                  target.style.background = 'rgba(255, 255, 255, 0.05)';
                  target.style.transform = 'scale(1) translateY(0)';
                  target.style.boxShadow = 'none';
                  const icon = target.querySelector('.contact-icon');
                  if (icon) icon.style.transform = 'scale(1) rotate(0deg)';
                }
              };

              const cardContent = (
                <>
                  <div
                    className="contact-icon"
                    style={{ ...styles.contactIcon, transition: 'transform 0.3s ease' }}
                  >
                    {contact.icon}
                  </div>
                  <h3 style={styles.contactTitle}>{contact.title}</h3>
                  <p style={styles.contactValue}>{contact.value}</p>
                </>
              );

              if (contact.isEmail) {
                return (
                  <div {...commonProps} onClick={copyEmailToClipboard}>
                    {cardContent}
                  </div>
                );
              }

              if (contact.href) {
                if (contact.href.startsWith('#')) {
                  return (
                    <div {...commonProps} onClick={() => scrollToSection(contact.href.slice(1))}>
                      {cardContent}
                    </div>
                  );
                } else {
                  return (
                    <a
                      {...commonProps}
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ ...commonProps.style, textDecoration: 'none' }}
                    >
                      {cardContent}
                    </a>
                  );
                }
              }
              
              return (
                <div {...commonProps} style={{...commonProps.style, cursor: 'default'}}>
                  {cardContent}
                </div>
              );
            })}
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
        @media (max-width: 1024px) {
          .nav-links {
            display: none !important;
          }
          
          .mobile-menu-button {
            display: block !important;
          }
          
          .skills-container {
            height: 400px;
          }
        }
        
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
          
          .contact-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }
          
          .coursework-grid {
            grid-template-columns: 1fr;
          }
          
          .experience-header {
            flex-direction: column;
            align-items: flex-start;
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
          width: 16px;
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
      `}
      {showImageModal && selectedProject && (
        <div style={styles.modal} onClick={() => setShowImageModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button 
              style={styles.closeButton}
              onClick={() => setShowImageModal(false)}
            >
              ×
            </button>
            <h3 style={{color: 'white', marginBottom: '1rem'}}>{selectedProject.title}</h3>
            <div style={styles.imageGrid}>
              {selectedProject.images?.map((imagePath, index) => (
                <img
                  key={index}
                  src={imagePath}
                  alt={`${selectedProject.title} ${index + 1}`}
                  style={styles.modalImage}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      </style>
    </div>
  );
};
export default Portfolio;