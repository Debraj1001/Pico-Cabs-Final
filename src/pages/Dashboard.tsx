// Operational Dashboard - Main Telemetry Hub
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { 
  Users, 
  MapPin, 
  AlertTriangle, 
  IndianRupee,
  ArrowRight,
  User
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FleetMap from '../components/FleetMap';


interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: React.ElementType;
  trend: 'up' | 'down';
  onClick?: () => void;
}

const StatCard = ({ title, value, change, icon: Icon, trend, onClick }: StatCardProps) => (
  <div 
    onClick={onClick}
    className={`bg-surface border border-border p-6 rounded-2xl gsap-reveal shadow-sm hover:shadow-md transition-all group flex flex-col min-w-0 ${onClick ? 'cursor-pointer hover:border-primary/20' : ''}`}
  >
    <div className="flex justify-between items-start mb-6">
      <div className="w-10 h-10 bg-white border border-border flex items-center justify-center rounded-xl group-hover:bg-primary group-hover:border-primary transition-colors shrink-0">
        <Icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
      </div>
      <span className={`text-[10px] font-bold tracking-widest px-2 py-1 rounded-full shrink-0 ${trend === 'up' ? 'bg-success/10 text-success' : 'bg-emergency/10 text-emergency'}`}>
        {change}
      </span>
    </div>
    <p className="text-[10px] font-bold tracking-[0.2em] text-secondary mb-2 uppercase truncate">{title}</p>
    <h3 className="text-3xl font-bold text-primary tracking-tight truncate">{value}</h3>
  </div>
);

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isExporting, setIsExporting] = React.useState(false);
  const [isScanning, setIsScanning] = React.useState(false);


  useEffect(() => {
    gsap.fromTo('.gsap-reveal', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.05, duration: 0.8, ease: 'expo.out' }
    );
  }, []);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Operational Report Generated: CSV EXPORT IN ADMIN 01.pdf');
    }, 2000);
  };

  const handleHeatmapToggle = () => {
    setIsScanning(true);
    gsap.to('.node-dot', {
      scale: 2,
      opacity: 0.8,
      duration: 0.3,
      repeat: 3,
      yoyo: true,
      onComplete: () => setIsScanning(false)
    });
  };

  const handleViewHistory = () => {
    alert('Accessing historical payout ledgers...');
  };

  const handleViewLogs = () => {
    alert('Accessing full operational logs...');
  };

  return (
    <div className="min-h-screen bg-background text-primary font-sans antialiased selection:bg-accent/20">
      <div className="max-w-[1280px] mx-auto px-6 py-10 space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 gsap-reveal border-b border-border pb-10">
          <div className="min-w-0 flex-1">
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
              Fleet <span className="text-accent italic">Intelligence</span>
            </h1>
            <p className="mt-2 text-secondary font-medium text-sm sm:text-base max-w-2xl">
              Real-time telemetry and operational metrics across your regional infrastructure. Monitoring 4,920 active nodes.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 w-full md:w-auto shrink-0">
            <button 
              onClick={handleExport}
              disabled={isExporting}
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-border hover:bg-surface-muted transition-all text-xs font-bold tracking-wider uppercase disabled:opacity-50 text-primary rounded-xl shadow-sm whitespace-nowrap min-w-0"
            >
              {isExporting ? (
                <>
                  <div className="w-3 h-3 border-2 border-primary/20 border-t-primary animate-spin rounded-full" />
                  PROCESSING...
                </>
              ) : 'Export Telemetry'}
            </button>
            <button 
              onClick={handleHeatmapToggle}
              className={`flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 transition-all text-xs font-bold tracking-wider uppercase rounded-xl shadow-sm whitespace-nowrap min-w-0 ${
                isScanning ? 'bg-success text-white' : 'bg-primary text-white hover:bg-primary/90'
              }`}
            >
              {isScanning ? 'SCANNING REGION...' : 'Live Map Scan'}
            </button>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Active Missions" 
            value="1,284" 
            change="+12.5%" 
            trend="up"
            icon={MapPin} 
          />
          <StatCard 
            title="Operational Units" 
            value="4,920" 
            change="+4.2%" 
            trend="up"
            icon={Users} 
          />
          <StatCard 
            title="Integrity Alerts" 
            value="02" 
            change="-2.1%" 
            trend="down"
            icon={AlertTriangle} 
            onClick={() => navigate('/sos')}
          />
          <StatCard 
            title="Gross Revenue" 
            value="₹42.8L" 
            change="+18.4%" 
            trend="up"
            icon={IndianRupee} 
          />
        </div>

        {/* Main Insights Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 gsap-reveal">
          {/* Revenue Analytics */}
          <div className="lg:col-span-2 bg-surface border border-border p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col min-w-0 overflow-hidden group">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-6">
              <div className="min-w-0">
                <h3 className="text-xl font-bold text-primary tracking-tight">Revenue Flow Analytics</h3>
                <p className="text-xs text-secondary font-medium mt-1">Monthly comparative growth analysis (INR)</p>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 shrink-0 bg-white/50 px-4 py-2 rounded-xl border border-border/50">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-primary rounded-full" />
                  <span className="text-[10px] font-bold tracking-wider text-primary">CURRENT CYCLE</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-primary/20 rounded-full" />
                  <span className="text-[10px] font-bold tracking-wider text-secondary">PREVIOUS CYCLE</span>
                </div>
              </div>
            </div>
            
            <div className="relative h-72 flex items-end min-w-0 mt-auto">
              {/* Y-Axis */}
              <div className="absolute inset-y-0 left-0 w-12 flex flex-col justify-between pointer-events-none border-r border-border/20 z-10 pr-2 shrink-0">
                {[100, 75, 50, 25, 0].map((v) => (
                  <div key={v} className="relative w-full flex items-center justify-end h-px">
                    <span className="text-[9px] font-mono text-secondary font-bold">₹{v}L</span>
                  </div>
                ))}
              </div>

              {/* Chart Container */}
              <div className="flex-1 h-full overflow-x-auto no-scrollbar ml-12 group/chart">
                <div className="flex items-end justify-between gap-3 h-full min-w-[600px] lg:min-w-0 pr-2">
                  {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'].map((month, i) => {
                    const currentH = [45, 60, 40, 75, 50, 90, 65, 80, 55, 70, 85, 95][i];
                    const previousH = [35, 45, 55, 60, 40, 75, 50, 70, 45, 60, 75, 80][i];
                    
                    return (
                      <div key={month} className="flex-1 flex flex-col items-center gap-3 group/bar relative h-full justify-end min-w-0">
                        <div className="flex items-end gap-1.5 w-full h-52 px-0.5">
                          <div className="flex-1 bg-white relative h-full overflow-hidden rounded-t-lg border border-border/30">
                            <div className="absolute bottom-0 w-full bg-primary/10 transition-all duration-1000 delay-100" style={{ height: `${previousH}%` }} />
                          </div>
                          <div className="flex-1 bg-white relative h-full overflow-hidden rounded-t-lg border border-border/30">
                            <div className="absolute bottom-0 w-full bg-primary transition-all duration-700 group-hover/bar:bg-accent" style={{ height: `${currentH}%` }} />
                          </div>
                        </div>
                        <span className="text-[9px] text-secondary font-bold tracking-wider">{month}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Map Preview */}
          <div className="lg:col-span-1 min-h-[450px] lg:min-h-0 rounded-3xl overflow-hidden shadow-sm border border-border">
            <FleetMap />
          </div>
        </div>

        {/* Tactical & Financial Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 gsap-reveal">
          {/* SOS Control */}
          <div 
            onClick={() => navigate('/sos')}
            className="lg:col-span-1 bg-primary p-8 sm:p-10 relative overflow-hidden group cursor-pointer border border-primary shadow-xl rounded-3xl flex flex-col min-w-0 transition-transform hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-16">
                <div className="w-14 h-14 bg-white/10 flex items-center justify-center rounded-2xl group-hover:bg-emergency/20 transition-all duration-500 ring-1 ring-white/20 shrink-0">
                  <AlertTriangle className="text-emergency w-8 h-8 animate-pulse" />
                </div>
                <div className="text-right">
                  <span className="block text-[10px] font-bold text-emergency tracking-widest uppercase">Emergency Hub</span>
                  <div className="flex items-center gap-1.5 justify-end mt-1">
                    <div className="w-1.5 h-1.5 bg-emergency rounded-full animate-ping" />
                    <span className="text-[10px] font-mono text-white/50 uppercase font-medium">Active Scan</span>
                  </div>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4 tracking-tight uppercase">Security Ops</h3>
              <p className="text-white/60 text-sm font-medium leading-relaxed mb-12">
                Unified incident command center. Real-time oversight for SOS signals and regional safety telemetry.
              </p>
              <div className="mt-auto flex items-center gap-4">
                <div className="flex-1 h-px bg-white/10" />
                <div className="flex items-center gap-2 text-white group-hover:gap-4 transition-all">
                   <span className="text-xs font-bold tracking-widest uppercase">Open Command</span>
                  <ArrowRight size={16} className="text-emergency" />
                </div>
              </div>
            </div>
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
          </div>

          {/* Payouts Module */}
          <div className="lg:col-span-2 bg-surface border border-border p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col min-w-0">
            <div className="flex items-center justify-between mb-10 gap-6">
              <div>
                <h3 className="text-xl font-bold text-primary tracking-tight">Payout Registry</h3>
                <p className="text-xs text-secondary font-medium mt-1">Latest financial distributions across regional hubs</p>
              </div>
              <button 
                onClick={handleViewHistory}
                className="inline-flex items-center px-4 py-2 bg-white border border-border text-[10px] font-bold uppercase tracking-widest hover:bg-surface-muted transition-all text-primary rounded-lg shadow-sm"
              >
                Full Ledger
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 'PAY-10492', amount: '₹14,200', status: 'PROCESSED', node: 'MUMBAI NODE', time: '12:44' },
                { id: 'PAY-10491', amount: '₹8,900', status: 'PENDING', node: 'DELHI NODE', time: '12:40' },
                { id: 'PAY-10490', amount: '₹22,150', status: 'PROCESSED', node: 'BLR NODE', time: '12:35' },
                { id: 'PAY-10489', amount: '₹11,400', status: 'PROCESSED', node: 'HYD NODE', time: '12:30' }
              ].map((pay) => (
                <div key={pay.id} className="flex items-center justify-between p-4 bg-white/60 border border-border/50 hover:bg-white hover:border-primary/20 transition-all rounded-2xl group min-w-0">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 bg-surface border border-border flex items-center justify-center font-mono text-[10px] font-bold text-primary rounded-xl shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                      {pay.id.split('-')[1].slice(-2)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-base font-bold text-primary truncate">{pay.amount}</p>
                      <p className="text-[10px] text-secondary font-bold tracking-tight uppercase truncate">{pay.node} • {pay.time}</p>
                    </div>
                  </div>
                  <span className={`text-[9px] font-bold px-3 py-1 rounded-lg shrink-0 ${pay.status === 'PROCESSED' ? 'bg-success/10 text-success border border-success/20' : 'bg-warning/10 text-warning border border-warning/20'}`}>
                    {pay.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Management Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 gsap-reveal">
          {/* Admin Identity */}
          <div 
            onClick={() => navigate('/account')}
            className="lg:col-span-1 bg-surface border border-border p-8 rounded-3xl flex flex-col justify-between group cursor-pointer relative overflow-hidden shadow-sm hover:shadow-md transition-all"
          >
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-10">
                <div className="w-14 h-14 bg-primary flex items-center justify-center rounded-2xl shadow-lg ring-4 ring-primary/10">
                  <User className="text-white w-7 h-7" />
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Access Level</p>
                  <p className="text-xs font-bold text-primary uppercase">Security IV</p>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-primary tracking-tight truncate">IN ADMIN 01</h3>
              <p className="text-xs text-secondary font-medium mb-10">Global Operational Oversight</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-border/30">
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">Node Cluster</span>
                  <span className="text-[10px] font-mono font-bold text-primary">SOUTH ASIA 01</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">Session</span>
                  <span className="text-[10px] font-mono font-bold text-success flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" /> ENCRYPTED
                  </span>
                </div>
              </div>
            </div>
            <div className="relative z-10 mt-10 flex items-center gap-2 text-xs font-bold text-primary group-hover:gap-4 transition-all uppercase tracking-widest">
              Identity Settings <ArrowRight size={14} className="text-accent" />
            </div>
          </div>

          {/* Activity Log */}
          <div className="lg:col-span-2 bg-surface border border-border p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col min-w-0">
            <div className="flex items-center justify-between mb-10 gap-6">
              <div>
                <h3 className="text-xl font-bold text-primary tracking-tight">System Event Registry</h3>
                <p className="text-xs text-secondary font-medium mt-1">Audit trail for global node interactions</p>
              </div>
              <button 
                onClick={handleViewLogs}
                className="inline-flex items-center px-4 py-2 bg-white border border-border text-[10px] font-bold uppercase tracking-widest hover:bg-surface-muted transition-all text-primary rounded-lg shadow-sm"
              >
                Full Logs
              </button>
            </div>
            
            <div className="space-y-1">
              {[
                { time: '14:22:01', event: 'Driver IN-VH-902 verified in Bangalore Hub', type: 'security' },
                { time: '14:20:45', event: 'New corporate account created: Tata Group', type: 'account' },
                { time: '14:18:12', event: 'SOS Alert resolved: Trip TR-8842', type: 'emergency' },
                { time: '14:15:30', event: 'System maintenance scheduled for 02:00 IST', type: 'system' }
              ].map((log, i) => (
                <div key={i} className="flex items-center gap-6 py-4 border-b border-border/10 group hover:bg-white/50 transition-all rounded-xl px-2 min-w-0">
                  <span className="text-[10px] font-mono text-secondary w-20 shrink-0 font-bold">{log.time}</span>
                  <span className="flex-1 text-sm text-primary/80 font-medium tracking-tight group-hover:text-primary transition-colors truncate">{log.event}</span>
                  <span className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1 border rounded-lg shrink-0 ${
                    log.type === 'emergency' ? 'border-emergency/20 text-emergency bg-emergency/5' : 'border-border/50 text-secondary bg-white/50'
                  }`}>{log.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Dashboard;
