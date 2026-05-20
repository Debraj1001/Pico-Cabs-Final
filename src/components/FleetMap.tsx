import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Shield, Navigation, X, Activity } from 'lucide-react';

interface MapNode {
  id: string;
  x: number;
  y: number;
  label: string;
  activity: number; // 0 to 1
  isAlert?: boolean;
}

interface Route {
  id: string;
  from: MapNode;
  to: MapNode;
}

const FleetMap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [focusedNode, setFocusedNode] = useState<MapNode | null>(null);

  // Mock Data aligned to a "City Grid"
  const nodes: MapNode[] = [
    { id: '1', x: 25, y: 30, label: 'NEW DELHI NORTH', activity: 0.85 },
    { id: '2', x: 22, y: 65, label: 'MUMBAI CENTRAL', activity: 0.92, isAlert: true },
    { id: '3', x: 45, y: 75, label: 'BANGALORE TECH', activity: 0.78 },
    { id: '4', x: 48, y: 55, label: 'HYDERABAD HUB', activity: 0.65 },
    { id: '5', x: 75, y: 45, label: 'KOLKATA EAST', activity: 0.45 },
  ];

  const routes: Route[] = [
    { id: 'r1', from: nodes[0], to: nodes[3] },
    { id: 'r2', from: nodes[1], to: nodes[3] },
    { id: 'r3', from: nodes[4], to: nodes[0] },
    { id: 'r4', from: nodes[2], to: nodes[3] },
  ];

  useEffect(() => {
    gsap.to('.map-base-layer', {
      opacity: 0.1,
      duration: 2,
      ease: 'power2.out',
      delay: 0.5
    });

    gsap.fromTo('.node-container', 
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, stagger: 0.1, ease: 'expo.out' }
    );

    nodes.forEach(node => {
      gsap.to(`.node-pulse-${node.id}`, {
        scale: 2,
        opacity: 0,
        duration: 3,
        repeat: -1,
        ease: 'sine.inOut',
        delay: Math.random() * 2
      });
    });

    gsap.to('.route-path', {
      strokeDashoffset: 0,
      duration: 3,
      stagger: 0.5,
      ease: 'power2.inOut',
      repeat: -1,
      repeatDelay: 2
    });

    const vehicles = document.querySelectorAll('.vehicle-particle');
    vehicles.forEach((vehicle, i) => {
      const route = routes[i % routes.length];
      const tl = gsap.timeline({ repeat: -1 });
      
      tl.fromTo(vehicle, 
        { x: `${route.from.x}%`, y: `${route.from.y}%`, opacity: 0 },
        { 
          x: `${route.to.x}%`, 
          y: `${route.to.y}%`, 
          opacity: 0.4,
          duration: 12 + Math.random() * 8, 
          ease: 'none',
          onComplete: () => {
            gsap.set(vehicle, { opacity: 0 });
          }
        }
      );
    });
  }, []);

  const handleExitFocus = () => {
    setFocusedNode(null);
    gsap.to(mapRef.current, { scale: 1, x: 0, y: 0, duration: 1.2, ease: 'expo.inOut' });
    gsap.to('.map-dimmer', { opacity: 0, duration: 0.8 });
    gsap.to('.map-base-layer', { opacity: 0.1, duration: 0.8 });
  };

  const handleNodeClick = (node: MapNode) => {
    if (focusedNode?.id === node.id) {
      handleExitFocus();
    } else {
      setFocusedNode(node);
      const zoomX = (50 - node.x) * 2.5;
      const zoomY = (50 - node.y) * 2.5;
      gsap.to(mapRef.current, { scale: 2.5, x: `${zoomX}%`, y: `${zoomY}%`, duration: 1.2, ease: 'expo.inOut' });
      gsap.to('.map-dimmer', { opacity: 0.1, duration: 0.8 });
      gsap.to('.map-base-layer', { opacity: 0.15, duration: 0.8 });
    }
  };

  return (
    <div ref={containerRef} className="bg-white text-primary flex flex-col h-full min-h-[450px] relative overflow-hidden group font-sans border-0 sm:border-l border-border">
      {/* Dynamic Header */}
      <div className="p-5 border-b border-border bg-white/40 relative z-40 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <Activity size={14} className="text-accent" />
              <h3 className="text-sm font-bold tracking-tight text-primary uppercase">Regional Telemetry</h3>
            </div>
            <p className="text-[9px] font-bold text-secondary tracking-widest uppercase">Grid Sector: IND SOUTH 01</p>
          </div>
          <div className="flex items-center gap-4 bg-background px-3 py-1.5 rounded-lg border border-border/50 shrink-0">
            <div className="flex flex-col">
              <span className="text-[8px] font-bold text-secondary uppercase tracking-tighter leading-none">Net Load</span>
              <span className="text-[10px] font-mono text-primary font-bold">64.2%</span>
            </div>
            <div className="w-px h-6 bg-border/50" />
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
              <span className="text-[9px] font-bold text-primary tracking-widest uppercase">Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map Content Layer */}
      <div className="flex-1 relative overflow-hidden bg-[#F1F5F9]">
        <div className="absolute inset-0 map-dimmer bg-primary opacity-0 transition-all duration-1000 pointer-events-none z-30" />
        
        <div ref={mapRef} className="absolute inset-0 origin-center transition-transform duration-1000">
          {/* Base Map Imagery */}
          <div className="absolute inset-0 map-base-layer opacity-0 pointer-events-none" 
               style={{ 
                 backgroundImage: 'url(https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2000)', 
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 filter: 'grayscale(1) contrast(1.1) brightness(1.1) opacity(0.8)'
               }} 
          />
          
          {/* Operational Grid */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(to right, #1E293B 1px, transparent 1px), linear-gradient(to bottom, #1E293B 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
          />

          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-30">
            {routes.map((route) => {
              const dx = (route.to.x - route.from.x);
              const dy = (route.to.y - route.from.y);
              const length = Math.sqrt(dx*dx + dy*dy) * 10;
              
              return (
                <path
                  key={route.id}
                  d={`M ${route.from.x}% ${route.from.y}% Q ${(route.from.x + route.to.x)/2 + 2}% ${(route.from.y + route.to.y)/2 - 8}% ${route.to.x}% ${route.to.y}%`}
                  stroke="#3B82F6"
                  strokeWidth="1.5"
                  fill="none"
                  className="route-path"
                  strokeDasharray={length}
                  strokeDashoffset={length}
                />
              );
            })}
          </svg>

          {[...Array(15)].map((_, i) => (
            <div 
              key={i}
              className="vehicle-particle absolute w-1 h-1 bg-accent rounded-full z-20 opacity-0 pointer-events-none"
            />
          ))}

          {nodes.map((node) => (
            <div 
              key={node.id}
              className={`node-container absolute -translate-x-1/2 -translate-y-1/2 z-40 cursor-pointer transition-all duration-700 group/node ${focusedNode && focusedNode.id !== node.id ? 'opacity-20 scale-75' : 'opacity-100 scale-100'}`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onClick={() => handleNodeClick(node as MapNode)}
            >
              <div className={`node-pulse-${node.id} absolute inset-0 w-6 h-6 -translate-x-1/2 -translate-y-1/2 bg-accent/20 rounded-full pointer-events-none`} />
              
              <div className={`relative w-2.5 h-2.5 rounded-full transition-all duration-500 shadow-md border-2 border-white ${node.isAlert ? 'bg-emergency animate-pulse' : 'bg-accent'}`}>
                {node.isAlert && (
                  <div className="absolute inset-0 bg-emergency/40 rounded-full animate-ping" />
                )}
              </div>

              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 transition-all duration-500 opacity-0 group-hover/node:opacity-100 z-50">
                <div className="bg-primary text-white px-2 py-1 text-[8px] font-bold tracking-widest uppercase whitespace-nowrap rounded shadow-xl">
                  {node.label} <span className="text-white/20 mx-1">|</span> {Math.round(node.activity * 100)}%
                </div>
              </div>
            </div>
          ))}
        </div>

        {focusedNode && (
          <div className="absolute bottom-6 left-6 right-6 z-50 bg-white/95 backdrop-blur-md border border-border p-5 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-primary flex items-center justify-center rounded-xl shadow-lg">
                  <Navigation size={16} className="text-white" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-primary uppercase truncate">{focusedNode.label}</h4>
                  <p className="text-[9px] font-bold text-secondary tracking-widest uppercase">Sector Verified</p>
                </div>
              </div>
              <button onClick={handleExitFocus} className="text-secondary hover:text-primary transition-colors p-1">
                <X size={16} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-2.5 bg-background rounded-xl border border-border/50">
                <p className="text-[8px] font-bold text-secondary uppercase tracking-widest mb-0.5">Operational Load</p>
                <p className="text-xs font-bold text-primary">{Math.round(focusedNode.activity * 100)}%</p>
              </div>
              <div className="p-2.5 bg-background rounded-xl border border-border/50">
                <p className="text-[8px] font-bold text-secondary uppercase tracking-widest mb-0.5">Network Latency</p>
                <p className="text-xs font-bold text-primary">08ms</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="flex-1 py-2 bg-primary text-white text-[9px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-all rounded-lg">
                Isolation Mode
              </button>
              <button className="flex-1 py-2 border border-border text-primary text-[9px] font-bold uppercase tracking-widest hover:bg-surface-muted transition-all rounded-lg">
                Full Data
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Intelligence Summary Footer */}
      <div className="p-5 flex flex-col gap-4 relative z-40 bg-white border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield size={12} className="text-accent" />
            <span className="text-[9px] font-bold text-secondary uppercase tracking-widest">Network Security</span>
          </div>
          <span className="text-[9px] font-bold text-success uppercase">Nominal</span>
        </div>
        <div className="w-full bg-background h-1 rounded-full overflow-hidden">
          <div className="bg-accent h-full w-[64%]" />
        </div>
      </div>
    </div>

  );
};

export default FleetMap;

