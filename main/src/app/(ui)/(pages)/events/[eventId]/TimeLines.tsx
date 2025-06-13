import { useState, useEffect, useRef, JSX } from 'react';
import { Clock, Sparkles, Rocket, Check, Trophy } from 'lucide-react';
import * as THREE from 'three';

interface TimelineItem {
  id: number;
  heading: string;
  subheading: string;
  time: string;
  icon: JSX.Element;
  color: string;
}


interface TimeLine {
  heading: string;
  subheading: string;
  time: string;
}

export default function SuperAnimatedTimeline({timeLines }:{timeLines : TimeLine[]}) {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  
  const icons = [
    <Rocket key={"A"} className="h-6 w-6" />,
    <Sparkles key={"B"} className="h-6 w-6" />,
    <Clock key={"C"} className="h-6 w-6" />,
    <Check key={"D"} className="h-6 w-6" />,
    <Trophy key={"E"} className="h-6 w-6" />
  ];

  const colors = [
    "from-rose-500 to-orange-500",
    "from-violet-500 to-purple-500",
    "from-blue-500 to-cyan-500",
    "from-green-500 to-emerald-500",
    "from-amber-500 to-yellow-500"
  ];

  const timelineItems: TimelineItem[] = timeLines.map((timeLine, index) => ({
    id: index + 1,
    heading: timeLine.heading,
    subheading: timeLine.subheading,
    time: timeLine.time,
    icon: icons[index % icons.length],
    color: colors[index % colors.length]
  }));

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0x6366f1,
      transparent: true,
      opacity: 0.8
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 2;

    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.y += 0.001;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      scene.remove(particlesMesh);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.timeline-item');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, [isLoaded]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;

      timelineItems.forEach((item) => {
        const element = document.getElementById(`timeline-item-${item.id}`);
        if (!element) return;

        const elementTop = element.getBoundingClientRect().top;
        const elementHeight = element.offsetHeight;

        if (elementTop < viewportHeight - elementHeight / 2 &&
          elementTop > -elementHeight) {
          setActiveItem(item.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  useEffect(() => {
    try {
      // Define a custom type for Tone.js
            interface ToneType {
              Synth: new () => { toDestination: () => { triggerAttackRelease: (note: string, duration: string) => void } };
            }
            const Tone = (window as unknown as { Tone?: ToneType }).Tone;
      if (Tone) {
        const synth = new Tone.Synth().toDestination();
        if (activeItem) {
          const notes = ["C4", "E4", "G4", "B4", "D5"];
          synth.triggerAttackRelease(notes[activeItem - 1] || "C4", "8n");
        }
      }
    } catch {
      console.log("Tone.js may not be available");
    }
  }, [activeItem]);



  return (
    <div className=" mt-10 rounded relative min-h-screen w-full overflow-hidden bg-black" ref={containerRef}>
      {/* Three.js canvas background */}
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
      
      {/* Futuristic overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-indigo-900/30 to-purple-900/30 -z-5"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header with glow effect */}
        <div className="mb-16 text-center relative">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-indigo-600 rounded-full filter blur-3xl opacity-20"></div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Event Timeline
            </span>
          </h1>
          <p className="text-indigo-200 text-lg max-w-2xl mx-auto">
            Follow our journey through time with this interactive roadmap
          </p>
        </div>
        
        {/* Timeline */}
        <div className="relative mx-auto max-w-4xl">
          {/* Center line with glow */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 transform -translate-x-1/2 rounded-full z-10 shadow-[0_0_15px_rgba(99,102,241,0.6)]"></div>
          
          {timelineItems.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            const isActive = activeItem === item.id;
            
            function formatTime(time: string): import("react").ReactNode {
              const date = new Date(time);
              return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }

            return (
              <div 
                key={item.id}
                id={`timeline-item-${item.id}`}
                className={`timeline-item relative mb-24 opacity-0 transition-all duration-1000 ${
                  isLoaded ? 'opacity-100' : ''
                } ${
                  isLeft ? 'left-animation' : 'right-animation'
                }`}
                style={{
                  transitionDelay: `${idx * 150}ms`
                }}
              >
                {/* Center dot with icon */}
                <div className={`absolute left-1/2 top-8 transform -translate-x-1/2 z-20 transition-all duration-500 ${
                  isActive ? 'scale-125' : 'scale-100'
                }`}>
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg shadow-indigo-500/50 border-2 border-white/20 transition-all duration-300 ${
                    isActive ? 'animate-pulse' : ''
                  }`}>
                    <div className="text-white">
                      {item.icon}
                    </div>
                  </div>
                </div>
                
                {/* Content card */}
                <div className={`w-5/12 ${isLeft ? 'ml-auto pr-12' : 'mr-auto pl-12'}`}>
                  <div className={`bg-gray-900/80 backdrop-blur-lg p-6 rounded-xl border border-indigo-500/30 shadow-2xl transition-all duration-500 ${
                    isActive 
                      ? 'transform translate-y-0 shadow-indigo-500/40' 
                      : isLeft 
                        ? 'transform translate-x-4' 
                        : 'transform -translate-x-4'
                  }`}>
                    <div className={`absolute w-5 h-5 ${
                      isLeft ? '-left-2.5' : '-right-2.5'
                    } top-8 transform rotate-45 bg-gray-900/80 border-t border-l border-indigo-500/30`}></div>
                    
                    <h3 className={`text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r ${item.color}`}>
                      {item.heading}
                    </h3>
                    
                    <p className="text-gray-300 mb-4">
                      {item.subheading}
                    </p>
                    
                    <div className="flex items-center gap-3 text-indigo-300 text-sm">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {formatTime(item.time)}
                      </div>
                      <span className="text-gray-500">•</span>
                      <div>
                      {formatTime(item.time)}
                      </div>
                    </div>
                    
                    {isActive && (
                      <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .timeline-item.animate-in.left-animation {
          animation: fadeInLeft 1s forwards;
        }
        
        .timeline-item.animate-in.right-animation {
          animation: fadeInRight 1s forwards;
        }
      `}</style>
    </div>
  );
}
