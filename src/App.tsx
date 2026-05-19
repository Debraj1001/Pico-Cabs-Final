import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { 
  LayoutDashboard, 
  Users, 
  Car,
  Navigation,
  AlertOctagon,
  Wallet,
  Search,
  Bell,
  ArrowRight
} from 'lucide-react';

// Components
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import SOSCenter from './pages/SOSCenter';
import DriverManagement from './pages/DriverManagement';
import Trips from './pages/Trips';
import Vehicles from './pages/Vehicles';
import Financials from './pages/Financials';
import Account from './pages/Account';
import NotificationSidebar from './components/NotificationSidebar';
import ArchiveSidebar from './components/ArchiveSidebar';
import AuthModal from './components/AuthModal';

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/drivers', icon: Users, label: 'Fleet Personnel' },
    { path: '/admin/vehicles', icon: Car, label: 'Asset Registry' },
    { path: '/admin/trips', icon: Navigation, label: 'Operations' },
    { path: '/admin/sos', icon: AlertOctagon, label: 'Emergency Hub' },
    { path: '/admin/payouts', icon: Wallet, label: 'Financials' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-primary/10 backdrop-blur-sm z-[55] transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      <aside className={`w-72 h-screen bg-white border-r border-border fixed left-0 top-0 z-[60] flex flex-col p-8 transition-transform duration-500 ease-expo lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="mb-16 gsap-reveal">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-lg">
            <img src="/Pico Cabs- icon.png" alt="Pico Cabs Icon" className="w-5 h-5 object-contain" />
          </div>
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-secondary/60">OPERATIONS V.01</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-primary italic">Pico Cabs</h1>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group gsap-reveal ${
                isActive 
                  ? 'bg-surface text-primary border border-border shadow-sm' 
                  : 'text-secondary hover:text-primary hover:bg-surface/50'
              }`}
            >
              <item.icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'group-hover:text-primary'}`} />
              <span className="text-sm font-semibold tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <Link 
        to="/admin/account"
        className={`mt-auto pt-6 border-t border-border gsap-reveal group transition-all ${
          location.pathname === '/admin/account' ? 'opacity-100' : 'opacity-60 hover:opacity-100'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary flex items-center justify-center font-bold text-white rounded-xl group-hover:scale-105 transition-transform">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-primary">IN ADMIN 01</p>
            <p className="text-[10px] text-secondary font-mono tracking-wider uppercase">Account Settings</p>
          </div>
        </div>
      </Link>
    </aside>
    </>
  );
};

