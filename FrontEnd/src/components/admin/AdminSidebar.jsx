import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Home, FileSpreadsheet, Calendar, LogOut, Moon, Sun, ArrowLeft } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const AdminSidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useTheme();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Properties', path: '/admin/properties', icon: Home },
    { label: 'Leads & Inquiries', path: '/admin/leads', icon: FileSpreadsheet },
    { label: 'Site Appointments', path: '/admin/appointments', icon: Calendar },
  ];

  return (
    <aside className="w-64 bg-primary dark:bg-dark-card border-r border-slate-800 dark:border-dark-border/40 text-slate-300 flex flex-col min-h-screen">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-slate-800 dark:border-dark-border/40 flex items-center justify-between">
        <Link to="/" className="text-accent font-serif text-xl tracking-wider uppercase block">RBM Desk</Link>
        <Link to="/" className="text-slate-500 hover:text-accent" title="Back to Portal">
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>

      {/* User Info */}
      {user && (
        <div className="p-6 border-b border-slate-800 dark:border-dark-border/40 flex items-center gap-3">
          <img 
            src={user.profileImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80'} 
            alt={user.name} 
            className="w-10 h-10 rounded-full border border-accent/30 object-cover"
          />
          <div>
            <h4 className="text-white text-sm font-semibold truncate w-36">{user.name}</h4>
            <span className="text-[10px] text-accent tracking-widest uppercase font-light">{user.role}</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-grow p-4 space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all cursor-pointer ${
                isActive 
                  ? 'bg-accent text-primary font-medium' 
                  : 'hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer controls */}
      <div className="p-4 border-t border-slate-800 dark:border-dark-border/40 space-y-2">
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm hover:bg-slate-800/50 hover:text-white cursor-pointer transition-all text-left"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm hover:bg-red-950/20 text-red-400 hover:text-red-300 cursor-pointer transition-all text-left"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
