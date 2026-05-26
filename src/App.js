import React, { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
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

import { GraduationCap, Award, BookOpen, Github, Linkedin, Mail, FileText, Globe, Glasses, Brain, Palette, Gamepad2, Code, Cpu, MapPin, Target } from 'lucide-react';

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

      ctx.fillStyle = '#f4f4f5';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const img = new Image();
      img.crossOrigin = 'anonymous';

      const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.8,
        metalness: 0.1,
        emissive: new THREE.Color(0x000000),
        emissiveIntensity: 0,
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
        material.emissive.setHex(0x18181b);
        material.emissiveIntensity = 0.15;
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
    if (project) onProjectClick(project);
  };

  if (materials.length < 6) {
    return (
      <mesh>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color="#e4e4e7" />
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
      <ambientLight intensity={1.8} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#ffffff" />
      <directionalLight position={[-5, -5, -5]} intensity={0.2} color="#f0f0f0" />
    </group>
  );
};

const personalProjects = [
  {
    title: "Disaster Response AI Simulator",
    type: "AI & Simulation",
    description: "Dynamic traffic and emergency response simulator in Unity using intelligent agents with A* pathfinding. Models real-time civilian evacuation and emergency vehicle routing during disasters (fires, floods, accidents) in a GIS-based virtual city environment.",
    tech: ["Unity", "C#", "A* Pathfinding", "AI Agents", "ArcGIS CityEngine", "FSM", "Decision Trees"],
    links: { github: "https://github.com/rs-dkd/DisasterResponseAI" },
    images: [disaster1, disaster2, disaster3, disaster4, disaster5, disaster6],
  },
  {
    title: "Everglades VR Experience",
    type: "VR/Unity",
    description: "Immersive VR adventure exploring the Everglades with realistic flora/fauna animations, designed to enhance conservation awareness through interactive education.",
    tech: ["Unity", "C#", "VR", "3D Modeling", "Environmental Design"],
    links: { github: "https://github.com/rs-dkd/EvergladesVR" },
    images: [everglades1, everglades2, everglades3, everglades4, everglades5, everglades6, everglades7, everglades8, everglades9, everglades10],
  },
  {
    title: "Stock Price Prediction with Twitter Sentiment",
    type: "Data Science",
    description: "Built machine learning models combining Twitter sentiment analysis with historical stock data, featuring interactive Streamlit visualizations for investment insights.",
    tech: ["Python", "NLP", "Machine Learning", "Streamlit", "Twitter API"],
    links: { github: "https://github.com/rs-dkd/SentimentStockAnalysis" },
    images: [stock1, stock2, stock3, stock4, stock5, stock6, stock7, stock8],
  },
  {
    title: "College Football Statistics Analysis",
    type: "Full-Stack",
    description: "Comprehensive trend analysis system for college football data spanning 2004–2024 with 2,000,000+ tuples. Built React frontend with C#/.NET backend and Oracle database.",
    tech: ["C#/.NET", "React", "Oracle Database", "D3.js", "Chart.js"],
    links: { github: "https://github.com/rs-dkd/CollegeFootballStats" },
    images: [football1, football2, football3, football4, football5, football6],
  },
  {
    title: "Echo Journal: AI-Powered Journaling",
    type: "Mobile App",
    description: "iOS app using CoreML and custom NLP models to analyze emotions from journal entries, providing personalized recommendations and mood tracking.",
    tech: ["Swift", "CoreML", "NLP", "iOS", "Core Data"],
    links: { github: "https://github.com/rs-dkd/EchoJournal" },
    images: [journal1, journal2, journal3, journal4],
  },
  {
    title: "Programming Language Interpreter",
    type: "Compiler Design",
    description: "Architected a complete language processing pipeline with Lexer, Parser, Analyzer, and custom programming language supporting variables, control structures, and functions.",
    tech: ["Java", "Compiler Design", "Abstract Syntax Trees", "Symbol Tables"],
    links: { github: "https://github.com/rs-dkd/Programming_Language_Interpreter" },
    images: [],
  },
  {
    title: "Route Optimization Visualization",
    type: "Algorithms",
    description: "Developed and compared A* and Dijkstra's pathfinding algorithms for real-world city navigation with interactive visualization using Bridges API.",
    tech: ["C++", "Bridges API", "Pathfinding Algorithms", "Data Structures"],
    links: { github: "https://github.com/rs-dkd/RouteOptimization" },
    images: [route1, route2, route3, route4],
  },
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
    images: [graspableMemories1, graspableMemories2, graspableMemories3, graspableMemories4, graspableMemories5, graspableMemories6, graspableMemories7],
  },
  {
    title: "Beyond the Grasp: Volumetric EPMR (Senior Thesis)",
    type: "HCI Research",
    description: "Extended the Graspable Memories platform into a fully volumetric interaction model supporting hand tilt, improved tracking latency, continuous rotation, and spatial depth as control inputs. Expanded interaction modality through AI-powered object tracking.",
    tech: ["Embodied Interaction", "Volumetric Gestures", "HCI", "Unity", "Spatial Computing"],
    status: "Published",
    collaboration: "Dr. Alexandre Gomes de Siqueira",
    links: { paper: beyondTheGraspPDF },
    images: [seniorthesis1, seniorthesis2, seniorthesis3, seniorthesis4, seniorthesis5, seniorthesis6],
  },
  {
    title: "The Psychology of Command: Human-Virtual Agent Interaction",
    type: "HCI & VR Research",
    description: "Investigating how power dynamics and social hierarchy affect user comfort and performance in gesture-based interactions with virtual agents. Accepted as a poster to IEEE VR 2026.",
    tech: ["VR", "HCI", "Social Dynamics", "User Study", "Unreal Engine"],
    status: "Accepted",
    collaboration: "Dr. Alexandre Gomes de Siqueira",
    links: { paper: gesturesPolitenessPDF },
    images: [psych1],
  },
  {
    title: "VirtualHuman 2.0: Conversational Agentic AI in VR",
    type: "HCI & AI",
    description: "Developed immersive VR conversational AI with full-stack speech pipeline (Whisper STT, Gemini LLM, ElevenLabs TTS) and NeuroSync lip-sync. Leading integration of agentic AI framework for autonomous reasoning capabilities.",
    tech: ["VR", "Conversational AI", "HCI", "Whisper", "Gemini", "ElevenLabs", "Unreal Engine", "Agentic AI"],
    status: "Completed",
    collaboration: "Dr. Alexandre Gomes de Siqueira",
    links: {},
    images: [vh1, vh2, vh3, vh4, vh5],
  },
  {
    title: "Embodied Inscriptions: Fingerprints as Interactive Traces",
    type: "Tangible HCI",
    description: "Designed UI and led user evaluation for system repositioning fingerprints as expressive traces of presence and memory embedded in sculptable materials. Contributed to fingerprint tracking system development using computer vision.",
    tech: ["Tangible Interfaces", "Computer Vision", "HCI", "UI Design", "User Evaluation"],
    status: "Completed",
    collaboration: "Dr. Alexandre Gomes de Siqueira",
    links: {},
    images: [inscription1, inscription2, inscription3],
  },
  {
    title: "BlendReality: VR 3D Modeling",
    type: "Graphics & HCI",
    description: "Leading development of VR recreation of Blender with intuitive spatial modeling operations. Implementing natural hand gesture paradigms to replace traditional mouse-keyboard interfaces for 3D modeling workflows.",
    tech: ["VR", "Spatial Computing", "3D Modeling", "HCI", "Unity", "Polyhedral-Net Splines"],
    status: "Completed",
    collaboration: "Dr. Jörg Peters",
    links: { github: "https://github.com/rs-dkd/BlendReality" },
    images: [blend1, blend2, blend3, blend4, blend5, blend6, blend7, blend8],
  },
  {
    title: "AR-Guided Neonatal Occupational Therapy",
    type: "Medical AR/VR",
    description: "Designing VR/AR platform for neonatal occupational therapy training in collaboration with Shands Hospital. Created VR training environment and AR passthrough interface for guided parent exercises with real-time feedback.",
    tech: ["AR", "VR", "Medical Visualization", "HCI", "Unity", "Interactive Guidance"],
    status: "In Progress",
    collaboration: "Dr. Jörg Peters & Dr. Weiss, Shands Hospital",
    links: {},
    images: [neonatal1, neonatal2, neonatal3, neonatal4, neonatal5, neonatal6, neonatal7],
  },
  {
    title: "FloodRisk Digital Twins in VR/AR",
    type: "Environmental HCI",
    description: "Creating AI-powered flood risk simulations using digital twins in VR/AR for climate resilience planning. Designed VR interface with user tagging system for perceived damage/risk assessment and data-driven UI for subjective perception capture.",
    tech: ["VR/AR", "Digital Twins", "Environmental HCI", "Unity", "Unreal Engine", "User Interface Design"],
    status: "In Progress",
    collaboration: "Dr. Karla Saldaña Ochoa",
    links: {},
    images: [flood1, flood2, flood3, flood4, flood5, flood6, flood7, flood8],
  },
];

