import React, { useState, useEffect, useRef } from 'react';
import { X, ShieldCheck, Mail, Lock, ArrowRight } from 'lucide-react';
import gsap from 'gsap';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const TEST_EMAIL = 'admin@cabhub.in';
  const TEST_PASSWORD = 'admin';

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, { opacity: 1, display: 'flex', duration: 0.4 });
      gsap.fromTo(modalRef.current, 
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'expo.out' }
      );
    } else {
      gsap.to(overlayRef.current, { opacity: 0, display: 'none', duration: 0.3 });
      setError('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate authentication
    setTimeout(() => {
      if (isLogin) {
        if (email === TEST_EMAIL && password === TEST_PASSWORD) {
          setIsLoading(false);
          onSuccess();
        } else {
          setIsLoading(false);
          setError('INVALID CREDENTIALS: Access denied by security layer.');
        }
      } else {
        // Just simulate request success for signup
        setIsLoading(false);
        alert('REQUEST SUBMITTED: Verification pending by system admin.');
        setIsLogin(true);
      }
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[200] bg-black/5 backdrop-blur-sm hidden items-center justify-center p-6"
    >
      <div 
        ref={modalRef}
        className="w-full max-w-lg bg-ivory border border-border/50 relative overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.05)]"
      >
        <div className="scanline opacity-[0.03] pointer-events-none" />
        
        {/* Header */}
        <div className="p-10 border-b border-black/5 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-black flex items-center justify-center">
              <img src="/Pico Cabs- icon.png" alt="Pico Cabs Icon" className="w-6 h-6 object-contain" />
            </div>
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-black/30">SECURE ACCESS HUB</span>
          </div>
          <h2 className="text-4xl font-serif font-bold italic text-black">
            {isLogin ? 'Admin Login' : 'Admin Sign Up'}
          </h2>
          <p className="text-black/40 mt-2 text-xs font-medium max-w-[280px]">
            {isLogin 
              ? 'Authorized personnel only. Access is monitored and logged.' 
              : 'New administrative access requires multi-level verification.'}
          </p>
          <button 
            onClick={onClose}
            className="absolute top-10 right-10 w-10 h-10 flex items-center justify-center border border-black/10 hover:bg-black hover:text-white transition-all group"
          >
            <X size={18} className="group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        {/* Content */}
        <div className="p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-100 text-[10px] font-mono text-red-600 font-bold tracking-wider">
                {error}
              </div>
            )}

            {!isLogin && (
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-black/30 uppercase tracking-widest">Full Name</label>
                <div className="relative">
                  <input 
                    required
                    type="text" 
                    placeholder="Enter full name"
                    className="w-full bg-transparent border-b border-black/10 py-3 text-sm focus:border-black outline-none transition-all placeholder:text-black/10"
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-black/30 uppercase tracking-widest">Admin Endpoint</label>
              <div className="relative">
                <Mail size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-black/20" />
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@cabhub.in"
                  className="w-full bg-transparent border-b border-black/10 pl-7 py-3 text-sm focus:border-black outline-none transition-all placeholder:text-black/10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-[10px] font-bold text-black/30 uppercase tracking-widest">Security Token</label>
                {isLogin && <button type="button" className="text-[9px] font-bold text-black/20 hover:text-black transition-colors uppercase tracking-widest">Forgot?</button>}
              </div>
              <div className="relative">
                <Lock size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-black/20" />
                <input 
                  required
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent border-b border-black/10 pl-7 py-3 text-sm focus:border-black outline-none transition-all placeholder:text-black/10"
                />
              </div>
            </div>

            {isLogin && (
              <div className="p-4 bg-surface/80 text-primary border border-border space-y-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={12} className="text-primary/60" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Master Access Credentials</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[8px] text-secondary uppercase font-bold">Admin Endpoint</p>
                    <p className="font-mono text-[10px] text-primary select-all">{TEST_EMAIL}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[8px] text-secondary uppercase font-bold">Security Token</p>
                    <p className="font-mono text-[10px] text-primary select-all">{TEST_PASSWORD}</p>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => {
                    setEmail(TEST_EMAIL);
                    setPassword(TEST_PASSWORD);
                  }}
                  className="w-full mt-2 py-2 bg-white text-primary border border-border text-[9px] font-bold hover:bg-surface transition-all uppercase tracking-widest shadow-sm"
                >
                  Quick Inject Credentials
                </button>
              </div>
            )}

            <button 
              disabled={isLoading}
              className="w-full h-14 bg-primary text-white flex items-center justify-center gap-3 hover:bg-primary/90 transition-all disabled:opacity-50 shadow-lg shadow-primary/10"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-ivory/20 border-t-ivory rounded-full animate-spin" />
              ) : (
                <>
                  <span className="text-[11px] font-bold tracking-[0.3em] uppercase">{isLogin ? 'Initiate Session' : 'Create Account'}</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 flex flex-col items-center gap-4">
            <p className="text-[10px] text-black/40 font-medium">
              {isLogin ? "Don't have access?" : "Already have access?"}
              <button 
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="ml-2 text-black font-bold border-b border-black/10 hover:border-black transition-all"
              >
                {isLogin ? 'Sign Up Now' : 'Login Now'}
              </button>
            </p>
            
            <div className="flex items-center gap-2 px-3 py-1.5 bg-black/[0.03] text-[9px] font-mono text-black/40 tracking-widest">
              <ShieldCheck size={10} /> 
              ENCRYPTION LAYER ACTIVE (v2.4)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
