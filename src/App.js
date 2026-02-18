import React, { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, MeshDistortMaterial, Sphere, OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import profilePic from './reggie-pic.png';
import resumePDF from './segovia_resume.pdf';
import cvPDF from './segovia_cv.pdf';
import graspableMemoriesPDF from './graspable-memories-paper.pdf';
import beyondTheGraspPDF from './beyond-the-grasp-paper.pdf';
import gesturesPolitenessPDF from './gestural-politeness-paper.pdf';
import graspableMemories1 from './graspable-memories-1.png';
import graspableMemories2 from './graspable-memories-2.png';
import graspableMemories3 from './graspable-memories-3.png';
import graspableMemories4 from './graspable-memories-4.png';
import graspableMemories5 from './graspable-memories-5.png';
import graspableMemories6 from './graspable-memories-6.png';
import graspableMemories7 from './graspable-memories-7.png';
import seniorthesis1 from './seniorthesis1.png';
import seniorthesis2 from './seniorthesis2.png';
import seniorthesis3 from './seniorthesis3.jpg';
import seniorthesis4 from './seniorthesis4.jpg';
import seniorthesis5 from './seniorthesis5.jpg';
import seniorthesis6 from './seniorthesis6.png';
import vh1 from './virtualhuman1.png';
import vh2 from './virtualhuman2.png';
import vh3 from './virtualhuman3.png';
import vh4 from './virtualhuman4.png';
import vh5 from './virtualhuman5.png';
import psych1 from './psychagent.png';
import inscription1 from './inscription1.png';
import inscription2 from './inscription2.png';
import inscription3 from './inscription3.png';
import blend1 from './blend1.png';
import blend2 from './blend2.png';
import blend3 from './blend3.png';
import blend4 from './blend4.png';
import blend5 from './blend5.png';
import blend6 from './blend6.png';
import blend7 from './blend7.png';
import blend8 from './blend8.png';
import neonatal1 from './neonatal1.png';
import neonatal2 from './neonatal2.png';
import neonatal3 from './neonatal3.png';
import neonatal4 from './neonatal4.png';
import neonatal5 from './neonatal5.png';
import neonatal6 from './neonatal6.png';
import neonatal7 from './neonatal7.png';
import flood1 from './flood1.png';
import flood2 from './flood2.png';
import flood3 from './flood3.png';
import flood4 from './flood4.png';
import flood5 from './flood5.png';
import flood6 from './flood6.png';
import flood7 from './flood7.png';
import flood8 from './flood8.png';
import everglades1 from './everglades1.png';
import everglades2 from './everglades2.png';
import everglades3 from './everglades3.png';
import everglades4 from './everglades4.png';
import everglades5 from './everglades5.png';
import everglades6 from './everglades6.png';
import everglades7 from './everglades7.png';
import everglades8 from './everglades8.png';
import everglades9 from './everglades9.png';
import everglades10 from './everglades10.png';
import disaster1 from './disaster1.png';
import disaster2 from './disaster2.png';
import disaster3 from './disaster3.png';
import disaster4 from './disaster4.png';
import disaster5 from './disaster5.png';
import disaster6 from './disaster6.png';
import football1 from './football1.png';
import football2 from './football2.png';
import football3 from './football3.png';
import football4 from './football4.png';
import football5 from './football5.png';
import football6 from './football6.png';
import stock1 from './stock1.png';
import stock2 from './stock2.png';
import stock3 from './stock3.png';
import stock4 from './stock4.png';
import stock5 from './stock5.png';
import stock6 from './stock6.png';
import stock7 from './stock7.png';
import stock8 from './stock8.png';
import journal1 from './journal1.png';
import journal2 from './journal2.png';
import journal3 from './journal3.png';
import journal4 from './journal4.png';
import route1 from './route1.png';
import route2 from './route2.png';
import route3 from './route3.png';
import route4 from './route4.png';

import { GraduationCap, Award, BookOpen, Star, Github, Linkedin, Mail, FileText, Globe, Glasses, Brain, Palette, Gamepad2, Code, Cpu, MapPin, Target, Monitor} from 'lucide-react';

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

const personalProjects = [
  {
    title: "Disaster Response AI Simulator",
    type: "AI & Simulation",
    description: "Dynamic traffic and emergency response simulator in Unity using intelligent agents with A* pathfinding. Models real-time civilian evacuation and emergency vehicle routing during disasters (fires, floods, accidents) in a GIS-based virtual city environment.",
    tech: ["Unity", "C#", "A* Pathfinding", "AI Agents", "ArcGIS CityEngine", "FSM", "Decision Trees"],
    links: { github: "https://github.com/rs-dkd/DisasterResponseAI" },
    images: [disaster1, disaster2, disaster3, disaster4, disaster5, disaster6]
  },
  {
    title: "Everglades VR Experience",
    type: "VR/Unity",
    description: "Immersive VR adventure exploring the Everglades with realistic flora/fauna animations, designed to enhance conservation awareness through interactive education.",
    tech: ["Unity", "C#", "VR", "3D Modeling", "Environmental Design"],
    links: { github: "https://github.com/rs-dkd/EvergladesVR" },
    images: [everglades1, everglades2, everglades3, everglades4, everglades5, everglades6, everglades7, everglades8, everglades9, everglades10]
  },
  {
    title: "Stock Price Prediction with Twitter Sentiment",
    type: "Data Science",
    description: "Built machine learning models combining Twitter sentiment analysis with historical stock data, featuring interactive Streamlit visualizations for investment insights.",
    tech: ["Python", "NLP", "Machine Learning", "Streamlit", "Twitter API"],
    links: { github: "https://github.com/rs-dkd/SentimentStockAnalysis"},
    images: [stock1, stock2, stock3, stock4, stock5, stock6, stock7, stock8]
  },
  {
    title: "College Football Statistics Analysis",
    type: "Full-Stack",
    description: "Comprehensive trend analysis system for college football data spanning 2004-2024 with 2,000,000+ tuples. Built React frontend with C#/.NET backend and Oracle database.",
    tech: ["C#/.NET", "React", "Oracle Database", "D3.js", "Chart.js"],
    links: { github: "https://github.com/rs-dkd/CollegeFootballStats" },
    images: [football1, football2, football3, football4, football5, football6]
  },
  {
    title: "Echo Journal: AI-Powered Journaling",
    type: "Mobile App",
    description: "iOS app using CoreML and custom NLP models to analyze emotions from journal entries, providing personalized recommendations and mood tracking.",
    tech: ["Swift", "CoreML", "NLP", "iOS", "Core Data"],
    links: { github: "https://github.com/rs-dkd/EchoJournal" },
    images: [journal1, journal2, journal3, journal4]
  },
  {
    title: "Programming Language Interpreter",
    type: "Compiler Design",
    description: "Architected a complete language processing pipeline with Lexer, Parser, Analyzer, and custom programming language supporting variables, control structures, and functions.",
    tech: ["Java", "Compiler Design", "Abstract Syntax Trees", "Symbol Tables"],
    links: { github: "https://github.com/rs-dkd/Programming_Language_Interpreter" },
    images: []
  },
  {
    title: "Route Optimization Visualization",
    type: "Algorithms",
    description: "Developed and compared A* and Dijkstra's pathfinding algorithms for real-world city navigation with interactive visualization using Bridges API.",
    tech: ["C++", "Bridges API", "Pathfinding Algorithms", "Data Structures"],
    links: { github: "https://github.com/rs-dkd/RouteOptimization" },
    images: [route1, route2, route3, route4]
  }
];

const researchProjects = [
  {
    title: "Graspable Memories: AI-Powered Projected Reality",
    type: "HCI Research",
    description: "Accepted to IEEE AIxVR 2026. Developed an Embodied Projected Mixed Reality system using AI hand tracking to enable seamless on-hand interaction with images, leveraging natural occlusion as a core interaction mechanism.",
    tech: ["Computer Vision", "AI Hand Tracking", "Projected Reality", "HCI", "Unity", "MediaPipe"],
    status: "Accepted",
    collaboration: "Dr. Alexandre Gomes de Siqueira",
    links: { paper: graspableMemoriesPDF },
    images: [graspableMemories1, graspableMemories2, graspableMemories3, graspableMemories4, graspableMemories5, graspableMemories6, graspableMemories7]
  },
  {
    title: "Beyond the Grasp: Volumetric EPMR (Senior Thesis)",
    type: "HCI Research",
    description: "Extended the Graspable Memories platform into a fully volumetric interaction model supporting hand tilt, improved tracking latency, continuous rotation, and spatial depth as control inputs. Expanded interaction modality through AI-powered object tracking. Broadened EPMR applications from personal media to collaborative creative systems.",
    tech: ["Embodied Interaction", "Volumetric Gestures", "HCI", "Unity", "Spatial Computing"],
    status: "Published",
    collaboration: "Dr. Alexandre Gomes de Siqueira",
    links: { paper: beyondTheGraspPDF },
    images: [seniorthesis1, seniorthesis2, seniorthesis3, seniorthesis4, seniorthesis5, seniorthesis6]
  },
  {
  title: "The Psychology of Command: Human-Virtual Agent Interaction",
  type: "HCI & VR Research",
  description: "Investigating how power dynamics and social hierarchy affect user comfort and performance in gesture-based interactions with virtual agents. Accepted as a poster to IEEE VR 2026.",
  tech: ["VR", "HCI", "Social Dynamics", "User Study", "Unreal Engine"],
  status: "Accepted",
  collaboration: "Dr. Alexandre Gomes de Siqueira",
  links: { paper: gesturesPolitenessPDF },
  images: [psych1]
  },
  {
    title: "VirtualHuman 2.0: Conversational Agentic AI in VR",
    type: "HCI & AI",
    description: "Developed immersive VR conversational AI with full-stack speech pipeline (Whisper STT, Gemini LLM, ElevenLabs TTS) and NeuroSync lip-sync. Leading integration of agentic AI framework for autonomous reasoning capabilities.",
    tech: ["VR", "Conversational AI", "HCI", "Whisper", "Gemini", "ElevenLabs", "Unreal Engine", "Agentic AI"],
    status: "Completed",
    collaboration: "Dr. Alexandre Gomes de Siqueira",
    links: {},
    images: [vh1, vh2, vh3, vh4, vh5]
  },
  {
    title: "Embodied Inscriptions: Fingerprints as Interactive Traces",
    type: "Tangible HCI",
    description: "Designed UI and led user evaluation for system repositioning fingerprints as expressive traces of presence and memory embedded in sculptable materials. Contributed to fingerprint tracking system development using computer vision.",
    tech: ["Tangible Interfaces", "Computer Vision", "HCI", "UI Design", "User Evaluation"],
    status: "Completed",
    collaboration: "Dr. Alexandre Gomes de Siqueira",
    links: {},
    images: [inscription1, inscription2, inscription3]
  },
  {
    title: "BlendReality: VR 3D Modeling",
    type: "Graphics & HCI",
    description: "Leading development of VR recreation of Blender with intuitive spatial modeling operations. Implementing natural hand gesture paradigms to replace traditional mouse-keyboard interfaces for 3D modeling workflows.",
    tech: ["VR", "Spatial Computing", "3D Modeling", "HCI", "Unity", "Polyhedral-Net Splines"],
    status: "Completed",
    collaboration: "Dr. Jörg Peters",
    links: { github: "https://github.com/rs-dkd/BlendReality" }, 
    images: [blend1, blend2, blend3, blend4, blend5, blend6, blend7, blend8]
    },
  {
    title: "AR-Guided Neonatal Occupational Therapy",
    type: "Medical AR/VR",
    description: "Designing VR/AR platform for neonatal occupational therapy training in collaboration with Shands Hospital. Created VR training environment and AR passthrough interface for guided parent exercises with real-time feedback.",
    tech: ["AR", "VR", "Medical Visualization", "HCI", "Unity", "Interactive Guidance"],
    status: "In Progress",
    collaboration: "Dr. Jörg Peters & Dr. Weiss, Shands Hospital",
    links: {},
    images: [neonatal1, neonatal2, neonatal3, neonatal4, neonatal5, neonatal6, neonatal7]
  },
  {
    title: "FloodRisk Digital Twins in VR/AR",
    type: "Environmental HCI",
    description: "Creating AI-powered flood risk simulations using digital twins in VR/AR for climate resilience planning. Designed VR interface with user tagging system for perceived damage/risk assessment and data-driven UI for subjective perception capture.",
    tech: ["VR/AR", "Digital Twins", "Environmental HCI", "Unity", "Unreal Engine", "User Interface Design"],
    status: "In Progress",
    collaboration: "Dr. Karla Saldaña Ochoa",
    links: {},
    images: [flood1, flood2, flood3, flood4, flood5, flood6, flood7, flood8]
  }
];

const Portfolio = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [showParticles, setShowParticles] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [canScroll, setCanScroll] = useState({ left: false, right: false });
  const [isMobile, setIsMobile] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [projectFilter, setProjectFilter] = useState('all');
  
  const allProjectsRef = useRef([...researchProjects, ...personalProjects]);
  const researchProjectsRef = useRef(researchProjects);
  const personalProjectsRef = useRef(personalProjects);

  const filteredProjects = useMemo(() => {
    if (projectFilter === 'all') {
      return allProjectsRef.current;
    } else if (projectFilter === 'research') {
      return researchProjectsRef.current;
    } else {
      return personalProjectsRef.current;
    }
  }, [projectFilter]);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 100) {
        setNavVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setNavVisible(false);
      } else {
        setNavVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  const navScrollRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const movedRef = useRef(false);

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

  const onNavPointerDown = (e) => {
    const el = navScrollRef.current;
    if (!el) return;

    isDraggingRef.current = true;
    movedRef.current = false;

    startXRef.current = e.pageX || (e.touches && e.touches[0].pageX);
    scrollLeftRef.current = el.scrollLeft;
    
    e.preventDefault();
  };

const onNavPointerMove = (e) => {
  const el = navScrollRef.current;
  if (!el || !isDraggingRef.current) return;

  const x = e.pageX || (e.touches && e.touches[0].pageX);
  const dx = x - startXRef.current;
  if (Math.abs(dx) > 3) movedRef.current = true;

  el.scrollLeft = scrollLeftRef.current - dx;
  e.preventDefault();
};

const endNavDrag = () => {
  isDraggingRef.current = false;
};

const onNavClick = (e, item) => {
  if (movedRef.current) {
    e.preventDefault();
    e.stopPropagation();
    return;
  }
  scrollToSection(item);
};

  const EducationSection = () => {
    const courses = {
      uf: [
        "COP 3503C Programming Fundamentals 2",
        "IDS 2935 Can We Design \"Better\" Humans?",
        "MAS 3114 Computational Linear Algebra",
        "PHY 2054 Physics 2 & Lab",
        "STA 3032 Engineering Statistics",
        "CDA 3101 Intro to Computer Organization",
        "CIS 4930 Intro to Virtual Reality",
        "COP 3530 Data Structures & Algorithms",
        "MUL 2010 Experiencing Music",
        "CEN 3031 Intro to Software Engineering",
        "CIS 4204 Penetration Testing",
        "CIS 4301 Information & Database Systems",
        "CIS 4930 Enterprise Software Engineering",
        "CAP 3027 Intro to Computational Media",
        "CAP 4770 Intro to Data Science",
        "COP 4020 Programming Language Concepts",
        "COP 4600 Operating Systems",
        "CIS 4362 Intro to Cryptology",
        "COP 4533 Algorithm Abstraction & Design",
        "EGN 4912 Engineering Research",
        "CAP 4621 Artificial Intelligence",
        "CIS 4715 CS Teaching & Learning",
        "CIS 4914 Senior Project"
      ],
      ucf: [
        "COP 3223C Intro to Programming with C",
        "COP 3502C Computer Science I",
        "CDA 3103C Computer Logic & Organization",
        "COT 3100C Intro to Discrete Structures",
        "COP 3330 Object Oriented Programming",
        "CIS 3360 Security in Computing",
        "STA 2023 Statistical Methods I",
        "MAC 2311C Calculus I",
        "MAC 2312 Calculus II",
        "MAC 2313 Calculus III",
        "PHY 2053 College Physics I & Lab",
        "BSC 2010C Biology I",
        "ENC 3241 Writing for Technical Professionals"
      ]
    };

    const timelineEvents = [
      { date: "May 2022", title: "Started at UCF", color: "#3b82f6" },
      { date: "Dec 2023", title: "Earned Associate Degree", color: "#a855f7" },
      { date: "Jan 2024", title: "Transferred to UF", color: "#3b82f6" },
      { date: "Dec 2025", title: "Earned Bachelor's Degree", color: "#facc15", pulse: true }
    ];

    const styles = {
      container: {
        padding: '2rem',
        color: 'white',
        maxWidth: '1200px',
        margin: '0 auto'
      },
      header: {
        textAlign: 'center',
        marginBottom: '3rem'
      },
      headerTitle: {
        fontSize: '3rem',
        fontWeight: 'bold',
        background: 'linear-gradient(to right, #60a5fa, #c084fc)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        margin: 0
      },
      card: {
        background: 'rgba(30, 41, 59, 0.5)',
        backdropFilter: 'blur(10px)',
        borderRadius: '1rem',
        padding: '2rem',
        border: '1px solid rgba(51, 65, 85, 1)',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        marginBottom: '2rem',
        transition: 'all 0.3s ease'
      },
      schoolHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.5rem'
      },
      schoolName: {
        fontSize: '1.875rem',
        fontWeight: 'bold',
        color: '#60a5fa',
        marginBottom: '0.5rem'
      },
      subText: {
        fontSize: '1.25rem',
        color: '#cbd5e1',
        marginBottom: '0.25rem'
      },
      metaText: {
        color: '#94a3b8'
      },
      gpaBox: {
        textAlign: 'right'
      },
      gpaValue: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#facc15',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        justifyContent: 'flex-end'
      },
      honorsBox: {
        background: 'rgba(15, 23, 42, 0.5)',
        padding: '1rem',
        borderRadius: '0.5rem',
        border: '1px solid rgba(71, 85, 105, 1)',
        marginBottom: '1.5rem'
      },
      courseGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '0.75rem',
        marginTop: '1rem',
        padding: '0 0.5rem'
      },
      courseItem: {
        display: 'flex',
        alignItems: 'center',
        color: '#94a3b8',
        fontSize: '0.95rem'
      },
      sectionTitle: {
        fontSize: '1.125rem',
        fontWeight: '600',
        color: '#cbd5e1',
        marginBottom: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      },
      timelineContainer: {
        marginTop: '3rem',
        padding: '1.5rem',
        background: 'rgba(30, 41, 59, 0.3)',
        borderRadius: '1rem',
        border: '1px solid rgba(51, 65, 85, 1)'
      },
      timelineTitle: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '1.5rem',
        color: '#cbd5e1'
      },
      timelineWrapper: {
        position: 'relative',
        maxWidth: '800px',
        margin: '0 auto'
      },
      timelineLine: {
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        height: '100%',
        width: '4px',
        background: 'linear-gradient(to bottom, #3b82f6, #a855f7)',
        borderRadius: '2px'
      },
      timelineItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '2rem',
        position: 'relative'
      },
      timelineDate: {
        width: '50%',
        paddingRight: '2rem',
        textAlign: 'right',
        color: '#94a3b8'
      },
      timelineContent: {
        width: '50%',
        paddingLeft: '2rem',
        color: '#cbd5e1',
        fontWeight: '600'
      },
      timelineDot: (color, pulse) => ({
        width: '1rem',
        height: '1rem',
        backgroundColor: color,
        borderRadius: '50%',
        border: '4px solid #0f172a',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        boxShadow: pulse ? `0 0 0 4px ${color}40` : 'none',
        animation: pulse ? 'pulse 2s infinite' : 'none'
      })
    };

    return (
      <div style={styles.container}>
        <style>
          {`
            @keyframes pulse {
              0% { box-shadow: 0 0 0 0 rgba(250, 204, 21, 0.7); }
              70% { box-shadow: 0 0 0 10px rgba(250, 204, 21, 0); }
              100% { box-shadow: 0 0 0 0 rgba(250, 204, 21, 0); }
            }
          `}
        </style>

        <div style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <GraduationCap size={40} color="#60a5fa" />
            <h1 style={styles.headerTitle}>Education</h1>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '1.125rem' }}>Academic Journey & Achievements</p>
        </div>

        <div 
          style={styles.card}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(51, 65, 85, 1)'}
        >
          <div style={styles.schoolHeader}>
            <div>
              <h2 style={styles.schoolName}>University of Florida</h2>
              <p style={styles.subText}>Bachelor of Science in Computer Science</p>
              <p style={styles.metaText}>Gainesville, FL • Jan 2024 – Dec 2025</p>
            </div>
            <div style={styles.gpaBox}>
              <div style={styles.gpaValue}>
                <Star size={20} fill="#facc15" color="#facc15" />
                <span>3.83 GPA</span>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Summa Cum Laude</p>
            </div>
          </div>

          <div style={styles.honorsBox}>
            <div style={styles.sectionTitle}>
              <Award size={20} color="#c084fc" />
              <span style={{ color: '#c084fc' }}>Honors & Awards</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#cbd5e1' }}>
              {['Summa Cum Laude', 'Bright Futures Florida Academic Scholars Award (100% Tuition)', "Dean's List Spring 2025"].map((honor, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#c084fc', marginRight: '0.5rem' }}>•</span>
                  {honor}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={styles.sectionTitle}>Research Focus</h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['Human-Computer Interaction', 'Computer Graphics', 'Spatial Computing'].map((focus, i) => (
                <span key={i} style={{ 
                  padding: '0.25rem 0.75rem', 
                  background: 'rgba(59, 130, 246, 0.2)', 
                  color: '#93c5fd', 
                  borderRadius: '9999px', 
                  fontSize: '0.875rem',
                  border: '1px solid rgba(59, 130, 246, 0.3)'
                }}>
                  {focus}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div style={styles.sectionTitle}>
              <BookOpen size={20} color="#60a5fa" />
              <span>Relevant Coursework</span>
            </div>
            <div style={styles.courseGrid}>
              {courses.uf.map((course, idx) => (
                <div key={idx} style={styles.courseItem}>
                  <span style={{ color: '#60a5fa', marginRight: '0.5rem' }}>→</span>
                  <span>{course}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div 
          style={styles.card}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(51, 65, 85, 1)'}
        >
          <div style={styles.schoolHeader}>
            <div>
              <h2 style={styles.schoolName}>University of Central Florida</h2>
              <p style={styles.subText}>Associate of Arts</p>
              <p style={styles.metaText}>Orlando, FL • May 2022 – Dec 2023</p>
            </div>
          </div>

          <div>
            <div style={styles.sectionTitle}>
              <BookOpen size={20} color="#60a5fa" />
              <span>Foundational Coursework</span>
            </div>
            <div style={styles.courseGrid}>
              {courses.ucf.map((course, idx) => (
                <div key={idx} style={styles.courseItem}>
                  <span style={{ color: '#60a5fa', marginRight: '0.5rem' }}>→</span>
                  <span>{course}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={styles.timelineContainer}>
          <h3 style={styles.timelineTitle}>Academic Timeline</h3>
          <div style={styles.timelineWrapper}>
            <div style={styles.timelineLine}></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {timelineEvents.map((event, index) => (
                <div key={index} style={styles.timelineItem}>
                  <div style={styles.timelineDate}>{event.date}</div>
                  <div style={styles.timelineDot(event.color, event.pulse)}></div>
                  <div style={styles.timelineContent}>{event.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ImageModal = ({ project, onClose, currentIndex, setCurrentIndex }) => {
  if (!project || !project.images || project.images.length === 0) return null;
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(5px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }} onClick={onClose}>
      <div style={{
        maxWidth: '1000px',
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }} onClick={(e) => e.stopPropagation()}>
        
        <button onClick={onClose} style={{
          position: 'absolute',
          top: '-2.5rem',
          right: '0',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: 'white',
          fontSize: '1.5rem',
          cursor: 'pointer',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1001
        }}>✕</button>
        
        <div style={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem'
        }}>
          
          {project.images.length > 1 && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex((currentIndex - 1 + project.images.length) % project.images.length);
              }} 
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontSize: '1.5rem',
                padding: '0.75rem 1rem',
                cursor: 'pointer',
                borderRadius: '50%',
                flexShrink: 0,
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(167, 139, 250, 0.3)';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              ←
            </button>
          )}
          
          <img 
            src={project.images[currentIndex]} 
            alt={`${project.title} - Image ${currentIndex + 1}`}
            style={{
              maxWidth: project.images.length > 1 ? 'calc(100% - 140px)' : '100%',
              width: 'auto',
              height: 'auto',
              maxHeight: '70vh',
              objectFit: 'contain',
              borderRadius: '12px',
              border: '2px solid rgba(167, 139, 250, 0.3)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
            }} 
          />
          
          {project.images.length > 1 && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex((currentIndex + 1) % project.images.length);
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontSize: '1.5rem',
                padding: '0.75rem 1rem',
                cursor: 'pointer',
                borderRadius: '50%',
                flexShrink: 0,
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(167, 139, 250, 0.3)';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              →
            </button>
          )}
        </div>
        
        {project.images.length > 1 && (
          <div style={{
            textAlign: 'center',
            color: 'white',
            marginTop: '1rem',
            fontSize: '1rem',
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(10px)',
            padding: '0.5rem 1.5rem',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            {currentIndex + 1} / {project.images.length}
          </div>
        )}
        
        <div style={{
          textAlign: 'center',
          color: 'white',
          marginTop: '0.5rem',
          fontSize: '1.1rem',
          fontWeight: '600',
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
          padding: '0.75rem 1.5rem',
          borderRadius: '20px',
          border: '1px solid rgba(167, 139, 250, 0.3)'
        }}>
          {project.title}
        </div>
      </div>
    </div>
  );
};
const ProjectCube = ({ projects, onProjectClick }) => {
  const meshRef = useRef();
  const [hoveredFace, setHoveredFace] = useState(null);
  const [materials, setMaterials] = useState([]);
  
  const selectedProjectsRef = useRef(null);
  const selectedImagesRef = useRef(null);
  const projectsKeyRef = useRef('');
  
  const projectsKey = useMemo(() => {
    return projects.map(p => p.title).sort().join('|');
  }, [projects]);
  
  if (projectsKeyRef.current !== projectsKey) {
    projectsKeyRef.current = projectsKey;
    const projectsWithImages = projects.filter(p => p.images && p.images.length > 0);
    const shuffled = [...projectsWithImages].sort(() => Math.random() - 0.5);
    selectedProjectsRef.current = shuffled.slice(0, 6);
    selectedImagesRef.current = selectedProjectsRef.current.map(project => 
      project.images[Math.floor(Math.random() * project.images.length)]
    );
  }
  
  useEffect(() => {
    if (!selectedImagesRef.current) return;
    
    const newMaterials = [];
    let loadedCount = 0;
    
    selectedImagesRef.current.forEach((imageSrc, index) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.8,
        metalness: 0.1,
        emissive: new THREE.Color(0x000000),
        emissiveIntensity: 0
      });
      
      newMaterials[index] = material;
      
      img.onload = () => {
        const imgAspect = img.width / img.height;
        let drawWidth, drawHeight, drawX, drawY;
        
        drawHeight = canvas.height;
        drawWidth = canvas.height * imgAspect;
        drawX = (canvas.width - drawWidth) / 2;
        drawY = 0;
        
        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.needsUpdate = true;
        
        material.map = texture;
        material.needsUpdate = true;
        
        loadedCount++;
        
        if (loadedCount === selectedImagesRef.current.length) {
          setMaterials([...newMaterials]);
        }
      };
      
      img.onerror = () => {
        console.error(`Failed to load image: ${imageSrc}`);
        loadedCount++;
        if (loadedCount === selectedImagesRef.current.length) {
          setMaterials([...newMaterials]);
        }
      };
      
      img.src = imageSrc;
    });
  }, [projectsKey]);
  
  useFrame((state, delta) => {
    if (meshRef.current && hoveredFace === null) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x += delta * 0.1;
    }
    
    materials.forEach((material, index) => {
      if (hoveredFace === index) {
        material.emissive.setHex(0xa78bfa);
        material.emissiveIntensity = 0.5;
      } else {
        material.emissive.setHex(0x000000);
        material.emissiveIntensity = 0;
      }
    });
  });
  
  const handlePointerMove = (event) => {
    event.stopPropagation();
    const faceIndex = Math.floor(event.faceIndex / 2);
    setHoveredFace(faceIndex);
    document.body.style.cursor = 'pointer';
  };
  
  const handleClick = (event) => {
    event.stopPropagation();
    const faceIndex = Math.floor(event.faceIndex / 2);
    const project = selectedProjectsRef.current?.[faceIndex];
    if (project) {
      onProjectClick(project);
    }
  };
  
  if (materials.length < 6) {
    return (
      <mesh>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color="#4338ca" />
      </mesh>
    );
  }
  
  return (
    <group>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerMove={handlePointerMove}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHoveredFace(null);
          document.body.style.cursor = 'default';
        }}
        material={materials}
      >
        <boxGeometry args={[3, 3, 3]} />
      </mesh>
      
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#ffffff" />
    </group>
  );
};

  const skillCategories = [
    {
      icon: <Glasses size={40} />,
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
      icon: <Brain size={40} />,
      title: "AI & Machine Learning",
      skills: ["Computer Vision", "NLP", "TensorFlow", "PyTorch", "MediaPipe", "LLM Integration", "Agentic AI"],
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
      icon: <Palette size={40} />,
      title: "HCI & Interaction Design",
      skills: ["User Evaluation", "Tangible Interfaces", "Embodied Interaction", "UI/UX Design", "Spatial Interaction", "Natural User Interfaces"],
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
      icon: <Gamepad2 size={40} />,
      title: "Graphics & 3D Modeling",
      skills: ["Blender", "3D Modeling", "Polyhedral-Net Splines", "Mesh Processing", "Procedural Generation", "ArcGIS Pro"],
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
      icon: <Code size={40} />,
      title: "Programming Languages",
      skills: ["Python", "C++", "C#", "Swift", "JavaScript", "Java"],
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
      icon: <Cpu size={40} />,
      title: "High-Performance Computing",
      skills: ["CUDA", "OpenCL", "Parallel Computing", "GPU Optimization", "HiperGator Cluster"],
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
      name: "VR/AR", 
      color: "#4ecdc4", 
      position: [0, 2, 0],
      description: "Unity XR, Unreal Engine, Spatial Computing"
    },
    { 
      name: "AI/ML", 
      color: "#ff6b6b", 
      position: [2.5, 1, 0],
      description: "Computer Vision, NLP, LLM Integration"
    },
    { 
      name: "HCI", 
      color: "#fa7343", 
      position: [2.5, -1, 0],
      description: "Tangible Interfaces, Embodied Interaction"
    },
    { 
      name: "Graphics", 
      color: "#45b7d1", 
      position: [0, -2, 0],
      description: "3D Modeling, Mesh Processing"
    },
    { 
      name: "Mobile", 
      color: "#a78bfa", 
      position: [-2.5, -1, 0],
      description: "Swift, iOS Development, CoreML"
    },
    { 
      name: "HPC", 
      color: "#76b900", 
      position: [-2.5, 1, 0],
      description: "CUDA, Parallel Computing"
    }
  ];

  const researchExperience = [
    {
      title: "Research Assistant - HCI Lab",
      company: "University of Florida",
      period: "Apr 2025 - Present",
      location: "Gainesville, FL",
      description: "Leading development of multiple HCI research projects focused on projected reality, conversational Agentic AI, and tangible interfaces under Dr. Alexandre Gomes de Siqueira.",
      achievements: [
        "Lead developer of AI-powered projected reality system (Graspable Memories) - paper accepted to IEEE AIxVR 2026",
        "Extending platform into fully volumetric interaction model for senior thesis (Beyond the Grasp)",
        "Co-authored research on power dynamics in human-agent interaction, resulting in a poster accepted to IEEE VR 2026",
        "Built VR conversational AI system integrating Whisper, Gemini LLM, ElevenLabs TTS, and NeuroSync lip-sync",
        "Leading integration of agentic AI framework with autonomous reasoning capabilities",
        "Designed UI and conducted user evaluation for Embodied Inscriptions fingerprint tracking system"
      ],
      tech: ["Unity", "Unreal Engine", "Computer Vision", "MediaPipe", "LLMs", "VR", "HCI Research"]
    },
    {
      title: "Research Assistant - SurfLab",
      company: "University of Florida",
      period: "May 2025 - Present",
      location: "Gainesville, FL", 
      description: "Developing VR 3D modeling platform and AR medical applications under Dr. Jörg Peters, focusing on intuitive spatial interaction paradigms.",
      achievements: [
        "Lead developer of BlendReality: VR recreation of Blender with natural hand gesture interfaces",
        "Integrated Polyhedral-Net-Splines algorithms for real-time mesh smoothing in VR",
        "Designed VR/AR platform for neonatal occupational therapy in collaboration with Shands Hospital",
        "Created VR training environment and AR passthrough interface with real-time feedback systems",
        "Compiled literature on VR modeling best practices to establish intuitive interaction paradigms"
      ],
      tech: ["Unity", "VR", "AR", "Computer Graphics", "Medical Visualization", "Spatial Interaction"]
    },
    {
      title: "Research Assistant - AI-Share Lab",
      company: "University of Florida",
      period: "Jun 2025 - Present",
      location: "Gainesville, FL",
      description: "Developing VR/AR digital twin simulations for flood risk analysis and climate resilience planning with Dr. Karla Saldaña Ochoa.",
      achievements: [
        "Designed VR flood simulation interface with user tagging system for damage/risk assessment",
        "Created data-driven UI for capturing subjective perceptions in immersive environments",
        "Led comparative study of procedural modeling workflows (ArcGIS Pro, CityEngine, BlenderGIS)",
        "Modeled 30+ buildings using real-world textures from GIS data and Street View imagery",
        "Developed Python automation scripts for mesh optimization in large-scale urban environments"
      ],
      tech: ["VR", "AR", "Unity", "Unreal Engine", "Digital Twins", "Environmental HCI", "Python"]
    }
  ];

  const workExperience = [
    {
      title: "Chief Scientist",
      company: "NASA L'SPACE Program",
      period: "Jan 2026 - Present",
      location: "Remote / Tempe, AZ",
      description: "Leading the science sub-team in developing a robotic mission concept to explore permanently shadowed regions (PSRs) at the lunar south pole for volatile characterization, as part of NASA's Lucy Student Pipeline Accelerator and Competency Enabler (L'SPACE) program.",
      achievements: [
        "Directing development of the Science Traceability Matrix (STM) to characterize lunar volatiles in PSRs and establish measurement requirements for understanding volatile origin processes",
        "Leading landing site selection research using NASA's JMARS/JMOON GIS tools to identify zones meeting strict illumination, communication, and slope constraints",
        "Orchestrating mission ConOps (Phases A-B) and instrument alignment with NASA SMD goals, managing a $150M projected lifecycle budget",
        "Coordinating interdisciplinary team of scientists, engineers, and technicians across all mission planning phases"
      ],
      tech: ["JMARS/JMOON", "GIS", "Python", "Mission Planning", "Science Traceability", "ConOps"]
    },
    {
      title: "Peer Mentor - Introduction to Virtual Reality",
      company: "University of Florida",
      period: "Aug 2025 - Dec 2025",
      location: "Gainesville, FL",
      description: "Supporting instruction for undergraduate VR course with 150+ students, facilitating hands-on learning with Unity XR development.",
      achievements: [
        "Mentor 150+ undergraduate students in Unity XR development and spatial computing concepts",
        "Lead lab sessions covering VR hardware setup, tracking systems, and spatial interaction design",
        "Provide detailed feedback on 3D programming concepts and C# programming",
        "Assist students in debugging complex VR applications, improving overall project quality"
      ],
      tech: ["Unity XR", "C#", "VR Development", "Spatial Computing", "Teaching"]
    },
    {
      title: "Web Development Intern",
      company: "Aquarelle Realty",
      period: "Feb 2023 - Jan 2025",
      location: "Orlando, FL",
      description: "Developed and maintained full-stack web functionalities for real estate platform, integrating various API features.",
      achievements: [
        "Developed full-stack web functionalities using PHP, JavaScript, CSS, and MySQL",
        "Integrated third-party APIs for property listings, mortgage calculations, and geolocation",
        "Optimized website performance and search rankings through SEO implementation",
        "Enhanced user experience through intuitive interface design"
      ],
      tech: ["JavaScript", "PHP", "MySQL", "CSS", "API Integration"]
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
    nav: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 40,
      background: 'rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '0.75rem 0',
      transform: navVisible ? 'translateY(0)' : 'translateY(-100%)',
      transition: 'transform 0.3s ease-in-out'
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
      fontFamily: "'Orbitron', monospace",
      flexShrink: 0,
      marginRight: '2rem'
    },
    navLinks: {
      display: 'flex',
      alignItems: 'center',
      gap: '2rem',
      listStyle: 'none',
      margin: 0,
      padding: '10px 1rem',
      height: '100%',
      paddingRight: '1.5rem',
      paddingLeft: '0.5rem',
      overflowX: 'auto',
      overflowY: 'hidden',
      whiteSpace: 'nowrap',
      maxWidth: '100%',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      flex: 1,
      minWidth: 0,
      WebkitOverflowScrolling: 'touch'
    },
    navButton: {
      background: 'none',
      border: 'none',
      color: 'rgba(255, 255, 255, 0.8)',
      cursor: 'pointer',
      textTransform: 'capitalize',
      transition: 'all 0.3s ease',
      fontSize: '0.95rem',
      padding: '0.5rem 1.25rem',
      margin: '2px, 0',
      lineHeight: 1,
      borderRadius: '20px',
      position: 'relative',
      flexShrink: 0,
      fontWeight: '500'
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
    hero: {
      position: 'relative',
      minHeight: '100vh',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '80px'
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
      fontFamily: "'Orbitron', monospace",
      wordBreak: 'break-word',
      padding: '0 1rem',
      lineHeight: 1.2
    },
    aboutGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
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
      padding: '1.5rem',
      borderRadius: '20px',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      minHeight: '120px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    statValue: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #a78bfa, #f472b6)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
      wordBreak: 'break-word',
      hyphens: 'auto'
    },
    statLabel: {
      fontSize: '0.85rem',
      color: '#9ca3af',
      marginTop: '0.5rem',
      wordBreak: 'break-word',
      lineHeight: 1.3
    },
    profileContainer: {
      position: 'relative',
      textAlign: 'center'
    },
    profileImage: {
      width: '90%',
      maxWidth: '320px',
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
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
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
    periodBadge: {
      background: 'linear-gradient(45deg, #7c3aed, #ec4899)',
      padding: '0.75rem 1.5rem',
      borderRadius: '25px',
      fontSize: '0.9rem',
      fontWeight: '600'
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
    const projectCubeElement = useMemo(() => (
    <ProjectCube 
      projects={filteredProjects}
      onProjectClick={(project) => setSelectedProject(project)}
    />
  ), [filteredProjects]);
  return (
    <div style={styles.container}>
      <nav style={{...styles.nav, transform: navVisible ? 'translateY(0)' : 'translateY(-100%)'}}>
        <div style={styles.navContainer}>
          <div style={styles.logo}>Reggie Segovia</div>
            <div
              ref={navScrollRef}
              style={{
                ...styles.navLinks,
                cursor: isDraggingRef.current ? 'grabbing' : 'grab',
                userSelect: 'none',
                touchAction: 'pan-x'
              }}
              className="nav-links"
              onPointerDown={onNavPointerDown}
              onPointerMove={onNavPointerMove}
              onPointerUp={endNavDrag}
              onPointerLeave={endNavDrag}
              onPointerCancel={endNavDrag}
              onTouchStart={onNavPointerDown}
              onTouchMove={onNavPointerMove}
              onTouchEnd={endNavDrag}
            >
            {['home', 'about', 'education', 'skills', 'research', 'projects', 'research-experience', 'work-experience', 'contact'].map((item) => (
              <button
                key={item}
                onClick={(e) => onNavClick(e, item)}
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
        </div>
        
        <div style={styles.mobileMenu}>
          {['home', 'about', 'skills', 'research', 'projects', 'research-experience', 'work-experience', 'contact'].map((item) => (
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
              <Hero3DText text="Reggie Segovia" position={[0, 1, 0]} size={isMobile ? 1.5 : 2.2} />
              <Hero3DText text="HCI Researcher & Developer" position={[0, 0, 0]} size={isMobile ? 0.6 : 0.9} />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>
        
        <div style={styles.heroContent}>
          <p style={styles.heroText}>
            Computer Science Researcher specializing in projected reality interfaces, artificial intelligence, embodied interaction, computer graphics, and immersive technologies. 
            Developing cutting-edge research in tangible interfaces, VR/AR, computer graphics, agentic AI, virtual agents, and spatial computing 
            for medical, environmental, and creative applications.
          </p>
          
          <div style={styles.socialLinks}>
            {[
              { icon: <Mail size={18} />, label: "Email", isEmail: true },
              { icon: <Linkedin size={18} />, label: "LinkedIn", href: "https://www.linkedin.com/in/reggie-segovia/" },
              { icon: <Github size={18} />, label: "GitHub", href: "https://github.com/rs-dkd" },
              { icon: <FileText size={18} />, label: "CV", href: cvPDF },
              { icon: <FileText size={18} />, label: "Resume", href: resumePDF },
              { icon: <Globe size={18} />, label: "Portfolio", href: "https://rs-dkd.github.io/my-portfolio/" }
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
            Explore Research ↓
          </button>
        </div>
      </section>

      <section id="about" style={styles.section}>
        <div>
          <h2 style={styles.sectionTitle}>About Me</h2>
          
          <div style={styles.aboutGrid}>
            <div>
              <p style={styles.aboutText}>
                I'm a Computer Science graduate from the University of Florida passionate about human-computer interaction, artificial intelligence 
                and immersive technologies. My research focuses on creating natural, embodied interfaces that enhance 
                how humans interact with digital information through projected reality, VR/AR, AI, and tangible interaction.
              </p>
              <p style={styles.aboutText}>
                Currently working on multiple HCI/AI research projects (Accepted to IEEE AIxVR 2026/IEEE VR 2026/UFIR)
                including an AI-powered projected reality system, conversational Agentic AI agents in VR, AR medical applications, and 
                environmental digital twins. My work bridges computer vision, spatial computing, and interaction design.
              </p>
              <p style={styles.aboutText}>
                I believe technology should feel natural and enhance human capabilities. Whether it's grasping memories 
                through hand gestures, training therapists in VR, or visualizing climate risks in immersive environments, 
                I'm driven to make computing more human-centered.
              </p>
              
              <div style={styles.statsGrid}>
                {[
                  { label: "GPA", value: "3.83" },
                  { label: "Research Projects", value: "8" },
                  { label: "Publications", value: "1 Published\n2 Accepted", smallText: true },
                  { label: "Research Focus", value: "HCI, AI, Graphics" }
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
                    <div style={{
                      ...styles.statValue, 
                      fontSize: stat.smallText ? '1.1rem' : '1.5rem',
                      lineHeight: 1.3
                    }}>{stat.value}</div>
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

      <section id="education" style={styles.section}>
        <EducationSection />
      </section>

      <section id="skills" style={styles.section}>
        <div>
          <h2 style={{...styles.sectionTitle, marginBottom: '2rem'}}>Technical Skills</h2>
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
      
      <section style={{...styles.section, padding: '4rem 2rem'}}>
  <div>
    <h2 style={{...styles.sectionTitle, marginBottom: '1rem'}}>Interactive Project Showcase</h2>
    <p style={{
      textAlign: 'center',
      color: '#c4b5fd',
      fontSize: '1.1rem',
      marginBottom: '3rem',
      maxWidth: '700px',
      margin: '0 auto 3rem auto'
    }}>
      Click on any face to explore projects. Drag to rotate the polyhedron.
    </p>
    <div style={{
  display: 'flex',
  justifyContent: 'center',
  gap: '1rem',
  marginBottom: '2rem',
  flexWrap: 'wrap'
}}>
  {[
    { label: 'All Projects', value: 'all' },
    { label: 'Research Only', value: 'research' },
    { label: 'Personal Only', value: 'personal' }
  ].map((filter) => (
    <button
      key={filter.value}
      onClick={() => setProjectFilter(filter.value)}
      style={{
        background: projectFilter === filter.value 
          ? 'linear-gradient(45deg, #7c3aed, #ec4899)' 
          : 'rgba(255, 255, 255, 0.05)',
        border: projectFilter === filter.value
          ? 'none'
          : '1px solid rgba(255, 255, 255, 0.2)',
        color: 'white',
        padding: '0.75rem 1.5rem',
        borderRadius: '25px',
        fontSize: '0.95rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: projectFilter === filter.value
          ? '0 10px 25px rgba(124, 58, 237, 0.4)'
          : 'none'
      }}
      onMouseEnter={(e) => {
        if (projectFilter !== filter.value) {
          e.target.style.background = 'rgba(255, 255, 255, 0.1)';
        }
      }}
      onMouseLeave={(e) => {
        if (projectFilter !== filter.value) {
          e.target.style.background = 'rgba(255, 255, 255, 0.05)';
        }
      }}
    >
      {filter.label}
    </button>
  ))}
</div>
    <div style={{
      height: '500px',
      width: '100%',
      maxWidth: '800px',
      margin: '0 auto',
      background: 'rgba(0, 0, 0, 0.2)',
      borderRadius: '24px',
      border: '1px solid rgba(167, 139, 250, 0.3)',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}
      style={{ pointerEvents: 'auto' }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Suspense fallback={null}>
          {projectCubeElement}
        </Suspense>
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minDistance={5}
          maxDistance={15}
          autoRotate={false}
          enableDamping={true}
          dampingFactor={0.05}
          mouseButtons={{
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.PAN
          }}
        />
        <Stars radius={100} depth={50} count={2000} factor={4} fade speed={1} />
      </Canvas>
    </div>
    
    <div style={{
      textAlign: 'center',
      marginTop: '2rem',
      color: '#94a3b8',
      fontSize: '0.9rem'
    }}>
      Scroll to zoom • Drag to rotate • Click faces to view project images
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
                onClick={() => project.images && project.images.length > 0 && setSelectedProject(project)}
                style={{...styles.projectCard, cursor: project.images?.length > 0 ? 'pointer' : 'default'}}
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
                             index === 1 ? 'linear-gradient(135deg, #ec4899, #f59e0b)' :
                             index === 2 ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' :
                             index === 3 ? 'linear-gradient(135deg, #db2777, #f472b6)' :
                             index === 4 ? 'linear-gradient(135deg, #dc2626, #f59e0b)' :
                             index === 5 ? 'linear-gradient(135deg, #ea580c, #f59e0b)' :
                             index === 6 ? 'linear-gradient(135deg, #6366f1, #a855f7)' :
                             'linear-gradient(135deg, #059669, #06b6d4)'
                }} />
                
                <div style={{position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 2}}>
                  <div style={styles.projectType}>{project.type}</div>
                </div>
                
                {project.status && (
                  <div style={{position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 2}}>
                    <div style={{
                      ...styles.projectStatus,
                      background: project.status === 'Under Review' ? 'rgba(251, 146, 60, 0.2)' :
                                 'rgba(59, 130, 246, 0.2)',
                      color: project.status === 'Under Review' ? '#fed7aa' : '#93c5fd'
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
                      👥 {project.collaboration}
                    </p>
                  )}
                  
                  <div style={styles.techTags}>
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} style={styles.techTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {Object.keys(project.links).length > 0 && (
                    <div style={styles.projectLinks}>
                      {Object.entries(project.links).map(([type, url], linkIndex) => (
                        <a
                          key={linkIndex}
                          href={url}
                          style={styles.projectLink}
                          target="_blank"
                          rel="noopener noreferrer"
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
                  )}
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
                  onClick={() => project.images && project.images.length > 0 && setSelectedProject(project)}
                  style={{...styles.projectCard, cursor: project.images?.length > 0 ? 'pointer' : 'default'}}
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
                  background: index === 0 ? 'linear-gradient(135deg, #dc2626, #ea580c)' :
                             index === 1 ? 'linear-gradient(135deg, #059669, #06b6d4)' :
                             index === 2 ? 'linear-gradient(135deg, #7c3aed, #ec4899)' :
                             index === 3 ? 'linear-gradient(135deg, #06b6d4, #3b82f6)' :
                             index === 4 ? 'linear-gradient(135deg, #f59e0b, #eab308)' :
                             index === 5 ? 'linear-gradient(135deg, #8b5cf6, #a855f7)' :
                             'linear-gradient(135deg, #0891b2, #06b6d4)'
                }} />
                
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
                        target="_blank"
                        rel="noopener noreferrer"
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

      {/* Research Experience */}
      <section id="research-experience" style={styles.section}>
        <div>
          <h2 style={styles.sectionTitle}>Research Experience</h2>
          
          <div style={styles.experienceGrid}>
            {researchExperience.map((job, index) => (
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
                    Key Contributions
                  </h4>
                  {job.achievements.map((achievement, achievementIndex) => (
                    <div 
                      key={achievementIndex} 
                      style={styles.achievementItem}
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

      {/* Work/Teaching Experience */}
      <section id="work-experience" style={styles.section}>
        <div>
          <h2 style={styles.sectionTitle}>Work & Teaching Experience</h2>
          
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
                    Key Contributions
                  </h4>
                  {job.achievements.map((achievement, achievementIndex) => (
                    <div 
                      key={achievementIndex} 
                      style={styles.achievementItem}
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

      <section id="contact" style={styles.section}>
        <div>
          <h2 style={styles.sectionTitle}>Let's Collaborate</h2>
          <p style={{...styles.heroText, textAlign: 'center', marginBottom: '3rem'}}>
            Interested in HCI research collaborations, immersive technology projects, AI/ML implementations, or discussing innovative 
            interaction paradigms? Let's connect!
          </p>
          
          <div style={styles.contactGrid}>
            {[
              { 
                icon: <Mail size={40} />, 
                title: "Email", 
                value: "rdavidsegovia@gmail.com",
                isEmail: true 
              },
              { 
                icon: <GraduationCap size={40} />, 
                title: "Research", 
                value: "HCI • Artificial Intelligence • Immersive Environments • Computer Graphics • Embodied Interaction", 
                href: "#research" 
              },
              { 
                icon: <Linkedin size={40} />, 
                title: "LinkedIn", 
                value: "Professional Network", 
                href: "https://www.linkedin.com/in/reggie-segovia/" 
              },
              { 
                icon: <Github size={40} />, 
                title: "GitHub", 
                value: "github.com/rs-dkd", 
                href: "https://github.com/rs-dkd" 
              },
              { 
                icon: <MapPin size={40} />, 
                title: "Location", 
                value: "Pittsburgh, PA", 
                href: "https://www.google.com/maps/place/Pittsburgh,+PA" 
              },
              { 
                icon: <Target size={40} />, 
                title: "Focus", 
                value: "Human-Computer Interaction/Artificial Intelligence/Computer Graphics", 
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

      <ImageModal 
        project={selectedProject} 
        onClose={() => {
          setSelectedProject(null);
          setCurrentImageIndex(0);
        }}
        currentIndex={currentImageIndex}
        setCurrentIndex={setCurrentImageIndex}
      />

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
        
        .nav-links::-webkit-scrollbar {
          display: none;
        }

        @media (max-width: 1024px) {
          .nav-links {
            display: flex !important;
          }
          
          .mobile-menu-button {
            display: block !important;
          }
          
          .skills-container {
            height: 400px;
          }
        }
        
        @media (max-width: 768px) {
          body::-webkit-scrollbar {
            display: none;
          }

          body {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          .hero-content {
            padding: 0 1rem;
          }

          .hero-text {
            font-size: 1rem !important;
            padding: 0 1rem;
          }
          
          .section {
            padding: 4rem 1rem !important;
          }
          
          .section-title {
            font-size: 2rem !important;
            padding: 0 1rem;
            word-wrap: break-word;
            line-height: 1.2 !important;
            hyphens: auto;
          }
          
          .stats-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          
          .course-grid {
            grid-template-columns: 1fr !important;
            padding: 0 0.5rem;
          }
          
          .course-item {
            font-size: 0.85rem !important;
          }
          
          .experience-card,
          .project-card {
            margin: 0 0.5rem;
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
          
          .experience-grid {
            grid-template-columns: 1fr !important;
          }
          
          .experience-header {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (max-width: 480px) {
          .hero-text {
            font-size: 0.95rem !important;
          }
          
          .section-title {
            font-size: 1.75rem !important;
            line-height: 1.3 !important;
          }
          
          .social-links {
            flex-direction: column;
            align-items: center;
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
      `}</style>
    </div>
  );
};

export default Portfolio;