const Topbar = ({ onNotificationToggle, onMenuToggle }: { onNotificationToggle: () => void; onMenuToggle: () => void }) => {
  return (
    <header className="h-20 fixed top-0 right-0 left-0 lg:left-72 bg-background/80 backdrop-blur-md border-b border-border z-40 px-6 sm:px-10 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuToggle}
          className="lg:hidden p-2 hover:bg-surface transition-colors rounded-lg"
        >
          <div className="w-5 h-px bg-primary mb-1.5" />
          <div className="w-5 h-px bg-primary mb-1.5" />
          <div className="w-3 h-px bg-primary" />
        </button>
        <div className="hidden sm:block gsap-reveal flex-1 max-w-md">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search telemetry..." 
              className="w-full bg-surface/50 border border-border rounded-xl py-2 pl-10 pr-4 text-sm focus:border-primary focus:bg-white outline-none transition-all placeholder:text-secondary/40"
            />
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-6 gsap-reveal">
        <div className="hidden md:flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-secondary tracking-widest uppercase">NETWORK STATUS</span>
            <span className="text-xs font-mono text-success flex items-center gap-1.5 font-bold">
              <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
              STABLE IN NODE
            </span>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-secondary tracking-widest uppercase">SYSTEM TIME</span>
            <span className="text-xs font-mono text-primary font-bold">12:45:00 IST</span>
          </div>
        </div>

        <button 
          onClick={onNotificationToggle}
          className="relative group p-2.5 bg-white border border-border rounded-xl hover:bg-surface transition-all shadow-sm"
        >
          <Bell className="w-5 h-5 text-secondary group-hover:text-primary transition-colors" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary border-2 border-white rounded-full" />
        </button>
      </div>
    </header>
  );
};

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in');
  const word1 = 'PICO';
  const word2 = 'CABS';
  const allLetters = [...word1.split(''), ' ', ...word2.split('')];

  useEffect(() => {
    // After all letters have dropped in (~1.4s) + hold
    const holdTimer = setTimeout(() => setPhase('hold'), 1600);
    // Fade out + call complete
    const outTimer = setTimeout(() => {
      setPhase('out');
      setTimeout(onComplete, 600);
    }, 2600);
    return () => { clearTimeout(holdTimer); clearTimeout(outTimer); };
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#0A0A0F',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '1.5rem',
        opacity: phase === 'out' ? 0 : 1,
        transition: 'opacity 0.6s ease',
        overflow: 'hidden',
      }}
    >
      {/* Subtle radial glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)',
      }} />

      {/* Icon */}
      <div style={{
        width: 56, height: 56,
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 16,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '0.5rem',
        animation: 'preloader-icon-in 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.1s both',
      }}>
        <img src="/Pico Cabs- icon.png" alt="Pico Cabs" style={{ width: 30, height: 30, objectFit: 'contain' }} />
      </div>

      {/* Bouncy letters */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
        {allLetters.map((letter, i) => {
          const delay = 0.25 + i * 0.07;
          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                fontSize: letter === ' ' ? '2.5rem' : '3.5rem',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                color: letter === ' ' ? 'transparent' : '#FFFFFF',
                fontFamily: "'Inter', sans-serif",
                animation: `preloader-letter-bounce 0.6s cubic-bezier(0.34,1.56,0.64,1) ${delay}s both`,
                minWidth: letter === ' ' ? '0.5rem' : undefined,
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          );
        })}
      </div>

      {/* Subtitle */}
      <p style={{
        fontSize: '0.6rem',
        fontFamily: "'JetBrains Mono', monospace",
        letterSpacing: '0.35em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.3)',
        animation: 'preloader-sub-in 0.5s ease 1.4s both',
      }}>
        Your City · Your Ride
      </p>

      {/* Progress bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 2,
        background: 'rgba(255,255,255,0.05)',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          background: 'linear-gradient(90deg, #6366f1, #a78bfa)',
          animation: 'preloader-progress 2.2s ease-out 0.2s both',
        }} />
      </div>

      <style>{`
        @keyframes preloader-letter-bounce {
          0% { opacity: 0; transform: translateY(-40px) scale(0.6); }
          60% { opacity: 1; transform: translateY(6px) scale(1.08); }
          80% { transform: translateY(-3px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes preloader-icon-in {
          0% { opacity: 0; transform: scale(0.5); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes preloader-sub-in {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes preloader-progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

const AdminApp = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    // Sharp European-style entrance
    gsap.fromTo('.gsap-reveal', 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.05, 
        duration: 1.2, 
        ease: 'expo.out',
        delay: 0.2
      }
    );

    // Trigger Auth Modal on entry if not authenticated
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
    }
  }, [isAuthenticated]);

  return (
      <div className="min-h-screen bg-background text-primary selection:bg-primary/10 selection:text-primary relative overflow-hidden">
        {isAuthenticated ? (
          <>
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <Topbar 
              onNotificationToggle={() => setIsNotifOpen(true)} 
              onMenuToggle={() => setIsSidebarOpen(true)}
            />
            
            <NotificationSidebar 
              isOpen={isNotifOpen} 
              onClose={() => setIsNotifOpen(false)} 
              onViewArchive={() => {
                setIsNotifOpen(false);
                setIsArchiveOpen(true);
              }}
            />
            <ArchiveSidebar 
              isOpen={isArchiveOpen}
              onClose={() => setIsArchiveOpen(false)}
              onBack={() => {
                setIsArchiveOpen(false);
                setIsNotifOpen(true);
              }}
            />
            <main className="lg:pl-72 pt-20 min-h-screen">
              <div className="p-6 sm:p-10">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/drivers" element={<DriverManagement />} />
                  <Route path="/vehicles" element={<Vehicles />} />
                  <Route path="/trips" element={<Trips />} />
                  <Route path="/sos" element={<SOSCenter />} />
                  <Route path="/payouts" element={<Financials />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="*" element={
                    <div className="flex flex-col items-center justify-center h-[60vh] gsap-reveal">
                      <h2 className="text-6xl font-serif mb-4">404</h2>
                      <p className="text-black/40 font-mono tracking-widest">RESOURCE NOT FOUND</p>
                    </div>
                  } />
                </Routes>
              </div>
            </main>
          </>
        ) : (
          <div className="fixed inset-0 flex items-center justify-center bg-background p-6">
            <div className="scanline opacity-[0.03]" />
            <div className="text-center space-y-12 max-w-lg w-full py-20 border border-border relative overflow-hidden bg-white shadow-2xl shadow-primary/5">
              <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #000 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-primary flex items-center justify-center mx-auto mb-10 shadow-xl group transition-transform hover:scale-105 rounded-2xl">
                  <img src="/Pico Cabs- icon.png" alt="Pico Cabs Icon" className="w-8 h-8 object-contain" />
                </div>
                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-6xl font-serif italic font-bold tracking-tighter text-black">Secure Gateway</h1>
                  <p className="text-black/30 text-[10px] font-mono tracking-[0.4em] uppercase">Authentication Required L04</p>
                </div>
                
                <div className="mt-16 max-w-xs mx-auto">
                  <button 
                    onClick={() => setIsAuthModalOpen(true)}
                    className="w-full h-16 bg-primary text-white text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-primary/90 transition-all flex items-center justify-center gap-4 group overflow-hidden relative shadow-lg shadow-primary/20 rounded-xl"
                  >
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <span className="relative z-10">Access Portal</span>
                    <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="mt-6 text-[10px] text-black/20 font-medium tracking-wide">
                    System Ready • Encryption v2.4 Active
                  </p>
                </div>
              </div>
            </div>
            
            <AuthModal 
              isOpen={isAuthModalOpen} 
              onClose={() => setIsAuthModalOpen(false)}
              onSuccess={() => {
                setIsAuthenticated(true);
                setIsAuthModalOpen(false);
              }}
            />
          </div>
        )}
      </div>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <Preloader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </Router>
  );
};

export default App;
