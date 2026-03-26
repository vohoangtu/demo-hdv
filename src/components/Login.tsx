import React, { useState } from 'react';
import { ShieldCheck, Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginProps {
  onLogin: (role: 'admin' | 'guide') => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent, role: 'admin' | 'guide') => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin(role);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] aero-gradient opacity-10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-surface-container-low/50 backdrop-blur-2xl p-10 rounded-[40px] border border-outline-variant/10 shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 aero-gradient rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/30 mb-6">
            <ShieldCheck className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-primary">Navigator</h1>
          <p className="text-sm font-bold text-outline uppercase tracking-[0.2em] mt-2">Operation Center</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-outline ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-surface-container-lowest border border-outline-variant/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-outline ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-surface-container-lowest border border-outline-variant/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-outline-variant/30 text-primary focus:ring-primary/20" />
              <span className="text-xs font-bold text-on-surface-variant group-hover:text-on-surface transition-colors">Remember me</span>
            </label>
            <button type="button" className="text-xs font-bold text-primary hover:underline">Forgot password?</button>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <button 
              onClick={(e) => handleSubmit(e, 'admin')}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 py-4 aero-gradient text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
            >
              {isLoading ? '...' : 'Admin Log In'}
              {!isLoading && <ArrowRight size={16} />}
            </button>
            <button 
              onClick={(e) => handleSubmit(e, 'guide')}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 py-4 bg-surface-container-highest text-on-surface rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-outline-variant/10 active:scale-95 transition-all disabled:opacity-50"
            >
              {isLoading ? '...' : 'Guide Log In'}
              {!isLoading && <ArrowRight size={16} />}
            </button>
          </div>
        </form>

        <div className="mt-10">
          <div className="relative flex items-center justify-center mb-8">
            <div className="absolute w-full h-px bg-outline-variant/10"></div>
            <span className="relative bg-surface-container-low px-4 text-[10px] font-black text-outline uppercase tracking-widest">Or continue with</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-3 bg-surface-container-lowest border border-outline-variant/10 rounded-xl hover:bg-surface-container-high transition-all">
              <Chrome size={18} />
              <span className="text-xs font-bold">Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 py-3 bg-surface-container-lowest border border-outline-variant/10 rounded-xl hover:bg-surface-container-high transition-all">
              <Github size={18} />
              <span className="text-xs font-bold">GitHub</span>
            </button>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-on-surface-variant">
          Don't have an account? <button className="text-primary font-bold hover:underline">Contact HR Department</button>
        </p>
      </motion.div>
    </div>
  );
}
