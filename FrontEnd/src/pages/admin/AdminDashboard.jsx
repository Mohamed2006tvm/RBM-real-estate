import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminSidebar from '../../components/admin/AdminSidebar';
import axios from 'axios';
import { Home, FileSpreadsheet, Calendar, UserCheck, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const { user, isAdminOrAgent, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    properties: 0,
    leads: 0,
    appointments: 0,
    activeAgents: 1
  });
  const [recentLeads, setRecentLeads] = useState([]);
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAdminOrAgent()) {
      navigate('/admin/login');
    }
  }, [user, authLoading]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [propsRes, leadsRes, appRes] = await Promise.all([
          axios.get('/api/properties'),
          axios.get('/api/leads'),
          axios.get('/api/appointments')
        ]);

        setStats({
          properties: propsRes.data.length,
          leads: leadsRes.data.length,
          appointments: appRes.data.filter(a => a.status === 'SCHEDULED').length,
          activeAgents: 1
        });

        setRecentLeads(leadsRes.data.slice(0, 5));
        setRecentAppointments(appRes.data.slice(0, 5));
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user && isAdminOrAgent()) {
      fetchDashboardData();
    }
  }, [user]);

  if (authLoading || !user || !isAdminOrAgent()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-accent" />
      </div>
    );
  }

  const statItems = [
    { label: 'Listed Properties', value: stats.properties, icon: Home, color: 'text-blue-500 bg-blue-500/10' },
    { label: 'Total Inquiries', value: stats.leads, icon: FileSpreadsheet, color: 'text-amber-500 bg-amber-500/10' },
    { label: 'Pending Visits', value: stats.appointments, icon: Calendar, color: 'text-emerald-500 bg-emerald-500/10' },
    { label: 'Consultants', value: stats.activeAgents, icon: UserCheck, color: 'text-purple-500 bg-purple-500/10' },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
      <AdminSidebar />
      
      <main className="flex-grow p-8 overflow-y-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif text-slate-900 dark:text-white">Portfolio Overview</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Real-time statistics & leads manager</p>
          </div>
          <div className="px-4 py-2 bg-accent/15 border border-accent/30 rounded-lg text-accent text-sm tracking-wider uppercase">
            {user.role} Session Active
          </div>
        </header>

        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-accent" />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border/40 p-6 rounded-xl shadow-sm flex items-center justify-between"
                  >
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 text-xs tracking-wider uppercase block mb-1">{item.label}</span>
                      <span className="text-2xl font-serif font-semibold text-slate-950 dark:text-white">{item.value}</span>
                    </div>
                    <div className={`p-3 rounded-lg ${item.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Inquiries & Appointments Split */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Leads */}
              <div className="bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border/40 p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-serif text-slate-900 dark:text-white mb-4">Recent Inbound Leads</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-dark-border/40 text-slate-400 text-xs uppercase">
                        <th className="pb-3 font-medium">Customer</th>
                        <th className="pb-3 font-medium">Contact</th>
                        <th className="pb-3 font-medium">Source</th>
                        <th className="pb-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-dark-border/20">
                      {recentLeads.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="py-6 text-center text-slate-400">No leads registered.</td>
                        </tr>
                      ) : (
                        recentLeads.map((lead) => (
                          <tr key={lead.id} className="text-slate-700 dark:text-slate-300">
                            <td className="py-3 font-medium text-slate-950 dark:text-white">{lead.customerName}</td>
                            <td className="py-3">
                              <p className="text-xs">{lead.email}</p>
                              <p className="text-[10px] text-slate-400">{lead.phone}</p>
                            </td>
                            <td className="py-3 text-xs uppercase">{lead.leadSource}</td>
                            <td className="py-3">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] tracking-wide uppercase font-semibold ${
                                lead.status === 'CLOSED' ? 'bg-emerald-500/10 text-emerald-500' :
                                lead.status === 'VISITING' ? 'bg-blue-500/10 text-blue-500' :
                                lead.status === 'CONTACTED' ? 'bg-amber-500/10 text-amber-500' :
                                'bg-purple-500/10 text-purple-500'
                              }`}>
                                {lead.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Appointments */}
              <div className="bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border/40 p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-serif text-slate-900 dark:text-white mb-4">Pending Site Appointments</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-dark-border/40 text-slate-400 text-xs uppercase">
                        <th className="pb-3 font-medium">Property</th>
                        <th className="pb-3 font-medium">Customer</th>
                        <th className="pb-3 font-medium">Date & Time</th>
                        <th className="pb-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-dark-border/20">
                      {recentAppointments.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="py-6 text-center text-slate-400">No scheduled visits.</td>
                        </tr>
                      ) : (
                        recentAppointments.map((app) => (
                          <tr key={app.id} className="text-slate-700 dark:text-slate-300">
                            <td className="py-3 font-medium text-slate-950 dark:text-white truncate max-w-[120px]">{app.property?.title}</td>
                            <td className="py-3">{app.customer?.name}</td>
                            <td className="py-3 text-xs">{new Date(app.appointmentDate).toLocaleString()}</td>
                            <td className="py-3">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] tracking-wide uppercase font-semibold ${
                                app.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-500' :
                                app.status === 'CANCELLED' ? 'bg-red-500/10 text-red-500' :
                                'bg-amber-500/10 text-amber-500'
                              }`}>
                                {app.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
