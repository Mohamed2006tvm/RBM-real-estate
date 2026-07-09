import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, AlertTriangle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary dark:bg-dark-bg p-4 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(200,169,106,0.08),transparent_70%)] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#1E293B]/80 dark:bg-dark-card/90 backdrop-blur-md border border-accent/20 rounded-2xl shadow-2xl p-8 relative z-10"
      >
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')} 
          className="absolute top-6 left-6 text-slate-400 hover:text-accent flex items-center gap-1 text-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Home
        </button>

        <div className="text-center mt-6 mb-8">
          <h2 className="text-accent font-serif text-3xl tracking-widest uppercase">RBM</h2>
          <p className="text-slate-300 text-sm tracking-wider mt-1 uppercase font-light">Management Desk</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-950/40 border border-red-500/50 rounded-lg flex items-start gap-3 text-red-200 text-sm">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-slate-300 text-xs tracking-wider uppercase mb-2">Corporate Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="agent@rbmrealestate.com"
                className="w-full pl-11 pr-4 py-3 bg-[#0F172A]/70 border border-slate-700/50 rounded-lg focus:outline-none focus:border-accent text-white placeholder-slate-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 text-xs tracking-wider uppercase mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-[#0F172A]/70 border border-slate-700/50 rounded-lg focus:outline-none focus:border-accent text-white placeholder-slate-500 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 bg-accent hover:bg-gold-hover text-primary font-medium tracking-widest uppercase rounded-lg shadow-lg shadow-accent/15 transition-all duration-300 disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
