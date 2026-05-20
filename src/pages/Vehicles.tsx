import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  Search, 
  MoreVertical, 
  CheckCircle2, 
  AlertTriangle,
  Info,
  Calendar,
  Zap,
  ArrowLeft,
  Truck
} from 'lucide-react';

const vehicles = [
  {
    id: 'VH-1001',
    model: 'Mercedes-Benz S-Class',
    plate: 'KA 01 MG 9042',
    type: 'Luxury',
    status: 'Active',
    battery: '88%',
    lastService: '2024-03-15',
    location: 'Bangalore Hub'
  },
  {
    id: 'VH-1002',
    model: 'Tesla Model S Plaid',
    plate: 'DL 01 CP 2041',
    type: 'Electric',
    status: 'Charging',
    battery: '12%',
    lastService: '2024-04-02',
    location: 'Delhi Supercharger'
  },
  {
    id: 'VH-1003',
    model: 'BMW 5 Series',
    plate: 'MH 01 MD 3040',
    type: 'Business',
    status: 'Active',
    fuel: '65%',
    lastService: '2024-02-28',
    location: 'Mumbai North'
  },
  {
    id: 'VH-1004',
    model: 'Audi A6 Avant',
    plate: 'TS 01 CT 4039',
    type: 'Business',
    status: 'Maintenance',
    fuel: '20%',
    lastService: '2024-04-20',
    location: 'Hyderabad Depot'
  },
  {
    id: 'VH-1005',
    model: 'Range Rover Sport',
    plate: 'TN 01 TN 5038',
    type: 'SUV',
    status: 'Active',
    fuel: '92%',
    lastService: '2024-01-10',
    location: 'Chennai Center'
  }
];

const Vehicles: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(
        pageRef.current.querySelectorAll('.gsap-reveal'),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: 'expo.out' }
      );
    }
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-50 text-green-700 border-green-100';
      case 'Charging': return 'bg-primary text-white border-primary';
      case 'Maintenance': return 'bg-amber-50 text-amber-700 border-amber-100';
      default: return 'bg-surface text-secondary border-border';
    }
  };

  return (
    <div ref={pageRef} className="max-w-[1280px] mx-auto px-6 sm:px-8 py-8 space-y-10 pb-12">
      <button 
        onClick={() => window.history.back()}
        className="gsap-reveal flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-secondary hover:text-primary transition-all group"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </button>

      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-8 gap-6 gsap-reveal">
        <div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-primary">Fleet Registry</h1>
          <p className="text-secondary mt-2 font-medium text-xs sm:text-base italic">Asset management and technical health monitoring for all units.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative group w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-primary transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search VIN, Plate, Model..." 
              className="w-full bg-white border border-border rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary transition-all font-medium placeholder:text-secondary shadow-sm"
            />
          </div>
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-white px-6 py-2.5 text-xs font-bold tracking-widest uppercase hover:bg-primary/90 transition-all rounded-xl shadow-lg">
            Register Asset
          </button>
        </div>
      </div>

      {/* Health Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gsap-reveal">
        <div className="bg-surface border border-border p-8 rounded-3xl flex flex-col justify-between h-48 group hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center shadow-sm">
              <CheckCircle2 size={20} />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-green-600 font-bold bg-green-50 px-2 py-1 rounded">Optimal</span>
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-widest text-secondary mb-1 uppercase">Fleet Health Index</p>
            <div className="text-4xl font-bold text-primary">98.4%</div>
            <p className="text-[10px] text-secondary mt-1 font-bold uppercase tracking-widest italic">Operational uptime across all hubs</p>
          </div>
        </div>

        <div className="bg-surface border border-border p-8 rounded-3xl flex flex-col justify-between h-48 group hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center shadow-sm">
              <Zap size={20} />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-primary font-bold bg-primary/5 px-2 py-1 rounded">Active</span>
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-widest text-secondary mb-1 uppercase">Active Charging</p>
            <div className="text-4xl font-bold text-primary">14 Units</div>
            <p className="text-[10px] text-secondary mt-1 font-bold uppercase tracking-widest italic">Currently at Supercharger stations</p>
          </div>
        </div>

        <div className="bg-surface border border-border p-8 rounded-3xl flex flex-col justify-between h-48 group hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shadow-sm">
              <AlertTriangle size={20} />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-amber-600 font-bold bg-amber-50 px-2 py-1 rounded">Warning</span>
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-widest text-secondary mb-1 uppercase">Maintenance Due</p>
            <div className="text-4xl font-bold text-primary">03 Units</div>
            <p className="text-[10px] text-secondary mt-1 font-bold uppercase tracking-widest italic">Inspection required within 48 hours</p>
          </div>
        </div>
      </div>

      {/* Fleet Table */}
      <div className="bg-white border border-border overflow-hidden gsap-reveal rounded-3xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface/30">
                <th className="px-8 py-6 text-[9px] font-bold uppercase tracking-[0.2em] text-secondary">Asset Information</th>
                <th className="px-8 py-6 text-[9px] font-bold uppercase tracking-[0.2em] text-secondary">Technical Telemetry</th>
                <th className="px-8 py-6 text-[9px] font-bold uppercase tracking-[0.2em] text-secondary">Deployment Station</th>
                <th className="px-8 py-6 text-[9px] font-bold uppercase tracking-[0.2em] text-secondary text-right">Status</th>
                <th className="px-8 py-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {vehicles.map((v) => (
                <tr key={v.id} className="group hover:bg-surface/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center shadow-sm">
                        <Truck size={18} />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-bold text-sm text-primary">{v.model}</span>
                        <span className="text-[10px] text-secondary font-bold uppercase tracking-widest">{v.plate} • {v.id}</span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-8">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[9px] uppercase text-secondary font-bold tracking-widest">Category</span>
                        <span className="text-xs font-bold text-primary">{v.type}</span>
                      </div>
                      <div className="flex flex-col gap-1 w-28">
                        <div className="flex justify-between items-center text-[9px] uppercase text-secondary font-bold tracking-widest">
                          <span>Energy</span>
                          <span>{v.battery || v.fuel}</span>
                        </div>
                        <div className="w-full bg-surface border border-border h-2 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-1000 ${parseInt(v.battery ?? v.fuel ?? '0') < 25 ? 'bg-red-500' : 'bg-primary'}`} 
                            style={{ width: v.battery || v.fuel }} 
                          />
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-xs text-primary font-bold">
                        <Calendar size={12} className="text-secondary" />
                        {v.lastService}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-secondary font-bold uppercase tracking-widest">
                        <Info size={12} className="text-secondary" />
                        {v.location}
                      </div>
                    </div>
                  </td>

                  <td className="px-8 py-6 text-right">
                    <span className={`px-4 py-1 rounded-full border text-[9px] font-bold uppercase tracking-widest ${getStatusStyle(v.status)}`}>
                      {v.status}
                    </span>
                  </td>

                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-secondary hover:text-primary transition-colors hover:bg-surface rounded-lg">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Vehicles;

