import React, { useEffect } from 'react';
import { 
  User, 
  Shield, 
  Key, 
  Globe,
  Camera,
  LogOut,
  ArrowLeft
} from 'lucide-react';
import gsap from 'gsap';

const Account: React.FC = () => {
  useEffect(() => {
    gsap.fromTo('.gsap-reveal', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'expo.out' }
    );
  }, []);

  return (
    <div className="max-w-[1280px] mx-auto px-6 sm:px-8 py-8 space-y-10 pb-12">
      <div className="flex items-center justify-between gsap-reveal">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-lg text-[10px] font-bold tracking-[0.2em] uppercase text-secondary hover:text-primary hover:border-primary/30 transition-all group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back
        </button>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-emergency text-white text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-emergency/90 transition-all rounded-xl shadow-lg active:scale-95">
          <LogOut size={14} /> Terminate Session
        </button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-border pb-8 gap-6 gsap-reveal">
        <div>
          <h2 className="text-3xl sm:text-5xl font-bold text-primary tracking-tight italic">Account Settings</h2>
          <p className="text-secondary mt-2 font-medium text-xs sm:text-base italic">Manage administrative profile and security access.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-surface border border-border p-8 flex flex-col items-center text-center gsap-reveal rounded-2xl shadow-sm">
            <div className="relative group mb-6">
              <div className="w-24 h-24 bg-primary flex items-center justify-center text-3xl text-white rounded-2xl shadow-lg group-hover:scale-105 transition-transform">
                A
              </div>
              <button className="absolute -bottom-2 -right-2 p-2 bg-white border border-border rounded-lg shadow-md hover:bg-surface transition-all">
                <Camera size={16} className="text-primary" />
              </button>
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary">IN ADMIN 01</h3>
              <p className="text-[10px] text-secondary font-mono font-bold tracking-widest mt-1 uppercase">SUPER ADMIN ACCESS</p>
            </div>
            <div className="w-full h-px bg-border/50 my-8" />
            <div className="w-full space-y-4">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                <span className="text-secondary">Node ID</span>
                <span className="text-primary font-mono">IND BLR 01</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                <span className="text-secondary">Member Since</span>
                <span className="text-primary">JAN 2024</span>
              </div>
            </div>
          </div>

          <div className="bg-primary text-white p-8 space-y-6 gsap-reveal rounded-2xl shadow-xl relative overflow-hidden group">
            <div className="absolute -right-8 -top-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
              <Shield size={120} />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 flex items-center justify-center rounded-lg">
                  <Shield size={16} className="text-white" />
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase">Security Status</span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed font-medium">
                MFA is active on this account. Last security audit: 24h ago. System integrity is at 92%.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-[9px] font-bold tracking-widest text-white/50">
                  <span>INTEGRITY INDEX</span>
                  <span>92%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-success w-[92%] shadow-[0_0_10px_#10B981]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Sections */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white border border-border p-6 sm:p-8 gsap-reveal rounded-2xl shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-surface flex items-center justify-center rounded-lg">
                <User size={16} className="text-primary" />
              </div>
              <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-secondary">Personal Information</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-secondary uppercase tracking-widest">Admin Name</label>
                <input 
                  type="text" 
                  defaultValue="Anirban Ghosh"
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-primary font-medium"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-secondary uppercase tracking-widest">Contact Ref</label>
                <input 
                  type="text" 
                  defaultValue="+91 98765 43210"
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-primary font-medium"
                />
              </div>
              <div className="space-y-3 sm:col-span-2">
                <label className="text-[10px] font-bold text-secondary uppercase tracking-widest">Email Endpoint</label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="email" 
                    defaultValue="admin.01@cabhub.in"
                    className="flex-1 bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-primary font-medium"
                  />
                  <button className="text-[10px] font-bold uppercase tracking-widest bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-all active:scale-95">Verify</button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-border p-6 sm:p-8 gsap-reveal rounded-2xl shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-surface flex items-center justify-center rounded-lg">
                <Key size={16} className="text-primary" />
              </div>
              <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-secondary">Authentication Control</h4>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between group p-4 border border-border rounded-xl hover:bg-background transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-surface flex items-center justify-center rounded-lg group-hover:bg-white transition-colors">
                    <Shield size={16} className="text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-primary truncate">Two-Factor Authentication</p>
                    <p className="text-[10px] text-secondary font-mono font-bold tracking-widest uppercase">ENHANCED SECURITY ACTIVE</p>
                  </div>
                </div>
                <div className="w-12 h-6 bg-primary flex items-center px-1 rounded-full relative shrink-0 cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-1" />
                </div>
              </div>
              
              <div className="flex items-center justify-between group p-4 border border-border rounded-xl hover:bg-background transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-surface flex items-center justify-center rounded-lg group-hover:bg-white transition-colors">
                    <Globe size={16} className="text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-primary truncate">Session Region Locking</p>
                    <p className="text-[10px] text-secondary font-mono font-bold tracking-widest uppercase">India IP Range</p>
                  </div>
                </div>
                <div className="w-12 h-6 bg-border flex items-center px-1 rounded-full relative shrink-0 cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute left-1" />
                </div>
              </div>
            </div>
            
            <button className="mt-8 w-full py-4 bg-primary text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-primary/90 transition-all active:scale-95 shadow-lg">
              Update Security Policies
            </button>
          </div>

          <div className="bg-white border border-border p-6 sm:p-8 gsap-reveal rounded-2xl shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-surface flex items-center justify-center rounded-lg">
                <Globe size={16} className="text-primary" />
              </div>
              <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-secondary">System Access Logs</h4>
            </div>
            <div className="space-y-2">
              {[
                { event: 'LOGIN SUCCESS', ip: '192.168.1.1', time: '2 mins ago', location: 'Bengaluru, IN' },
                { event: 'DATA EXPORT', ip: '192.168.1.1', time: '1 hour ago', location: 'Bengaluru, IN' },
                { event: 'MFA VERIFIED', ip: '192.168.1.1', time: '1 hour ago', location: 'Bengaluru, IN' },
              ].map((log, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-background rounded-xl transition-colors border-b border-border/10 last:border-0 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-success rounded-full" />
                    <div>
                      <p className="text-xs font-bold text-primary font-mono tracking-tight uppercase">{log.event}</p>
                      <p className="text-[9px] text-secondary font-mono font-bold mt-1 uppercase">{log.ip} • {log.location}</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold text-secondary uppercase tracking-widest shrink-0">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