const Portfolio = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [projectFilter, setProjectFilter] = useState('all');

  const allProjectsRef = useRef([...researchProjects, ...personalProjects]);
  const researchProjectsRef = useRef(researchProjects);
  const personalProjectsRef = useRef(personalProjects);

  const filteredProjects = useMemo(() => {
    if (projectFilter === 'all') return allProjectsRef.current;
    if (projectFilter === 'research') return researchProjectsRef.current;
    return personalProjectsRef.current;
  }, [projectFilter]);

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
    if (element) element.scrollIntoView({ behavior: 'smooth' });
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

  const endNavDrag = () => { isDraggingRef.current = false; };

  const onNavClick = (e, item) => {
    if (movedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    scrollToSection(item);
  };

  const skillCategories = [
    {
      icon: <Glasses size={28} />,
      title: "Immersive Technologies (VR/AR)",
      skills: ["Unity XR", "Unreal Engine", "Spatial Computing", "Projected Reality", "Hand Tracking", "LiveLink"],
      accent: "sky",
    },
    {
      icon: <Brain size={28} />,
      title: "AI & Machine Learning",
      skills: ["Computer Vision", "NLP", "TensorFlow", "PyTorch", "MediaPipe", "LLM Integration", "Agentic AI"],
      accent: "emerald",
    },
    {
      icon: <Palette size={28} />,
      title: "HCI & Interaction Design",
      skills: ["User Evaluation", "Tangible Interfaces", "Embodied Interaction", "UI/UX Design", "Spatial Interaction", "Natural User Interfaces"],
      accent: "pink",
    },
    {
      icon: <Gamepad2 size={28} />,
      title: "Graphics & 3D Modeling",
      skills: ["Blender", "3D Modeling", "Polyhedral-Net Splines", "Mesh Processing", "Procedural Generation", "ArcGIS Pro"],
      accent: "orange",
    },
    {
      icon: <Code size={28} />,
      title: "Programming Languages",
      skills: ["Python", "C++", "C#", "Swift", "JavaScript", "Java"],
      accent: "violet",
    },
    {
      icon: <Cpu size={28} />,
      title: "High-Performance Computing",
      skills: ["CUDA", "OpenCL", "Parallel Computing", "GPU Optimization", "HiperGator Cluster"],
      accent: "blue",
    },
  ];

  const accentStyles = {
    sky:     { icon: "bg-sky-100 text-sky-600",     tag: "bg-sky-50 text-sky-700 border-sky-200" },
    emerald: { icon: "bg-emerald-100 text-emerald-600", tag: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    pink:    { icon: "bg-pink-100 text-pink-600",   tag: "bg-pink-50 text-pink-700 border-pink-200" },
    orange:  { icon: "bg-orange-100 text-orange-600", tag: "bg-orange-50 text-orange-700 border-orange-200" },
    violet:  { icon: "bg-violet-100 text-violet-600", tag: "bg-violet-50 text-violet-700 border-violet-200" },
    blue:    { icon: "bg-blue-100 text-blue-600",   tag: "bg-blue-50 text-blue-700 border-blue-200" },
  };

  const researchExperience = [
    {
      title: "Research Assistant — HCI Lab",
      company: "University of Florida",
      period: "Apr 2025 – Present",
      location: "Gainesville, FL",
      description: "Leading development of multiple HCI research projects focused on projected reality, conversational Agentic AI, and tangible interfaces under Dr. Alexandre Gomes de Siqueira.",
      achievements: [
        "Lead developer of AI-powered projected reality system (Graspable Memories) — paper accepted to IEEE AIxVR 2026",
        "Extending platform into fully volumetric interaction model for senior thesis (Beyond the Grasp)",
        "Co-authored research on power dynamics in human-agent interaction — poster accepted to IEEE VR 2026",
        "Built VR conversational AI system integrating Whisper, Gemini LLM, ElevenLabs TTS, and NeuroSync lip-sync",
        "Leading integration of agentic AI framework with autonomous reasoning capabilities",
        "Designed UI and conducted user evaluation for Embodied Inscriptions fingerprint tracking system",
      ],
      tech: ["Unity", "Unreal Engine", "Computer Vision", "MediaPipe", "LLMs", "VR", "HCI Research"],
    },
    {
      title: "Research Assistant — SurfLab",
      company: "University of Florida",
      period: "May 2025 – Present",
      location: "Gainesville, FL",
      description: "Developing VR 3D modeling platform and AR medical applications under Dr. Jörg Peters, focusing on intuitive spatial interaction paradigms.",
      achievements: [
        "Lead developer of BlendReality: VR recreation of Blender with natural hand gesture interfaces",
        "Integrated Polyhedral-Net-Splines algorithms for real-time mesh smoothing in VR",
        "Designed VR/AR platform for neonatal occupational therapy in collaboration with Shands Hospital",
        "Created VR training environment and AR passthrough interface with real-time feedback systems",
        "Compiled literature on VR modeling best practices to establish intuitive interaction paradigms",
      ],
      tech: ["Unity", "VR", "AR", "Computer Graphics", "Medical Visualization", "Spatial Interaction"],
    },
    {
      title: "Research Assistant — AI-Share Lab",
      company: "University of Florida",
      period: "Jun 2025 – Present",
      location: "Gainesville, FL",
      description: "Developing VR/AR digital twin simulations for flood risk analysis and climate resilience planning with Dr. Karla Saldaña Ochoa.",
      achievements: [
        "Designed VR flood simulation interface with user tagging system for damage/risk assessment",
        "Created data-driven UI for capturing subjective perceptions in immersive environments",
        "Led comparative study of procedural modeling workflows (ArcGIS Pro, CityEngine, BlenderGIS)",
        "Modeled 30+ buildings using real-world textures from GIS data and Street View imagery",
        "Developed Python automation scripts for mesh optimization in large-scale urban environments",
      ],
      tech: ["VR", "AR", "Unity", "Unreal Engine", "Digital Twins", "Environmental HCI", "Python"],
    },
  ];

  const workExperience = [
    {
      title: "IT Specialist (AI Engineer)",
      company: "U.S. Department of the Treasury",
      period: "2026 – Present",
      location: "Washington, D.C.",
      description: "Developing and deploying AI-powered systems and tools within the Department of the Treasury, applying machine learning and intelligent automation to improve government operations and data workflows.",
      achievements: [
        "Designing and implementing AI/ML solutions to support Treasury initiatives",
        "Collaborating with cross-functional teams to integrate intelligent systems into existing infrastructure",
        "Researching and evaluating emerging AI technologies for government applicability",
      ],
      tech: ["Python", "Machine Learning", "AI/ML", "Government IT", "Data Engineering"],
    },
    {
      title: "Chief Scientist",
      company: "NASA L'SPACE Program",
      period: "Jan 2026 – Present",
      location: "Remote / Tempe, AZ",
      description: "Leading the science sub-team in developing a robotic mission concept to explore permanently shadowed regions (PSRs) at the lunar south pole for volatile characterization, as part of NASA's Lucy Student Pipeline Accelerator and Competency Enabler (L'SPACE) program.",
      achievements: [
        "Directing development of the Science Traceability Matrix (STM) to characterize lunar volatiles in PSRs",
        "Leading landing site selection research using NASA's JMARS/JMOON GIS tools",
        "Orchestrating mission ConOps (Phases A–B) and instrument alignment with NASA SMD goals, managing a $150M projected lifecycle budget",
        "Coordinating interdisciplinary team of scientists, engineers, and technicians across all mission planning phases",
      ],
      tech: ["JMARS/JMOON", "GIS", "Python", "Mission Planning", "Science Traceability", "ConOps"],
    },
    {
      title: "Peer Mentor — Introduction to Virtual Reality",
      company: "University of Florida",
      period: "Aug 2025 – Dec 2025",
      location: "Gainesville, FL",
      description: "Supporting instruction for undergraduate VR course with 150+ students, facilitating hands-on learning with Unity XR development.",
      achievements: [
        "Mentored 150+ undergraduate students in Unity XR development and spatial computing concepts",
        "Led lab sessions covering VR hardware setup, tracking systems, and spatial interaction design",
        "Provided detailed feedback on 3D programming concepts and C# programming",
        "Assisted students in debugging complex VR applications, improving overall project quality",
      ],
      tech: ["Unity XR", "C#", "VR Development", "Spatial Computing", "Teaching"],
    },
    {
      title: "Web Developer",
      company: "Aquarelle Realty",
      period: "Feb 2023 – Jan 2025",
      location: "Orlando, FL",
      description: "Developed and maintained full-stack web functionalities for real estate platform, integrating various API features.",
      achievements: [
        "Developed full-stack web functionalities using PHP, JavaScript, CSS, and MySQL",
        "Integrated third-party APIs for property listings, mortgage calculations, and geolocation",
        "Optimized website performance and search rankings through SEO implementation",
        "Enhanced user experience through intuitive interface design",
      ],
      tech: ["JavaScript", "PHP", "MySQL", "CSS", "API Integration"],
    },
  ];

  const statusStyle = (status) => {
    switch (status) {
      case 'Accepted':  return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'Published': return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'In Progress': return 'bg-amber-50 text-amber-700 border border-amber-200';
      default:          return 'bg-zinc-100 text-zinc-600 border border-zinc-200';
    }
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
        "CIS 4914 Senior Project",
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
        "ENC 3241 Writing for Technical Professionals",
      ],
    };

    const timelineEvents = [
      { date: "May 2022",  label: "Started at UCF" },
      { date: "Dec 2023",  label: "Earned Associate Degree" },
      { date: "Jan 2024",  label: "Transferred to UF" },
      { date: "Dec 2025",  label: "Earned Bachelor's Degree" },
      { date: "Fall 2026", label: "Starting Columbia University — MS CS", highlight: true },
    ];

    return (
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">Academic Background</p>
          <div className="flex items-center justify-center gap-3 mb-2">
            <GraduationCap size={32} className="text-zinc-900" />
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900">Education</h2>
          </div>
          <p className="text-zinc-500">Academic journey &amp; achievements</p>
        </div>

        {/* Columbia Card */}
        <div className="bg-white border border-zinc-200 rounded-xl p-8 mb-6 hover:shadow-md transition-shadow">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-1">Columbia University</h3>
              <p className="text-zinc-600 font-medium mb-1">Master of Science in Computer Science</p>
              <p className="text-zinc-400 text-sm">New York, NY &bull; Fall 2026 – Present</p>
            </div>
            <span className="px-3 py-1 bg-zinc-900 text-white text-xs font-semibold rounded-full shrink-0">Upcoming</span>
          </div>
        </div>

        {/* UF Card */}
        <div className="bg-white border border-zinc-200 rounded-xl p-8 mb-6 hover:shadow-md transition-shadow">
          <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
            <div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-1">University of Florida</h3>
              <p className="text-zinc-600 font-medium mb-1">Bachelor of Science in Computer Science</p>
              <p className="text-zinc-400 text-sm">Gainesville, FL &bull; Jan 2024 – Dec 2025</p>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold text-zinc-900">3.83 GPA</span>
              <p className="text-zinc-400 text-sm mt-0.5">Summa Cum Laude</p>
            </div>
          </div>

          <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Award size={16} className="text-zinc-600" />
              <span className="text-sm font-semibold text-zinc-700">Honors &amp; Awards</span>
            </div>
            <ul className="space-y-1.5">
              {['Summa Cum Laude', 'Bright Futures Florida Academic Scholars Award (100% Tuition)', "Dean's List Spring 2025"].map((honor, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-zinc-600">
                  <span className="text-zinc-400 mt-0.5">—</span>
                  {honor}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-semibold text-zinc-700 mb-3">Research Focus</h4>
            <div className="flex flex-wrap gap-2">
              {['Human-Computer Interaction', 'Computer Graphics', 'Spatial Computing'].map((focus, i) => (
                <span key={i} className="px-3 py-1 bg-zinc-900 text-white text-xs font-medium rounded-full">
                  {focus}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={16} className="text-zinc-600" />
              <span className="text-sm font-semibold text-zinc-700">Relevant Coursework</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1.5">
              {courses.uf.map((course, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-zinc-500">
                  <span className="text-zinc-300 mt-0.5 shrink-0">›</span>
                  <span>{course}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* UCF Card */}
        <div className="bg-white border border-zinc-200 rounded-xl p-8 mb-6 hover:shadow-md transition-shadow">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-zinc-900 mb-1">University of Central Florida</h3>
            <p className="text-zinc-600 font-medium mb-1">Associate of Arts</p>
            <p className="text-zinc-400 text-sm">Orlando, FL &bull; May 2022 – Dec 2023</p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={16} className="text-zinc-600" />
              <span className="text-sm font-semibold text-zinc-700">Foundational Coursework</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1.5">
              {courses.ucf.map((course, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-zinc-500">
                  <span className="text-zinc-300 mt-0.5 shrink-0">›</span>
                  <span>{course}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-6">
          <h3 className="text-base font-semibold text-zinc-700 text-center mb-6">Academic Timeline</h3>
          <div className="relative max-w-lg mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-200 -translate-x-1/2" />
            <div className="flex flex-col gap-6">
              {timelineEvents.map((event, index) => (
                <div key={index} className="flex items-center relative">
                  <div className="w-1/2 pr-6 text-right text-sm text-zinc-400">{event.date}</div>
                  <div className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-white z-10 ${event.highlight ? 'bg-zinc-900 shadow-md' : 'bg-zinc-400'}`} />
                  <div className={`w-1/2 pl-6 text-sm font-medium ${event.highlight ? 'text-zinc-900' : 'text-zinc-600'}`}>{event.label}</div>
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
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="max-w-4xl w-full relative flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute -top-10 right-0 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors text-sm"
          >
            ✕
          </button>

          <div className="relative w-full flex items-center justify-center gap-3">
            {project.images.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setCurrentIndex((currentIndex - 1 + project.images.length) % project.images.length); }}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors shrink-0"
              >
                ←
              </button>
            )}

            <img
              src={project.images[currentIndex]}
              alt={`${project.title} — ${currentIndex + 1}`}
              className="max-h-[70vh] w-auto object-contain rounded-xl border border-white/10"
              style={{ maxWidth: project.images.length > 1 ? 'calc(100% - 100px)' : '100%' }}
            />

            {project.images.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setCurrentIndex((currentIndex + 1) % project.images.length); }}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors shrink-0"
              >
                →
              </button>
            )}
          </div>

          <div className="flex flex-col items-center gap-2 mt-4">
            {project.images.length > 1 && (
              <span className="text-sm text-white/60">{currentIndex + 1} / {project.images.length}</span>
            )}
            <span className="text-sm font-medium text-white/90 bg-black/40 px-4 py-1.5 rounded-full border border-white/10">
              {project.title}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const projectCubeElement = useMemo(() => (
    <ProjectCube
      projects={filteredProjects}
      onProjectClick={(project) => setSelectedProject(project)}
    />
  ), [filteredProjects]);

  const navItems = ['home', 'about', 'education', 'skills', 'research', 'projects', 'research-experience', 'work-experience', 'contact'];

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans">

      {/* ── Navigation ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 bg-white/95 border-b border-zinc-200 backdrop-blur-sm"
        style={{ transform: navVisible ? 'translateY(0)' : 'translateY(-100%)', transition: 'transform 0.3s ease-in-out' }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center h-14">
          <span className="text-sm font-semibold text-zinc-900 shrink-0 mr-6">Reggie Segovia</span>

          <div
            ref={navScrollRef}
            className="flex items-center gap-1 overflow-x-auto flex-1 min-w-0 select-none nav-scroll"
            style={{ cursor: isDraggingRef.current ? 'grabbing' : 'auto', touchAction: 'pan-x' }}
            onPointerDown={onNavPointerDown}
            onPointerMove={onNavPointerMove}
            onPointerUp={endNavDrag}
            onPointerLeave={endNavDrag}
            onPointerCancel={endNavDrag}
          >
            {navItems.map((item) => (
              <button
                key={item}
                onClick={(e) => onNavClick(e, item)}
                className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors capitalize ${
                  currentSection === item
                    ? 'bg-zinc-900 text-white'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                {item.replace('-', ' ')}
              </button>
            ))}
          </div>

          <button
            className="ml-4 shrink-0 p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="text-lg leading-none">☰</span>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-zinc-200 bg-white px-6 py-4 flex flex-col gap-1 md:hidden">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-left px-3 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded-md transition-colors capitalize"
              >
                {item.replace('-', ' ')}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-14">
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <div className="flex justify-center mb-8">
            <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-zinc-200 ring-4 ring-zinc-50 shadow-sm">
              <img src={profilePic} alt="Reggie Segovia" className="w-full h-full object-cover" style={{ objectPosition: '50% 20%' }} />
            </div>
          </div>

          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">AI/HCI Researcher &amp; Developer</p>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-zinc-900 mb-4">Reggie Segovia</h1>
          <p className="text-base text-zinc-500 leading-relaxed max-w-2xl mx-auto mb-8">
            Computer Science researcher specializing in projected reality interfaces, artificial intelligence, embodied interaction,
            computer graphics, and immersive technologies. Developing cutting-edge work in VR/AR, agentic AI, spatial computing,
            and tangible interfaces for medical, environmental, and creative applications.
          </p>

          <div className="flex flex-wrap justify-center gap-2.5 mb-10">
            {[
              { icon: <Mail size={15} />, label: "Email", isEmail: true },
              { icon: <Linkedin size={15} />, label: "LinkedIn", href: "https://www.linkedin.com/in/reggie-segovia/" },
              { icon: <Github size={15} />, label: "GitHub", href: "https://github.com/rs-dkd" },
              { icon: <FileText size={15} />, label: "CV", href: cvPDF },
              { icon: <FileText size={15} />, label: "Resume", href: resumePDF },
              { icon: <Globe size={15} />, label: "Portfolio", href: "https://rs-dkd.github.io/my-portfolio/" },
            ].map((link, index) =>
              link.isEmail ? (
                <button
                  key={index}
                  onClick={copyEmailToClipboard}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-zinc-200 text-zinc-700 rounded-lg hover:bg-zinc-50 hover:border-zinc-300 transition-colors"
                >
                  {link.icon} {link.label}
                </button>
              ) : (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-zinc-200 text-zinc-700 rounded-lg hover:bg-zinc-50 hover:border-zinc-300 transition-colors"
                >
                  {link.icon} {link.label}
                </a>
              )
            )}
          </div>

          <button
            onClick={() => scrollToSection('about')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white text-sm font-semibold rounded-lg hover:bg-zinc-700 transition-colors"
          >
            Explore Research ↓
          </button>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-24 bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">Who I Am</p>
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900">About Me</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
            <div className="md:col-span-3 space-y-4">
              <p className="text-zinc-600 leading-relaxed">
                I'm a Computer Science graduate from the University of Florida passionate about human-computer interaction,
                artificial intelligence, and immersive technologies. My research focuses on creating natural, embodied interfaces
                that enhance how humans interact with digital information through projected reality, VR/AR, AI, and tangible interaction.
              </p>
              <p className="text-zinc-600 leading-relaxed">
                Currently working on multiple HCI/AI research projects (Accepted to IEEE AIxVR 2026 / IEEE VR 2026 / UFIR)
                including an AI-powered projected reality system, conversational Agentic AI agents in VR, AR medical applications,
                and environmental digital twins. My work bridges computer vision, spatial computing, and interaction design.
              </p>
              <p className="text-zinc-600 leading-relaxed">
                I believe technology should feel natural and enhance human capabilities — whether it's grasping memories through
                hand gestures, training therapists in VR, or visualizing climate risks in immersive environments.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-4">
                {[
                  { label: "GPA", value: "3.83" },
                  { label: "Research Projects", value: "8" },
                  { label: "Publications", value: "1 Published · 2 Accepted" },
                  { label: "Research Focus", value: "HCI · AI · Graphics" },
                ].map((stat, index) => (
                  <div key={index} className="bg-white border border-zinc-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="text-lg font-bold text-zinc-900 leading-tight">{stat.value}</div>
                    <div className="text-xs text-zinc-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 flex justify-center md:justify-end">
              <div className="w-64 h-64 rounded-full overflow-hidden border-2 border-zinc-200 shadow-md">
                <img
                  src={profilePic}
                  alt="Reggie Segovia"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: '50% 30%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Education ── */}
      <section id="education" className="py-24">
        <EducationSection />
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="py-24 bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">Expertise</p>
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900">Technical Skills</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillCategories.map((category, i) => {
              const a = accentStyles[category.accent];
              return (
                <div key={i} className="bg-white border border-zinc-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${a.icon}`}>
                      {category.icon}
                    </div>
                    <h3 className="text-sm font-semibold text-zinc-900 leading-tight">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill, si) => (
                      <span key={si} className={`px-2.5 py-1 text-xs font-medium rounded-full border ${a.tag}`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Interactive Project Showcase ── */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">3D Showcase</p>
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900 mb-2">Interactive Project Cube</h2>
            <p className="text-sm text-zinc-400">Click a face to view project images &bull; Drag to rotate &bull; Scroll to zoom</p>
          </div>

          <div className="flex justify-center gap-2 mb-6">
            {[{ label: 'All Projects', value: 'all' }, { label: 'Research', value: 'research' }, { label: 'Personal', value: 'personal' }].map((f) => (
              <button
                key={f.value}
                onClick={() => setProjectFilter(f.value)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  projectFilter === f.value
                    ? 'bg-zinc-900 text-white'
                    : 'border border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="h-[480px] w-full rounded-xl border border-zinc-200 overflow-hidden bg-zinc-50">
            <Canvas
              camera={{ position: [0, 0, 8], fov: 50 }}
              style={{ background: '#f9fafb', pointerEvents: 'auto' }}
            >
              <ambientLight intensity={1.5} />
              <pointLight position={[10, 10, 10]} intensity={0.8} />
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
                mouseButtons={{ LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN }}
              />
            </Canvas>
          </div>
        </div>
      </section>

      {/* ── Research Projects ── */}
      <section id="research" className="py-24 bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">Academic Work</p>
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900">Research Projects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {researchProjects.map((project, index) => (
              <div
                key={index}
                onClick={() => project.images?.length > 0 && setSelectedProject(project)}
                className={`bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-md transition-all hover:-translate-y-0.5 ${project.images?.length > 0 ? 'cursor-pointer' : ''}`}
              >
                <div className="h-2 bg-zinc-900" />
                <div className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide">{project.type}</span>
                    {project.status && (
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusStyle(project.status)}`}>
                        {project.status}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-semibold text-zinc-900 mb-2 leading-snug">{project.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed mb-3">{project.description}</p>

                  {project.collaboration && (
                    <p className="text-xs text-zinc-400 italic mb-3">
                      with {project.collaboration}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((tech, ti) => (
                      <span key={ti} className="px-2 py-0.5 text-xs font-medium bg-zinc-100 text-zinc-600 rounded-full border border-zinc-200">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {Object.keys(project.links).length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(project.links).map(([type, url], li) => (
                        <a
                          key={li}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 text-white text-xs font-semibold rounded-lg hover:bg-zinc-700 transition-colors"
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

      {/* ── Personal Projects ── */}
      <section id="projects" className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">Side Work</p>
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900">Personal Projects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {personalProjects.map((project, index) => (
              <div
                key={index}
                onClick={() => project.images?.length > 0 && setSelectedProject(project)}
                className={`bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-md transition-all hover:-translate-y-0.5 ${project.images?.length > 0 ? 'cursor-pointer' : ''}`}
              >
                <div className="h-2 bg-zinc-900" />
                <div className="p-6">
                  <div className="mb-3">
                    <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide">{project.type}</span>
                  </div>
                  <h3 className="text-base font-semibold text-zinc-900 mb-2 leading-snug">{project.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed mb-3">{project.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((tech, ti) => (
                      <span key={ti} className="px-2 py-0.5 text-xs font-medium bg-zinc-100 text-zinc-600 rounded-full border border-zinc-200">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {Object.entries(project.links).length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(project.links).map(([type, url], li) => (
                        <a
                          key={li}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 text-white text-xs font-semibold rounded-lg hover:bg-zinc-700 transition-colors"
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

      {/* ── Research Experience ── */}
      <section id="research-experience" className="py-24 bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">Laboratory Work</p>
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900">Research Experience</h2>
          </div>

          <div className="flex flex-col gap-5">
            {researchExperience.map((job, index) => (
              <div key={index} className="bg-white border border-zinc-200 rounded-xl p-8 hover:shadow-md transition-shadow">
                <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 mb-1">{job.title}</h3>
                    <p className="text-sm font-medium text-zinc-600 mb-0.5">{job.company}</p>
                    <p className="text-xs text-zinc-400 flex items-center gap-1">
                      <MapPin size={11} /> {job.location}
                    </p>
                  </div>
                  <span className="px-3 py-1.5 bg-zinc-900 text-white text-xs font-semibold rounded-full shrink-0">
                    {job.period}
                  </span>
                </div>

                <p className="text-sm text-zinc-500 leading-relaxed mb-5">{job.description}</p>

                <div className="mb-5">
                  <h4 className="text-xs font-semibold text-zinc-700 uppercase tracking-wide mb-3">Key Contributions</h4>
                  <ul className="space-y-2">
                    {job.achievements.map((item, ai) => (
                      <li key={ai} className="flex items-start gap-2 text-sm text-zinc-600">
                        <span className="text-zinc-300 mt-1 shrink-0">—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {job.tech.map((tech, ti) => (
                    <span key={ti} className="px-2 py-0.5 text-xs font-medium bg-zinc-100 text-zinc-600 rounded-full border border-zinc-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Work Experience ── */}
      <section id="work-experience" className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">Professional</p>
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900">Work &amp; Teaching Experience</h2>
          </div>

          <div className="flex flex-col gap-5">
            {workExperience.map((job, index) => (
              <div key={index} className="bg-white border border-zinc-200 rounded-xl p-8 hover:shadow-md transition-shadow">
                <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 mb-1">{job.title}</h3>
                    <p className="text-sm font-medium text-zinc-600 mb-0.5">{job.company}</p>
                    <p className="text-xs text-zinc-400 flex items-center gap-1">
                      <MapPin size={11} /> {job.location}
                    </p>
                  </div>
                  <span className="px-3 py-1.5 bg-zinc-900 text-white text-xs font-semibold rounded-full shrink-0">
                    {job.period}
                  </span>
                </div>

                <p className="text-sm text-zinc-500 leading-relaxed mb-5">{job.description}</p>

                <div className="mb-5">
                  <h4 className="text-xs font-semibold text-zinc-700 uppercase tracking-wide mb-3">Key Contributions</h4>
                  <ul className="space-y-2">
                    {job.achievements.map((item, ai) => (
                      <li key={ai} className="flex items-start gap-2 text-sm text-zinc-600">
                        <span className="text-zinc-300 mt-1 shrink-0">—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {job.tech.map((tech, ti) => (
                    <span key={ti} className="px-2 py-0.5 text-xs font-medium bg-zinc-100 text-zinc-600 rounded-full border border-zinc-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-24 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">Get In Touch</p>
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900 mb-3">Let's Collaborate</h2>
            <p className="text-sm text-zinc-500 max-w-xl mx-auto leading-relaxed">
              Interested in HCI research collaborations, immersive technology projects, AI/ML implementations,
              or discussing innovative interaction paradigms? Let's connect.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: <Mail size={22} />, title: "Email", value: "rdavidsegovia@gmail.com", isEmail: true },
              { icon: <Linkedin size={22} />, title: "LinkedIn", value: "reggie-segovia", href: "https://www.linkedin.com/in/reggie-segovia/" },
              { icon: <Github size={22} />, title: "GitHub", value: "github.com/rs-dkd", href: "https://github.com/rs-dkd" },
              { icon: <MapPin size={22} />, title: "Location", value: "Pittsburgh, PA", href: "https://www.google.com/maps/place/Pittsburgh,+PA" },
              { icon: <GraduationCap size={22} />, title: "Research", value: "HCI · AI · Graphics · Spatial Computing", isSection: 'research' },
              { icon: <Target size={22} />, title: "Focus", value: "Human-Computer Interaction · Artificial Intelligence", isSection: 'research' },
            ].map((contact, index) => {
              const inner = (
                <>
                  <div className="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center text-zinc-600 mb-3 transition-transform group-hover:scale-105">
                    {contact.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-900 mb-1">{contact.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{contact.value}</p>
                </>
              );

              const cls = "group bg-white border border-zinc-200 rounded-xl p-5 text-left hover:shadow-md hover:-translate-y-0.5 transition-all";

              if (contact.isEmail) return <button key={index} className={cls} onClick={copyEmailToClipboard}>{inner}</button>;
              if (contact.isSection) return <button key={index} className={cls} onClick={() => scrollToSection(contact.isSection)}>{inner}</button>;
              return (
                <a key={index} href={contact.href} target="_blank" rel="noopener noreferrer" className={cls}>
                  {inner}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <ImageModal
        project={selectedProject}
        onClose={() => { setSelectedProject(null); setCurrentImageIndex(0); }}
        currentIndex={currentImageIndex}
        setCurrentIndex={setCurrentImageIndex}
      />

      <style>{`
        html { scroll-behavior: smooth; }

        .nav-scroll { scrollbar-width: none; -ms-overflow-style: none; }
        .nav-scroll::-webkit-scrollbar { display: none; }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f4f4f5; }
        ::-webkit-scrollbar-thumb { background: #d4d4d8; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #a1a1aa; }

        ::selection { background: #e4e4e7; color: #09090b; }

        button:focus-visible, a:focus-visible {
          outline: 2px solid #18181b;
          outline-offset: 2px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
